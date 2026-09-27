export type ArtoReference = {
  version: string;
  commit: string;
  date: string;
  note: string;
};

export type ArtoSyncLogEntry = {
  date: string;
  targetVersion: string;
  targetCommit: string;
  summary: string;
  changes: string[];
};

export const artoReferenceBaseline: ArtoReference = {
  version: "v0.36.0",
  commit: "0910e5ceaf427062f9b2b987ecb09ec9b8fa5386",
  date: "2026-09-10",
  note: "Version reflected by the previous website update.",
};

export const artoReferenceCurrent: ArtoReference = {
  version: "v0.39.1",
  commit: "96ac56c4babfa6e883c4fd84626b3cf3d1814392",
  date: "2026-09-27",
  note: "Latest Arto release used for this website refresh.",
};

export const artoSyncLog: ArtoSyncLogEntry[] = [
  {
    date: "2026-09-27",
    targetVersion: "v0.39.1",
    targetCommit: "96ac56c4babfa6e883c4fd84626b3cf3d1814392",
    summary:
      "Update website content from Arto v0.36.0 to v0.39.1: the reading features, lenses, and the Windows and Linux packaging changes.",
    changes: [
      "Added a Lenses page of its own: the page, popover and annotate displays, the agents and how each is asked, what an agent may be allowed, recipes, and how answers are kept.",
      "Documented lenses: an agent the reader configures — Claude, Codex, Ollama or any OpenAI-compatible server — shown with the document as a translation, a summary or notes, with nothing sent until a lens is opened.",
      "Documented highlights with notes, kept per document and found again by their words after the file changes.",
      "Documented the marks for what changed since a document was last read, and stepping through them.",
      "Documented focus mode, the reading time and time left in the header, and link and footnote previews on hover.",
      "Documented the typography settings: measure, line height, typeface, text size and CJK font language.",
      "Noted that a long table keeps its header row in view while it is read.",
      "Replaced the three-faced panel with four, adding Links — the documents that link to the one on screen.",
      "Noted the mouse's side buttons walking the history, and that the palette leaves out the document already on screen.",
      "Documented config.json being reloaded on save and described by a JSON Schema for editor completion.",
      "Added --position, --size, --theme and --wait-ready for scripting a window from the command line.",
      "Corrected the raw HTML choices to filtered, passed through or escaped, and noted that filtering now also drops event handlers and javascript: links.",
      "Updated installation: WebKitGTK commands for Fedora, openSUSE and Arch, the Windows installer fetching WebView2 only where it is missing, and the single binary as the copy to run from a Windows terminal.",
    ],
  },
  {
    date: "2026-09-12",
    targetVersion: "v0.36.0",
    targetCommit: "0910e5ceaf427062f9b2b987ecb09ec9b8fa5386",
    summary:
      "Rebuild the website for the redesigned application: every page rewritten and every screenshot retaken.",
    changes: [
      "Replaced tabs with one document to a window, and rewrote the windows section around it.",
      "Documented the welcome page a window shows when nothing is open: starred folders, starred files, and reading history grouped by day.",
      "Documented the panel and its three faces — file explorer over several roots, reading history, and bookmarks — replacing the former sidebar description.",
      "Documented the command palette, which fuzzy-finds files, history, bookmarks and commands in one list.",
      "Replaced the table-of-contents panel with the contents gutter that stands in the page's own margin.",
      "Moved find in page into the header, and noted that pinned searches keep their marks in the contents.",
      "Documented preferences as a window of its own, with one pane per question.",
      "Documented GitHub's own themes, including dimmed, high contrast and the colour-vision ones, with a separate choice for light and dark.",
      "Noted that the Markdown engine is now ox-content rather than a local rendering of GitHub's dialect.",
      "Added the `arto page` subcommand for standalone HTML output, and the `--behind` flag.",
      "Added a reading position that is restored when a document is reopened.",
      "Updated installation for the Linux AppImage, the single binary for Linux and Windows, and the `arto-page` Nix package.",
      "Retook every screenshot, clip and the demo video against the current interface, in both light and dark themes, and moved the clips off GIF onto H.264.",
      "Gave the reason tabs went away: the strip was a second copy of the reading history, which already remembers everything opened.",
      "Documented what a pinned search is — Return keeps what was typed — and what the three devices of a contents mark mean: width is the heading's depth, colour is a pinned search, thickness is where the reader is.",
    ],
  },
  {
    date: "2026-07-25",
    targetVersion: "v0.30.0",
    targetCommit: "75e9ca89aa992803ade1f68a2952c42052a1b09c",
    summary: "Update website content from Arto v0.25.0 to v0.30.0.",
    changes: [
      "Added macOS integration section: Quick Look preview and Finder preview pane for rendered Markdown (v0.30.0).",
      "Documented Print / PDF export with A4 print stylesheet (v0.27.0).",
      "Added full-width content mode toggle to customization options (v0.28.0).",
      "Clarified keybindings: native menu shortcuts are now editable and split from the in-window engine keybindings (v0.29.0).",
    ],
  },
  {
    date: "2026-03-20",
    targetVersion: "v0.25.0",
    targetCommit: "46edb19cc463202b79e83f775c37864cd4128dd8",
    summary: "Update website content from Arto v0.24.1 to v0.25.0.",
    changes: [
      "Added hover-to-reveal sidebars with pin-to-dock support.",
      "Added Copy Table As Markdown to context menu copy workflows.",
      "Updated cross-platform support note to reflect initial Linux platform support (v0.24.2).",
    ],
  },
  {
    date: "2026-02-23",
    targetVersion: "v0.24.1",
    targetCommit: "b6580b93da86db17ce028daf50491ef7e060f9a6",
    summary: "Refresh website content from Arto v0.15.1 to v0.24.1.",
    changes: [
      "Updated features page to include custom keybindings and preset support (Default/Vim/Emacs).",
      "Documented enhanced CLI behavior (`--open`, `--directory`) and single-instance routing.",
      "Added Smart Context Menu and copy workflows (Copy As..., image/math/mermaid copy & save).",
      "Added Math/Image dedicated viewer window capabilities alongside Mermaid.",
      "Added version tracking page and structured sync log for future migrations.",
    ],
  },
];
