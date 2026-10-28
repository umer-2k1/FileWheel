# FileWheel — Roadmap

> Maintained doc. This is the single source of truth for what ships in which version.
> When scope moves between versions, update it here and note why in [`DECISIONS.md`](DECISIONS.md).

Milestones are grouped by version. Within v1, work proceeds milestone by milestone
(M0 → M5). Progress against these is tracked in [`STATUS.md`](STATUS.md).

---

## v1 — "Lean core" (current target)

Goal: a genuinely useful, fully-local converter that nails the drop → pick → done UX on
all three OSes, covering ~80% of everyday conversions with only lightweight, bundleable
tools (so the installer stays small and works offline out of the box).

### v1 milestones

- **M0 — Foundation**
  - Repo, MIT license, full context docs. ✅ (in progress)
  - Tauri app scaffold that launches to an empty shell.
- **M1 — The wheel UI**
  - Harbor-blue radial wheel, light + dark.
  - Three modes (Convert / Tools / Actions) with Shift/Ctrl/Alt switching.
  - Drop zone that accepts a file and shows only relevant slices.
- **M2 — First conversion end-to-end**
  - Image format conversion (PNG ⇄ JPG ⇄ WEBP) via a bundled image library.
  - Output saved next to original, inline result toast, reveal-in-folder.
- **M3 — OCR (the hero feature)**
  - Image / scanned PDF → text using the OS-native recognizer
    (macOS Vision, Windows OCR) with Tesseract on Linux.
  - Text saved as `.txt` and copied to clipboard.
- **M4 — Remaining v1 converters & tools**
  - Images: HEIC → JPG.
  - PDF: images → PDF, PDF → images.
  - Audio: MP3 ⇄ WAV ⇄ M4A (FFmpeg).
  - Video: MOV → MP4, MP4 → GIF, video → MP3 extract (FFmpeg).
  - Tools: compress image, compress PDF, strip metadata / GPS.
  - Actions: copy, move, copy path, reveal, share.
  - Silent on-demand download of FFmpeg on first use.
- **M5 — Polish & ship**
  - "Repeat last", recent/favorite slices.
  - Error states, empty states, keyboard navigation.
  - Per-OS packaging (installer/bundle). Signing deferred to v3.

### v1 conversion matrix (approved)

| Category | Conversions |
|----------|-------------|
| Images | PNG ⇄ JPG ⇄ WEBP, HEIC → JPG |
| PDF | images → PDF, PDF → images |
| Text | image / scanned PDF → text (OCR) |
| Audio | MP3 ⇄ WAV ⇄ M4A |
| Video | MOV → MP4, MP4 → GIF, video → MP3 (extract audio) |
| Tools | compress image, compress PDF, strip metadata / GPS |
| Actions | copy, move, copy path, reveal in folder, share |

v1 bundled engines: OS-native OCR / Tesseract, an image library, FFmpeg
(bundled or downloaded on first use). **No LibreOffice, no Pandoc in v1.**

---

## v2 — "Breadth" (the heavy tools)

Adds the features that require large external dependencies, downloaded on demand.

- **Office formats** via LibreOffice: DOCX/XLSX/PPTX → PDF, and back where sensible.
- **Documents** via Pandoc: Markdown ⇄ HTML ⇄ PDF, EPUB.
- **Archives**: zip / 7z / tar — compress and extract.
- **PDF power tools**: merge, split, reorder, rotate pages.
- **Media tools**: trim audio/video, extract frames, adjust bitrate/resolution.
- **Subtitles**: SRT/VTT conversions.
- **Batch**: drop multiple files, apply one action to all.
- **Presets & "Your own wheel"**: customizable slice layout and saved presets.

---

## v3 — "Pro & reach"

Distribution, trust, and the advanced interaction the original app is known for.

- **Code signing + notarization** (macOS) and **signed installer** (Windows).
- **Auto-update** with checksum verification.
- **"From anywhere"**: global drag-from-anywhere + modifier-key wheel (per-OS hooks;
  macOS Accessibility permission). v1/v2 use a reliable drop-zone/overlay instead.
- **High-accuracy OCR**: optional downloadable local ML model for near-perfect results,
  identical on all platforms.
- **Localization**: multi-language UI.
- **Shell integration**: right-click / file-manager "Open in FileWheel".
- **Clipboard & screenshot capture** as input sources.

---

## Guiding rule for scope

If a feature needs a large (>50 MB) external dependency or breaks the "works offline out
of the box" promise for v1, it belongs in v2 or later. v1 stays lean, small, and instant.
