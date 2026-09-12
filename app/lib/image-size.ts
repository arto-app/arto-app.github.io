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

const WINDOW_SHOT: ImageSize = { width: 1392, height: 920 };

export const imageSizes: Record<string, ImageSize> = {
  contents: WINDOW_SHOT,
  diagrams: WINDOW_SHOT,
  find: WINDOW_SHOT,
  hero: WINDOW_SHOT,
  palette: WINDOW_SHOT,
  "panel-recent": WINDOW_SHOT,
  rendering: WINDOW_SHOT,
  welcome: WINDOW_SHOT,
  "diagram-viewer": { width: 792, height: 620 },
  preferences: { width: 872, height: 660 },
  "window-a": { width: 1072, height: 740 },
  "window-b": { width: 1072, height: 740 },
  "window-c": { width: 1072, height: 740 },
  "motion-contents.gif": { width: 900, height: 594 },
  "motion-diagram.gif": { width: 900, height: 705 },
  "motion-palette.gif": { width: 900, height: 594 },
  "motion-panel.gif": { width: 900, height: 594 },
  "motion-theme.gif": { width: 900, height: 594 },
};

export function imageSize(key: string): ImageSize {
  const size = imageSizes[key];
  if (!size) {
    throw new Error(`no recorded size for image ${key}`);
  }
  return size;
}
