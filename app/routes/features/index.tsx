import type { Child } from "hono/jsx";
import { createRoute } from "honox/factory";
import { artoReferenceCurrent } from "../../lib/arto-version";
import { ShotFigure } from "../../components/Figure";

type TermProps = {
  name: string;
  children: Child;
};

function Term({ name, children }: TermProps) {
  return (
    <div>
      <p class="term-name">{name}</p>
      <p class="term-desc">{children}</p>
    </div>
  );
}

export default createRoute((c) => {
  return c.render(
    <article class="doc">
      <header class="doc-masthead">
        <span class="doc-eyebrow">Features</span>
        <h1 class="doc-title">Everything it does</h1>
        <p class="doc-lead">
          The whole surface of the application, grouped the way you meet it:
          what it renders, how you get around, how you find things, what a
          window is, and how it fits into the rest of your machine.
        </p>
        <p class="doc-actions-note">
          Current as of {artoReferenceCurrent.version}.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-section-title">Reading</h2>
        <p class="doc-section-lead">
          GitHub's dialect, rendered by ox-content — the same engine behind{" "}
          <code class="doc-code">arto page</code> and the Quick Look preview.
        </p>
        <div class="term-list">
          <Term name="GitHub-accurate rendering">
            Headings, lists, tables, task lists, footnotes, strikethrough,
            autolinks and heading slugs, drawn with GitHub's own stylesheet so a
            document looks the way it will on the web.
          </Term>
          <Term name="GitHub alerts">
            <code class="doc-code">NOTE</code>,{" "}
            <code class="doc-code">TIP</code>,{" "}
            <code class="doc-code">IMPORTANT</code>,{" "}
            <code class="doc-code">WARNING</code> and{" "}
            <code class="doc-code">CAUTION</code>, each with its own colour and
            glyph.
          </Term>
          <Term name="YAML frontmatter">
            Metadata at the top of a file becomes a table you can collapse,
            rather than a wall of text before the document starts.
          </Term>
          <Term name="Syntax highlighting">
            Code blocks arrive highlighted, with a copy button in the corner.
          </Term>
          <Term name="Auto-reload">
            A file that changes on disk re-renders in place, so a document being
            edited elsewhere stays current without a keystroke.
          </Term>
          <Term name="Offline by construction">
            The stylesheet, the highlighter and the diagram and formula code are
            compiled into the binary. The renderer never reaches the network.
          </Term>
          <Term name="What the renderer reads">
            Preferences decides which extensions are in force: math, wiki links,
            superscript and subscript, definition lists, heading attributes and
            permalinks, smart punctuation, CJK emphasis, bare URLs as links, and
            whether raw HTML is filtered, kept or dropped.
          </Term>
        </div>
        <ShotFigure
          name="rendering"
          alt="Math, highlighted code and GitHub alerts rendered in Arto"
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Getting around</h2>
        <p class="doc-section-lead">
          The welcome page, the panel, the contents gutter, and the links in the
          document itself.
        </p>
        <div class="term-list">
          <Term name="The welcome page">
            What a window shows with nothing open: the folders you have starred,
            the documents you have starred, and what you have read, grouped
            under today, yesterday and this week.
          </Term>
          <Term name="One panel, three faces">
            A file explorer, the reading history and your bookmarks, in one
            panel — <kbd>⌘1</kbd>, <kbd>⌘2</kbd>, <kbd>⌘3</kbd> between them and{" "}
            <kbd>⌘B</kbd> to show it. It reveals on hover and can be pinned open.
          </Term>
          <Term name="Several roots at once">
            The explorer holds more than one folder, so the project you are
            reading and the notes you are reading it against sit in the same
            tree.
          </Term>
          <Term name="The contents gutter">
            A ruler in the page's own margin marks every heading; <kbd>⌘J</kbd>{" "}
            opens it into a list you can walk with the arrow keys.
          </Term>
          <Term name="Links between documents">
            A relative link opens the document it names, and a fragment scrolls
            to the heading it points at. <kbd>⌘[</kbd> and <kbd>⌘]</kbd> move
            back and forward across the trail.
          </Term>
          <Term name="Where you left off">
            Reopening a document puts you back at the place you stopped reading,
            not at the top.
          </Term>
        </div>
        <div class="figure-pair">
          <ShotFigure
            name="welcome"
            alt="Arto's welcome page with starred folders, starred files and reading history"
          />
          <ShotFigure
            name="panel-recent"
            alt="The panel showing reading history grouped by day"
          />
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Finding</h2>
        <p class="doc-section-lead">
          One palette over everything, and a find that marks where the matches
          fall.
        </p>
        <div class="term-list">
          <Term name="The command palette">
            <kbd>⌘K</kbd> fuzzy-matches one query against the files under the
            folder you are in, what you have read, what you have kept, and every
            command by name — the way <code class="doc-code">fzf</code> finds a
            file, in a single list.
          </Term>
          <Term name="Commands carry their shortcuts">
            A command found by name shows the keystroke that runs it, so the
            palette teaches the keyboard rather than replacing it.
          </Term>
          <Term name="Find in page">
            <kbd>⌘F</kbd> searches from the header, with a match count and{" "}
            <kbd>⌘G</kbd> / <kbd>⇧⌘G</kbd> between hits. The matches are marked
            in the contents ruler, so you can see where in the document they
            are.
          </Term>
          <Term name="Pinned searches">
            A search worth keeping gets a colour of its own, and its highlights
            survive across sessions.
          </Term>
        </div>
        <div class="figure-pair">
          <ShotFigure
            name="palette"
            alt="The command palette matching both commands and documents"
          />
          <ShotFigure
            name="find"
            alt="Find in page with matches highlighted and marked in the contents ruler"
          />
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Windows</h2>
        <p class="doc-section-lead">
          One document to a window, and child windows for the things inside it.
        </p>
        <div class="term-list">
          <Term name="A window is a document">
            Each window shows one document and names it in its title. Opening
            another document opens another window;{" "}
            <code class="doc-code">arto a.md b.md</code> opens two.
          </Term>
          <Term name="Child windows">
            A diagram, a formula or an image opens into a viewer of its own,
            with zoom, pan, fit and copy-as-image.
          </Term>
          <Term name="Drag and drop">
            A file dragged onto Arto opens — including one dragged out of an
            editor such as VS Code.
          </Term>
          <Term name="Where a window appears">
            Preferences sets the size and position a new window takes, and
            whether it reuses the last focused window, one on the screen the
            cursor is on, or always a new one.
          </Term>
          <Term name="Opening without being interrupted">
            <code class="doc-code">--behind</code> hands a document to Arto
            without pulling it in front of whatever you are working in.
          </Term>
        </div>
        <ShotFigure
          name="diagram-viewer"
          alt="A Mermaid diagram open in its own viewer window"
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Rich content</h2>
        <p class="doc-section-lead">
          Diagrams, formulas, images and code — and getting any of them back out
          again.
        </p>
        <div class="term-list">
          <Term name="Mermaid diagrams">
            Flowcharts, sequence diagrams, state diagrams and the rest, drawn in
            the page as you reach them and openable in their own viewer.
          </Term>
          <Term name="KaTeX math">
            Inline and display formulas, typeset where they stand, with the
            dollar-sign edge cases against Markdown punctuation handled.
          </Term>
          <Term name="Drawn near the viewport">
            Diagrams, formulas and highlighting are rendered as they come into
            view rather than all at once, so a long document opens as quickly as
            a short one.
          </Term>
          <Term name="Copy As…">
            The context menu copies a selection as Markdown, a code block with
            or without its fence, a table as Markdown, CSV or TSV, and an image
            as Markdown or as the image itself — with or without a background.
          </Term>
          <Term name="Source-aware utilities">
            Copy a file path, a path with the line you are on, or a path with a
            range; save an image to disk; reveal the document in Finder; or make
            the folder above the current root.
          </Term>
        </div>
        <div class="figure-pair">
          <ShotFigure
            name="diagrams"
            alt="Mermaid diagrams rendered inline in a document"
          />
          <ShotFigure
            name="contents"
            alt="The contents gutter opened into a list of headings"
          />
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Fitting in</h2>
        <p class="doc-section-lead">
          Themes, keys, and the parts of the operating system that expect a
          Markdown reader.
        </p>
        <div class="term-list">
          <Term name="GitHub's own themes">
            Light and dark defaults, dimmed, high contrast, and the
            colour-vision themes — with a separate choice for light mode and
            dark mode, and the system deciding which applies. Each is previewed
            before it is chosen.
          </Term>
          <Term name="Preferences, one pane per question">
            A window of its own, split into appearance, Markdown, reading,
            panel, window, startup and keybindings.
          </Term>
          <Term name="Keybindings">
            Default, Vim and Emacs presets, every binding editable. Native menu
            shortcuts are separate from the in-window engine, which supports
            chord sequences such as <kbd>g</kbd> <kbd>g</kbd>. Lists and fields
            answer to bindings too, not only the document.
          </Term>
          <Term name="Zoom">
            <kbd>⌘+</kbd>, <kbd>⌘−</kbd> and <kbd>⌘0</kbd>, or the trackpad, with
            the level remembered.
          </Term>
          <Term name="Print and PDF">
            <kbd>⌘P</kbd> prints the rendered document, or saves it as a PDF,
            through a stylesheet made for paper.
          </Term>
          <Term name="Quick Look and the Finder preview pane (macOS)">
            Press <kbd>Space</kbd> on a Markdown file and it previews rendered
            rather than as source. Both read the same configuration the app
            does.
          </Term>
        </div>
        <ShotFigure
          name="preferences"
          alt="Arto's preferences window showing the appearance pane and GitHub's themes"
        />
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Beyond the window</h2>
        <p class="doc-section-lead">
          A command that hands files over, and a renderer that needs no app at
          all.
        </p>
        <div class="term-list">
          <Term name="Single instance">
            <code class="doc-code">arto</code> routes to the process already
            running rather than starting a second one, over a socket private to
            your user.
          </Term>
          <Term name="Standalone pages">
            <code class="doc-code">arto page README.md &gt; README.html</code>{" "}
            writes one self-contained HTML file — stylesheet, diagrams and math
            inlined — that opens in any browser. It follows your configuration,
            and ships with a Content-Security-Policy that blocks scripts
            embedded in the Markdown.
          </Term>
          <Term name="A renderer without the app">
            The same command exists as a separate{" "}
            <code class="doc-code">arto-page</code> binary, for machines that
            need the output but not the window.
          </Term>
        </div>
      </section>
    </article>,
    { title: "Features — Arto", current: "features" }
  );
});
