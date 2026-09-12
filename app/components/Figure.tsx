import type { Child } from "hono/jsx";
import { basePath } from "../lib/path";
import { imageSize } from "../lib/image-size";

type ShotProps = {
  /** Base name under /images, without the `-light` / `-dark` suffix. */
  name: string;
  alt: string;
};

/**
 * A screenshot taken in both themes, with the one matching the reader's theme
 * shown. Both are in the markup; CSS decides which is displayed.
 */
export function Shot({ name, alt }: ShotProps) {
  const { width, height } = imageSize(name);
  return (
    <>
      <img
        src={basePath(`/images/${name}-light.png`)}
        alt={alt}
        class="shot-light"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <img
        src={basePath(`/images/${name}-dark.png`)}
        alt={alt}
        class="shot-dark"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </>
  );
}

type FigureProps = {
  caption?: Child;
  wide?: boolean;
  children: Child;
};

export function Figure({ caption, wide, children }: FigureProps) {
  return (
    <figure class={wide ? "figure figure-wide" : "figure"}>
      <div class="figure-frame">{children}</div>
      {caption && <figcaption class="figure-caption">{caption}</figcaption>}
    </figure>
  );
}

type ShotFigureProps = {
  name: string;
  alt: string;
  caption?: Child;
  wide?: boolean;
};

export function ShotFigure({ name, alt, caption, wide }: ShotFigureProps) {
  return (
    <Figure caption={caption} wide={wide}>
      <Shot name={name} alt={alt} />
    </Figure>
  );
}

type MotionFigureProps = {
  /** File name under /images, e.g. "motion-palette.gif". */
  src: string;
  alt: string;
  caption?: Child;
};

export function MotionFigure({ src, alt, caption }: MotionFigureProps) {
  const { width, height } = imageSize(src);
  return (
    <Figure caption={caption}>
      <img
        src={basePath(`/images/${src}`)}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </Figure>
  );
}

type WindowStackProps = {
  names: readonly string[];
  alt: string;
};

/**
 * Overlapping window shots. Each keeps its own border and shadow, so the
 * stack reads as depth in either theme.
 */
export function WindowStack({ names, alt }: WindowStackProps) {
  return (
    <div class="window-stack">
      {names.map((name) => (
        <div key={name} class="window-stack-item">
          <Shot name={name} alt={alt} />
        </div>
      ))}
    </div>
  );
}
