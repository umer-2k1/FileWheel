# FileWheel — STATUS (start here)

> **If you are a new contributor or an AI agent picking this up: read this file first.**
> It always reflects the current state. It is updated on every meaningful change.

**Last updated:** 2026-10-28
**Current version target:** v1 ("Lean core")
**Current milestone:** M0 — Foundation
**Repo:** https://github.com/umer-2k1/FileWheel (public, single `main` branch)

---

## TL;DR — where we are

The project has just been initialized. All planning and context docs are written. The
GitHub repo is live and MIT-licensed. The Tauri app scaffold is the next thing to build.
No application code exists yet.

## What's done ✅

- Repo initialized, public, MIT license, `.gitignore`.
- README (repo front door).
- Full `context/` docs: VISION, ROADMAP (v1/v2/v3 + approved conversion matrix),
  DECISIONS (D-001..D-012), ARCHITECTURE, and specs (wheel, OCR, converters).
- THIRD-PARTY-NOTICES scaffold.

## What's next ▶ (in order)

1. **M0 (finish):** Scaffold the Tauri app so it launches to an empty shell
   (`src/` frontend + `src-tauri/` Rust core, `pnpm tauri dev` works on macOS).
2. **M1:** Build the Harbor-blue radial wheel (light/dark), three modes, drop zone.
3. **M2:** First conversion end-to-end — image PNG → JPG, saved next to the original.
4. **M3:** OCR via macOS Vision (then Windows/Linux paths).
5. **M4:** The rest of the v1 converters, tools, and actions + FFmpeg sourcing.
6. **M5:** Polish, packaging, ship v1.

See [`ROADMAP.md`](ROADMAP.md) for the full milestone detail.

## Known issues / risks / to-fix

- **OCR native bindings** (macOS Vision, Windows OCR) are the hardest part — build and
  verify the macOS path first behind the `Ocr` trait (see `specs/ocr.md`).
- **Windows/Linux can't be built/tested on the dev machine** (it's a Mac). Their code is
  written to spec but must be verified on real machines or CI before being trusted.
- **Code signing / notarization** not set up — unsigned builds will warn on macOS/Windows.
  Deferred to v3 (D-012 / ROADMAP), acceptable for development.

## How to run (once scaffold lands)

```bash
pnpm install
pnpm tauri dev
```

## Conventions

- Specs-driven: design in `context/specs/` before building; keep specs in sync with code.
- Log every meaningful decision in [`DECISIONS.md`](DECISIONS.md).
- Small, frequent, meaningful commits on `main`. Real history — never backdated.
- Update **this file** whenever state changes, so the next person/agent is never lost.
