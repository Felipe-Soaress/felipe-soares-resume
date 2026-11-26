const EXTERNAL_URL = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

/**
 * Resolves a file from `public/` against the deployed base path, so assets keep working
 * on GitHub Pages user sites (`/`), project sites (`/<repo>/`) and relative builds (`./`).
 * Absolute URLs (https:, data:, mailto:, protocol-relative) are returned untouched.
 */
export function resolveAssetUrl(assetPath: string, baseUrl: string = import.meta.env.BASE_URL ?? '/'): string {
  if (EXTERNAL_URL.test(assetPath)) return assetPath;

  const base = baseUrl === '' ? '/' : baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const path = assetPath.replace(/^\/+/, '');
  return `${base}${path}`;
}
