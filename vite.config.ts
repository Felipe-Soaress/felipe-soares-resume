/// <reference types="vitest/config" />
import { createHash } from 'node:crypto';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_SITE_URL = 'https://felipe-soaress.github.io/';

/** Ensures a base path always starts and ends with a single slash (or stays relative "./"). */
function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/';
  if (raw === './' || raw === '.') return './';
  const trimmed = raw.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function normalizeSiteUrl(raw: string | undefined): string {
  const value = raw && /^https?:\/\//.test(raw) ? raw : DEFAULT_SITE_URL;
  return value.endsWith('/') ? value : `${value}/`;
}

/** Injects absolute canonical / Open Graph URLs into index.html at build time. */
function seoUrlsPlugin(siteUrl: string): Plugin {
  return {
    name: 'resume-seo-urls',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', siteUrl)
        .replaceAll('%OG_IMAGE_URL%', `${siteUrl}og-image.png`);
    },
  };
}

/**
 * Injects a strict Content-Security-Policy meta tag on production builds,
 * automatically hashing the inline theme/locale bootstrap script.
 */
function securityCspPlugin(): Plugin {
  return {
    name: 'resume-security-csp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const inlineScriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
        const scriptHash = inlineScriptMatch
          ? `'sha256-${createHash('sha256').update(inlineScriptMatch[1], 'utf8').digest('base64')}'`
          : '';
        const csp = [
          "default-src 'self'",
          `script-src 'self'${scriptHash ? ` ${scriptHash}` : ''}`,
          "style-src 'self' https://fonts.googleapis.com",
          "style-src-attr 'unsafe-inline'",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
        ].join('; ');

        return html.replace(
          '<meta name="referrer" content="strict-origin-when-cross-origin" />',
          `<meta name="referrer" content="strict-origin-when-cross-origin" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
        );
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const base = normalizeBase(process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? env.VITE_SITE_URL);

  return {
    base,
    plugins: [react(), tailwindcss(), seoUrlsPlugin(siteUrl), securityCspPlugin()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      restoreMocks: true,
    },
  };
});
