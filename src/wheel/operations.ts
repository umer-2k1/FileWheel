import type { FileKind, Mode, Slice } from "../lib/types";

// NOTE: This is a frontend placeholder catalog for M1 so the wheel can render the right
// slices per file type and mode. In M2 the catalog becomes authoritative in the Rust core
// (`operations_for(path, mode)`), and this file will defer to it. The shape is intentionally
// close to what the core will return. See context/specs/wheel.md and converters.md.

type Catalog = Record<Mode, Partial<Record<FileKind, Slice[]>>>;

const s = (id: string, label: string): Slice => ({ id, label });

const CATALOG: Catalog = {
  convert: {
    image: [s("image.jpg", "JPG"), s("image.png", "PNG"), s("image.webp", "WEBP"), s("ocr.text", "Text · OCR")],
    pdf: [s("pdf.images", "Images"), s("ocr.text", "Text · OCR")],
    audio: [s("audio.mp3", "MP3"), s("audio.wav", "WAV"), s("audio.m4a", "M4A")],
    video: [s("video.mp4", "MP4"), s("video.gif", "GIF"), s("video.mp3", "MP3 audio")],
  },
  tools: {
    image: [s("tool.compress", "Compress"), s("tool.strip", "Strip metadata")],
    pdf: [s("tool.compress", "Compress"), s("tool.strip", "Strip metadata")],
    audio: [s("tool.compress", "Compress")],
    video: [s("tool.compress", "Compress")],
  },
  actions: {
    // Actions apply to any file kind.
    image: actionSlices(),
    pdf: actionSlices(),
    audio: actionSlices(),
    video: actionSlices(),
    unknown: actionSlices(),
  },
};

function actionSlices(): Slice[] {
  return [
    s("action.copy", "Copy"),
    s("action.move", "Move"),
    s("action.path", "Copy path"),
    s("action.reveal", "Reveal"),
    s("action.share", "Share"),
  ];
}

/** Slices relevant to a given file kind in a given mode. Empty if none apply. */
export function slicesFor(kind: FileKind, mode: Mode): Slice[] {
  return CATALOG[mode][kind] ?? [];
}
