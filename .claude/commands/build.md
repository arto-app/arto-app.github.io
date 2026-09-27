# /build - Build Static Site

Build the static site for production deployment.

## Steps

1. Run the build:

   ```bash
   just build
   ```

   This runs two Vite passes: `--mode client` bundles `app/style.css` and
   `app/client.ts` into `dist/static/`, then the SSG pass renders every route
   in `app/routes/` to HTML.

2. Verify the output in `./dist`:
   - One `.html` per route (`index.html`, `features.html`, …)
   - `static/` - Bundled CSS and client JS
   - `images/`, `videos/` - Copied as-is from `public/`

3. Optionally preview locally:

   ```bash
   just preview
   ```

## Notes

- Set `BASE_PATH` to build for a sub-path (e.g. `BASE_PATH=/arto-site/`);
  it defaults to `/`.
