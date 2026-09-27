import type { Child } from "hono/jsx";
import { createRoute } from "honox/factory";
import { CodeBlock } from "../../components/CodeBlock";
import { MotionFigure, ShotFigure } from "../../components/Figure";
import { artoReferenceCurrent } from "../../lib/arto-version";

const LENSES_DOC = "https://github.com/arto-app/Arto/blob/main/docs/lenses.md";

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
        <span class="doc-eyebrow">Lenses</span>
        <h1 class="doc-title">Read it through a lens</h1>
        <p class="doc-lead">
          A lens hands the document you are reading to an agent you chose —
          Claude, Codex, a model on your own machine, or a program of your own —
          and shows its answer with the text: a translation in the document's
          places, a summary on request, a note beside each paragraph. The file
          itself is never changed.
        </p>
        <p class="doc-actions-note">
          Current as of {artoReferenceCurrent.version}.
        </p>
      </header>

      <MotionFigure
        name="motion-lens"
        alt="A document translated into Japanese by a page lens, block by block from the top, as the answer is written"
        caption="A page lens translating an RFC: each block takes its translation as the answer arrives."
        wide
      />

      <section class="doc-section">
        <h2 class="doc-section-title">Why read through one</h2>
        <p class="doc-p">
          Reading a document in another language, or wanting its gist, used to
          mean copying it out to a chat and reading the answer apart from the
          text it was about. A lens brings the answer to the document instead:
          the translation stands where the original stood, the note sits beside
          the paragraph it is about, and the page you are reading is still the
          page you opened.
        </p>
        <div class="callout">
          <p class="callout-title">Nothing leaves until you ask</p>
          <p>
            Arto reaches out to nothing on its own. A lens runs only when you
            open it, and only what you configured it with is handed the text it
            looks at — a program on your machine, or the server you named.
            Whether the text leaves the machine is up to what you chose: an
            Ollama server on your own machine keeps it there.
          </p>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Page, popover, annotate</h2>
        <p class="doc-section-lead">
          A lens says how its answer is shown, and that decides how the agent is
          asked.
        </p>
        <div class="doc-table-wrap">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Display</th>
                <th>The agent runs</th>
                <th>The answer is shown</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Page</strong>
                </td>
                <td>Once, on the whole document</td>
                <td>
                  In the document's places, block by block from the top as it
                  is written — a translation
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Popover</strong>
                </td>
                <td>Once, on the whole document or on one block</td>
                <td>
                  From the header for the document, beside the block for a
                  block — a summary
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Annotate</strong>
                </td>
                <td>Once per block, with the blocks around it as context</td>
                <td>
                  Beside each block, on hover over a mark in its margin — a
                  gloss, an explanation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="term-list">
          <Term
            name="A page that turns over from the top"
            figure={
              <ShotFigure
                name="lens-page"
                alt="An English essay shown translated into Japanese by a page lens"
                wide
              />
            }
          >
            <p class="term-desc">
              A page lens pairs its answer with the document block by block, so
              the page reads as the translation from the top down while the rest
              is still the original. Point at the mark in an answered block's
              margin, or hold <kbd>⌥</kbd> over it, to see the block it stands
              for. The lens glyph in the header switches between page lenses, or
              back to <strong>Original</strong>, at once — their answers are
              kept.
            </p>
          </Term>

          <Term name="Lenses stack">
            <p class="term-desc">
              One page lens takes the page at a time, since two would take the
              same places. Everything else only adds to it: summarize a
              translated page and the translation stays, and a block marked by
              several annotate lenses carries one mark that shows each answer
              under its lens's name.
            </p>
          </Term>

          <Term
            name="Notes only where there is something to say"
            figure={
              <ShotFigure
                name="lens-annotate"
                alt="A note from the terms lens beside the paragraph it explains, opened from the mark in the margin"
                caption="Explain the terms: only the blocks with a term worth explaining carry a mark."
                wide
              />
            }
          >
            <p class="term-desc">
              An annotate lens can be told to leave a block unmarked when it has
              nothing to note, so a lens for terms or a critique marks just the
              blocks that stand out rather than every paragraph.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">The agent is yours</h2>
        <p class="doc-section-lead">
          Arto names the agent rather than wrapping it, and asks it with as
          little of its own set-up as it allows.
        </p>
        <div class="doc-table-wrap">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Asked through</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code class="doc-code">claude</code>
                </td>
                <td>
                  <code class="doc-code">claude -p</code> with no tools, no MCP
                  servers, no settings or hooks — so a{" "}
                  <code class="doc-code">CLAUDE.md</code> near the document does
                  not turn it into an agent
                </td>
              </tr>
              <tr>
                <td>
                  <code class="doc-code">codex</code>
                </td>
                <td>
                  <code class="doc-code">codex app-server</code> with its tools,
                  plugins, hooks and MCP servers off, in a read-only sandbox,
                  keeping no session
                </td>
              </tr>
              <tr>
                <td>
                  <code class="doc-code">ollama</code>
                </td>
                <td>
                  Ollama's own chat API, with the context sized to the request
                  rather than to the longest the model takes
                </td>
              </tr>
              <tr>
                <td>
                  <code class="doc-code">openai</code>
                </td>
                <td>
                  Any OpenAI-compatible server — LM Studio, llama.cpp's server,
                  vLLM, OpenAI, OpenRouter and the like
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="term-list">
          <Term name="Your sign-in, your keys">
            <p class="term-desc">
              <code class="doc-code">claude</code> and{" "}
              <code class="doc-code">codex</code> use the sign-in you already
              have. A server's API key is kept in the system's credential store —
              the Keychain, the Credential Manager, the Secret Service — never in{" "}
              <code class="doc-code">config.json</code>, so the file can live in
              a dotfiles repository. A command that prints the key, such as a
              password manager's, can stand in for the stored one.
            </p>
          </Term>

          <Term name="Answers as they are written">
            <p class="term-desc">
              Every agent's answer is shown as it arrives, so a translation of
              a long document fills in from the top rather than appearing all at
              once minutes later.
            </p>
          </Term>

          <Term name="A command of your own">
            <p class="term-desc">
              In place of an agent, a lens can run any program. It reads one
              JSON object — the text, where it sits in the file, and for an
              annotate lens the blocks around it — and writes its answer as
              Markdown.
            </p>
          </Term>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">What an agent is allowed</h2>
        <p class="doc-p">
          Left as it is, an agent can do nothing but read the text it is handed
          and answer. That is not caution for its own sake: a document can be
          written to talk an agent into anything its tools can do — reading the
          files beside it into its answer, or sending them out through a
          search. So each lens is handed more one thing at a time, and only
          that lens:
        </p>
        <div class="doc-table-wrap">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Allowed</th>
                <th>The agent may</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Web search</td>
                <td>
                  Search the web and read what it finds — what a fact check
                  needs. It can send out only what it was already handed.
                </td>
              </tr>
              <tr>
                <td>Read files</td>
                <td>Read the files around the document</td>
              </tr>
              <tr>
                <td>Shell</td>
                <td>Run commands</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callout callout-warn">
          <p class="callout-title">Reaching past the document</p>
          <p>
            A lens allowed to read files or run commands can reach what is on
            this machine beyond the document, so allow it only over documents
            you trust. The menus mark such a lens with a warning sign, and when
            it opens again by itself it shows what it answered before and asks
            nothing until you regenerate it.
          </p>
        </div>
        <p class="doc-p doc-muted">
          An answer is written by a model the document can steer, so it is
          shown with less trust than the document itself: raw HTML in it is
          shown as written, and nothing in it is fetched from another host.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Setting one up</h2>
        <p class="doc-p">
          <strong>Preferences → Lenses</strong> starts a lens from a recipe —
          translate the page, a translation beside each block, summarize,
          explain the terms, critique, explain a block, fact check — with its
          prompt and display already written. It asks only the language to
          answer in, which agent, and which model, and the model field suggests
          what that agent offers. Drag lenses into the order the menus should
          offer them, and the pane says beside a lens what keeps it out of the
          menus.
        </p>
        <ShotFigure
          name="preferences-lenses"
          alt="The Lenses pane in preferences, listing lenses with their display and agent"
          caption="Each lens says how it shows its answer and which agent is asked, on which model."
        />
        <p class="doc-p">
          Lenses live in <code class="doc-code">config.json</code> as well,
          which Arto reads again when it is saved:
        </p>
        <div class="figure">
          <CodeBlock
            label="config.json"
            code={`{
  "lenses": [
    {
      "id": "translate-ja",
      "label": "Translate to Japanese",
      "display": "page",
      "agent": "claude",
      "model": "sonnet",
      "prompt": "Translate the text into Japanese. Keep its structure exactly and translate the prose only. Write the translated document and nothing else."
    },
    {
      "id": "translate-ja-local",
      "label": "Translate to Japanese (local)",
      "display": "page",
      "agent": "ollama",
      "model": "qwen3:4b-instruct",
      "prompt": "Translate the text into Japanese. Keep its structure exactly and translate the prose only. Write the translated document and nothing else."
    }
  ]
}`}
          />
        </div>
        <p class="doc-p doc-muted">
          Every field — endpoints, context, concurrency, timeouts, what a lens
          is offered on — is in the{" "}
          <Ext href={LENSES_DOC}>lenses documentation</Ext>.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Using one</h2>
        <div class="term-list">
          <Term name="Opening">
            <p class="term-desc">
              Right-click the page and choose <strong>Lens on Document</strong>{" "}
              or <strong>Lens on Block</strong>. Each lists only the lenses made
              for what it looks at — a summary on a document, an explanation on
              the block you are stuck on, a critique on either. A lens can have
              a shortcut of its own, which opens it over the document, or over
              the block under the cursor.
            </p>
          </Term>

          <Term
            name="Watching it work"
            figure={
              <ShotFigure
                name="lens-summary"
                alt="A summary of the document opened from its glyph in the header, as a short gist and a list of main points"
                caption="A summary lens, opened from its glyph in the header."
                wide
              />
            }
          >
            <p class="term-desc">
              The header keeps one lens glyph while any lens is open, since the
              document is what is being read. An hourglass turns beside it while
              answers are coming, and hovering it says how far each lens has got
              and how to stop it.
            </p>
          </Term>

          <Term name="Answers are kept">
            <p class="term-desc">
              Some answers take minutes and cost money, so they are filed per
              document: reopen one — after a restart, too — and it comes back
              with the lenses it had open, showing what they answered without
              asking again.
            </p>
          </Term>

          <Term name="When the document changes">
            <p class="term-desc">
              An answer whose block has changed since is shown outdated — a note's
              mark goes hollow, a translated block carries a rule in its margin
              — and the lens menu regenerates just those. A lens stopped halfway
              can be continued, and a failed block retried, without asking again
              about the rest.
            </p>
          </Term>

          <Term name="Hiding and forgetting">
            <p class="term-desc">
              Hiding a lens takes its answer off the page but keeps it in the
              header, to be shown again at once. Forgetting deletes its answers
              for that document.
            </p>
          </Term>
        </div>
      </section>
    </article>,
    { title: "Lenses — Arto", current: "lenses" }
  );
});
