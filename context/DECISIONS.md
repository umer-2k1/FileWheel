# FileWheel — Decision Log

> Maintained doc. Every meaningful decision gets an entry so future contributors (human or
> AI) understand *why* things are the way they are. Newest at the top. Never delete an
> entry — if a decision is reversed, add a new one that supersedes it and link back.

Format: **ID · Date · Decision · Why · Status**

---

### D-012 · 2026-10-28 · Repo is public, single `main` branch, frequent small commits
- **Decision:** The GitHub repo (`umer-2k1/FileWheel`) is public from the start. All work
  happens on `main` — no feature branches for now. Commits are small, frequent, and
  meaningful.
- **Why:** Open-source (MIT) intent; an active, readable history; owner wants steady,
  visible progress. Small commits also make the history easy for others to follow.
- **Note:** Commit dates reflect real work days — history is never backdated or faked.
- **Status:** Active.

### D-011 · 2026-10-28 · Name is "FileWheel"
- **Decision:** The app is named **FileWheel**.
- **Why:** Starts with "File" (instantly clear), easy to say/spell, memorable, and it owns
  the signature interaction (the wheel) rather than being a generic "converter" name. An
  availability scan found no prominent app, software, or converter using the name.
- **Rejected alternatives:** FileFlip (direct clash — an existing offline Tauri converter
  already uses it), FileDrop (crowded/generic), FileRead (weak meaning), plus earlier
  playful ideas (Plop, Dunk, Swivel, Fling — owner wanted a clear, "File"-based name).
- **Follow-up:** Owner to confirm domain + trademark registry before any spend.
- **Status:** Active.

### D-010 · 2026-10-28 · Specs-driven development with a maintained `context/` folder
- **Decision:** Write specs/plans/decisions *before* implementing, and keep all of it in
  `context/`, continuously maintained. `STATUS.md` is the canonical "start here" file.
- **Why:** The owner wants any human or AI agent to pick the project up cold and know what
  it is, how much is built, what's left, what to fix, and why each decision was made.
- **Status:** Active.

### D-009 · 2026-10-28 · Lead with a drop-zone/overlay, not global drag-from-anywhere
- **Decision:** v1/v2 use a reliable drop-zone/overlay window as the primary interaction.
  Global drag-from-anywhere + modifier-key hooks are deferred to v3.
- **Why:** Global input hooks are OS-specific and permission-gated (macOS Accessibility),
  and are the riskiest part. A drop-zone works everywhere with minimal friction. UX must
  still be extremely smooth within this model.
- **Status:** Active.

### D-008 · 2026-10-28 · License: MIT; GPL tools invoked as separate processes
- **Decision:** FileWheel's own code is MIT. GPL/LGPL tools (FFmpeg, LibreOffice, etc.) are
  invoked as separate child processes, never linked in. Ship `THIRD-PARTY-NOTICES.md`.
- **Why:** Keeps our license permissive while legally using GPL tools (the standard
  pattern, used by HandBrake and others). Process isolation avoids license propagation.
- **Status:** Active.

### D-007 · 2026-10-28 · External tools: bundle the light ones, download the rest silently
- **Decision:** Bundle small/critical engines (OCR, image library, and FFmpeg where
  feasible) so v1 works offline immediately. Heavier tools download automatically on first
  use, in the background, with an inline indicator — never a manual step or a website visit.
- **Why:** Balances a small installer against "zero manual setup." Matches the frictionless
  UX promise.
- **Status:** Active.

### D-006 · 2026-10-28 · OCR strategy: OS-native first, optional local model later
- **Decision:** Use the OS-native OCR engine per platform — macOS **Vision**, Windows
  **Windows.Media.Ocr**, Linux **Tesseract**. Offer an optional downloadable high-accuracy
  local ML model (e.g. an ONNX pipeline) in a later version for "near-perfect" results.
- **Why:** OS engines are free, on-device, and excellent — best UX with nothing to install.
  Cloud OCR was rejected because it breaks the local/private promise. A bundled model is
  the path to "perfect" without a cloud account.
- **Trade-off:** Three code paths for OCR; abstracted behind one `ocr(image) -> text` API.
- **Status:** Active.

### D-005 · 2026-10-28 · Scope: full converter, shipped lean-first
- **Decision:** The long-term product is a full converter/toolbox (like the original), but
  v1 ships a lean core (see [`ROADMAP.md`](ROADMAP.md)) and expands in v2/v3.
- **Why:** A focused v1 ships faster and keeps the installer light; breadth comes later.
- **Status:** Active.

### D-004 · 2026-10-28 · Theme: Harbor blue on a neutral canvas, light + dark
- **Decision:** Accent is **Harbor blue** (`#2f6fed` light, `#4f8bff` dark) on a mostly
  neutral canvas (near-white / deep graphite). One accent, used only for actionable/active
  elements. Ship light and dark from day one.
- **Why:** Blue signals trust (fits a "hand me your private files" tool), is the most
  broadly-liked color, classic, and ages well. Restraint (neutral base, one accent) is what
  makes the UX feel premium and frictionless.
- **Rejected:** Violet, Emerald, Teal, Graphite variants (explored, owner chose blue). Avoided
  orange — that's the original app's identity.
- **Status:** Active.

### D-003 · 2026-10-28 · Target all three desktop OSes in v1
- **Decision:** macOS, Windows, and Linux are all v1 targets.
- **Why:** The owner wants broad reach; the original app skips macOS, so covering it is a
  differentiator.
- **Note:** Development happens on macOS; Windows/Linux code is written to spec but must be
  tested on real machines/CI (tracked in `STATUS.md`).
- **Status:** Active.

### D-002 · 2026-10-28 · Stack: Tauri (Rust core + web UI)
- **Decision:** Build on Tauri.
- **Why:** True cross-platform including macOS, small binaries, and a web UI that makes the
  radial wheel and theming easy. Chosen over Electron (heavier) and .NET/Avalonia (the
  original's stack, less preferred here).
- **Status:** Active.

### D-001 · 2026-10-28 · Build a FileAction-style app, not a copy
- **Decision:** Build an original app inspired by FileAction (itself a clone of "Tangerine")
  — same problem space (local file conversion via a wheel), our own name, colors, and code.
- **Why:** The concept is proven and useful; the original is MIT so its ideas are fair to
  learn from. We differentiate on brand, UX polish, and macOS support.
- **Status:** Active.
