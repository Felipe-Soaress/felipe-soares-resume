# Felipe Soares — Resume & Portfolio

Bilingual (`pt-BR` / `en-US`), dark-default/light-toggleable, WCAG 2.1 AA-accessible resume and portfolio website built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, configured for automated **GitHub Pages** deployment.

## Features

- **Dark theme by default** with a high-contrast **Light theme** toggle, persisted in `localStorage` with an anti-FOUC inline `<script>` in `index.html`.
- **Automatic browser language detection** (`pt*` → `pt-BR`, fallback → `en-US`) with an always-visible `PT | EN` header switcher and dynamic `<html lang>` / `<title>` / meta description sync.
- **Resume PDF download** directly from the top header (and mobile menu).
- **Accessible by design**: skip-to-content link, semantic HTML5 landmarks, single `<h1>`, keyboard-navigable WAI-ARIA tabs for Skills (`ArrowLeft`/`ArrowRight`/`Home`/`End`), disclosure accordions for Experience, focus-restoring mobile drawer (`Escape` closes), `prefers-reduced-motion` support, and automated `axe-core` WCAG tests across all 4 theme × locale combinations.
- **Zero-config GitHub Pages deploy**: `.github/workflows/deploy.yml` uses `actions/configure-pages@v6` to derive the correct base path and canonical origin automatically for user sites (`<owner>.github.io`), project sites (`<owner>.github.io/<repo>/`), and custom domains (`CNAME`).

## Local Development

```bash
npm install
npm run dev
```

### Quality & Verification Scripts

```bash
npm run typecheck   # Strict TypeScript check
npm run lint        # ESLint + jsx-a11y + react-hooks
npm run test        # Vitest + React Testing Library + axe-core WCAG audits
npm run build       # Production bundle into dist/
npm run preview     # Preview production bundle locally
```

## Updating Content

### 1. Update Project Cards (Links & Screenshots)
Edit `src/data/projects.ts`:
- Replace `url: '#'` with your live project or repository URL (and update `ALL_PROJECTS_URL` when ready).
- Place project screenshots in `public/projects/` (e.g. `public/projects/game-ops.webp`) and set `image: 'projects/game-ops.webp'`. Static paths are automatically resolved against the GitHub Pages base path via `resolveAssetUrl()`.
- Localized titles, descriptions, and image `alt` text live in `src/i18n/en-US.ts` and `src/i18n/pt-BR.ts`.

### 2. Add a Portuguese Resume PDF Later
1. Drop your Portuguese PDF into `public/` (e.g. `public/felipe-soares-resume-pt.pdf`).
2. Update the `'pt-BR'` entry in `src/data/profile.ts` (`resumePdf['pt-BR']`) and adjust `nav.resume` / `a11y.resumeDownload` in `src/i18n/pt-BR.ts`.

## Deploying to GitHub Pages

1. Push this repository to GitHub (default branch `main`).
2. In your repository on GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Every push to `main` runs typecheck, lint, tests, builds `dist/` with the exact base path and Open Graph URLs, and deploys automatically.
