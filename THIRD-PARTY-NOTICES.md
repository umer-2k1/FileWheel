# Third-Party Notices

FileWheel's own source code is licensed under the [MIT License](LICENSE).

FileWheel relies on third-party tools and libraries. Tools invoked as **separate
processes** (e.g. FFmpeg, Tesseract) keep their own licenses and are not linked into
FileWheel; invoking them this way keeps FileWheel's MIT license intact (see
`context/DECISIONS.md`, D-008). Bundled or downloaded binaries are redistributed under the
terms below.

> This file is maintained as dependencies are added. Each engine/library is listed with
> its license and a link. Before shipping a release, verify this list is complete.

## Engines (invoked as separate processes)

| Tool | Purpose | License | Link |
|------|---------|---------|------|
| FFmpeg | Audio/video conversion, compression, extraction | LGPL-2.1+ / GPL (build-dependent) | https://ffmpeg.org/legal.html |
| Tesseract OCR | Text recognition on Linux | Apache-2.0 | https://github.com/tesseract-ocr/tesseract |

## Platform OCR (OS-provided, not redistributed)

| API | Platform | Notes |
|-----|----------|-------|
| Vision framework | macOS | Provided by the OS; used via system APIs |
| Windows.Media.Ocr | Windows | Provided by the OS; used via system APIs |

## Libraries

Rust crate and npm package licenses are captured by their respective manifests
(`src-tauri/Cargo.toml` / `Cargo.lock` and `package.json` / lockfile). A full
machine-generated attribution list will be produced at release time (e.g. via
`cargo about` and an npm license checker).

---

*Trademarks and tool names belong to their respective owners.*
