import { createRoute } from "honox/factory";
import {
  artoReferenceBaseline,
  artoReferenceCurrent,
  artoSyncLog,
} from "../../lib/arto-version";

export default createRoute((c) => {
  return c.render(
    <article class="doc">
      <header class="doc-masthead">
        <span class="doc-eyebrow">Versions</span>
        <h1 class="doc-title">What this site describes</h1>
        <p class="doc-lead">
          A clear reference point for which Arto version this website documents,
          and a log of every time it has caught up.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-section-title">Current documentation target</h2>
        <div class="version-card">
          <p class="version-card-title">{artoReferenceCurrent.version}</p>
          <p class="version-card-detail">
            Commit: <code>{artoReferenceCurrent.commit}</code>
          </p>
          <p class="version-card-detail">Date: {artoReferenceCurrent.date}</p>
          <p class="version-card-note">{artoReferenceCurrent.note}</p>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Previous website baseline</h2>
        <div class="version-card">
          <p class="version-card-title">{artoReferenceBaseline.version}</p>
          <p class="version-card-detail">
            Commit: <code>{artoReferenceBaseline.commit}</code>
          </p>
          <p class="version-card-detail">Date: {artoReferenceBaseline.date}</p>
          <p class="version-card-note">{artoReferenceBaseline.note}</p>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Sync log</h2>
        <p class="doc-section-lead">
          One entry each time this website caught up with a new Arto version.
        </p>
        <div class="version-log-list">
          {artoSyncLog.map((entry) => (
            <article key={entry.date} class="version-log-item">
              <p class="version-log-meta">
                {entry.date} — {entry.targetVersion}
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
    </article>,
    { title: "Versions — Arto", current: "versions" }
  );
});
