// Shared frontend types for FileWheel.

/** The three wheels. Convert = formats, Tools = compress/strip, Actions = copy/move/etc. */
export type Mode = "convert" | "tools" | "actions";

/** Coarse file category used to decide which slices are relevant. */
export type FileKind = "image" | "pdf" | "audio" | "video" | "unknown";

/** One wheel slice — an operation the user can pick. */
export interface Slice {
  /** Stable id, e.g. "image.jpg" or "actions.reveal". */
  id: string;
  /** Short label shown on the slice. */
  label: string;
}

/** A file the user dropped or picked. */
export interface DroppedFile {
  /** Absolute path (real path from Tauri drop; in browser preview this is just the name). */
  path: string;
  /** Display name. */
  name: string;
  /** Detected category. */
  kind: FileKind;
}
