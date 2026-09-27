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

/**
 * Show one walkthrough at a time, and move to the next when it ends.
 *
 * A hidden slide is `display: none`, so the observer in `playVisibleClips`
 * never sees it; revealing one is what starts it playing. Leaving a slide
 * rewinds its clip, so coming back to it starts from the beginning rather
 * than from the frame someone happened to leave it on.
 *
 * With reduced motion nothing advances on its own — the clips do not play
 * by themselves either, so there is no end for one to hand on from.
 */
function initDemoCarousels(): void {
  const reduced = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  for (const carousel of document.querySelectorAll<HTMLElement>(
    "[data-demo-carousel]"
  )) {
    const tabs = [
      ...carousel.querySelectorAll<HTMLButtonElement>(".demo-tab"),
    ];
    const slides = [...carousel.querySelectorAll<HTMLElement>(".demo-slide")];
    let current = 0;

    const select = (index: number, focus = false): void => {
      current = (index + slides.length) % slides.length;
      tabs.forEach((tab, i) => {
        const selected = i === current;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      });
      slides.forEach((slide, i) => {
        slide.hidden = i !== current;
        if (i !== current) {
          for (const video of slide.querySelectorAll("video")) {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", (event) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        if (step) {
          event.preventDefault();
          select(current + step, true);
        }
      });
    });
    if (!reduced) {
      slides.forEach((slide, i) => {
        for (const video of slide.querySelectorAll("video")) {
          video.addEventListener("ended", () => {
            if (i === current) select(current + 1);
          });
        }
      });
    }

    carousel.dataset.ready = "true";
    select(0);
  }
}

function attachHandler(): void {
  initTheme();
  initDemoCarousels();
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
