/**
 * Theme initialization and toggle functionality
 */

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) {
    return stored;
  }
  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme: Theme): void {
  if (document.body) {
    document.body.setAttribute("data-theme", theme);
  }
  localStorage.setItem("theme", theme);
}

function toggleTheme(): void {
  const current = document.body.getAttribute("data-theme") as Theme;
  const next: Theme = current === "dark" ? "light" : "dark";
  setTheme(next);
}

function initTheme(): void {
  if (document.body) {
    setTheme(getPreferredTheme());
  }
}

function attachHandler(): void {
  initTheme();

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachHandler);
} else {
  attachHandler();
}
