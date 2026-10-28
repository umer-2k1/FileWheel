<div align="center">

# FileWheel

**Drop a file on the wheel. Get it converted.**

A fast, private, 100% local file converter and toolbox for macOS, Windows, and Linux.
No upload sites. No accounts. No tracking. Your files never leave your computer.

</div>

---

## What is FileWheel?

FileWheel turns file conversion into a single gesture. Drop a file onto a radial
**wheel**, pick a slice, and the result is saved right next to the original — converted,
compressed, or acted on, entirely on your own machine.

It wraps best-in-class local engines (the OS text recognizer, FFmpeg, and friends)
behind one calm, frictionless interface, so you never have to hunt through menus or
trust a sketchy website with your private documents.

> **Status:** early development (pre-v1). See [`context/STATUS.md`](context/STATUS.md)
> for exactly where the project stands right now.

## Why it exists

Most people convert files today by uploading them to ad-filled websites — handing
private documents, photos, and scans to strangers. FileWheel does the same job
**locally, instantly, and for free**, with a UX designed to remove every bit of
friction: drop → pick → done.

## The three wheels

| Wheel | Opened with | What it does |
|-------|-------------|--------------|
| **Convert** | Shift | Change a file's format (image, PDF, audio, video, text/OCR) |
| **Tools** | Ctrl | Compress, strip metadata, and more |
| **Actions** | Alt | Copy, move, copy path, reveal, share |

The wheel only ever shows the options that make sense for the file you dropped.

## Highlights

- **100% local** — no cloud, no account, no telemetry.
- **OCR built in** — pull text out of images and scanned PDFs (uses the OS recognizer).
- **Light & dark** — a calm, neutral interface with a single confident accent (Harbor blue).
- **Cross-platform** — macOS, Windows, and Linux from one codebase (Tauri).
- **Open source** — MIT licensed.

## Tech stack

- **[Tauri](https://tauri.app/)** — Rust core + web UI, small native binaries on all three OSes.
- **Rust** — the conversion engine and process orchestration.
- **Web UI** — the radial wheel and app shell.
- **External engines** — FFmpeg, OS-native OCR / Tesseract, image libraries, invoked as
  separate processes (keeps the MIT license clean).

See [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md) for the full picture.

## Documentation / context

Everything about this project — the vision, the roadmap, every decision, and the current
state — lives in [`context/`](context/). **If you are a new contributor or an AI agent
picking this up, start with [`context/STATUS.md`](context/STATUS.md).**

| File | What's in it |
|------|--------------|
| [`context/STATUS.md`](context/STATUS.md) | Start here: where we are, what's next, known issues |
| [`context/VISION.md`](context/VISION.md) | Product, users, value, UX principles |
| [`context/ROADMAP.md`](context/ROADMAP.md) | v1 / v2 / v3 milestones |
| [`context/DECISIONS.md`](context/DECISIONS.md) | Decision log (stack, theme, OCR, license, name…) |
| [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md) | How the code is organized |
| [`context/specs/`](context/specs/) | One spec per feature |

## Development

> Full setup lives in [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md). Quick version:

```bash
pnpm install        # install web + Tauri CLI dependencies
pnpm tauri dev      # run the desktop app in development
pnpm tauri build    # produce a release build for the current OS
```

Requires [Rust](https://rustup.rs/) and [Node.js](https://nodejs.org/) (with pnpm).

## License

[MIT](LICENSE). FileWheel's own code is MIT; the external tools it invokes keep their own
licenses — see [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
