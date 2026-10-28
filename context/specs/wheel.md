# Spec — The Wheel

**Milestone:** M1 · **Status:** not started

## Goal

The radial wheel is FileWheel's signature interaction and brand. A user drops a file onto
it, picks a slice, and the operation runs. It must only ever show options that make sense
for the dropped file.

## Behavior

1. The app opens to the wheel on a neutral canvas (Harbor-blue accent, light or dark to
   match the OS).
2. The center of the wheel is a **drop target** ("Drop here"). The user can also click it
   to open a file picker.
3. On drop (or pick), the wheel populates its slices with the **operations valid for that
   file type**, for the currently selected mode.
4. **Three modes**, switchable by tab and by modifier key:
   - **Convert** (Shift) — format changes.
   - **Tools** (Ctrl) — compress, strip metadata, etc.
   - **Actions** (Alt) — copy, move, copy path, reveal, share.
5. The active mode's tab and the hovered/active slice use the Harbor-blue accent; idle
   slices are neutral with a hairline border.
6. Clicking a slice runs the operation. Progress shows inline (a ring on the slice or a
   toast); the result appears inline when done — never a blocking dialog.
7. "Repeat last" re-runs the previous operation with the same settings (one click).

## Technical notes

- The frontend asks the Rust core `operations_for(path, mode)` and renders the returned
  slices. The core owns the catalog so the UI never hardcodes file-type logic.
- Wheel geometry: 6 primary slices + center hub. Segments are SVG paths generated from
  angles (see the approved mockup). Labels stay upright (no rotated text).
- Theme is driven by CSS custom properties with light/dark token sets; accent swaps to the
  brighter blue (`#4f8bff`) in dark mode.
- Drag-and-drop uses Tauri's file-drop events; the center also opens a native file dialog.

## Acceptance

- [ ] App launches to the wheel in both light and dark.
- [ ] Dropping a file shows only valid slices for its type.
- [ ] Shift/Ctrl/Alt switch modes; tabs do too.
- [ ] Hover/active states use the accent; idle slices are neutral.
- [ ] Clicking a slice invokes the core and shows inline progress + result.
- [ ] No blocking dialogs anywhere in the flow.

## Out of scope (later)

- Global drag-from-anywhere and OS input hooks (v3).
- Customizable slice layout / presets ("Your own wheel", v2).
