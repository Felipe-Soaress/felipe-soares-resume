/// <reference types="vitest/config" />
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const base = normalizeBase(process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? env.VITE_SITE_URL);

  return {
    base,
    plugins: [react(), tailwindcss(), seoUrlsPlugin(siteUrl)],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      restoreMocks: true,
    },
  };
});
