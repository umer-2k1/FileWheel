# FileWheel — Feature Specs

One spec per feature. A spec describes *what* a feature does and *how it should behave*
before it's built, and is updated to match reality as it's implemented.

Each spec follows a simple shape:

- **Goal** — what this feature is for, in one or two lines.
- **Behavior** — how it works from the user's point of view.
- **Technical notes** — how it's implemented (backends, APIs, data).
- **Acceptance** — the checklist that means "done".
- **Status** — not started / in progress / done, and where it lives in the code.

## Index

| Spec | Covers | Milestone |
|------|--------|-----------|
| [`wheel.md`](wheel.md) | The radial wheel, modes, drop zone, relevant-slices logic | M1 |
| [`ocr.md`](ocr.md) | Image / scanned PDF → text (the hero feature) | M3 |
| [`converters.md`](converters.md) | The v1 conversions, tools, and actions | M2, M4 |

More specs are added as features are designed (e.g. `tool-manager.md`, `presets.md` in v2).
