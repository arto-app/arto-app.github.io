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
  version: "v0.24.1",
  commit: "b6580b93da86db17ce028daf50491ef7e060f9a6",
  date: "2026-02-23",
  note: "Latest Arto repository state used for this website refresh.",
};

export const artoSyncLog: ArtoSyncLogEntry[] = [
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
