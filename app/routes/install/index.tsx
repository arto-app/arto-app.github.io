import { createRoute } from "honox/factory";
import { CodeBlock } from "../../components/CodeBlock";
import { artoReferenceCurrent } from "../../lib/arto-version";

const RELEASES = "https://github.com/arto-app/Arto/releases";

export default createRoute((c) => {
  return c.render(
    <article class="doc">
      <header class="doc-masthead">
        <span class="doc-eyebrow">Install</span>
        <h1 class="doc-title">Getting Arto</h1>
        <p class="doc-lead">
          macOS is where Arto is developed and tested. Linux and Windows builds
          are published and pass CI, but they get far less real use — read{" "}
          <a href="#platform-support">Platform support</a> before relying on
          them.
        </p>
        <p class="doc-actions-note">
          These instructions describe {artoReferenceCurrent.version}.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-section-title">macOS</h2>
        <p class="doc-p">
          Install with the Homebrew tap. Arto is not signed or notarized with
          an Apple Developer ID, so the quarantine attribute has to be removed
          after installing.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`brew install --cask arto-app/tap/arto
xattr -dr com.apple.quarantine /Applications/Arto.app`}
          />
        </div>
        <div class="callout">
          <p class="callout-title">Tip</p>
          <p>
            <strong>Quick Look preview not showing?</strong> macOS normally
            registers the extension the first time you launch Arto. If pressing{" "}
            <kbd>Space</kbd> on a Markdown file still shows nothing — or a stale
            preview right after an upgrade — register it by hand and refresh the
            cache.
          </p>
        </div>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`pluginkit -a /Applications/Arto.app/Contents/PlugIns/ArtoQuickLook.appex
qlmanage -r && qlmanage -r cache`}
          />
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Linux</h2>
        <p class="doc-p">
          On Debian and Ubuntu, download the <code class="doc-code">.deb</code>{" "}
          matching your architecture from the{" "}
          <a href={RELEASES} target="_blank" rel="noopener noreferrer">
            releases page
          </a>{" "}
          and install it with <code class="doc-code">apt</code>, which pulls in
          the GTK and WebKit libraries it declares.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={"sudo apt install ./arto_<version>_amd64.deb"}
          />
        </div>
        <p class="doc-p">
          On every other distribution — Fedora, openSUSE, Arch — download the{" "}
          <code class="doc-code">.AppImage</code> instead, make it executable
          and run it.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`chmod +x arto_<version>_x86_64.AppImage
./arto_<version>_x86_64.AppImage`}
          />
        </div>
        <p class="doc-p">
          The AppImage needs WebKitGTK 4.1 installed on the system — the one
          thing it deliberately does not carry, since WebKitGTK's helper
          processes only work as the set your package manager installed.
          Install it first if it is missing:
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`sudo dnf install webkit2gtk4.1          # Fedora
sudo zypper install libwebkit2gtk-4_1-0 # openSUSE
sudo pacman -S webkit2gtk-4.1           # Arch`}
          />
        </div>
        <div class="callout callout-warn">
          <p class="callout-title">Requirements</p>
          <p>
            Both artifacts are built on Ubuntu 24.04, so they need glibc 2.39 or
            newer — Ubuntu 24.04+, Debian 13+, Fedora 40+. On older
            distributions, build from source or use Nix.
          </p>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Windows</h2>
        <p class="doc-p">
          Download the installer for your architecture from the{" "}
          <a href={RELEASES} target="_blank" rel="noopener noreferrer">
            releases page
          </a>{" "}
          and run it. It puts Arto on the Start menu and offers it for{" "}
          <code class="doc-code">.md</code>,{" "}
          <code class="doc-code">.markdown</code> and{" "}
          <code class="doc-code">.txt</code> files — in a file's{" "}
          <strong>Open with</strong> menu, in the “Choose another app” dialog
          and under Settings → Apps → Default apps. Whatever opens those files
          today keeps doing so until you say otherwise.
        </p>
        <div class="figure">
          <CodeBlock
            label="Releases"
            code="Arto_<version>_<arch>-setup.exe"
          />
        </div>
        <p class="doc-p">
          Arto renders through Microsoft's WebView2 runtime. Windows 11 ships
          it and Windows 10 usually has it from Edge; where it is missing, the
          installer fetches it, so that first install needs a connection.
          Nothing after it does.
        </p>
        <p class="doc-p">
          Both x86-64 and ARM are built. If you would rather not install
          anything, the same release carries{" "}
          <code class="doc-code">arto-windows-x86_64.exe</code> and{" "}
          <code class="doc-code">arto-windows-aarch64.exe</code> — one
          self-contained executable that runs from wherever you put it. See{" "}
          <a href="#a-single-binary">A single binary</a> for what that leaves
          out.
        </p>
        <div class="callout callout-warn">
          <p class="callout-title">Experimental</p>
          <p>
            CI builds and tests Windows on every change, and a release carries
            these artifacts when that build succeeds — but almost nobody runs
            Arto here, so expect rough edges the other platforms do not have.
          </p>
        </div>
      </section>

      <section class="doc-section" id="a-single-binary">
        <h2 class="doc-section-title">A single binary</h2>
        <p class="doc-p">
          Every release also carries the application as one executable, for
          Linux and Windows, when a package is more ceremony than you want.
          Download the one for your machine and run it from wherever you put it
          — the stylesheet, the scripts and the icons are compiled into it, so
          there is nothing to install beside it.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code={`chmod +x arto-linux-x86_64
./arto-linux-x86_64 README.md`}
          />
        </div>
        <p class="doc-p">
          It is the same application without what an installer arranges around
          it: no menu entry, no file associations, and no{" "}
          <code class="doc-code">arto</code> on your{" "}
          <code class="doc-code">PATH</code> unless you put it there. The Linux
          binary still needs WebKitGTK 4.1, exactly as the{" "}
          <code class="doc-code">.deb</code> and the AppImage do.
        </p>
        <p class="doc-p">
          On Windows the two also differ at a terminal. The installed copy is a
          GUI program, so no console opens behind a document started from
          Explorer; the single binary is a console program, so the shell waits
          for it — which makes it the copy to put on your{" "}
          <code class="doc-code">PATH</code> for scripts. Both carry the
          Microsoft C runtime, so neither asks for the Visual C++
          redistributable first.
        </p>
        <p class="doc-p doc-muted">
          macOS has no such download on purpose. Most of what makes Arto worth
          installing there — the Finder associations and the Quick Look preview
          — is carried by the app bundle rather than by the executable inside
          it, so the DMG is the whole story.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Nix</h2>
        <p class="doc-p">
          Nix works on both macOS and Linux. To try Arto without installing it:
        </p>
        <div class="figure">
          <CodeBlock label="Terminal" code="nix run github:arto-app/Arto" />
        </div>
        <p class="doc-p">
          For a permanent installation, use nix-darwin or home-manager. Add the
          flake input, then add the package to{" "}
          <code class="doc-code">environment.systemPackages</code> (nix-darwin)
          or <code class="doc-code">home.packages</code> (home-manager).
        </p>
        <div class="figure">
          <CodeBlock
            label="flake.nix"
            code={`arto.url = "github:arto-app/Arto";

environment.systemPackages = [ inputs.arto.packages.\${system}.default ];`}
          />
        </div>
        <p class="doc-p">
          The standalone page renderer is a separate package,{" "}
          <code class="doc-code">arto-page</code>, for machines that only need{" "}
          <code class="doc-code">arto page</code> without the app.
        </p>
        <div class="figure">
          <CodeBlock
            label="Terminal"
            code="nix run github:arto-app/Arto#arto-page -- README.md > README.html"
          />
        </div>
      </section>

      <section class="doc-section" id="platform-support">
        <h2 class="doc-section-title">Platform support</h2>
        <div class="doc-table-wrap">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>macOS</td>
                <td>
                  <strong>Supported.</strong> Developed and tested here, and the
                  only platform with Quick Look integration.
                </td>
              </tr>
              <tr>
                <td>Linux</td>
                <td>
                  <strong>Experimental.</strong> Builds are published and CI
                  runs the test suite, but the desktop integration gets far less
                  real use.
                </td>
              </tr>
              <tr>
                <td>Windows</td>
                <td>
                  <strong>Experimental.</strong> CI builds and tests it, and a
                  release carries an installer and a single binary when that
                  build succeeds, but almost nobody runs it.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="doc-p doc-muted">
          Bug reports for the experimental platforms are welcome, and so are
          pull requests.
        </p>
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">After installing</h2>
        <p class="doc-p">
          Launch Arto and the window opens on the welcome page, which lists what
          you have read and the shortcuts to get around.
        </p>
        <p class="doc-p">
          Homebrew, the <code class="doc-code">.deb</code> and Nix also put an{" "}
          <code class="doc-code">arto</code> command on your{" "}
          <code class="doc-code">PATH</code>. The AppImage and the single binary
          do not — each is one self-contained file, so run it by its own path
          instead.
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
        <p class="doc-p doc-muted">
          Full flags and behaviour are in the{" "}
          <a
            href="https://github.com/arto-app/Arto/blob/main/docs/cli.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            CLI documentation
          </a>
          , where <code class="doc-code">config.json</code> lives and what it
          holds in the{" "}
          <a
            href="https://github.com/arto-app/Arto/blob/main/docs/configuration.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            configuration documentation
          </a>
          , and the shortcut file format in the{" "}
          <a
            href="https://github.com/arto-app/Arto/blob/main/docs/keybindings.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            keybindings documentation
          </a>
          .
        </p>
      </section>
    </article>,
    { title: "Install — Arto", current: "install" }
  );
});
