# Project Rules

## Code Style

- TypeScript strict mode
- JSX with Hono's JSX runtime (`hono/jsx`)

## Component Guidelines

- Route components go in `app/routes/`
- Shared components go in `app/components/`
- Global styles in `public/`

## CSS Variables

Always use CSS variables from Arto's design system:

```css
var(--text-color)       /* Primary text */
var(--text-secondary)   /* Secondary text */
var(--bg-color)         /* Background */
var(--header-bg)        /* Header/card background */
var(--border-color)     /* Borders */
var(--link-color)       /* Links and accents */
var(--hover-bg)         /* Hover states */
var(--accent-bg)        /* Primary buttons */
var(--accent-fg)        /* Primary button text */
```

## Testing Changes

1. Run `just dev` to start development server
2. Check both light and dark themes
3. Verify responsive layout on mobile widths
4. Run `just build` before committing

## Imports

Standard ES module imports:

```typescript
import { Hono } from "hono";
import { css } from "hono/css";
```
