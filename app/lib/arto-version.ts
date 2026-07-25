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
  version: "v0.15.1",
  commit: "ca1365afff67bc3e5690c162d343e26c2ec90d52",
  date: "2026-02-01",
  note: "Approximate version reflected by the previous website update.",
};

export const artoReferenceCurrent: ArtoReference = {
  version: "v0.30.0",
  commit: "75e9ca89aa992803ade1f68a2952c42052a1b09c",
  date: "2026-07-25",
  note: "Latest Arto repository state used for this website refresh.",
};

export const artoSyncLog: ArtoSyncLogEntry[] = [
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
