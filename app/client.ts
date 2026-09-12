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

function clips(): HTMLVideoElement[] {
  return [...document.querySelectorAll<HTMLVideoElement>("video.clip")];
}

/**
 * Play the clip a reader can actually see, and only that one.
 *
 * Every clip is in the markup twice, once per theme, with CSS hiding the
 * wrong one — so an `autoplay` attribute would have the browser fetch a
 * file that will never be displayed. Starting playback from here instead
 * keeps `preload="none"` honest: the hidden theme costs nothing, and a clip
 * below the fold costs nothing until it is reached.
 *
 * A reader who asked for reduced motion gets none of this. The clips keep
 * their poster and their controls, which leaves them watchable on purpose
 * rather than unavoidable.
 */
function playVisibleClips(): void {
  if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const clip of clips()) {
      clip.controls = true;
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const clip = entry.target as HTMLVideoElement;
        // `display: none` is how the other theme's copy is hidden, and a
        // hidden element never intersects — so this only ever reaches the
        // one on screen.
        if (entry.isIntersecting) {
          void clip.play().catch(() => {
            // Autoplay refused: the poster stands, and controls let the
            // reader start it.
            clip.controls = true;
          });
        } else {
          clip.pause();
        }
      }
    },
    { rootMargin: "200px" }
  );
  for (const clip of clips()) {
    observer.observe(clip);
  }
}

function attachHandler(): void {
  initTheme();
  playVisibleClips();

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
