import { createRoute } from "honox/factory";
import {
  IconBrandApple,
  IconBrandNodejs,
  IconCode,
  IconCpu,
  IconDeviceDesktop,
  IconHomebrew,
  IconInfoCircle,
  IconNix,
  IconRust,
  IconVim,
} from "../../components/Icons";
import { CodeBlock } from "../../components/CodeBlock";

export default createRoute((c) => {
  return c.render(
    <>
      <header class="install-header">
        <h1 class="install-title">Install Arto</h1>
        <p class="install-subtitle">
          Get started with Arto in seconds. Choose your preferred installation
          method.
        </p>
      </header>

      <div class="install-content">
        {/* Homebrew */}
        <section class="install-section">
          <h2 class="install-section-title">
            <IconHomebrew class="install-icon" />
            Homebrew
            <span class="recommended-badge">Recommended</span>
          </h2>
          <p class="install-section-desc">
            The easiest way to install Arto on macOS. Homebrew handles
            installation and updates automatically.
          </p>
          <CodeBlock
            label="Terminal"
            code="brew install --cask arto-app/tap/arto"
          />
          <div class="install-note">
            <p class="install-note-title">
              <IconInfoCircle size={16} stroke={2} />
              Gatekeeper Note
            </p>
            <p class="install-note-text">
              Since Arto is not notarized yet, you may need to allow it in
              System Settings → Privacy & Security after first launch, or run:
            </p>
          </div>
          <div class="mt-16">
            <CodeBlock
              label="Terminal"
              code="xattr -dr com.apple.quarantine /Applications/Arto.app"
            />
          </div>
        </section>

        <div class="install-divider" />

        {/* Nix */}
        <section class="install-section">
          <h2 class="install-section-title">
            <IconNix class="install-icon" />
            Nix
          </h2>
          <p class="install-section-desc">
            For Nix users, Arto can be run directly from the flake or added to
            your configuration.
          </p>

          <h3 class="install-subsection-title">Try it out</h3>
          <CodeBlock label="Terminal" code="nix run github:arto-app/Arto" />

          <h3 class="install-subsection-title-spaced">Add to your flake</h3>
          <CodeBlock
            label="flake.nix"
            code={`{
  inputs = {
    arto.url = "github:arto-app/Arto";
  };

  outputs = { self, nixpkgs, arto, ... }: {
    # nix-darwin
    darwinConfigurations.your-host = darwin.lib.darwinSystem {
      modules = [
        {
          environment.systemPackages = [
            arto.packages.\${system}.default
          ];
        }
      ];
    };

    # home-manager
    homeConfigurations.your-user = home-manager.lib.homeManagerConfiguration {
      modules = [
        {
          home.packages = [
            arto.packages.\${system}.default
          ];
        }
      ];
    };
  };
}`}
          />
        </section>

        <div class="install-divider" />

        {/* Build from Source */}
        <section class="install-section">
          <h2 class="install-section-title">
            <IconCode class="install-icon" size={24} stroke={2} />
            Build from Source
          </h2>
          <p class="install-section-desc">
            For developers who want to build Arto from source or contribute to
            development.
          </p>

          <h3 class="install-subsection-title">Prerequisites</h3>
          <div class="install-requirements">
            <span class="install-requirement">
              <IconRust class="install-requirement-icon" />
              Rust toolchain
            </span>
            <span class="install-requirement">
              <IconBrandNodejs
                class="install-requirement-icon"
                size={16}
                stroke={2}
              />
              Node.js & pnpm
            </span>
            <span class="install-requirement">
              <IconBrandApple
                class="install-requirement-icon"
                size={16}
                stroke={2}
              />
              macOS
            </span>
          </div>

          <h3 class="install-subsection-title-spaced">Clone and build</h3>
          <CodeBlock
            label="Terminal"
            code={`git clone https://github.com/arto-app/Arto.git
cd Arto
pnpm install
cargo build --release`}
          />
        </section>

        <div class="install-divider" />

        {/* Vim Plugin */}
        <section class="install-section">
          <h2 class="install-section-title">
            <IconVim class="install-icon" />
            Vim / Neovim Plugin
          </h2>
          <p class="install-section-desc">
            Open Markdown files in Arto directly from Vim or Neovim with the
            official{" "}
            <a
              href="https://github.com/arto-app/arto.vim"
              target="_blank"
              rel="noopener noreferrer"
            >
              arto.vim
            </a>{" "}
            plugin.
          </p>

          <h3 class="install-subsection-title">vim-plug</h3>
          <CodeBlock label="~/.vimrc" code="Plug 'arto-app/arto.vim'" />

          <h3 class="install-subsection-title-spaced">lazy.nvim</h3>
          <CodeBlock
            label="lua"
            code="{ 'arto-app/arto.vim' }"
          />

          <div class="install-note-spaced">
            <p class="install-note-title">
              <IconInfoCircle size={16} stroke={2} />
              Requirements
            </p>
            <p class="install-note-text">
              Requires Vim 9.0+ or Neovim 0.10+, and Arto v0.15.0+ installed at{" "}
              <code>/Applications/Arto.app</code>.
            </p>
          </div>
        </section>

        <div class="install-divider" />

        {/* System Requirements */}
        <section class="install-section">
          <h2 class="install-section-title">
            <IconDeviceDesktop class="install-icon" size={24} stroke={2} />
            System Requirements
          </h2>
          <div class="install-requirements">
            <span class="install-requirement">
              <IconBrandApple
                class="install-requirement-icon"
                size={16}
                stroke={2}
              />
              macOS 11.0+
            </span>
            <span class="install-requirement">
              <IconCpu class="install-requirement-icon" size={16} stroke={2} />
              Apple Silicon
            </span>
          </div>
          <div class="install-note-spaced">
            <p class="install-note-title">
              <IconInfoCircle size={16} stroke={2} />
              Cross-Platform Support
            </p>
            <p class="install-note-text">
              Arto is currently macOS-only, but cross-platform support (Windows,
              Linux) is planned for future releases.
            </p>
          </div>
        </section>
      </div>
    </>,
    { title: "Install — Arto", current: "install" }
  );
});
