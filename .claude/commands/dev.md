# /dev - Start Development Server

Start the Hono development server with hot reload.

## Steps

1. Run the development server:
   ```bash
   deno task dev
   ```

2. Open browser to http://localhost:3000

3. The server watches for file changes and auto-reloads.

## Notes

- Static files are served from `./static`
- Changes to TSX files trigger page refresh
- Check both light and dark themes when making UI changes
