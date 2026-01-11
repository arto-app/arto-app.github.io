import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { basePath } from "../lib/path";

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { title: string; current: string }
    ): Response | Promise<Response>;
  }
}

export default jsxRenderer(({ children, title, current }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Arto is a beautiful, offline-first macOS app for reading Markdown with GitHub-style rendering."
        />
        <meta name="theme-color" content="#0d1117" />
        <title>{title}</title>
        <link rel="icon" href={basePath("/images/logo.svg")} type="image/svg+xml" />
        <Link href="/app/style.css" rel="stylesheet" />
      </head>
      <body>
        <Header current={current} />
        <main>{children}</main>
        <Footer />
        {import.meta.env.PROD ? (
          <script type="module" src={basePath("/static/client.js")} />
        ) : (
          <Script src="/app/client.ts" />
        )}
      </body>
    </html>
  );
});
