# Arto Site

Arto のプロダクトサイト。HonoX + Vite で構築された静的サイト。

## Tech Stack

- **Runtime**: Node.js
- **Framework**: HonoX (file-based routing on Hono)
- **Build**: Vite + @hono/vite-ssg
- **Styling**: CSS (`app/style.css`)
- **Deployment**: GitHub Pages

## Project Structure

```
app/
├── server.ts         # Hono app entry
├── client.ts         # Client-side entry (theme toggle)
├── style.css         # Global styles
├── types.d.ts        # Type definitions
├── components/       # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Icons.tsx
│   ├── CodeBlock.tsx
│   └── Figure.tsx    # Figures, theme-paired screenshots, window cascade
├── lib/
│   ├── arto-version.ts # Which Arto version the site describes, and the sync log
│   ├── image-size.ts   # Intrinsic size of every asset under public/images
│   └── path.ts         # Base-path helper for hand-written href/src
└── routes/           # File-based routing
    ├── _renderer.tsx # Layout wrapper
    └── index.tsx     # Home page

public/               # Static assets (served as-is)

dist/                 # Build output (git-ignored)
```

## Screenshots

Every capture is a `-light` / `-dark` pair — lossless WebP stills in
`public/images`, H.264 clips and the walkthrough in `public/videos` — placed
with `Shot` / `ShotFigure` / `MotionFigure` from `components/Figure.tsx`; CSS
shows whichever matches the reader's theme. Neither format is a compromise on
this material: lossless WebP is about 29% of the PNG for identical pixels, and
H.264 about a sixth of the GIF for a better picture. Record a new asset's
pixel size in `lib/image-size.ts` — without it the page reserves no space and
jumps as the asset loads.

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
- **Typography**: System fonts, 16px body text, prose capped at a 700px measure
- **Layout**: Two shapes. The home page is a landing page (`.lp-*`) — a centred
  hero, then rows alternating a claim against the screenshot backing it, with
  full-width bands breaking the rhythm. Every other page is one document column
  (`.doc-*`) — a masthead, then `.doc-section` headings with figures that reach
  wider than the text they illustrate.

## Adding New Pages

1. Create route file in `app/routes/` (e.g., `app/routes/features.tsx`)
2. HonoX's file-based routing handles the rest automatically

## Deployment

Push to `main` branch triggers GitHub Actions workflow that:

1. Installs dependencies with `npm ci`
2. Builds static site with `npm run build`
3. Deploys to GitHub Pages
