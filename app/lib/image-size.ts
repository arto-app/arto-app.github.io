/**
 * Intrinsic pixel size of every screenshot and clip under `/images`.
 *
 * The browser needs these on the element to reserve the right box before the
 * file arrives; without them a lazily-loaded figure collapses to nothing and
 * the page jumps as each one loads.
 *
 * Screenshot pairs are keyed by their base name, since the light and dark
 * captures of one view are always the same size. Clips are keyed by file name.
 */
export type ImageSize = { width: number; height: number };

/** The hero: a wide window, looked at rather than read. */
const HERO_SHOT: ImageSize = { width: 1392, height: 920 };

/**
 * A feature shot is a narrower window with the content zoomed. A 1400px
 * window dropped into the column a row gives it renders its body text at
 * about 8px, which loses the highlight or the mark the shot exists to show;
 * shooting narrow and zoomed lands close to 1:1 where the page displays it.
 */
const FEATURE_SHOT: ImageSize = { width: 1092, height: 800 };

export const imageSizes: Record<string, ImageSize> = {
  hero: HERO_SHOT,
  alerts: FEATURE_SHOT,
  code: FEATURE_SHOT,
  contents: FEATURE_SHOT,
  diagrams: FEATURE_SHOT,
  find: FEATURE_SHOT,
  frontmatter: FEATURE_SHOT,
  gfm: FEATURE_SHOT,
  palette: FEATURE_SHOT,
  "panel-places": FEATURE_SHOT,
  "panel-recent": FEATURE_SHOT,
  pinned: FEATURE_SHOT,
  rendering: FEATURE_SHOT,
  welcome: FEATURE_SHOT,
  header: { width: 1200, height: 760 },
  /** A crop of `pinned`, laid over it: the ruler is chrome and does not zoom. */
  gutter: { width: 340, height: 410 },
  "diagram-viewer": { width: 792, height: 620 },
  "math-viewer": { width: 792, height: 620 },
  "image-viewer": { width: 792, height: 620 },
  preferences: { width: 872, height: 660 },
  "preferences-markdown": { width: 872, height: 660 },
  "preferences-keys": { width: 872, height: 660 },
  "window-a": { width: 1072, height: 740 },
  "window-b": { width: 1072, height: 740 },
  "window-c": { width: 1072, height: 740 },
  "motion-contents": { width: 900, height: 594 },
  /** Odd heights are rounded up: H.264 cannot encode one. */
  "motion-diagram": { width: 900, height: 660 },
  "motion-palette": { width: 900, height: 594 },
  "motion-panel": { width: 900, height: 594 },
  "motion-theme": { width: 900, height: 594 },
  demo: { width: 1280, height: 846 },
};

export function imageSize(key: string): ImageSize {
  const size = imageSizes[key];
  if (!size) {
    throw new Error(`no recorded size for image ${key}`);
  }
  return size;
}
