# Spec — v1 Converters, Tools & Actions

**Milestones:** M2 (first image conversion), M4 (the rest) · **Status:** not started

## Goal

Deliver the approved lean-v1 operations (see [`../ROADMAP.md`](../ROADMAP.md)), each as a
wheel slice that runs locally and saves output next to the original.

## Convert (format changes)

| Operation | Input → Output | Backend | Milestone |
|-----------|----------------|---------|-----------|
| Image reformat | PNG ⇄ JPG ⇄ WEBP | image library | M2 |
| HEIC decode | HEIC → JPG | image library | M4 |
| Images to PDF | one or more images → PDF | pdf backend | M4 |
| PDF to images | PDF → PNGs (one per page) | pdf backend | M4 |
| OCR | image / scanned PDF → TXT | ocr (see `ocr.md`) | M3 |
| Audio reformat | MP3 ⇄ WAV ⇄ M4A | ffmpeg | M4 |
| Video to MP4 | MOV → MP4 | ffmpeg | M4 |
| Video to GIF | MP4 → GIF | ffmpeg | M4 |
| Extract audio | video → MP3 | ffmpeg | M4 |

## Tools

| Operation | Behavior | Backend | Milestone |
|-----------|----------|---------|-----------|
| Compress image | Re-encode smaller with sensible quality default | image library | M4 |
| Compress PDF | Downsample/optimize to reduce size | pdf backend | M4 |
| Strip metadata | Remove EXIF / GPS and other metadata | image/pdf backend | M4 |

## Actions

| Operation | Behavior | Milestone |
|-----------|----------|-----------|
| Copy file | Copy to a chosen location | M4 |
| Move file | Move to a chosen location | M4 |
| Copy path | Put the file's path on the clipboard | M4 |
| Reveal in folder | Open the OS file manager at the file | M4 |
| Share | Hand off to the OS share sheet | M4 |

## Common behavior (all operations)

- **Output naming:** `name.ext` → `name.<newext>`; if it would overwrite, append ` (1)`,
  ` (2)`, … Never prompt "Save As" by default.
- **Location:** saved next to the original unless the action inherently needs a target
  (copy/move).
- **Result:** inline toast with the output name, a reveal action, and (for OCR) clipboard
  confirmation.
- **Progress:** emitted as events; shown inline. Long jobs (video) show a progress ring.

## Engine sourcing

- Image library and OCR: bundled (small), so v1 works offline out of the box.
- **FFmpeg:** bundled if size allows, otherwise downloaded silently on first use (D-007),
  with an inline download indicator. Never a manual install step.

## Acceptance (M2 slice — first end-to-end)

- [ ] Drop a PNG, choose JPG, get `name.jpg` next to it, see an inline result + reveal.
- [ ] The whole flow has no blocking dialog and needs no setup.

## Acceptance (M4 — full v1 set)

- [ ] Every operation in the tables above works on macOS.
- [ ] FFmpeg is located/downloaded automatically; first video conversion needs no manual
      install.
- [ ] Each operation has a Rust test running it on a sample file.
