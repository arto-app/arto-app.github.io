# /add-page - Add New Page

Add a new page to the Arto site.

## Arguments

- `$ARGUMENTS` - Page name (e.g., "about", "docs")

## Steps

1. Create the page component at `src/pages/{PageName}.tsx`:
   - Use PascalCase for component name
   - Import `css` from `hono/css` for styles
   - Follow existing page structure

2. Add route in `src/main.tsx`:
   ```typescript
   import { NewPage } from "./pages/NewPage.tsx";

   app.get("/new-page", (c) => {
     return c.html(
       <Layout title="New Page — Arto" current="new-page">
         <NewPage />
       </Layout>,
     );
   });
   ```

3. Add navigation link in `src/components/Layout.tsx`:
   ```typescript
   const navItems: NavItem[] = [
     // ... existing items
     { href: "/new-page", label: "New Page", id: "new-page" },
   ];
   ```

4. Rebuild and test:
   ```bash
   deno task build
   ```
