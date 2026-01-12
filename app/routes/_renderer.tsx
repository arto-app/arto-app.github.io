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

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Arto is a beautiful, offline-first macOS app for reading Markdown with GitHub-style rendering."
        />
        <meta property="og:image" content="https://arto-app.github.io/images/og-image.png" />
        <meta property="og:url" content="https://arto-app.github.io/" />
        <meta property="og:site_name" content="Arto" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="Arto is a beautiful, offline-first macOS app for reading Markdown with GitHub-style rendering."
        />
        <meta name="twitter:image" content="https://arto-app.github.io/images/og-image.png" />

        <title>{title}</title>
        <link rel="icon" href={basePath("/images/logo.svg")} type="image/svg+xml" />
        <Link href="/app/style.css" rel="stylesheet" />

        {/* Google Tag Manager */}
        {import.meta.env.PROD && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TH8PDGRD');`,
            }}
          />
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {import.meta.env.PROD && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TH8PDGRD"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
