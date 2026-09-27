# Arto Site

Product website for Arto. Published at [arto-app.github.io](https://arto-app.github.io).

## Tech Stack

- **Framework**: [HonoX](https://github.com/honojs/honox) (Hono + Vite)
- **Build**: Vite SSG (Static Site Generation)
- **Icons**: [Tabler Icons](https://tabler.io/icons) + [Simple Icons](https://simpleicons.org/)
- **Deployment**: GitHub Pages

## Development

### Recommended: Nix

This project uses [Nix Flakes](https://nixos.wiki/wiki/Flakes) to provide a reproducible development environment.

```bash
# Enter development shell (Node.js 22 + just)
nix develop

# Install dependencies
just install

# Start dev server
just dev

# Build for production
just build

# Preview production build
just preview

# Type check
just check
```

### Alternative: npm

If you don't have Nix installed, you can use npm directly:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```
app/
├── routes/           # File-based routing
│   ├── _renderer.tsx # Layout
│   ├── index.tsx     # Home page
│   ├── features/     # Features page
│   ├── versions/     # Public version tracking page
│   └── install/      # Install page
├── components/       # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CodeBlock.tsx
│   ├── Figure.tsx    # Figures, theme-paired screenshots, window cascade
│   └── Icons.tsx
├── lib/
│   ├── arto-version.ts # Arto reference versions and sync log data
│   ├── image-size.ts   # Intrinsic size of every asset under public/images
│   └── path.ts         # Base-path helper for hand-written href/src
├── style.css         # Global styles
└── client.ts         # Client-side JS (theme toggle)

public/
├── images/           # Screenshots
└── videos/           # Motion clips and the walkthrough
```

### Screenshots

Every capture exists twice — `<name>-light` and `<name>-dark` — and that
holds for stills (`.webp` under `images/`) and for everything that moves
(`.mp4` under `videos/`) alike. `Shot` and `MotionFigure` each render both
and let CSS show the one matching the reader's theme, which is answered by
the site's own theme rather than by `prefers-color-scheme`: someone reading
this site in dark on a light desktop should not be shown the light artwork.

Stills are **lossless** WebP. On flat-colour interface captures that comes
out smaller than WebP at any quality setting — lossy spends its bits ringing
around the hard edges these images are made of — so there is no trade being
made: about 29% of the PNG for the same pixels. `og-image.png` is the one
exception and stays PNG, because it is read by other people's link
unfurlers rather than by a browser.

Clips are H.264 rather than animated GIF. A GIF has to quantise the whole
interface to 256 colours, which on this footage cost roughly six times the
bytes for a lower SSIM against the recording.

No clip carries `autoplay`, and none preloads. Both themes are in the markup
with CSS hiding one, so an `autoplay` attribute would fetch a file nobody
will see; `client.ts` starts whichever element is displayed once it scrolls
into view, and leaves them all alone — poster showing, controls on — for a
reader who asked for reduced motion. Each clip therefore needs a
`<name>-poster-<theme>.webp`, its own first frame, which is what stands in
before playback and permanently without JavaScript. WebP because a poster
is on screen for an instant: as PNG the posters together cost more than the
videos they introduce.

A new or re-cropped asset needs its pixel size recorded in
`app/lib/image-size.ts`, or the page reserves no space for it and jumps as it
loads. `imageSize` throws on a name it does not know, so the omission is loud.

Captures are taken against a throwaway `HOME`, so the app's own welcome page,
history and bookmarks show demo content rather than whatever the person
holding the camera happens to have open.

## Maintainer Notes

### Next Migration Checklist

1. Identify target commit:
Compare this repository's last update date with `../Arto`, then pin a specific Arto tag/commit.
2. Diff user-facing features:
Review Arto README and recent commits for additions that affect CLI, UI, rendering, and workflow.
3. Update version metadata first:
Change `app/lib/arto-version.ts` (current target and sync log), then align `features`/`install` content.

## License

MIT
