import { createRoute } from "honox/factory";
import { basePath } from "../../lib/path";
import {
  IconBook,
  IconCheck,
  IconCode,
  IconKeyboard,
  IconNavigation,
  IconPlug,
  IconSearch,
  IconSettings,
  IconTerminal2,
  IconVim,
  IconWindow,
} from "../../components/Icons";
import { CodeBlock } from "../../components/CodeBlock";

export default createRoute((c) => {
  return c.render(
    <>
      <header class="features-header">
        <h1 class="features-title">Features</h1>
        <p class="features-subtitle">
          Everything you need for a premium Markdown reading experience, nothing
          you don't.
        </p>
      </header>

      {/* Reading Experience */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconBook size={24} stroke={2} />
            </span>
            Reading Experience
          </h2>
          <div class="feature-list">
            <FeatureItem
              name="GitHub-Style Rendering"
              desc="Faithful reproduction of GitHub's Markdown rendering, so your documents look exactly as they would on GitHub."
            />
            <FeatureItem
              name="Extended Syntax Support"
              desc="Tables, task lists, strikethrough, autolinks, and all the GitHub Flavored Markdown extensions you rely on."
            />
            <FeatureItem
              name="GitHub Alerts"
              desc="Support for NOTE, TIP, IMPORTANT, WARNING, and CAUTION callouts with appropriate styling."
            />
            <FeatureItem
              name="YAML Frontmatter"
              desc="Beautifully styled, collapsible frontmatter tables that display your document metadata elegantly."
            />
            <FeatureItem
              name="Auto-Reload"
              desc="Documents automatically refresh when files change on disk, keeping your view up-to-date."
            />
          </div>
          <div class="feature-demo-grid">
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-rendering.png")}
                alt="GitHub-style Markdown rendering"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">GitHub-Style Rendering</p>
            </div>
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-alerts.png")}
                alt="GitHub Alerts support"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">GitHub Alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code & Diagrams */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconCode size={24} stroke={2} />
            </span>
            Code & Diagrams
          </h2>
          <div class="feature-list">
            <FeatureItem
              name="Syntax Highlighting"
              desc="Beautiful code highlighting powered by highlight.js with a convenient copy button on every code block."
            />
            <FeatureItem
              name="Mermaid Diagrams"
              desc="Interactive Mermaid diagrams with zoom, pan, and the ability to copy diagrams as images."
            />
            <FeatureItem
              name="KaTeX Math"
              desc="Render mathematical expressions beautifully with KaTeX support for inline and block math."
            />
          </div>
          <div class="feature-demo-grid">
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-syntax.png")}
                alt="Syntax highlighting"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">Syntax Highlighting</p>
            </div>
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-katex.png")}
                alt="KaTeX math rendering"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">KaTeX Math</p>
            </div>
          </div>
          <div class="feature-demo">
            <img
              src={basePath("/images/feature-mermaid.gif")}
              alt="Mermaid diagram interaction demo"
              class="feature-demo-img"
            />
            <p class="feature-demo-caption">
              Interactive Mermaid diagrams with zoom and pan
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconNavigation size={24} stroke={2} />
            </span>
            Navigation & Organization
          </h2>
          <div class="feature-list">
            <FeatureItem
              name="File Explorer Sidebar"
              desc="Built-in file explorer with a resizable sidebar for browsing your Markdown files."
            />
            <FeatureItem
              name="Quick Access Bookmarks"
              desc="Pin frequently used files and directories for instant access."
            />
            <FeatureItem
              name="Table of Contents"
              desc="Automatic TOC panel generated from your document's headings for easy navigation."
            />
            <FeatureItem
              name="Directory History"
              desc="Navigate back and forward through your browsing history with keyboard shortcuts."
            />
            <FeatureItem
              name="Live Link Navigation"
              desc="Click links to other Markdown documents and navigate seamlessly between files."
            />
          </div>
          <div class="feature-demo-grid">
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-sidebar.gif")}
                alt="File explorer sidebar demo"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">File Explorer Sidebar</p>
            </div>
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-toc.png")}
                alt="Table of contents panel"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">Table of Contents Panel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconSearch size={24} stroke={2} />
            </span>
            Search & Discovery
          </h2>
          <div class="features-grid">
            <div class="grid-item">
              <div class="grid-item-title">
                <span class="kbd">⌘F</span>
                Find in Page
              </div>
              <p class="grid-item-desc">
                Quick search within the current document with highlight
                navigation.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">Pinned Search</div>
              <p class="grid-item-desc">
                Persistent multi-color highlighting that stays visible as you
                navigate.
              </p>
            </div>
          </div>
          <div class="feature-demo-grid">
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-search.png")}
                alt="Find in page"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">Find in Page</p>
            </div>
            <div class="feature-demo">
              <img
                src={basePath("/images/feature-pinned.png")}
                alt="Pinned search with multi-color highlights"
                class="feature-demo-img"
              />
              <p class="feature-demo-caption">Pinned Search</p>
            </div>
          </div>
        </div>
      </section>

      {/* Window Management */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconWindow size={24} stroke={2} />
            </span>
            Window & Tab Management
          </h2>
          <div class="features-grid">
            <div class="grid-item">
              <div class="grid-item-title">Tab Support</div>
              <p class="grid-item-desc">
                Open multiple documents in tabs for easy switching.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">Multi-Window</div>
              <p class="grid-item-desc">
                Open documents in new windows, including separate windows for
                diagrams.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">Drag & Drop</div>
              <p class="grid-item-desc">
                Drop files onto Arto to open them, or drag tabs between windows.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">Context Menus</div>
              <p class="grid-item-desc">
                Right-click menus for tabs, sidebar, and content with useful
                actions.
              </p>
            </div>
          </div>
          <div class="feature-demo">
            <img
              src={basePath("/images/feature-multiwindow.gif")}
              alt="Multi-window support"
              class="feature-demo-img"
            />
            <p class="feature-demo-caption">Multi-Window Support</p>
          </div>
        </div>
      </section>

      {/* Customization */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconSettings size={24} stroke={2} />
            </span>
            Customization
          </h2>
          <div class="features-grid">
            <div class="grid-item">
              <div class="grid-item-title">Dark Mode</div>
              <p class="grid-item-desc">
                Beautiful dark theme that syncs with your system preferences.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">
                <span class="kbd">⌘+</span>
                <span class="kbd">⌘-</span>
                Zoom
              </div>
              <p class="grid-item-desc">
                Adjust text size with keyboard shortcuts or trackpad gestures.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">Preferences</div>
              <p class="grid-item-desc">
                Configure sidebar, TOC, and other settings to your liking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconPlug size={24} stroke={2} />
            </span>
            Integrations
          </h2>

          <h3 class="features-subsection-title">
            <IconTerminal2 size={20} stroke={2} />
            Command Line
          </h3>
          <p class="features-subsection-desc">
            Open files and directories directly from your terminal. Arto uses a
            single-instance architecture—if it's already running, files are
            handed off to the existing window seamlessly.
          </p>
          <CodeBlock
            label="Terminal"
            code={`# Open a file
arto README.md

# Open multiple files
arto file1.md file2.md

# Open a directory
arto ~/Documents/project`}
          />

          <h3 class="features-subsection-title-spaced">
            <IconVim class="features-subsection-icon" />
            Vim / Neovim
          </h3>
          <p class="features-subsection-desc">
            The official{" "}
            <a
              href="https://github.com/arto-app/arto.vim"
              target="_blank"
              rel="noopener noreferrer"
            >
              arto.vim
            </a>{" "}
            plugin lets you preview Markdown files in Arto without leaving your
            editor.
          </p>
          <div class="features-grid">
            <div class="grid-item">
              <div class="grid-item-title">
                <span class="kbd">:Arto</span>
              </div>
              <p class="grid-item-desc">
                Open the current buffer in Arto with a single command.
              </p>
            </div>
            <div class="grid-item">
              <div class="grid-item-title">
                <span class="kbd">:Arto {"{path}"}</span>
              </div>
              <p class="grid-item-desc">
                Open any file or multiple files by specifying paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section class="features-section">
        <div class="features-section-container">
          <h2 class="features-section-title">
            <span class="section-icon">
              <IconKeyboard size={24} stroke={2} />
            </span>
            Keyboard Shortcuts
          </h2>
          <div class="features-grid">
            <ShortcutItem keys={["⌘", "O"]} desc="Open file" />
            <ShortcutItem keys={["⌘", "F"]} desc="Find in page" />
            <ShortcutItem keys={["⌘", "T"]} desc="New tab" />
            <ShortcutItem keys={["⌘", "W"]} desc="Close tab" />
            <ShortcutItem keys={["⌘", "+"]} desc="Zoom in" />
            <ShortcutItem keys={["⌘", "-"]} desc="Zoom out" />
            <ShortcutItem keys={["⌘", "0"]} desc="Reset zoom" />
            <ShortcutItem keys={["⌘", ","]} desc="Preferences" />
            <ShortcutItem keys={["⌘", "["]} desc="Navigate back" />
            <ShortcutItem keys={["⌘", "]"]} desc="Navigate forward" />
            <ShortcutItem keys={["⌘", "B"]} desc="Toggle sidebar" />
            <ShortcutItem keys={["⌘", "R"]} desc="Reload document" />
          </div>
        </div>
      </section>
    </>,
    { title: "Features — Arto", current: "features" }
  );
});

function FeatureItem({ name, desc }: { name: string; desc: string }) {
  return (
    <div class="feature-item">
      <IconCheck class="check-icon" size={20} stroke={2} />
      <div class="feature-text">
        <div class="feature-name">{name}</div>
        <div class="feature-description">{desc}</div>
      </div>
    </div>
  );
}

function ShortcutItem({ keys, desc }: { keys: string[]; desc: string }) {
  return (
    <div class="shortcut-item">
      <div class="shortcut-keys">
        {keys.map((key) => (
          <span key={key} class="kbd">
            {key}
          </span>
        ))}
      </div>
      <span class="shortcut-desc">{desc}</span>
    </div>
  );
}
