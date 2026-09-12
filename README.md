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
├── images/           # Screenshots, GIFs
└── videos/           # Demo video
```

### Screenshots

Every screenshot exists twice, `<name>-light.png` and `<name>-dark.png`, and
`Shot` renders both so CSS can show the one matching the reader's theme. A new
or re-cropped asset needs its pixel size recorded in `app/lib/image-size.ts`,
or the page will not reserve space for it while it loads.

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
