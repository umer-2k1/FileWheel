import type { Slice } from "../lib/types";

// Pure SVG rendering for the wheel. Returns an SVG string; the controller handles clicks
// via event delegation on elements carrying `data-op`.

const CX = 130;
const CY = 130;
const R = 118; // outer radius
const r = 58; // inner radius (hub edge)
const GAP = 3; // degrees of padding between slices

const d2r = (deg: number) => (deg * Math.PI) / 180;
const px = (a: number, rad: number) => (CX + rad * Math.cos(d2r(a))).toFixed(2);
const py = (a: number, rad: number) => (CY + rad * Math.sin(d2r(a))).toFixed(2);

function segPath(a0: number, a1: number): string {
  const large = a1 - a0 > 180 ? 1 : 0;
  return [
    `M${px(a0, R)} ${py(a0, R)}`,
    `A${R} ${R} 0 ${large} 1 ${px(a1, R)} ${py(a1, R)}`,
    `L${px(a1, r)} ${py(a1, r)}`,
    `A${r} ${r} 0 ${large} 0 ${px(a0, r)} ${py(a0, r)}`,
    "Z",
  ].join(" ");
}

function hub(hasFile: boolean): string {
  const caption = hasFile ? "Pick a slice" : "Drop a file here";
  return `
    <circle cx="${CX}" cy="${CY}" r="53" class="hub" />
    <circle cx="${CX}" cy="${CY}" r="45" class="hub-ring" />
    <line x1="${CX}" y1="114" x2="${CX}" y2="134" class="hub-glyph" />
    <polyline points="122,126 130,136 138,126" class="hub-glyph" fill="none" />
    <text x="${CX}" y="156" text-anchor="middle" class="hub-text">${caption}</text>`;
}

/**
 * Render the wheel. When `slices` is empty we draw six ghost slices as an affordance
 * (either "drop a file" when none is loaded, or "no actions for this file").
 */
export function renderWheel(slices: Slice[], hasFile: boolean): string {
  const ghost = slices.length === 0;
  const items: (Slice | null)[] = ghost ? Array(6).fill(null) : slices;
  const n = items.length;
  const step = 360 / n;
  const base = -90 - step / 2; // center the first slice at the top

  let paths = "";
  items.forEach((item, i) => {
    const a0 = base + i * step + GAP / 2;
    const a1 = base + (i + 1) * step - GAP / 2;
    const mid = base + (i + 0.5) * step;
    const cls = item ? "slice" : "slice ghost";
    const attr = item ? ` data-op="${item.id}" tabindex="0" role="button" aria-label="${item.label}"` : "";
    paths += `<path d="${segPath(a0, a1)}" class="${cls}"${attr} />`;
    if (item) {
      paths += `<text x="${px(mid, (R + r) / 2)}" y="${py(mid, (R + r) / 2)}" dy="0.35em" text-anchor="middle" class="slice-label">${item.label}</text>`;
    }
  });

  return `<svg viewBox="0 0 260 260" class="wheel-svg" role="group" aria-label="File action wheel">
    ${paths}
    ${hub(hasFile)}
  </svg>`;
}
