import { createRoute } from "honox/factory";
import { basePath } from "../lib/path";
import { artoReferenceCurrent } from "../lib/arto-version";
import { IconBrandGithub, IconDownload } from "../components/Icons";
import { CodeBlock } from "../components/CodeBlock";
import {
  Figure,
  MotionFigure,
  ShotFigure,
  WindowStack,
} from "../components/Figure";

export default createRoute((c) => {
  return c.render(
    <article class="doc">
      <header class="doc-masthead">
        <span class="doc-eyebrow">Beta · macOS, Linux, Windows</span>
        <h1 class="doc-title">The Art of Reading Markdown</h1>
        <p class="doc-lead">
          Arto renders Markdown the way GitHub does — <strong>locally</strong>,{" "}
          <strong>offline</strong>, and in a window built for reading rather
          than for editing.
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

      <ShotFigure
        name="hero"
        alt="Arto showing a rendered Markdown document with a diagram, an alert and a table"
        caption="A document, the way GitHub would draw it, with nothing between you and it."
        wide
      />

      <section class="doc-section">
        <h2 class="doc-section-title">Built for reading</h2>
        <p class="doc-section-lead">
          Most Markdown tools are built for writing, and the preview pane is an
          afterthought squeezed beside the editor.
        </p>
        <p class="doc-p">
          Markdown is where documentation, communication and thinking now live.
          Arto takes the other half of that seriously: it reproduces GitHub's
          rendering offline, and gives the page the typography and whitespace
          that long reading asks for. There is no editor, no split view, and
          nothing to save.
        </p>
        <p class="doc-p">
          Everything the renderer needs — the stylesheet, the highlighter, the
          diagram and formula code — is compiled into the binary. It never
          reaches the network, so a document opens the same on a plane as it
          does at a desk.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Rendering</h2>
        <p class="doc-section-lead">
          GitHub's dialect, drawn by the same engine Arto shares with its
          standalone page renderer.
        </p>
        <p class="doc-p">
          Headings, tables, task lists, footnotes and the five GitHub alerts.
          KaTeX typesets formulas where they stand; code blocks arrive
          highlighted with a copy button in the corner; YAML frontmatter
          collapses into a table at the top. A file that changes on disk
          re-renders without being asked.
        </p>
        <ShotFigure
          name="rendering"
          alt="Math, highlighted code and GitHub alerts rendered in Arto"
          caption="Math, code and alerts in one document. The engine is ox-content, which renders GitHub's dialect, so Arto carries no version of its own."
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Getting around</h2>
        <p class="doc-section-lead">
          A window with nothing open is not empty: it says what there is to
          read.
        </p>
        <p class="doc-p">
          The welcome page gathers the folders you have kept, the documents you
          have starred, and what you have been reading, grouped by the day you
          read it. Opening a document you left halfway puts you back where you
          stopped.
        </p>
        <ShotFigure
          name="welcome"
          alt="Arto's welcome page listing starred folders, starred files and recent documents"
        />
        <h3 class="doc-h3">One panel, three faces</h3>
        <p class="doc-p">
          The panel holds a file explorer over as many folders as you like, the
          reading history, and your bookmarks — <kbd>⌘1</kbd>, <kbd>⌘2</kbd> and{" "}
          <kbd>⌘3</kbd> between them, <kbd>⌘B</kbd> to show it at all. It
          reveals on hover and can be pinned in place.
        </p>
        <MotionFigure
          src="motion-panel.gif"
          alt="Switching the panel between its file explorer, history and bookmark faces"
          caption="The same panel, showing the folder you are in, then what you have read, then what you have kept."
        />
        <h3 class="doc-h3">The contents, beside the page</h3>
        <p class="doc-p">
          A ruler in the page's own margin marks every heading. It stays out of
          the way until you reach for it, and <kbd>⌘J</kbd> opens it into a list
          you can walk with the arrow keys.
        </p>
        <MotionFigure
          src="motion-contents.gif"
          alt="Opening the contents gutter and jumping to a heading"
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Finding</h2>
        <p class="doc-section-lead">
          One list, fuzzy-matched, the way <code class="doc-code">fzf</code>{" "}
          finds a file.
        </p>
        <p class="doc-p">
          <kbd>⌘K</kbd> opens a palette over everything at once: the files under
          the folder you are working in, what you have read, what you have
          kept, and every command by name with the shortcut that runs it. One
          query narrows all of them together.
        </p>
        <ShotFigure
          name="palette"
          alt="Arto's command palette, with a query matching both commands and files"
          caption="Three letters, matched across commands and documents alike."
        />
        <MotionFigure
          src="motion-palette.gif"
          alt="Opening the palette and moving through it to open a document"
        />
        <h3 class="doc-h3">Find in page</h3>
        <p class="doc-p">
          <kbd>⌘F</kbd> searches in the header rather than in a floating bar,
          and the matches stay marked in the contents ruler so you can see where
          in the document they fall. A search worth keeping can be pinned, and
          its highlights survive across sessions in a colour of their own.
        </p>
        <ShotFigure
          name="find"
          alt="Find in page, with matches highlighted and marked in the contents ruler"
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Windows</h2>
        <p class="doc-section-lead">
          One document to a window, and as many windows as you like.
        </p>
        <p class="doc-p">
          A window shows exactly one document and names it in its title, so the
          document you want is the window you can see — not a truncated tab
          behind four others. <code class="doc-code">arto a.md b.md</code> opens
          two windows; a file dragged from an editor opens another.
        </p>
        <WindowStack
          names={["window-a", "window-b", "window-c"]}
          alt="Three Arto windows, each showing one document"
        />
        <p class="doc-p doc-muted" style={{ marginTop: "32px" }}>
          A reader who kept twenty tabs does not need twenty windows: the
          palette and the reading history both reach a document without it
          staying open.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Diagrams and formulas</h2>
        <p class="doc-section-lead">
          Drawn in the page as you reach them, and openable in a window of their
          own.
        </p>
        <p class="doc-p">
          Mermaid diagrams and KaTeX math render lazily — near the viewport,
          not all at once — so a long document opens as quickly as a short one.
          Press <kbd>Enter</kbd> on a diagram and it gets a viewer with zoom,
          pan, and copy-as-image; the same goes for a formula or an image.
        </p>
        <MotionFigure
          src="motion-diagram.gif"
          alt="Opening a Mermaid diagram into its own viewer window"
          caption="Scroll to zoom, drag to pan, double-click to fit."
        />
        <div class="figure-pair">
          <ShotFigure
            name="diagrams"
            alt="Mermaid diagrams rendered inline in a document"
          />
          <ShotFigure
            name="diagram-viewer"
            alt="A Mermaid diagram open in its own viewer window"
          />
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Fitting in</h2>
        <p class="doc-section-lead">
          GitHub's own themes, and a separate choice for light and dark.
        </p>
        <p class="doc-p">
          Arto paints itself with the themes GitHub ships — including dimmed,
          high contrast, and the colour-vision ones — and lets you pick one for
          light mode and another for dark, with the system deciding which
          applies. Preferences gives each question its own pane: what the
          renderer reads out of the Markdown, how the panel behaves, where a
          window opens, and which keybinding preset is in force.
        </p>
        <MotionFigure
          src="motion-theme.gif"
          alt="Switching Arto between its light and dark themes"
        />
        <ShotFigure
          name="preferences"
          alt="Arto's preferences window showing the appearance pane and GitHub's theme choices"
          caption="Default, high contrast, and the colour-vision themes, each previewed before it is chosen."
        />
        <h3 class="doc-h3">Keybindings</h3>
        <p class="doc-p">
          Default, Vim and Emacs presets ship in Preferences, and every binding
          is editable. Native menu shortcuts are separate from the in-window
          engine, which supports chord sequences — so <kbd>g</kbd> <kbd>g</kbd>{" "}
          works where a menu accelerator could not.
        </p>
        <h3 class="doc-h3">On macOS</h3>
        <p class="doc-p">
          Press <kbd>Space</kbd> on a Markdown file in Finder and Quick Look
          shows it rendered, not as source; the Finder preview pane does the
          same. Both read the same configuration the app does.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">From the terminal</h2>
        <p class="doc-section-lead">
          Arto is a desktop application; <code class="doc-code">arto</code> is
          how you hand files to it.
        </p>
        <p class="doc-p">
          It runs as a single instance, so a second invocation routes to the
          one already running rather than starting another.{" "}
          <code class="doc-code">--behind</code> hands a document over without
          pulling Arto in front of what you are working in.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`arto README.md            # open a file
arto docs/                # open a directory in the panel
arto --behind NOTES.md    # open without taking the focus
arto page README.md > README.html`}
          />
        </div>
        <p class="doc-p">
          That last line is not the app at all:{" "}
          <code class="doc-code">arto page</code> renders a Markdown file into
          one self-contained HTML file — stylesheet, diagrams and math inlined —
          that opens in any browser on any machine. It follows your
          configuration, so the page looks the way the app shows the file.
        </p>
        <p class="doc-p doc-muted">
          Full flags and behaviour are in the{" "}
          <a
            href="https://github.com/arto-app/Arto/blob/main/docs/cli.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            CLI documentation
          </a>
          .
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">In motion</h2>
        <p class="doc-section-lead">
          The welcome page, the palette, the panel, the contents, and both
          themes, in one pass.
        </p>
        <Figure>
          <video
            src={basePath("/videos/demo.mp4")}
            controls
            muted
            playsinline
            preload="metadata"
            width={1280}
            height={846}
            poster={basePath("/images/hero-light.png")}
          >
            Your browser does not support the video tag.
          </video>
        </Figure>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Built with</h2>
        <div class="term-list">
          <div>
            <p class="term-name">Dioxus</p>
            <p class="term-desc">
              The Rust UI framework the whole application is written in. Native
              windows, menus and state — no Electron.
            </p>
          </div>
          <div>
            <p class="term-name">ox-content</p>
            <p class="term-desc">
              The Markdown engine. It renders GitHub's dialect, including
              autolinks, alerts, heading slugs and the tag filter, so Arto does
              not carry its own version of any of them.
            </p>
          </div>
          <div>
            <p class="term-name">KaTeX and Mermaid</p>
            <p class="term-desc">
              Math and diagrams, drawn in the page as you reach them.
            </p>
          </div>
        </div>
      </section>

      <div class="doc-closing">
        <h2 class="doc-closing-title">Install Arto</h2>
        <p class="doc-closing-text">
          On macOS, Homebrew is the whole story. The second line is needed
          because Arto is not signed with an Apple Developer ID.
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
    </article>,
    { title: "Arto — the Art of Reading Markdown", current: "home" }
  );
});
