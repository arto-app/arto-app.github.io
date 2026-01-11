# Arto Site

Product website for Arto. Published at [arto-app.github.io/arto-site](https://arto-app.github.io/arto-site).

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
│   └── install/      # Install page
├── components/       # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CodeBlock.tsx
│   └── Icons.tsx
├── style.css         # Global styles
└── client.ts         # Client-side JS (theme toggle, carousel)

public/
├── images/           # Screenshots, GIFs
└── videos/           # Demo video
```

## License

MIT
