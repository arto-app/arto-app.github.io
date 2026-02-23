import { createRoute } from "honox/factory";
import {
  artoReferenceBaseline,
  artoReferenceCurrent,
  artoSyncLog,
} from "../../lib/arto-version";

export default createRoute((c) => {
  return c.render(
    <>
      <header class="install-header">
        <h1 class="install-title">Version Tracking</h1>
        <p class="install-subtitle">
          Clear reference points for what Arto version this site describes, and
          a sync log for easier future updates.
        </p>
      </header>

      <div class="install-content">
        <section class="install-section">
          <h2 class="install-section-title">Current Documentation Target</h2>
          <div class="version-card">
            <p class="version-card-title">{artoReferenceCurrent.version}</p>
            <p class="version-card-detail">
              Commit: <code>{artoReferenceCurrent.commit}</code>
            </p>
            <p class="version-card-detail">Date: {artoReferenceCurrent.date}</p>
            <p class="version-card-note">{artoReferenceCurrent.note}</p>
          </div>
        </section>

        <div class="install-divider" />

        <section class="install-section">
          <h2 class="install-section-title">Previous Website Baseline</h2>
          <div class="version-card">
            <p class="version-card-title">{artoReferenceBaseline.version}</p>
            <p class="version-card-detail">
              Commit: <code>{artoReferenceBaseline.commit}</code>
            </p>
            <p class="version-card-detail">
              Date: {artoReferenceBaseline.date}
            </p>
            <p class="version-card-note">{artoReferenceBaseline.note}</p>
          </div>
        </section>

        <div class="install-divider" />

        <section class="install-section">
          <h2 class="install-section-title">Website Sync Log</h2>
          <p class="install-section-desc">
            Add a new entry whenever this website catches up with a new Arto
            version.
          </p>
          <div class="version-log-list">
            {artoSyncLog.map((entry) => (
              <article key={entry.targetCommit} class="version-log-item">
                <p class="version-log-meta">
                  {entry.date} - {entry.targetVersion}
                </p>
                <p class="version-log-summary">{entry.summary}</p>
                <p class="version-log-commit">
                  Commit: <code>{entry.targetCommit}</code>
                </p>
                <ul class="version-log-changes">
                  {entry.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>,
    { title: "Version Tracking — Arto", current: "versions" }
  );
});
