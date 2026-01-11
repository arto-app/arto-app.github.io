/**
 * Resolve asset/page path with Vite's BASE_URL.
 *
 * HonoX's <Link> and <Script> components use import.meta.env.BASE_URL internally,
 * but manually written href/src attributes need this helper to apply the base path.
 *
 * In development, BASE_URL is "/".
 * In production with GitHub Pages (BASE_PATH=/arto-site/), BASE_URL is "/arto-site/".
 *
 * @param path - Path starting with "/" (e.g., "/images/logo.svg")
 * @returns Path prefixed with BASE_URL (e.g., "/arto-site/images/logo.svg")
 */
export function basePath(path: string): string {
  const base = import.meta.env.BASE_URL;

  // Ensure base ends with "/" for proper concatenation
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  // If path starts with "/", remove it to avoid double slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${normalizedBase}${cleanPath}`;
}
