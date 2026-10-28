# FileWheel — Architecture

> Maintained doc. Update it whenever the structure or data flow changes.

## High-level shape

FileWheel is a **Tauri** app: a Rust backend (the "core") that does the real work, and a
web-based frontend (the "shell") that renders the wheel and handles interaction. They talk
over Tauri's command/event bridge.

```
┌──────────────────────────────────────────────┐
│  Frontend (web UI)                             │
│  - Radial wheel, modes, drop zone, result UI   │
│  - Light/dark theming (Harbor blue)            │
└───────────────┬────────────────────────────────┘
                │  Tauri commands (invoke) / events
┌───────────────▼────────────────────────────────┐
│  Rust core (src-tauri)                          │
│  - Operation catalog (what each slice does)     │
│  - Job runner (runs an operation on a file)     │
│  - Backends: image, pdf, media(ffmpeg), ocr…    │
│  - Tool manager (bundle / download engines)     │
└───────────────┬────────────────────────────────┘
                │  spawns as separate processes
┌───────────────▼────────────────────────────────┐
│  External engines                               │
│  - OS-native OCR (Vision / Windows OCR)         │
│  - Tesseract (Linux), FFmpeg, image libs…       │
└─────────────────────────────────────────────────┘
```

## Why this split

- The **frontend** is where a web UI shines: the wheel, animation, theming, responsiveness.
- The **Rust core** is where we want speed, safe file handling, and clean process spawning.
- Keeping conversions in Rust (not JS) means a single, testable engine the UI just drives.

## Planned directory layout

> Some of this is created as milestones land; see `STATUS.md` for what exists today.

```
FileWheel/
├─ README.md
├─ LICENSE
├─ THIRD-PARTY-NOTICES.md
├─ package.json                 # web deps + Tauri CLI scripts
├─ context/                     # all project docs (this folder)
│  ├─ STATUS.md VISION.md ROADMAP.md DECISIONS.md ARCHITECTURE.md
│  └─ specs/
├─ src/                         # frontend (web UI)
│  ├─ index.html
│  ├─ main.ts                   # app bootstrap
│  ├─ wheel/                    # the radial wheel component
│  ├─ styles/                   # theme tokens (Harbor blue), light/dark
│  └─ lib/                      # frontend helpers, Tauri bindings
└─ src-tauri/                   # Rust core
   ├─ Cargo.toml
   ├─ tauri.conf.json
   ├─ src/
   │  ├─ main.rs                # Tauri entry, command registration
   │  ├─ commands.rs            # the invoke-able commands the UI calls
   │  ├─ catalog.rs             # operation catalog (slices per file type)
   │  ├─ job.rs                 # job runner + result/output naming
   │  ├─ backends/              # one module per engine
   │  │  ├─ image.rs
   │  │  ├─ pdf.rs
   │  │  ├─ media.rs            # ffmpeg wrapper
   │  │  └─ ocr/                # platform-specific OCR (vision/windows/tesseract)
   │  └─ tools.rs               # bundle/download/locate external binaries
   └─ binaries/                 # bundled engines (gitignored)
```

## Key concepts

### Operation catalog
A declarative list of operations. Each operation knows: which input file types it accepts,
which wheel/mode it belongs to (Convert/Tools/Actions), its label, and which backend +
parameters it runs. The frontend asks the core "what can I do with this file?" and the core
returns the matching slices — this is how the wheel only ever shows relevant options.

### Job runner
Takes an operation + an input path, runs the backend, writes the output next to the
original with a sensible auto-generated name (never prompting "Save As"), and returns a
result (output path, and for OCR the extracted text) plus progress events.

### Backends
Each backend is a thin, testable wrapper around one engine. Backends that call external
binaries (FFmpeg, Tesseract) spawn them as **separate processes** (see D-008) and never
link their code.

### Tool manager
Locates an engine in this order: bundled binary → system install → download on demand
(silent, background, with an inline progress event). Downloads are checksum-verified.

### OCR abstraction
One interface — `ocr(image_or_pdf) -> text` — with platform implementations:
macOS Vision, Windows OCR, Tesseract on Linux. A future high-accuracy ONNX model plugs in
behind the same interface.

## Data flow for one conversion

1. User drops a file → frontend sends its path to the core.
2. Core returns the list of valid operations (slices) for that file type.
3. Wheel renders only those slices; user picks one (optionally via a modifier key for mode).
4. Frontend invokes `run_operation(op_id, path)`.
5. Core runs the backend (spawning an engine if needed), emits progress events.
6. Core writes output next to the original, returns the result.
7. Frontend shows an inline result (reveal / copy path / clipboard for OCR text).

## Dev setup

```bash
pnpm install        # web deps + Tauri CLI
pnpm tauri dev      # run the app
pnpm tauri build    # release build for the current OS
```

Prerequisites: Rust (rustup), Node.js + pnpm. Platform build prerequisites for Tauri are
documented at https://tauri.app/start/prerequisites/.

## Testing strategy

- **Rust unit/integration tests** run each backend operation on small sample files in a
  temp dir and assert the output exists and is valid. These run in CI on all three OSes.
- The frontend wheel logic (which slices show for which file) is unit-tested.
