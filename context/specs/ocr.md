# Spec — OCR (image / scanned PDF → text)

**Milestone:** M3 · **Status:** not started

## Goal

The hero feature: extract text from an image or a scanned PDF, entirely locally. Drop a
screenshot or scan, pick "Text · OCR", and get clean text out — saved as `.txt` and copied
to the clipboard.

## Behavior

1. In **Convert** mode, an image or PDF shows a **"Text · OCR"** slice.
2. Clicking it runs OCR locally (no network).
3. Result: a `.txt` file saved next to the original, and the extracted text copied to the
   clipboard automatically. The inline result reads e.g. "Extracted text → report.txt ·
   copied to clipboard" with a reveal action.
4. For multi-page PDFs, pages are concatenated in order into one text file.

## Technical notes

One abstraction, three implementations behind it:

```
trait Ocr { fn recognize(&self, input: &Path) -> Result<String>; }
```

- **macOS** → Apple **Vision** framework (`VNRecognizeTextRequest`). On-device, free,
  high quality. Bridged from Rust via Objective-C/Swift interop (a small native shim).
- **Windows** → **Windows.Media.Ocr**. On-device, built into the OS.
- **Linux** → **Tesseract** (bundled or system), with English language data in v1.

PDF handling: rasterize pages to images first (via the pdf backend), then OCR each image.

Future (v3): an optional downloadable ONNX OCR model that plugs in behind the same trait
for "near-perfect", platform-identical results (see D-006).

## Acceptance

- [ ] Dropping a PNG/JPG screenshot and choosing OCR produces accurate `.txt` output.
- [ ] Text is copied to the clipboard automatically.
- [ ] A scanned single-page PDF produces text.
- [ ] Works fully offline on macOS (Vision) — the primary dev/test platform.
- [ ] Windows/Linux paths implemented to spec (tested on real machines / CI).
- [ ] No network calls occur during OCR.

## Risks

- The native OCR bindings (Vision, Windows OCR) are the hardest integration in the project.
  Build and verify the macOS Vision path first; keep the trait boundary clean so the other
  platforms slot in without touching the UI.
