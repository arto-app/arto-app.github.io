# /add-page - Add New Page

Add a new page to the Arto site.

## Arguments

- `$ARGUMENTS` - Page name (e.g., "about", "docs")

## Steps

1. Create the route at `app/routes/{page-name}/index.tsx`. HonoX's file-based
   routing picks it up; the SSG build writes it out as `{page-name}.html`.
   Follow the one-column document shape the other non-home pages use:

   ```tsx
   import { createRoute } from "honox/factory";

   export default createRoute((c) => {
     return c.render(
       <article class="doc">
         <header class="doc-masthead">
           <span class="doc-eyebrow">New Page</span>
           <h1 class="doc-title">…</h1>
           <p class="doc-lead">…</p>
         </header>

         <section class="doc-section">
           <h2 class="doc-section-title">…</h2>
           <p class="doc-p">…</p>
         </section>
       </article>,
       { title: "New Page — Arto", current: "new-page" },
     );
   });
   ```

2. Add the navigation link in `app/components/Header.tsx`. Hand-written
   `href`/`src` go through `basePath` so they survive a GitHub Pages sub-path:

   ```typescript
   const navItems: NavItem[] = [
     // ... existing items
     { href: basePath("/new-page"), label: "New Page", id: "new-page" },
   ];
   ```

   The `id` must match the `current` passed to `c.render`, which is how the
   header marks the active link.

3. Screenshots go in with `Shot` / `ShotFigure` / `MotionFigure` from
   `app/components/Figure.tsx`, as `-light` / `-dark` pairs, with each new
   asset's pixel size recorded in `app/lib/image-size.ts`.

4. Check and build:

   ```bash
   just check
   just build
   ```
