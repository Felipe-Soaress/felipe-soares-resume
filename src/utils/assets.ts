const SAFE_EXTERNAL_URL = /^(?:https:|mailto:|data:image\/)/i;
const ANY_SCHEME = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

/** Returns true only for explicitly allowed external URL schemes (blocks javascript:, data:text/html, //). */
export function isSafeExternalUrl(url: string): boolean {
  return SAFE_EXTERNAL_URL.test(url.trim());
}

/**
 * Resolves a file from `public/` against the deployed base path, so assets keep working
 * on GitHub Pages user sites (`/`), project sites (`/<repo>/`) and relative builds (`./`).
 * Safe external URLs (https:, mailto:, data:image/) are returned untouched; unsafe schemes return ''.
 */
export function resolveAssetUrl(assetPath: string, baseUrl: string = import.meta.env.BASE_URL ?? '/'): string {
  const trimmed = assetPath.trim();
  if (!trimmed) return '';
  if (SAFE_EXTERNAL_URL.test(trimmed)) return trimmed;
  if (ANY_SCHEME.test(trimmed)) return '';

  const base = baseUrl === '' ? '/' : baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const path = trimmed.replace(/^\/+/, '');
  return `${base}${path}`;
}
