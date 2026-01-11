# Arto Site

Arto のプロダクトサイト。HonoX + Vite で構築された静的サイト。

## Tech Stack

- **Runtime**: Node.js
- **Framework**: HonoX (file-based routing on Hono)
- **Build**: Vite + @hono/vite-ssg
- **Styling**: CSS (in public/)
- **Deployment**: GitHub Pages

## Project Structure

```
app/
├── server.ts         # Hono app entry
├── client.ts         # Client-side entry
├── types.d.ts        # Type definitions
├── components/       # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Icons.tsx
│   └── CodeBlock.tsx
└── routes/           # File-based routing
    ├── _renderer.tsx # Layout wrapper
    └── index.tsx     # Home page

public/               # Static assets (served as-is)

dist/                 # Build output (git-ignored)
```

## Development Commands

```bash
just dev      # Start dev server with hot reload
just build    # Build static site
just preview  # Serve built site locally
just check    # Type check
just install  # Install dependencies
```

## Design System

This site follows Arto's design language:

- **Colors**: Uses Arto's CSS variables (light/dark themes)
- **Philosophy**: "控えめに" (Keep it subtle) - minimal, content-focused
- **Typography**: System fonts, 15px body text
- **Spacing**: Consistent padding (24-32px)

## Adding New Pages

1. Create route file in `app/routes/` (e.g., `app/routes/features.tsx`)
2. HonoX's file-based routing handles the rest automatically

## Deployment

Push to `main` branch triggers GitHub Actions workflow that:

1. Installs dependencies with `npm ci`
2. Builds static site with `npm run build`
3. Deploys to GitHub Pages
