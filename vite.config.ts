import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import honox from "honox/vite";
import ssg from "@hono/vite-ssg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages base path (set via environment variable or default to root)
const base = process.env.BASE_PATH ?? "/";

export default defineConfig(({ mode }) => {
  // Client build (CSS + JS)
  if (mode === "client") {
    return {
      base,
      build: {
        rollupOptions: {
          input: ["/app/style.css", "/app/client.ts"],
          output: {
            entryFileNames: "static/[name].js",
            assetFileNames: "static/[name][extname]",
          },
        },
        outDir: "dist",
        emptyOutDir: false,
        manifest: true,
      },
    };
  }

  // SSG build (default)
  return {
    base,
    build: {
      emptyOutDir: false, // Don't overwrite client build assets
    },
    plugins: [
      honox({
        client: {
          input: ["/app/style.css", "/app/client.ts"],
        },
        devServer: {
          // Pass base path to @hono/vite-dev-server to fix import.meta.env.BASE_URL
          base,
        },
      }),
      ssg({ entry: "./app/server.ts" }),
    ],
    resolve: {
      alias: {
        // @tabler/icons doesn't export JSON files by default
        "@tabler/icons/tabler-nodes-outline.json": path.resolve(
          __dirname,
          "node_modules/@tabler/icons/tabler-nodes-outline.json"
        ),
      },
    },
  };
});
