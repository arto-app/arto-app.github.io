import type { Child } from "hono/jsx";
import { createRoute } from "honox/factory";
import { artoReferenceCurrent } from "../../lib/arto-version";
import { basePath } from "../../lib/path";
import {
  MotionFigure,
  ShotFigure,
  WindowStack,
  ZoomFigure,
} from "../../components/Figure";

type TermProps = {
  name: string;
  children: Child;
  /** Shown directly under this item, so it is never orphaned from its claim. */
  figure?: Child;
};

function Term({ name, children, figure }: TermProps) {
  return (
    <div class="term">
      <div class="term-head">
        <p class="term-name">{name}</p>
        {children}
      </div>
      {figure}
    </div>
  );
}

function Ext({ href, children }: { href: string; children: Child }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
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
          what it renders, how it helps you read, how you get around, how you
          find things, what a window is, what a lens adds, and how it fits into
          the rest of your machine.
        </p>
        <p class="doc-actions-note">
          Current as of {artoReferenceCurrent.version}.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-section-title">Reading</h2>
        <p class="doc-section-lead">
          GitHub's dialect, rendered by{" "}
          <Ext href="https://github.com/ubugeeei-prod/ox-content">ox-content</Ext>{" "}
          — the same engine behind <code class="doc-code">arto page</code> and
          the Quick Look preview.
        </p>
        <div class="term-list">
          <Term
            name="GitHub-accurate rendering"
            figure={
              <ShotFigure
                name="gfm"
                alt="Emphasis, strikethrough, inline code, links, nested and task lists, and a blockquote rendered in Arto"
                caption="Emphasis and strikethrough, inline code, a relative link and a bare URL, nested and task lists, a blockquote."
                wide
              />
            }
          >
            <p class="term-desc">
              Headings, lists, tables, task lists, footnotes, strikethrough,
              autolinks and heading slugs, drawn with GitHub's own stylesheet so
              a document looks the way it will on the web.
            </p>
          </Term>

          <Term
            name="GitHub alerts"
            figure={
              <ShotFigure
                name="alerts"
                alt="The five GitHub alert kinds rendered in Arto, and a table below them"
                caption="Each kind keeps its own colour and glyph."
                wide
              />
            }
          >
            <p class="term-desc">
              <code class="doc-code">NOTE</code>,{" "}
              <code class="doc-code">TIP</code>,{" "}
              <code class="doc-code">IMPORTANT</code>,{" "}
              <code class="doc-code">WARNING</code> and{" "}
              <code class="doc-code">CAUTION</code>.
            </p>
          </Term>

          <Term
            name="Syntax highlighting"
            figure={
              <ShotFigure
                name="code"
                alt="Rust, Python and shell code blocks, each highlighted"
                caption="Highlighting comes from the engine; a copy button appears in the corner on hover."
                wide
              />
            }
          >
            <p class="term-desc">
              Code blocks arrive highlighted per language, and each carries a
              copy button in its corner.
            </p>
          </Term>

          <Term
            name="YAML frontmatter"
            figure={
              <ShotFigure
                name="frontmatter"
                alt="A document's YAML frontmatter opened into a two-column table above the title"
                caption="Collapsed to a single FRONTMATTER bar until you open it."
                wide
              />
            }
          >
            <p class="term-desc">
              Metadata at the top of a file becomes a table rather than a wall
              of text before the document starts, and it arrives collapsed so
              the document still begins with its title.
            </p>
          </Term>

          <Term
            name="Long tables keep their header"
            figure={
              <ShotFigure
                name="sticky-table"
                alt="A long table of keybindings scrolled part-way, its header row pinned to the top of the view"
                caption="Scrolled a screen into the table, and the columns are still named."
                wide
              />
            }
          >
            <p class="term-desc">
              A table taller than the window pins its header row to the top
              while you read down it, and lets it go with the table's last row —
              so the columns stay named past the first screen.
            </p>
          </Term>

          <Term name="Auto-reload">
            <p class="term-desc">
              A file that changes on disk re-renders in place, so a document
              being edited elsewhere stays current without a keystroke.
            </p>
          </Term>

          <Term name="Offline by construction">
            <p class="term-desc">
              The stylesheet, the highlighter and the diagram and formula code
              are compiled into the binary. The renderer never reaches the
              network.
            </p>
          </Term>

          <Term
            name="What the renderer reads"
            figure={
              <ShotFigure
                name="preferences-markdown"
                alt="The Markdown pane in preferences, with a toggle and an explanation for each extension"
                caption="Each toggle says what turning it off buys, not just what it does."
              />
            }
          >
            <p class="term-desc">
              Markdown is a family of dialects, so the extensions are switches
              rather than assumptions: bare URLs as links, math, wiki links,
              superscript and subscript, definition lists, heading attributes
              and permalinks, smart punctuation, CJK emphasis, and whether raw
              HTML is filtered, passed through, or escaped so the markup itself
              shows. Filtered — the default — also takes out event handlers and{" "}
              <code class="doc-code">javascript:</code> links, not only the tags
              GitHub strips.
            </p>
            <p class="term-desc">
              The reason to turn one off is usually a document that means
              something else by the same characters — math off leaves the
              dollars alone, so two shell variables on one line do not pair up
              into a formula; subscript off keeps a lone tilde literal, which is
              what <code class="doc-code">~5 minutes</code> means by it.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Reading closely</h2>
        <p class="doc-section-lead">
          For the documents you read more than once — the plan an agent keeps
          rewriting, the spec you are working through.
        </p>
        <div class="term-list">
          <Term
            name="What changed since you last read it"
            figure={
              <div class="figure-pair">
                <ShotFigure
                  name="changes"
                  alt="A revised document with a line in the margin beside each block rewritten since it was last read"
                  caption="A line beside each block added or rewritten since the last read."
                />
                <ShotFigure
                  name="changes-contents"
                  alt="The contents list with a dot on each heading that changes fall under, and a count of the changes"
                  caption="The contents list dots the headings they fall under."
                />
              </div>
            }
          >
            <p class="term-desc">
              Arto keeps the version of a document you last read, and on the
              next open marks what moved since: a line in the margin beside each
              block added or rewritten, a hairline where text was taken out, and
              a dot on the headings in the contents list those changes fall
              under. Hovering a mark says how long ago that version was read.
            </p>
            <p class="term-desc">
              <kbd>⌃]</kbd> and <kbd>⌃[</kbd> step from change to change, and{" "}
              <strong>Mark as Read</strong> clears them and takes the page as it
              is now. Whitespace-only edits are left unmarked unless you ask for
              them.
            </p>
          </Term>

          <Term
            name="Highlights and notes"
            figure={
              <ShotFigure
                name="highlights"
                alt="Two highlights in a document, one green with a note shown on hover, one blue"
                caption="The dot at the end of a highlight holds its note."
                wide
              />
            }
          >
            <p class="term-desc">
              Select a passage and highlight it from the context menu, in a
              colour of your choosing, or with <kbd>⇧⌘H</kbd> in the colour you
              used last. <kbd>⇧⌘M</kbd> highlights it and opens a note beside
              it at once. A highlight with a note ends in a small dot that shows
              the note on hover, and every highlight is listed in the contents
              under its quote.
            </p>
            <p class="term-desc">
              A highlight is found again by its words rather than by where it
              was, so it survives edits above it in the file; if its text is
              gone, Arto says so instead of marking the wrong place.
            </p>
          </Term>

          <Term
            name="Previews on hover"
            figure={
              <ShotFigure
                name="link-preview"
                alt="A card previewing the linked document, its heading, opening paragraph and diagram, beside the link in a reading list"
                caption="Resting on a link to another document shows its opening, diagram and all."
                wide
              />
            }
          >
            <p class="term-desc">
              Rest the pointer on a footnote reference and the note appears
              beside it; on a link to a heading, that section; on a link to
              another document, its opening or the section it names — formulas
              and diagrams drawn. A click still follows the link.{" "}
              <kbd>⇧⌘Space</kbd> shows the same card for the link under the
              keyboard cursor.
            </p>
          </Term>

          <Term
            name="Focus mode"
            figure={
              <MotionFigure
                name="motion-focus"
                alt="Entering focus mode: the header folds away, every block but the middle one dims, and the arrow keys step through the page"
                caption="⇧⌘F, then ↓ a block at a time."
              />
            }
          >
            <p class="term-desc">
              <kbd>⇧⌘F</kbd> folds the header away, puts the panel and the
              gutter aside, and dims every block but the one in the middle of
              the window. The wheel scrolls freely; the keys that scroll a line
              — <kbd>↓</kbd> and <kbd>↑</kbd>, or <kbd>j</kbd> and{" "}
              <kbd>k</kbd> in Vim's preset — step a block at a time instead. A click on the page, or{" "}
              <kbd>Esc</kbd>, brings everything back as it was.
            </p>
          </Term>

          <Term
            name="Reading time"
            figure={
              <ZoomFigure
                base="reading-time"
                inset="reading-time-header"
                alt="A document part-way through, with the time left shown at the right of the header"
                marker={{ left: 76.5, top: 3.8, width: 23, height: 6.2 }}
                at={{ right: 4, top: 12, width: 36 }}
                caption="Past the top, the header counts down what is left from where you are."
              />
            }
          >
            <p class="term-desc">
              The header says how long a document takes to read, and once you
              start scrolling, how long is left from where you are. It counts
              what each block asks of you — words, CJK characters, lines of
              code, figures — rather than the length of the file, and stays out
              of the way on anything shorter than a few minutes.
            </p>
          </Term>

          <Term
            name="Type set to your taste"
            figure={
              <ShotFigure
                name="preferences-reading"
                alt="The Reading pane in preferences: line length presets, line height, typeface choices and text size"
                caption="The measure, the leading, the face and the size — each shown on a sample in four scripts further down the pane."
              />
            }
          >
            <p class="term-desc">
              The Reading pane sets the measure, the line height, the typeface —
              sans, serif, monospace or a family of your own — and the text
              size. The measure is in em rather than characters, so it holds the
              same line whether the document is in English or Japanese.
            </p>
            <p class="term-desc">
              One Han character takes a different glyph in a Japanese, Chinese
              or Korean face, so the CJK font language says whose faces to draw
              them in — for Japanese documents on an English system, say. Left
              on Auto, the system decides, as it does on GitHub.{" "}
              <code class="doc-code">arto page</code> and Quick Look set the text
              the same way.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Getting around</h2>
        <p class="doc-section-lead">
          The welcome page, the panel, the gutter beside the text, and the links
          in the document itself.
        </p>
        <div class="term-list">
          <Term
            name="The welcome page"
            figure={
              <ShotFigure
                name="welcome"
                alt="Arto's welcome page with starred folders, starred files and reading history"
                caption="A window with nothing open says what there is to read."
                wide
              />
            }
          >
            <p class="term-desc">
              What a window shows with nothing open: the folders you have
              starred, the documents you have starred, and what you have read,
              grouped under today, yesterday and this week. Its field narrows
              all three at once.
            </p>
          </Term>

          <Term
            name="One panel, many faces"
            figure={
              <MotionFigure
                name="motion-panel"
                alt="Switching the panel between its file explorer, history, starred and links faces"
                caption="⌘1 to ⌘4 between the faces; ⌘B to show the panel at all."
              />
            }
          >
            <p class="term-desc">
              A file explorer, the reading history, your bookmarks and the
              documents linking to this one are faces of one panel rather than
              separate panels, a rail beside it switching between them. It
              reveals on hover and can be pinned open.
            </p>
          </Term>

          <Term
            name="Several roots at once"
            figure={
              <ShotFigure
                name="panel-places"
                alt="The panel's places face, showing the current root and several bookmarked folders"
                wide
              />
            }
          >
            <p class="term-desc">
              The explorer holds more than one folder, so the project you are
              reading and the notes you are reading it against sit in the same
              tree. Folders you keep returning to are bookmarked below the one
              you are in.
            </p>
          </Term>

          <Term
            name="The reading history"
            figure={
              <ShotFigure
                name="panel-recent"
                alt="The panel showing reading history grouped by day"
                wide
              />
            }
          >
            <p class="term-desc">
              Everything you have opened, newest first, under the day you opened
              it — which is why closing a window loses nothing.
            </p>
          </Term>

          <Term
            name="What links here"
            figure={
              <ShotFigure
                name="panel-links"
                alt="The panel's Links face, listing the documents that link to the one on screen with the line each link is on"
                wide
              />
            }
          >
            <p class="term-desc">
              <kbd>⌘4</kbd> turns the panel to Links: every document under the
              folder you are in that links to the one on screen, each with the
              lines that do. Relative paths, wiki links and percent-encoded
              names are resolved the way a click resolves them, so the list is
              exactly the links that would bring you here.
            </p>
          </Term>

          <Term
            name="The gutter"
            figure={
              <ZoomFigure
                base="pinned"
                inset="gutter"
                alt="A document with the contents gutter standing in its right-hand margin"
                marker={{ left: 94.1, top: 49.5, width: 6.3, height: 10.4 }}
                at={{ right: 12, top: 41.5, width: 16 }}
                caption="The ruler enlarged out of the shot it stands in. The thick green mark is where the reader is, on a heading a pinned search also matched; the grey ones are headings at two depths."
              />
            }
          >
            <p class="term-desc">
              A ruler stands in the page's own margin and marks every heading.
              It is set against the text rather than against the window, so it
              reads as a note beside the document rather than as chrome around
              it — you can see it at the right-hand edge of almost every
              screenshot on this page.
            </p>
            <p class="term-desc">
              Each mark says three things with three devices, one each: its{" "}
              <strong>width</strong> is the heading's depth, its{" "}
              <strong>colour</strong> is a pinned search, and its{" "}
              <strong>thickness</strong> is where you are. The gutter is given
              up only when the window is too narrow to afford it.
            </p>
          </Term>

          <Term
            name="The contents list"
            figure={
              <>
                <ShotFigure
                  name="contents"
                  alt="The gutter opened into a list of the document's headings"
                  wide
                />
                <MotionFigure
                  name="motion-contents"
                  alt="Opening the contents list and jumping to a heading"
                  caption="⌘J opens the ruler into the list it is a picture of."
                />
              </>
            }
          >
            <p class="term-desc">
              <kbd>⌘J</kbd> opens the same gutter into a list of headings you
              can walk with the arrow keys and confirm with <kbd>Return</kbd>.
              The list is the ruler named rather than a second map of the
              document — and where a window is too narrow for the ruler, the
              list is still there.
            </p>
          </Term>

          <Term name="Links between documents">
            <p class="term-desc">
              A relative link opens the document it names, and a fragment
              scrolls to the heading it points at. <kbd>⌘[</kbd> and{" "}
              <kbd>⌘]</kbd> move back and forward across the trail, and so do
              the side buttons of a mouse that has them.
            </p>
          </Term>

          <Term name="Where you left off">
            <p class="term-desc">
              Reopening a document puts you back at the place you stopped
              reading, not at the top.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Finding</h2>
        <p class="doc-section-lead">
          One palette over everything, and a find that marks where the matches
          fall.
        </p>
        <div class="term-list">
          <Term
            name="The command palette"
            figure={
              <>
                <ShotFigure
                  name="palette"
                  alt="Arto's command palette, one query matching commands and documents at once"
                  caption="Three letters, scattered through a command's name and a file's path alike."
                  wide
                />
                <MotionFigure
                  name="motion-palette"
                  alt="Opening the palette and moving through it to open a document"
                />
              </>
            }
          >
            <p class="term-desc">
              <kbd>⌘K</kbd> fuzzy-matches one query against the files under the
              folder you are in, what you have read, what you have kept, and
              every command by name — the way <code class="doc-code">fzf</code>{" "}
              finds a file, in a single list. A command found by name shows the
              keystroke that runs it, so the palette teaches the keyboard rather
              than replacing it.
            </p>
            <p class="term-desc">
              The document already on screen is left out — it is the one place
              you cannot go — so with nothing typed, the first row is the one you
              read before it, and <kbd>⌘K</kbd> <kbd>Return</kbd> takes you
              back.
            </p>
          </Term>

          <Term
            name="Find in page"
            figure={
              <ShotFigure
                name="find"
                alt="Find in the header, with the document's name stepped aside and a match count in the field"
                caption="Typed: a temporary mark, gone when the field closes."
                wide
              />
            }
          >
            <p class="term-desc">
              <kbd>⌘F</kbd> puts the field in the row the document's name is in,
              so nothing moves and nothing is covered — the name steps aside
              while a search is on and comes back when it ends. The count and
              what <kbd>Return</kbd> would do are inside the field, because both
              are about what was typed.
            </p>
          </Term>

          <Term
            name="Pinned searches"
            figure={
              <ShotFigure
                name="pinned"
                alt="Three pinned searches highlighted in a document, each colour repeated as a mark in the gutter"
                caption="Kept with Return: marks of the document's own, and their colours in the gutter."
                wide
              />
            }
          >
            <p class="term-desc">
              <kbd>Return</kbd> keeps what you typed. It stops being the
              temporary highlight of a search in progress and becomes one of the
              document's own marks — a colour of its own among green, blue,
              pink, orange and purple, repeated in the gutter where that colour
              already belongs, and kept across sessions and across windows.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Windows</h2>
        <p class="doc-section-lead">
          One document to a window, and child windows for the things inside it.
        </p>
        <div class="term-list">
          <Term
            name="A window is a document"
            figure={
              <WindowStack
                names={["window-a", "window-b", "window-c"]}
                alt="Three Arto windows, each showing one document"
              />
            }
          >
            <p class="term-desc">
              Each window shows one document and names it in its title. Opening
              another opens another window;{" "}
              <code class="doc-code">arto a.md b.md</code> opens two. The tab
              strip that used to hold them was a second copy of the reading
              history, which already remembers everything opened — so closing a
              window, like closing a tab before it, loses nothing.
            </p>
          </Term>

          <Term
            name="Child windows"
            figure={
              <>
                <ShotFigure
                  name="diagram-viewer"
                  alt="A Mermaid diagram open in its own viewer window"
                  caption="A child window: zoom, pan, fit, and copy the diagram as an image."
                />
                <div class="figure-pair">
                  <ShotFigure
                    name="math-viewer"
                    alt="A matrix open in the math viewer, with its LaTeX source in the header"
                    caption="The same window for a formula — its LaTeX named at the top."
                  />
                  <ShotFigure
                    name="image-viewer"
                    alt="An image open in the image viewer, with its alt text in the header"
                    caption="And for an image, which takes its alt text as the title."
                  />
                </div>
              </>
            }
          >
            <p class="term-desc">
              A diagram, a formula or an image opens into a viewer of its own —
              three windows built the same way, each with zoom, pan, fit and
              copy-as-image, and each naming its source in the header.
            </p>
          </Term>

          <Term name="Drag and drop">
            <p class="term-desc">
              A file dragged onto Arto opens — including one dragged out of an
              editor such as VS Code.
            </p>
          </Term>

          <Term name="Where a window appears">
            <p class="term-desc">
              Preferences sets the size and position a new window takes, and
              whether it reuses the last focused window, one on the screen the
              cursor is on, or always a new one.{" "}
              <code class="doc-code">--behind</code> hands a document over
              without pulling Arto in front of what you are working in.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Rich content</h2>
        <p class="doc-section-lead">
          Diagrams, formulas, images and code — and getting any of them back out
          again.
        </p>
        <div class="term-list">
          <Term
            name="Mermaid diagrams"
            figure={
              <>
                <ShotFigure
                  name="diagrams"
                  alt="Mermaid diagrams rendered inline in a document"
                  wide
                />
                <MotionFigure
                  name="motion-diagram"
                  alt="Opening a Mermaid diagram into its own viewer window"
                  caption="Enter on a diagram lifts it into a window of its own."
                />
              </>
            }
          >
            <p class="term-desc">
              Flowcharts, sequence diagrams, state diagrams and the rest, drawn
              by <Ext href="https://mermaid.js.org/">Mermaid</Ext> in the page as
              you reach them.
            </p>
          </Term>

          <Term
            name="KaTeX math"
            figure={
              <ShotFigure
                name="rendering"
                alt="Inline and display formulas typeset in a document, including a matrix"
                caption="Inline in the line, displayed with the room it needs."
                wide
              />
            }
          >
            <p class="term-desc">
              Inline and display formulas typeset by{" "}
              <Ext href="https://katex.org/">KaTeX</Ext> where they stand, with
              the dollar-sign edge cases against Markdown punctuation handled.
            </p>
          </Term>

          <Term name="Drawn near the viewport">
            <p class="term-desc">
              Diagrams, formulas and highlighting are rendered as they come into
              view rather than all at once, so a long document opens as quickly
              as a short one.
            </p>
          </Term>

          <Term name="Copy As…">
            <p class="term-desc">
              The context menu copies a selection as Markdown, a code block with
              or without its fence, a table as Markdown, CSV or TSV, and an
              image as Markdown or as the image itself — with or without a
              background.
            </p>
          </Term>

          <Term name="Source-aware utilities">
            <p class="term-desc">
              Copy a file path, a path with the line you are on, or a path with
              a range; save an image to disk; reveal the document in Finder; or
              make the folder above the current root.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Lenses</h2>
        <p class="doc-section-lead">
          An agent you choose, asked about the document you are reading — its
          answer shown with the text, the file itself never changed.
        </p>
        <div class="term-list">
          <Term
            name="On the page, in a popover, beside each block"
            figure={
              <ShotFigure
                name="lens-page"
                alt="An English essay shown translated into Japanese by a page lens"
                caption="A page lens: the translation stands where the original stood."
                wide
              />
            }
          >
            <p class="term-desc">
              A <strong>page</strong> lens takes the document's places block by
              block from the top as it is written — a translation, each original
              a point at its margin away. A <strong>popover</strong> answers
              about the whole document from the header, or about one block
              beside it — a summary, an explanation. An{" "}
              <strong>annotate</strong> lens keeps a note beside each block that
              has something worth saying — terms, a critique, a fact check with
              its sources.
            </p>
          </Term>

          <Term name="The agent is yours">
            <p class="term-desc">
              <code class="doc-code">claude</code> and{" "}
              <code class="doc-code">codex</code> are run as they are installed,
              with their tools off; a model under Ollama, any OpenAI-compatible
              server, or a program of your own can be named instead. Preferences
              → Lenses starts one from a recipe that leaves only the blanks to
              fill, and a server's API key goes to the system's credential
              store rather than into <code class="doc-code">config.json</code>.
            </p>
          </Term>

          <Term name="Nothing leaves until you ask">
            <p class="term-desc">
              A lens runs only when you open it, and hands the text only to
              what you configured — an Ollama server on your own machine keeps
              it there. Searching the web or reading the files beside the
              document are allowed per lens, one at a time, and off unless you
              turn them on.
            </p>
          </Term>

          <Term name="Answers are kept">
            <p class="term-desc">
              What a lens answered is filed per document, so reopening one —
              after a restart, too — shows it again without asking again. An
              answer whose block has since changed is marked outdated, and
              regenerating asks only about what changed.{" "}
              <a href={basePath("/lenses")}>More on lenses</a>
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Fitting in</h2>
        <p class="doc-section-lead">
          Themes, keys, and the parts of the operating system that expect a
          Markdown reader.
        </p>
        <div class="term-list">
          <Term
            name="GitHub's own themes"
            figure={
              <ShotFigure
                name="preferences"
                alt="The appearance pane in preferences, with the mode choice and GitHub's themes"
                caption="One pane per question. Each card is painted by the theme it names."
              />
            }
          >
            <p class="term-desc">
              Light and dark defaults, dimmed, high contrast, and the
              colour-vision themes — with a separate choice for light mode and
              dark mode, and the system deciding which applies. Each card is
              painted by the theme it names, down to the five semantic hues,
              which is where the themes actually part company.
            </p>
          </Term>

          <Term
            name="Picking one puts it on"
            figure={
              <MotionFigure
                name="motion-theme"
                alt="Switching Arto between its light and dark themes"
              />
            }
          >
            <p class="term-desc">
              The window takes the theme the moment you pick it, and that
              outranks the mode — so a dark theme can be judged from light mode.
              It lasts exactly as long as the unsaved edit that chose it: saving
              settles it, leaving the page drops both.
            </p>
          </Term>

          <Term
            name="Keybindings"
            figure={
              <ShotFigure
                name="preferences-keys"
                alt="The keybindings pane in preferences: presets, a filter field, and the shortcut table"
                caption="Presets across the top; every binding below, filterable by key or by action."
              />
            }
          >
            <p class="term-desc">
              The presets that ship are <strong>Default</strong> (arrow keys,
              Cmd+Key, Ctrl+Tab), <strong>Vim</strong> (j/k scroll,{" "}
              <kbd>g</kbd> <kbd>g</kbd>, chord sequences),{" "}
              <strong>Emacs</strong> (Ctrl+n/p, Ctrl+x combos) and{" "}
              <strong>Clear</strong>, which removes the lot so you can start
              from nothing. Every binding underneath is editable, and the filter
              takes either a key or an action name.
            </p>
            <p class="term-desc">
              There are two kinds, and the pane keeps them apart.{" "}
              <strong>Menu shortcuts</strong> are native accelerators: single
              chords, shown in the menu bar, dispatched by the system — which is
              how <kbd>⌘N</kbd> opens a window when none is focused.{" "}
              <strong>Keybindings</strong> are handled by the in-window engine,
              which is what makes chord sequences possible, and they are
              per-context: the document, the panel, the search field, the
              palette and the contents list each have their own. Lists and
              fields answer to bindings too, not only the document.
            </p>
            <p class="term-desc">
              They live in <code class="doc-code">mappings.json</code>, beside{" "}
              <code class="doc-code">config.json</code>, if you would rather
              edit the file.
            </p>
          </Term>

          <Term name="A config file an editor understands">
            <p class="term-desc">
              Preferences writes <code class="doc-code">config.json</code>, and
              the file can be edited by hand as well: Arto reads it again when
              it is saved, so a change needs no restart. The file names its own
              JSON Schema, so an editor that reads one completes every key,
              explains it on hover, and flags a misspelled one before Arto
              silently drops it.
            </p>
          </Term>

          <Term name="Zoom">
            <p class="term-desc">
              <kbd>⌘+</kbd>, <kbd>⌘−</kbd> and <kbd>⌘0</kbd>, or the trackpad,
              with the level remembered.
            </p>
          </Term>

          <Term name="Print and PDF">
            <p class="term-desc">
              <kbd>⌘P</kbd> prints the rendered document, or saves it as a PDF,
              through a stylesheet made for paper.
            </p>
          </Term>

          <Term name="Quick Look and the Finder preview pane (macOS)">
            <p class="term-desc">
              Press <kbd>Space</kbd> on a Markdown file and it previews rendered
              rather than as source. Both read the same configuration the app
              does.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Beyond the window</h2>
        <p class="doc-section-lead">
          A command that hands files over, and a renderer that needs no app at
          all.
        </p>
        <div class="term-list">
          <Term name="Single instance">
            <p class="term-desc">
              <code class="doc-code">arto</code> routes to the process already
              running rather than starting a second one, over a socket private
              to your user.
            </p>
          </Term>

          <Term name="A window a script can place">
            <p class="term-desc">
              <code class="doc-code">--position</code>,{" "}
              <code class="doc-code">--size</code> and{" "}
              <code class="doc-code">--theme</code> set the window a command
              opens, and <code class="doc-code">--wait-ready</code> holds the
              command until that window has finished drawing — so a screen
              capture or a scripted demo needs no fixed sleep.
            </p>
          </Term>

          <Term name="Standalone pages">
            <p class="term-desc">
              <code class="doc-code">arto page README.md &gt; README.html</code>{" "}
              writes one self-contained HTML file — stylesheet, diagrams and
              math inlined — that opens in any browser. It follows your
              configuration, and ships with a Content-Security-Policy that
              blocks scripts embedded in the Markdown.
            </p>
          </Term>

          <Term name="A renderer without the app">
            <p class="term-desc">
              The same command exists as a separate{" "}
              <code class="doc-code">arto-page</code> binary, for machines that
              need the output but not the window.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Standing on</h2>
        <p class="doc-section-lead">
          Arto is a Rust application. What it does not write itself, it takes
          from these.
        </p>
        <div class="term-list">
          <Term name="Dioxus">
            <p class="term-desc">
              The Rust UI framework the whole application is written in — native
              windows, menus and state, with no Electron underneath.{" "}
              <Ext href="https://dioxuslabs.com/">dioxuslabs.com</Ext>
            </p>
          </Term>
          <Term name="ox-content">
            <p class="term-desc">
              The Markdown engine. It renders GitHub's dialect — autolinks,
              alerts, heading slugs, the tag filter — so Arto carries no version
              of any of them.{" "}
              <Ext href="https://github.com/ubugeeei-prod/ox-content">
                github.com/ubugeeei-prod/ox-content
              </Ext>
            </p>
          </Term>
          <Term name="KaTeX">
            <p class="term-desc">
              Typesets the maths, in the page, as you reach it.{" "}
              <Ext href="https://katex.org/">katex.org</Ext>
            </p>
          </Term>
          <Term name="Mermaid">
            <p class="term-desc">
              Draws the diagrams, in the page and in their own viewer window.{" "}
              <Ext href="https://mermaid.js.org/">mermaid.js.org</Ext>
            </p>
          </Term>
        </div>
      </section>
    </article>,
    { title: "Features — Arto", current: "features" }
  );
});
