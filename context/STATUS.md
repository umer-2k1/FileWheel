# FileWheel — STATUS (start here)

> **If you are a new contributor or an AI agent picking this up: read this file first.**
> It always reflects the current state. It is updated on every meaningful change.

**Last updated:** 2026-10-28
**Current version target:** v1 ("Lean core")
**Current milestone:** M1 — The wheel UI
**Repo:** https://github.com/umer-2k1/FileWheel (public, single `main` branch)

---

## TL;DR — where we are

Foundation (M0) is done: the repo, all context docs, and a Tauri v2 app that builds on
both halves — the web frontend and the Rust core — are in place and verified on macOS.
Work has moved to M1: building the Harbor-blue radial wheel UI.

## What's done ✅

- **M0 — Foundation**
  - Repo initialized, public, MIT license, `.gitignore`.
  - README + full `context/` docs (VISION, ROADMAP, DECISIONS, ARCHITECTURE, specs).
  - THIRD-PARTY-NOTICES scaffold.
  - Tauri v2 app scaffolded and renamed to FileWheel (crate `filewheel`, 520×660 window).
  - Frontend builds (`pnpm build`) with Vite 5; Rust core compiles (`cargo check`, exit 0).
  - Harbor-blue theme tokens (light + dark) and an app shell wired to a `ping` health
    check that confirms the frontend ↔ core bridge works.

## What's next ▶ (in order)

1. **M1 (in progress):** Harbor-blue radial wheel (light/dark), three modes
   (Convert/Tools/Actions) with Shift/Ctrl/Alt switching, drop zone, relevant-slice logic.
2. **M2:** First conversion end-to-end — image PNG → JPG, saved next to the original.
3. **M3:** OCR via macOS Vision (then Windows/Linux paths).
4. **M4:** The rest of the v1 converters, tools, and actions + FFmpeg sourcing.
5. **M5:** Polish, packaging, ship v1.

See [`ROADMAP.md`](ROADMAP.md) for the full milestone detail.

## Known issues / risks / to-fix

- **Vite pinned to 5.x:** Vite 8 (rolldown) was missing its native binary on this
  toolchain; pinned to the stable Vite 5 line. Revisit when the toolchain stabilizes.
- **OCR native bindings** (macOS Vision, Windows OCR) are the hardest part — build and
  verify the macOS path first behind the `Ocr` trait (see `specs/ocr.md`). Not started.
- **Windows/Linux can't be built/tested on the dev machine** (it's a Mac). Their code is
  written to spec but must be verified on real machines or CI before being trusted.
- **Code signing / notarization** not set up — unsigned builds will warn on macOS/Windows.
  Deferred to v3 (acceptable for development).

## How to run

```bash
pnpm install
pnpm tauri dev      # run the desktop app (first run compiles the Rust core — slow)
pnpm build          # build the frontend only
```

## Conventions

- Specs-driven: design in `context/specs/` before building; keep specs in sync with code.
- Log every meaningful decision in [`DECISIONS.md`](DECISIONS.md).
- Small, frequent, meaningful commits on `main`. Real history — never backdated.
- Update **this file** whenever state changes, so the next person/agent is never lost.
