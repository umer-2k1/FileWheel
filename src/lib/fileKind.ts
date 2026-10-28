import type { FileKind } from "./types";

const BY_EXT: Record<string, FileKind> = {
  // images
  png: "image",
  jpg: "image",
  jpeg: "image",
  webp: "image",
  heic: "image",
  gif: "image",
  bmp: "image",
  tiff: "image",
  // pdf
  pdf: "pdf",
  // audio
  mp3: "audio",
  wav: "audio",
  m4a: "audio",
  aac: "audio",
  flac: "audio",
  ogg: "audio",
  // video
  mp4: "video",
  mov: "video",
  mkv: "video",
  avi: "video",
  webm: "video",
};

/** Extract the lowercased extension from a filename or path. */
export function extOf(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? name;
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}

/** Map a filename/path to a coarse FileKind. */
export function kindFromName(name: string): FileKind {
  return BY_EXT[extOf(name)] ?? "unknown";
}
