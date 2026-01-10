# Arto Site

Arto のプロダクトサイト。Hono + SSG で構築された静的サイト。

## Tech Stack

- **Runtime**: Deno
- **Framework**: Hono (with SSG helper)
- **Styling**: hono/css (CSS-in-JS)
- **Deployment**: GitHub Pages

## Project Structure

```
src/
├── main.tsx          # Hono app with routes
├── build.tsx         # SSG build script
├── dev.tsx           # Development server
├── components/       # Shared components
│   └── Layout.tsx    # Common layout wrapper
└── pages/            # Page components
    ├── Home.tsx
    ├── Features.tsx
    └── Install.tsx

static/               # Static assets (copied to dist/)
├── css/style.css     # Global styles
└── images/           # Logo, favicon, etc.

dist/                 # Build output (git-ignored)
```

## Development Commands

```bash
just dev      # Start dev server with hot reload
just build    # Build static site
just serve    # Serve built site locally
just check    # Format check + type check
just fmt      # Format code
```

## Design System

This site follows Arto's design language:

- **Colors**: Uses Arto's CSS variables (light/dark themes)
- **Philosophy**: "控えめに" (Keep it subtle) - minimal, content-focused
- **Typography**: System fonts, 15px body text
- **Spacing**: Consistent padding (24-32px)

## Adding New Pages

1. Create page component in `src/pages/NewPage.tsx`
2. Add route in `src/main.tsx`
3. Update navigation in `src/components/Layout.tsx`

## Deployment

Push to `main` branch triggers GitHub Actions workflow that:

1. Builds static site with `deno task build`
2. Deploys to GitHub Pages
