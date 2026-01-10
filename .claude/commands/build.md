# /build - Build Static Site

Build the static site for production deployment.

## Steps

1. Run the build:
   ```bash
   deno task build
   ```

2. Verify the output in `./dist`:
   - `index.html` - Home page
   - `features.html` - Features page
   - `install.html` - Installation page
   - `css/` - Stylesheets
   - `images/` - Logo and favicon
   - `.nojekyll` - GitHub Pages marker

3. Optionally preview locally:
   ```bash
   deno task serve
   ```

## Output

The build generates pure static HTML files that can be deployed to any static
hosting service.
