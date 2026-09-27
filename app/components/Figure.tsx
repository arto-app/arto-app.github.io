import type { Child } from "hono/jsx";
import { basePath } from "../lib/path";
import { imageSize } from "../lib/image-size";

type ShotProps = {
  /** Base name under /images, without the `-light` / `-dark` suffix. */
  name: string;
  alt: string;
};

/**
 * A capture taken in both themes, with the one matching the reader's theme
 * shown. Both are in the markup; CSS decides which is displayed.
 *
 * The pairing is answered by the site's own theme rather than by
 * `prefers-color-scheme`, because a reader who has set this site to dark on a
 * light desktop wants the dark artwork — the pairing exists precisely so the
 * screenshot does not contradict the page around it.
 */
export function Shot({ name, alt }: ShotProps) {
  const { width, height } = imageSize(name);
  return (
    <>
      <img
        src={basePath(`/images/${name}-light.webp`)}
        alt={alt}
        class="shot-light"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <img
        src={basePath(`/images/${name}-dark.webp`)}
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

function Figure({ caption, wide, children }: FigureProps) {
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

type ClipProps = {
  /** Base name under /videos, e.g. "motion-palette". */
  name: string;
  alt: string;
  /** Offer the reader a scrubber, for a clip long enough to want one. */
  controls?: boolean;
  /** Off for a clip that hands on to another when it ends. */
  loop?: boolean;
};

/**
 * A screen recording paired by theme, shown like a screenshot that moves.
 *
 * H.264 rather than an animated GIF: a GIF has to quantise the whole
 * interface down to 256 colours, which on this footage cost about six times
 * the bytes for a measurably worse picture.
 *
 * Nothing here autoplays and nothing preloads. Both themes sit in the markup
 * and CSS hides one, so an `autoplay` attribute would pull down a file no
 * one will ever see — `client.ts` starts whichever element is actually
 * displayed once it scrolls into view, which is also where a reader asking
 * for reduced motion gets left alone. Until then the poster stands in, so a
 * reader with no JavaScript sees the still rather than an empty box.
 */
function Clip({ name, alt, controls, loop = true }: ClipProps) {
  const { width, height } = imageSize(name);
  const common = {
    loop,
    muted: true,
    playsinline: true,
    preload: "none",
    controls,
    "aria-label": alt,
    // A silent decorative loop is a picture that moves rather than media a
    // reader is meant to operate. One carrying controls is the exception:
    // calling that an image would hide the controls from the reader who
    // most needs them.
    role: controls ? undefined : "img",
    width,
    height,
  } as const;
  return (
    <>
      <video
        {...common}
        src={basePath(`/videos/${name}-light.mp4`)}
        poster={basePath(`/images/${name}-poster-light.webp`)}
        class="clip shot-light"
      />
      <video
        {...common}
        src={basePath(`/videos/${name}-dark.mp4`)}
        poster={basePath(`/images/${name}-poster-dark.webp`)}
        class="clip shot-dark"
      />
    </>
  );
}

type MotionFigureProps = {
  name: string;
  alt: string;
  caption?: Child;
  controls?: boolean;
  wide?: boolean;
};

export function MotionFigure({
  name,
  alt,
  caption,
  controls,
  wide,
}: MotionFigureProps) {
  return (
    <Figure caption={caption} wide={wide}>
      <Clip name={name} alt={alt} controls={controls} />
    </Figure>
  );
}

type Demo = {
  name: string;
  /** The tab's label: what the walkthrough is about, in a word or two. */
  title: string;
  alt: string;
  /** One sentence under the clip, saying what to watch for. */
  summary: Child;
};

/**
 * Walkthroughs shown one at a time, each handing on to the next when it ends.
 *
 * Without JavaScript every walkthrough is in the page, one under another, so
 * nothing is out of reach. `client.ts` turns them into tabs once it runs; the
 * tabs are hidden until then rather than drawn as buttons that do nothing.
 */
export function DemoCarousel({ demos }: { demos: readonly Demo[] }) {
  return (
    <div class="demo-carousel" data-demo-carousel>
      <div class="demo-tabs" role="tablist" aria-label="Walkthroughs">
        {demos.map((demo, i) => (
          <button
            key={demo.name}
            type="button"
            role="tab"
            class="demo-tab"
            id={`demo-tab-${demo.name}`}
            aria-controls={`demo-${demo.name}`}
            aria-selected={i === 0 ? "true" : "false"}
            tabindex={i === 0 ? 0 : -1}
          >
            <span class="demo-tab-index">{i + 1}</span>
            {demo.title}
          </button>
        ))}
      </div>
      {demos.map((demo) => (
        <div
          key={demo.name}
          class="demo-slide"
          id={`demo-${demo.name}`}
          role="tabpanel"
          aria-labelledby={`demo-tab-${demo.name}`}
        >
          <figure class="figure figure-wide">
            <div class="figure-frame">
              <Clip name={demo.name} alt={demo.alt} loop={false} />
            </div>
            <figcaption class="figure-caption demo-summary">
              {demo.summary}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}

type Region = { left: number; top: number; width: number; height: number };

type ZoomFigureProps = {
  /** The full shot, shown at its usual size. */
  base: string;
  /** A crop of `base`, laid over it at a larger size. */
  inset: string;
  alt: string;
  caption?: Child;
  /** What the inset magnifies, as percentages of the base. */
  marker: Region;
  /** Where the inset sits, as percentages of the base. */
  at: { right: number; top: number; width: number };
};

/**
 * A screenshot with part of itself enlarged over it.
 *
 * Some of what Arto draws is too small to survive being shown at page size —
 * the contents gutter is a twenty-pixel ruler, and it is chrome, so zooming
 * the document does not enlarge it. Laying a crop over the shot keeps the
 * thing in its place and still lets it be read.
 */
export function ZoomFigure({
  base,
  inset,
  alt,
  caption,
  marker,
  at,
}: ZoomFigureProps) {
  return (
    <figure class="figure zoom-figure">
      <div class="figure-frame zoom-base">
        <Shot name={base} alt={alt} />
        <span
          class="zoom-marker"
          style={{
            left: `${marker.left}%`,
            top: `${marker.top}%`,
            width: `${marker.width}%`,
            height: `${marker.height}%`,
          }}
        />
        <span
          class="zoom-inset"
          style={{
            right: `${at.right}%`,
            top: `${at.top}%`,
            width: `${at.width}%`,
          }}
        >
          <Shot name={inset} alt="" />
        </span>
      </div>
      {caption && <figcaption class="figure-caption">{caption}</figcaption>}
    </figure>
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
