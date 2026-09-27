# Installation

## macOS

```sh
brew install --cask arto-app/tap/arto
xattr -dr com.apple.quarantine /Applications/Arto.app
```

## Linux

Download the `.deb` or the `.AppImage` from the releases page. The AppImage
needs WebKitGTK 4.1 installed on the system.

## Windows

Run the installer for your architecture. Where Microsoft's WebView2 runtime is
missing, the installer fetches it.

## Nix

```sh
nix run github:arto-app/Arto
```

Once it is installed, read [the command line](cli.md) for how to hand it
files.
