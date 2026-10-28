import type { DroppedFile, Mode, Slice } from "./lib/types";
import { kindFromName } from "./lib/fileKind";
import { slicesFor } from "./wheel/operations";
import { renderWheel } from "./wheel/wheel";

// ----- state -----
let mode: Mode = "convert";
let file: DroppedFile | null = null;
let toastTimer: number | undefined;

// ----- element refs -----
const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const wheelEl = $("#wheel");
const modesEl = $<HTMLElement>("#modes");
const filebarEl = $("#filebar");
const fileChipEl = $("#file-chip");
const toastEl = $("#toast");

// ----- rendering -----
function currentSlices(): Slice[] {
  if (!file) return [];
  return slicesFor(file.kind, mode);
}

function render() {
  wheelEl.innerHTML = renderWheel(currentSlices(), file !== null);

  modesEl.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.mode === mode));
  });

  if (file) {
    filebarEl.classList.remove("hidden");
    fileChipEl.textContent = file.name;
  } else {
    filebarEl.classList.add("hidden");
  }
}

function setMode(next: Mode) {
  if (mode === next) return;
  mode = next;
  render();
}

function setFile(next: DroppedFile | null) {
  file = next;
  render();
}

function showToast(msg: string) {
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.add("hidden"), 2600);
}

// ----- interactions -----
function onPick(opId: string) {
  const slice = currentSlices().find((x) => x.id === opId);
  if (!slice || !file) return;
  // M1: selection is wired; actual execution lands in M2 (image) / M3 (OCR) / M4 (rest).
  showToast(`${slice.label} — runs here in a later milestone`);
}

// Mode tabs
modesEl.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-mode]");
  if (btn) setMode(btn.dataset.mode as Mode);
});

// Slice clicks / keyboard activation (event delegation on the wheel)
wheelEl.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<SVGElement>("[data-op]");
  if (el) onPick(el.getAttribute("data-op")!);
});
wheelEl.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = (e.target as HTMLElement).closest<SVGElement>("[data-op]");
  if (el) {
    e.preventDefault();
    onPick(el.getAttribute("data-op")!);
  }
});

// Modifier keys switch modes (matches the Shift/Ctrl/Alt model).
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.key === "Shift") setMode("convert");
  else if (e.key === "Control" || e.key === "Meta") setMode("tools");
  else if (e.key === "Alt") setMode("actions");
});

// ----- file input: Tauri drag-drop (real paths) + DOM fallback for browser preview -----
async function wireTauriDrop() {
  try {
    const { getCurrentWebview } = await import("@tauri-apps/api/webview");
    await getCurrentWebview().onDragDropEvent((event) => {
      const p = event.payload;
      if (p.type === "over") {
        wheelEl.classList.add("drag-over");
      } else if (p.type === "drop") {
        wheelEl.classList.remove("drag-over");
        const path = p.paths[0];
        if (path) {
          const name = path.split(/[\\/]/).pop() ?? path;
          setFile({ path, name, kind: kindFromName(name) });
        }
      } else {
        wheelEl.classList.remove("drag-over");
      }
    });
  } catch {
    // Not running inside Tauri (e.g. plain Vite preview) — DOM fallback below handles it.
  }
}

function wireDomDropFallback() {
  const app = $("#app");
  app.addEventListener("dragover", (e) => {
    e.preventDefault();
    wheelEl.classList.add("drag-over");
  });
  app.addEventListener("dragleave", () => wheelEl.classList.remove("drag-over"));
  app.addEventListener("drop", (e) => {
    e.preventDefault();
    wheelEl.classList.remove("drag-over");
    const f = e.dataTransfer?.files?.[0];
    if (f) setFile({ path: f.name, name: f.name, kind: kindFromName(f.name) });
  });
}

// ----- boot -----
render();
wireTauriDrop();
wireDomDropFallback();
