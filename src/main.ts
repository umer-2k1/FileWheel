import { invoke } from "@tauri-apps/api/core";

// M0 shell: confirm the frontend <-> Rust core bridge is alive.
// The real wheel UI (M1) replaces this bootstrap.
async function init() {
  const statusEl = document.querySelector<HTMLElement>("#core-status");
  if (!statusEl) return;
  try {
    const version = await invoke<string>("ping");
    statusEl.textContent = version;
  } catch (err) {
    statusEl.textContent = "unavailable";
    console.error("Failed to reach core:", err);
  }
}

window.addEventListener("DOMContentLoaded", init);
