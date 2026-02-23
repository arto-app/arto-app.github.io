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
│   └── Icons.tsx
├── lib/
│   └── arto-version.ts # Arto reference versions and sync log data
├── style.css         # Global styles
└── client.ts         # Client-side JS (theme toggle, carousel)

public/
├── images/           # Screenshots, GIFs
└── videos/           # Demo video
```

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
