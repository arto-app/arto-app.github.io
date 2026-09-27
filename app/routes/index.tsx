import type { Child } from "hono/jsx";
import { createRoute } from "honox/factory";
import { basePath } from "../lib/path";
import { artoReferenceCurrent } from "../lib/arto-version";
import { IconBrandGithub, IconDownload } from "../components/Icons";
import { CodeBlock } from "../components/CodeBlock";
import {
  DemoCarousel,
  MotionFigure,
  Shot,
  ShotFigure,
  WindowStack,
} from "../components/Figure";

type RowProps = {
  eyebrow: string;
  title: string;
  children: Child;
  media: Child;
  /** Put the figure below the text, at the full width of the page. */
  wide?: boolean;
  /** Put the figure on the left instead of the right. */
  flip?: boolean;
};

function Row({ eyebrow, title, children, media, wide, flip }: RowProps) {
  const cls = ["lp-row"];
  if (wide) cls.push("lp-row-wide");
  else if (flip) cls.push("lp-row-flip");
  return (
    <section class={cls.join(" ")}>
      <div class="lp-row-text">
        <p class="lp-row-eyebrow">{eyebrow}</p>
        <h2 class="lp-row-title">{title}</h2>
        {children}
      </div>
      <div class="lp-row-media">{media}</div>
    </section>
  );
}

type CardProps = {
  title: string;
  children: Child;
  href?: string;
  linkLabel?: string;
};

function Card({ title, children, href, linkLabel }: CardProps) {
  return (
    <div class="lp-card">
      <p class="lp-card-title">{title}</p>
      <p class="lp-card-text">{children}</p>
      {href && (
        <a
          class="lp-card-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel ?? title} ↗
        </a>
      )}
    </div>
  );
}

export default createRoute((c) => {
  return c.render(
    <>
      <div class="lp-inner">
        <header class="lp-hero">
          <div class="lp-hero-icon">
            <Shot name="header" alt="Arto" />
          </div>
          <span class="doc-eyebrow">Beta · macOS, Linux, Windows</span>
          <h1 class="doc-title">Markdown, the way GitHub draws it</h1>
          <p class="doc-lead">
            A desktop reader that renders your Markdown locally and offline —
            diagrams, formulas, alerts and all — with none of the editor around
            it.
          </p>
          <div class="doc-actions">
            <a href={basePath("/install")} class="btn-primary">
              <IconDownload size={18} stroke={2} />
              Install Arto
            </a>
            <a
              href="https://github.com/arto-app/Arto"
              class="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={18} stroke={2} />
              View on GitHub
            </a>
          </div>
          <p class="doc-actions-note">
            Free and open source. This site describes{" "}
            {artoReferenceCurrent.version}.
          </p>
        </header>

        {/* The walkthroughs are the hero, split by what they show rather
            than run as one long take: a reader can go straight to the part
            they came for. */}
        <div class="lp-hero-figure">
          <DemoCarousel
            demos={[
              {
                name: "demo-reading",
                title: "Getting around",
                alt: "Arto's welcome page, then the palette opening a document, the panel's faces, and the contents list jumping to a heading",
                summary:
                  "One palette for files, history and commands; one panel for folders, history, stars and links; a contents list beside the page.",
              },
              {
                name: "demo-closely",
                title: "Reading it again",
                alt: "A revised document with its changes marked in the margin, a link previewed on hover, a passage highlighted, and focus mode dimming all but one block",
                summary:
                  "What changed since you last read it, previews without leaving your place, highlights with notes, and focus mode.",
              },
              {
                name: "demo-lenses",
                title: "Lenses",
                alt: "A document translated into Japanese block by block from the top, then summarised from the header",
                summary:
                  "A translation that takes the page's places as it is written, and a summary opened from the header — sent nowhere until you ask.",
              },
            ]}
          />
        </div>
      </div>

      <div class="lp-inner">
        <Row
          eyebrow="Windows"
          title="One document, one window"
          media={
            <WindowStack
              names={["window-a", "window-b", "window-c"]}
              alt="Three Arto windows, each showing one document"
            />
          }
        >
          <p>
            A window used to hold a list of documents and an index into it —
            and closing one lost nothing, because the reading history already
            remembers everything you have opened. The tab strip was a second,
            worse copy of something the app already knew, and it stopped being
            useful somewhere past a dozen.
          </p>
          <p>
            So a window reads one document and names it in its title.
            Everything the strip had grown around itself — dragging a tab out,
            the preview that followed the cursor, pinning, “close others” —
            went with it.
          </p>
        </Row>

        <Row
          eyebrow="Finding"
          title="Everything in one list"
          wide
          media={
            <ShotFigure
              name="palette"
              alt="Arto's command palette, one query matching commands and documents at once"
              caption="Three letters, scattered through a command's name and a file's path alike."
              wide
            />
          }
        >
          <p>
            One shortcut, one query, fuzzy-matched the way <code>fzf</code>{" "}
            matches: the files under the folder you are working in, what you
            have read, what you have kept, and every command by name — with the
            keystroke that runs it.
          </p>
        </Row>

        <Row
          eyebrow="Getting around"
          title="One panel, many faces"
          flip
          media={
            <MotionFigure
              name="motion-panel"
              alt="Switching the panel between its file explorer, history, starred and links faces"
            />
          }
        >
          <p>
            A file explorer across as many folders as you need, the documents
            you have been reading grouped by day, the ones you keep coming back
            to, and the ones that link to what is on screen. It stays hidden
            until you reach for it, and pins open when you want it there.
          </p>
        </Row>

        <Row
          eyebrow="Marks"
          title="Searches you keep"
          wide
          media={
            <ShotFigure
              name="pinned"
              alt="Three pinned searches highlighted in a document, each colour repeated as a mark in the contents ruler"
              wide
            />
          }
        >
          <p>
            Find sits in the row the document's name is in, so nothing moves
            and nothing is covered. What you type is highlighted while the
            field is open and gone when it closes — unless you press{" "}
            <kbd>Return</kbd>, which keeps it. The search becomes one of the
            document's own marks, in a colour of its own, and survives the
            session.
          </p>
          <p>
            The ruler beside the page says three things with three devices: a
            mark's width is the heading's depth, its colour is a pinned search,
            and its thickness is where you are.
          </p>
        </Row>

        <Row
          eyebrow="Rich content"
          title="Diagrams that open up"
          media={
            <MotionFigure
              name="motion-diagram"
              alt="Opening a Mermaid diagram into its own viewer window"
            />
          }
        >
          <p>
            Mermaid and KaTeX render in the page as you reach them, so a long
            document opens as fast as a short one. Press <kbd>Enter</kbd> on a
            diagram and it lifts into a viewer with zoom, pan and
            copy-as-image.
          </p>
          <p>
            A formula and an image get the same window, each naming its own
            source at the top — the Mermaid, the LaTeX, the alt text.
          </p>
        </Row>
      </div>

      <div class="lp-band">
        <div class="lp-inner">
          <div class="lp-band-head">
            <h2 class="lp-band-title">For reading it again</h2>
            <p class="lp-band-lead">
              Most of what gets read in Arto is read more than once — a plan, a
              spec, notes someone else keeps rewriting.
            </p>
          </div>
          <div class="lp-grid">
            <Card title="What changed">
              Reopen a document and the blocks rewritten since you last read it
              are marked in the margin, with a key to step between them.
            </Card>
            <Card title="Highlights and notes">
              Mark a passage, write beside it, and find both again — even after
              the file has been edited above them.
            </Card>
            <Card title="Previews on hover">
              Rest on a footnote or a link and what it points at appears beside
              it, without leaving your place.
            </Card>
            <Card title="Focus mode">
              The chrome folds away and every block but the one you are in
              dims.
            </Card>
            <Card title="Time left">
              How long a document takes, and how much of it remains from where
              you are — prose, code and Japanese each counted at their own pace.
            </Card>
            <Card title="Lenses">
              A translation, a summary or notes from Claude, Codex or a local
              model, shown with the text — sent nowhere until you open one.{" "}
              <a href={basePath("/lenses")}>More on lenses</a>
            </Card>
          </div>
        </div>
      </div>

      <div class="lp-band">
        <div class="lp-inner">
          <div class="lp-band-head">
            <h2 class="lp-band-title">It looks like your machine</h2>
            <p class="lp-band-lead">
              GitHub's own themes — dimmed, high contrast and the colour-vision
              ones included — with a separate choice for light and dark, and the
              system deciding which applies.
            </p>
          </div>
          <div class="figure-pair">
            <MotionFigure
              name="motion-theme"
              alt="Switching Arto between its light and dark themes"
            />
            <ShotFigure
              name="preferences"
              alt="Arto's preferences window showing the appearance pane and GitHub's themes"
            />
          </div>
        </div>
      </div>

      <div class="lp-band">
        <div class="lp-inner">
          <div class="lp-band-head">
            <h2 class="lp-band-title">And the rest of it</h2>
            <p class="lp-band-lead">
              The parts that do not need a screenshot to explain.
            </p>
          </div>
          <div class="lp-grid">
            <Card title="Offline, always">
              The stylesheet, the highlighter and the diagram code are compiled
              into the binary. The renderer never reaches the network.
            </Card>
            <Card title="Auto-reload">
              A file that changes on disk re-renders in place, so a document
              being edited elsewhere stays current.
            </Card>
            <Card title="Where you left off">
              Reopening a document puts you back at the place you stopped, not
              at the top.
            </Card>
            <Card title="Your keys">
              Default, Vim and Emacs presets, every binding editable, chord
              sequences supported.
            </Card>
            <Card title="Standalone pages">
              <code>arto page README.md</code> writes one self-contained HTML
              file that opens in any browser, without the app.
            </Card>
            <Card title="Quick Look">
              On macOS, <kbd>Space</kbd> on a Markdown file previews it rendered
              — in Finder's preview pane too.
            </Card>
          </div>
        </div>
      </div>

      <div class="lp-band lp-band-plain">
        <div class="lp-inner">
          <div class="lp-band-head">
            <h2 class="lp-band-title">Standing on</h2>
            <p class="lp-band-lead">
              Arto is a Rust application. What it does not write itself, it
              takes from these.
            </p>
          </div>
          <div class="lp-grid lp-grid-2">
            <Card
              title="Dioxus"
              href="https://dioxuslabs.com/"
              linkLabel="dioxuslabs.com"
            >
              The Rust UI framework the whole application is written in. Native
              windows, menus and state — no Electron.
            </Card>
            <Card
              title="ox-content"
              href="https://github.com/ubugeeei-prod/ox-content"
              linkLabel="github.com/ubugeeei-prod/ox-content"
            >
              The Markdown engine. It renders GitHub's dialect — autolinks,
              alerts, heading slugs, the tag filter — so Arto carries no
              version of any of them.
            </Card>
            <Card
              title="KaTeX"
              href="https://katex.org/"
              linkLabel="katex.org"
            >
              Typesets the maths, in the page, as you reach it.
            </Card>
            <Card
              title="Mermaid"
              href="https://mermaid.js.org/"
              linkLabel="mermaid.js.org"
            >
              Draws the diagrams, and the ones in their own viewer window.
            </Card>
          </div>
        </div>
      </div>

      <div class="lp-inner">
        <div class="lp-closing">
          <h2 class="lp-closing-title">Start reading properly</h2>
          <p class="lp-closing-text">
            Two lines on macOS: the install, then the quarantine attribute
            removed, since Arto is not signed with an Apple Developer ID.
          </p>
          <CodeBlock
            label="Terminal"
            code={`brew install --cask arto-app/tap/arto
xattr -dr com.apple.quarantine /Applications/Arto.app`}
          />
          <div class="doc-actions">
            <a href={basePath("/install")} class="btn-primary">
              Linux, Windows and Nix
            </a>
            <a href={basePath("/features")} class="btn-secondary">
              Everything it does
            </a>
          </div>
        </div>
      </div>
    </>,
    { title: "Arto — the Art of Reading Markdown", current: "home" }
  );
});
