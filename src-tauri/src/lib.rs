//! FileWheel core (Rust).
//!
//! This is the backend half of the Tauri app. For now it exposes a single `ping`
//! command used as a health check that the frontend <-> core bridge works. The
//! operation catalog, job runner, and backends (image/pdf/media/ocr) land in later
//! milestones — see `context/ARCHITECTURE.md` and `context/ROADMAP.md`.

/// Health check: returns the app version so the frontend can confirm the core is live.
#[tauri::command]
fn ping() -> String {
    format!("FileWheel core v{}", env!("CARGO_PKG_VERSION"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![ping])
        .run(tauri::generate_context!())
        .expect("error while running FileWheel");
}
