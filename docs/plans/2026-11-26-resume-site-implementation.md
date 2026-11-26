# Felipe Soares Resume & Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a static, bilingual (`pt-BR`/`en-US`), dark-default/light-toggleable, WCAG 2.1 AA-accessible React + TypeScript resume & portfolio website ready for automated GitHub Pages deployment.

**Architecture:** Single-page static React 19 + Vite + Tailwind CSS v4 application using CSS custom property theme tokens (`:root` dark default, `[data-theme="light"]`), a synchronous anti-FOUC script in `index.html`, strictly typed zero-dependency i18n dictionaries, and separated data modules (`src/data/`) so projects, resume PDFs, and career entries update without touching JSX. Quality is enforced via Vitest + React Testing Library + `vitest-axe`, ESLint (`jsx-a11y`), strict TypeScript, and a GitHub Actions workflow using `actions/configure-pages@v5`.

**Tech Stack:** React 19, TypeScript 5 (strict), Vite 6, Tailwind CSS v4, Lucide React, Vitest, React Testing Library, `vitest-axe`, ESLint (`eslint-plugin-jsx-a11y`), GitHub Actions + GitHub Pages.

**Spec:** `docs/specs/2026-11-26-resume-site-design.md`

---

## Global Constraints

- Project root is `C:\Users\felip\Projects\felipe-soares-resume` (Node v26.x, npm v11.x).
- Runtime dependencies limited strictly to `react`, `react-dom`, `lucide-react`.
- Dark mode is default (`data-theme="dark"`); persisted under `localStorage` key `felipe-resume-theme` (`'dark' | 'light'`).
- Bilingual `en-US` and `pt-BR`; persisted under `localStorage` key `felipe-resume-locale`; auto-detects browser language (`pt*` → `'pt-BR'`, `en*` → `'en-US'`, fallback → `'en-US'`).
- Language switcher (`PT | EN`) and theme toggle MUST remain visible in the top header at all viewports (never hidden inside the collapsed mobile drawer).
- Top header includes a Resume PDF download link using `public/felipe-soares-resume-en.pdf` (copied from `c:\Users\felip\Downloads\main.pdf`) with `download="Felipe-Soares-Resume.pdf"` and label `Resume` (`en-US`) / `Currículo (EN)` (`pt-BR`).
- All static asset URLs resolve via `resolveAssetUrl()` using `import.meta.env.BASE_URL` (no hardcoded root-absolute paths).
- Experience badge displays `8+` years (`05/2018 – 11/2026`); public HTML exposes Email (`felipe.2013@alunos.utfpr.edu.br`), LinkedIn (`https://www.linkedin.com/in/felipe-soares-dev/`), and GitHub (`https://github.com/Felipe-Soaress`), omitting phone number.
- All 3 project cards and `View all projects` link point to `href="#"` with `image: null` and custom SVG placeholder artwork; clicking a `#` placeholder must prevent viewport jump.
- WCAG 2.1 AA compliance: skip link, semantic landmarks, single `<h1>`, no skipped heading levels, ≥ 4.5:1 normal-text contrast in both themes, keyboard support for tabs/accordions/drawer, `prefers-reduced-motion`, and zero `vitest-axe` violations across all 4 theme × locale combinations.
- All 4 career roles (17 achievement bullets), Fortis Games metric (`2,500+ commits`, `30+ repos`), full technical skills matrix, 6 soft skills, and UTFPR education + LEGO Robotics extension from Spec Section 10 must be faithfully represented in both `en-US` and `pt-BR`.

## Review Focus

1. **`localStorage` throws `SecurityError` (strict privacy mode / sandboxed iframe):** `ThemeProvider` and `LanguageProvider` must catch storage access errors and still initialize cleanly (`dark`, browser-detected locale) and toggle in memory without throwing. *(Pinned in Task 2)*
2. **Corrupted `localStorage` values (`felipe-resume-theme="sepia"`, `felipe-resume-locale="fr-FR"`):** Must be ignored and fall back to valid defaults without crashing or missing dictionary keys. *(Pinned in Task 2)*
3. **Subpath `BASE_URL` normalization (`"/felipe-soares-resume/"`, `"/repo"`, `"./"`):** `resolveAssetUrl()` must never emit double slashes (`//`) or drop the base prefix for PDFs and future project images. *(Pinned in Task 1)*
4. **Placeholder project card links (`href="#"`) vs. real URLs:** Clicking a `#` card prevents default scroll-to-top jump, while replacing `url` with an `https://` link allows normal navigation without preventing default. *(Pinned in Task 5)*
5. **Clipboard failure in Contact copy-email + Mobile drawer `Escape` cleanup:** Rejected `navigator.clipboard.writeText` must degrade gracefully with accessible error feedback (no unhandled rejection); pressing `Escape` in `MobileMenu` must close the drawer, unlock `document.body.style.overflow`, and return focus to the menu trigger. *(Pinned in Tasks 4 & 7)*

---

## File Structure

- `index.html` — Anti-FOUC theme `<script>`, Google Fonts (`Plus Jakarta Sans`, `Inter`), SEO/OG meta + JSON-LD `Person` with Vite HTML token placeholders.
- `vite.config.ts` — Vite + React + Tailwind v4 + `transformIndexHtml` origin/base URL injection + Vitest jsdom config.
- `eslint.config.js` — Flat ESLint config with TypeScript, `react-hooks`, and `jsx-a11y`.
- `public/favicon.svg`, `public/og-image.png`, `public/felipe-soares-resume-en.pdf` — Static assets.
- `src/styles/theme.css` — Tailwind v4 `@import`, `:root` dark & `[data-theme="light"]` CSS tokens, `:focus-visible`, `prefers-reduced-motion`.
- `src/utils/assets.ts` — `resolveAssetUrl(relativePath, baseUrl?)` helper.
- `src/i18n/{types,en-US,pt-BR}.ts` — Strict translation schema and complete localized copy.
- `src/data/{profile,projects,experience,skills}.ts` — Structured non-localized metadata, URLs, tags, and IDs.
- `src/context/{ThemeContext,LanguageContext}.tsx` — Theme and locale state providers + hooks.
- `src/components/icons/{BrandLogo,SocialIcons,SkillIcons}.tsx` — Custom geometric SVG brand monogram and icon sets.
- `src/components/ui/{SectionHeading,Badge,ProjectPlaceholder}.tsx` — Shared UI primitives and 3 thematic SVG project placeholders.
- `src/components/layout/{SkipLink,ThemeToggle,LanguageSwitcher,MobileMenu,Header,Footer}.tsx` — Page shell and navigation controls.
- `src/components/sections/{Hero,About,Projects,Experience,Skills,Contact}.tsx` — Core content sections.
- `src/App.tsx`, `src/main.tsx` — Root composition and entry point.
- `.github/workflows/deploy.yml`, `README.md` — CI/CD pipeline for GitHub Pages and maintenance guide.

---

### Task 1: Project Scaffold, Tooling, Assets & Base-Path Utility

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`, `.gitignore`
- Create: `index.html`, `src/styles/theme.css`, `src/test/setup.ts`, `src/utils/assets.ts`
- Create: `public/favicon.svg`, `public/og-image.png`, `public/felipe-soares-resume-en.pdf` (copied from `c:\Users\felip\Downloads\main.pdf`)
- Test: `src/utils/assets.test.ts`

**Interfaces:**
- Consumes: `c:\Users\felip\Downloads\main.pdf`
- Produces:
  - `resolveAssetUrl(assetPath: string, baseUrl?: string): string` in `src/utils/assets.ts`
  - npm scripts: `dev`, `build`, `preview`, `typecheck`, `lint`, `test`
  - CSS theme tokens from Spec Section 4.2 in `src/styles/theme.css`

- [ ] **Step 1: Initialize git repo and scaffold project configuration files**
  Initialize git in `C:\Users\felip\Projects\felipe-soares-resume` (`git init -b main`), create `.gitignore` (ignoring `node_modules`, `dist`, `.vite`, `coverage`), `package.json` with exact runtime deps (`react`, `react-dom`, `lucide-react`) and dev deps (`vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `typescript`, `@types/react`, `@types/react-dom`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `jsdom`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `globals`), strict `tsconfig` files, `eslint.config.js` enabling `jsxA11y.flatConfigs.recommended`, and `vite.config.ts` reading `VITE_BASE_PATH` (default `'/'`) and `VITE_SITE_URL` (default `'https://felipe-soaress.github.io/'`) with a `transformIndexHtml` plugin replacing `%SITE_URL%` and `%OG_IMAGE_URL%`. Run `npm install`.

- [ ] **Step 2: Create static assets, `index.html`, `src/styles/theme.css`, and `src/test/setup.ts`**
  - Copy `c:\Users\felip\Downloads\main.pdf` to `public/felipe-soares-resume-en.pdf`.
  - Create `public/favicon.svg` (geometric gradient `F` monogram matching Spec Section 4.3).
  - Generate crisp `1200×630` raster `public/og-image.png` matching the dark `#060913` + cyan-indigo-violet aesthetic (`Felipe Soares` / `Senior Frontend Engineer` / `React · TypeScript · 8+ Years`).
  - Create `index.html` with synchronous `<script>` in `<head>` reading `localStorage.getItem('felipe-resume-theme')` inside `try/catch` (defaulting to `'dark'`, setting `document.documentElement.dataset.theme` and `colorScheme`), Google Fonts `Plus Jakarta Sans` + `Inter` (`display=swap`), Open Graph + Twitter meta tags using `%SITE_URL%` / `%OG_IMAGE_URL%`, and JSON-LD `Person` schema.
  - Create `src/styles/theme.css` defining all CSS custom properties from Spec Section 4.2 for `:root` (dark) and `[data-theme="light"]`, utility gradient text/border classes, `:focus-visible` ring, smooth scroll, and `@media (prefers-reduced-motion: reduce)`.
  - Create `src/test/setup.ts` importing `@testing-library/jest-dom/vitest`, extending `expect` with `vitest-axe/matchers`, and mocking `window.matchMedia` for jsdom.

- [ ] **Step 3: Write the failing test for `resolveAssetUrl` (pins Review Focus #3)**

```ts
// src/utils/assets.test.ts
import { describe, expect, it } from 'vitest';
import { resolveAssetUrl } from './assets';

describe('resolveAssetUrl', () => {
  it('joins asset paths cleanly against root base', () => {
    expect(resolveAssetUrl('felipe-soares-resume-en.pdf', '/')).toBe('/felipe-soares-resume-en.pdf');
    expect(resolveAssetUrl('/felipe-soares-resume-en.pdf', '/')).toBe('/felipe-soares-resume-en.pdf');
  });

  it('preserves GitHub Pages subpath without double slashes', () => {
    expect(resolveAssetUrl('/felipe-soares-resume-en.pdf', '/felipe-soares-resume/')).toBe(
      '/felipe-soares-resume/felipe-soares-resume-en.pdf',
    );
    expect(resolveAssetUrl('images/demo.png', '/felipe-soares-resume')).toBe(
      '/felipe-soares-resume/images/demo.png',
    );
  });

  it('handles relative dot-slash base and preserves external URLs', () => {
    expect(resolveAssetUrl('og-image.png', './')).toBe('./og-image.png');
    expect(resolveAssetUrl('https://example.com/img.png', '/repo/')).toBe('https://example.com/img.png');
  });
});
```

- [ ] **Step 4: Run test to verify it fails**
  Run: `npx vitest run src/utils/assets.test.ts`
  Expected: FAIL with module `./assets` not found.

- [ ] **Step 5: Implement `resolveAssetUrl(assetPath: string, baseUrl?: string): string` in `src/utils/assets.ts`**
  Return `assetPath` unchanged if it starts with `http://`, `https://`, or `data:`; otherwise normalize `baseUrl ?? import.meta.env.BASE_URL ?? '/'` to end with a single `/` and strip any leading `/` from `assetPath`.

- [ ] **Step 6: Verify tests, typecheck, and lint pass, then commit**
  Run: `npx vitest run src/utils/assets.test.ts && npm run typecheck && npm run lint`
  Expected: All 3 tests PASS, 0 TS errors, 0 ESLint errors.
  Commit: `chore: scaffold react vite tailwind project, assets, theme tokens, and base-url helper`

---

### Task 2: Typed Data Layer, Bilingual i18n Dictionaries & Context Providers

**Files:**
- Create: `src/i18n/types.ts`, `src/i18n/en-US.ts`, `src/i18n/pt-BR.ts`
- Create: `src/data/profile.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`
- Create: `src/context/ThemeContext.tsx`, `src/context/LanguageContext.tsx`
- Test: `src/i18n/dictionaries.test.ts`, `src/context/ThemeContext.test.tsx`, `src/context/LanguageContext.test.tsx`

**Interfaces:**
- Consumes: `resolveAssetUrl` (Task 1)
- Produces:
  - `type Theme = 'dark' | 'light'`, `THEME_STORAGE_KEY = 'felipe-resume-theme'`, `ThemeProvider`, `useTheme(): { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }`
  - `type Locale = 'en-US' | 'pt-BR'`, `LOCALE_STORAGE_KEY = 'felipe-resume-locale'`, `detectBrowserLocale(languages?: readonly string[], language?: string): Locale`, `LanguageProvider`, `useLanguage(): { locale: Locale; setLocale: (l: Locale) => void; t: TranslationDictionary }`
  - `PROFILE` (`src/data/profile.ts`), `PROJECTS: readonly ProjectItem[]` (`src/data/projects.ts`), `EXPERIENCE_ITEMS: readonly ExperienceItem[]` + `EDUCATION` (`src/data/experience.ts`), `SKILL_CATEGORIES: readonly SkillCategory[]` + `SOFT_SKILL_IDS` (`src/data/skills.ts`)

- [ ] **Step 1: Write failing tests for dictionaries, `ThemeContext`, and `LanguageContext` (pins Review Focus #1 & #2)**

```ts
// src/i18n/dictionaries.test.ts
import { describe, expect, it } from 'vitest';
import { enUS } from './en-US';
import { ptBR } from './pt-BR';
import { EXPERIENCE_ITEMS } from '../data/experience';
import { PROJECTS } from '../data/projects';

describe('i18n dictionaries', () => {
  it('cover all 4 roles and all 17 achievements in both locales', () => {
    expect(EXPERIENCE_ITEMS).toHaveLength(4);
    for (const dict of [enUS, ptBR]) {
      const totalBullets = EXPERIENCE_ITEMS.reduce(
        (sum, role) => sum + dict.experience.roles[role.id].achievements.length,
        0,
      );
      expect(totalBullets).toBe(17);
      expect(PROJECTS.every((p) => Boolean(dict.projects.items[p.id]?.title))).toBe(true);
    }
  });
});
```

```tsx
// src/context/ThemeContext.test.tsx
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, THEME_STORAGE_KEY } from './ThemeContext';

function Consumer() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('defaults to dark, toggles to light, and persists', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><Consumer /></ThemeProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('ignores corrupted localStorage values and handles SecurityError gracefully', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    const { unmount } = render(<ThemeProvider><Consumer /></ThemeProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('dark');
    unmount();

    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const user = userEvent.setup();
    render(<ThemeProvider><Consumer /></ThemeProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('dark');
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('light');
    spy.mockRestore();
    setSpy.mockRestore();
  });
});
```

```tsx
// src/context/LanguageContext.test.tsx
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  LanguageProvider,
  useLanguage,
  detectBrowserLocale,
  LOCALE_STORAGE_KEY,
} from './LanguageContext';

function Consumer() {
  const { locale, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale('pt-BR')}>PT</button>
      <button onClick={() => setLocale('en-US')}>EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('detects pt* as pt-BR and falls back to en-US for other languages', () => {
    expect(detectBrowserLocale(['pt-BR', 'en-US'])).toBe('pt-BR');
    expect(detectBrowserLocale(['pt-PT'])).toBe('pt-BR');
    expect(detectBrowserLocale(['fr-FR', 'es-ES'])).toBe('en-US');
    expect(detectBrowserLocale([], 'en-GB')).toBe('en-US');
  });

  it('syncs document.documentElement.lang, ignores invalid saved locale, and handles storage SecurityError', async () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr-FR');
    const langSpy = vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['de-DE']);
    const user = userEvent.setup();
    const { unmount } = render(<LanguageProvider><Consumer /></LanguageProvider>);
    expect(screen.getByTestId('locale')).toHaveTextContent('en-US');
    expect(document.documentElement.lang).toBe('en-US');

    await user.click(screen.getByRole('button', { name: 'PT' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('pt-BR');
    unmount();

    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    render(<LanguageProvider><Consumer /></LanguageProvider>);
    expect(screen.getByTestId('locale')).toHaveTextContent('en-US');
    await user.click(screen.getByRole('button', { name: 'PT' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    langSpy.mockRestore();
    getSpy.mockRestore();
    setSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**
  Run: `npx vitest run src/i18n/dictionaries.test.ts src/context/ThemeContext.test.tsx src/context/LanguageContext.test.tsx`
  Expected: FAIL with missing modules.

- [ ] **Step 3: Implement typed data files and complete bilingual dictionaries**
  - Create `src/data/profile.ts` with `PROFILE` (name `'Felipe Soares'`, fullName `'Felipe Soares da Silva'`, email `'felipe.2013@alunos.utfpr.edu.br'`, linkedin `'https://www.linkedin.com/in/felipe-soares-dev/'`, github `'https://github.com/Felipe-Soaress'`, experienceYears `8`, commitsCount `'2,500+'`, reposCount `'30+'`, and `resumePdf: Record<Locale, { file: string; downloadName: string; isEnglishOnly?: boolean }>` pointing to `'felipe-soares-resume-en.pdf'`).
  - Create `src/data/projects.ts` with the 3 placeholder projects (`'game-ops-platform'`, `'analytics-moderation'`, `'web-game-lab'`), each with `url: '#'`, `image: null`, `placeholderVariant`, `icon`, and `tags` from Spec Section 6.
  - Create `src/data/experience.ts` with the 4 roles (`'fortis-se2'`, `'fortis-se1'`, `'oktagon-fe'`, `'yankton-fs'`), exact ISO date metadata (`startDate`, `endDate`), `previewTags`, full `technologies` lists from Spec Section 10.5, and `EDUCATION` (`'utfpr'`, `2017–2019`).
  - Create `src/data/skills.ts` with the 5 tabs (`'core'`, `'frontend'`, `'architecture'`, `'backend-ai'`, `'testing-devops'`) covering 100% of Spec Section 10.3 (with the exact 8 featured items in `'core'`) and the 6 `SOFT_SKILL_IDS`.
  - Create `src/i18n/types.ts`, `src/i18n/en-US.ts`, and `src/i18n/pt-BR.ts` implementing the full `TranslationDictionary` (all UI labels, ARIA strings, Hero, About + 4 pillars, 3 Projects, all 4 roles & 17 achievements faithfully adapted from Spec Section 10.5, UTFPR education + 4 coursework chips + LEGO Robotics extension, Skills labels, Soft Skills, Contact, and Footer).

- [ ] **Step 4: Implement `ThemeContext.tsx` and `LanguageContext.tsx`**
  - `ThemeContext.tsx`: read `THEME_STORAGE_KEY` inside `try/catch`, accept only `'dark' | 'light'`, default `'dark'`; `useEffect` syncs `document.documentElement.dataset.theme` and `style.colorScheme` and writes `localStorage` inside `try/catch`.
  - `LanguageContext.tsx`: `detectBrowserLocale` checks `languages` in order (first `pt*` → `'pt-BR'`, first `en*` → `'en-US'`), falling back to `language` and then `'en-US'`; read/write `LOCALE_STORAGE_KEY` inside `try/catch`; `useEffect` updates `document.documentElement.lang`, `document.title`, and `<meta name="description">`.

- [ ] **Step 5: Run tests, typecheck, and lint, then commit**
  Run: `npx vitest run src/i18n/dictionaries.test.ts src/context/ThemeContext.test.tsx src/context/LanguageContext.test.tsx && npm run typecheck && npm run lint`
  Expected: All tests PASS, 0 errors.
  Commit: `feat: add typed cv data, bilingual en-US/pt-BR dictionaries, and theme/language providers`

---

### Task 3: Shared Icons & UI Primitives

**Files:**
- Create: `src/components/icons/BrandLogo.tsx`, `src/components/icons/SocialIcons.tsx`, `src/components/icons/SkillIcons.tsx`
- Create: `src/components/ui/SectionHeading.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/ProjectPlaceholder.tsx`
- Test: `src/components/ui/ui.test.tsx`

**Interfaces:**
- Consumes: `ProjectPlaceholderVariant` (`'game-ops' | 'analytics-moderation' | 'web-game-lab'`) and `SkillIconId` from `src/data/`
- Produces:
  - `BrandLogo({ className?: string })` — geometric gradient `F` monogram (`aria-hidden="true"`, unique gradient ID via `useId()`)
  - `LinkedInIcon`, `GitHubIcon` (`aria-hidden="true"`)
  - `SkillIcon({ id: SkillIconId; className?: string })` (`aria-hidden="true"`)
  - `SectionHeading({ id: string; eyebrow: string; title: string; accentTitle?: string; description?: string })`
  - `Badge({ children: ReactNode; variant?: 'default' | 'accent' | 'status'; className?: string })`
  - `ProjectPlaceholder({ variant: ProjectPlaceholderVariant })` (`aria-hidden="true"` thematic SVG artwork matching dark & light tokens)

- [ ] **Step 1: Write failing test for UI primitives and SVG accessibility**

```tsx
// src/components/ui/ui.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';
import { ProjectPlaceholder } from './ProjectPlaceholder';
import { BrandLogo } from '../icons/BrandLogo';

describe('UI primitives', () => {
  it('renders SectionHeading with accessible h2 id and eyebrow', () => {
    render(<SectionHeading id="skills-heading" eyebrow="Technical Expertise" title="Technologies & Skills" />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Technologies & Skills' });
    expect(heading).toHaveAttribute('id', 'skills-heading');
    expect(screen.getByText('Technical Expertise')).toBeInTheDocument();
  });

  it('marks decorative brand and project placeholder SVGs as aria-hidden', () => {
    const { container } = render(
      <>
        <BrandLogo />
        <ProjectPlaceholder variant="game-ops" />
        <ProjectPlaceholder variant="analytics-moderation" />
        <ProjectPlaceholder variant="web-game-lab" />
      </>,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/ui/ui.test.tsx`
  Expected: FAIL with missing modules.

- [ ] **Step 3: Implement icons (`BrandLogo`, `SocialIcons`, `SkillIcons`) and UI primitives (`SectionHeading`, `Badge`, `ProjectPlaceholder`)**
  - Use `React.useId()` inside SVG `<defs>` (`linearGradient` IDs) so multiple instances on the page never collide on DOM IDs.
  - `SectionHeading` renders the tracked uppercase eyebrow + `48px` accent hairline rule from Spec Section 4.3 above `<h2 id={id}>`.
  - `ProjectPlaceholder` renders 3 distinct, refined vector scenes (game ops dashboard panels, analytics chart/moderation grid, isometric web game terrain) styled with CSS theme variables so they look cohesive in both Dark and Light themes.

- [ ] **Step 4: Run tests, typecheck, and lint, then commit**
  Run: `npx vitest run src/components/ui/ui.test.tsx && npm run typecheck && npm run lint`
  Expected: PASS, 0 errors.
  Commit: `feat: add brand/skill icons, section heading, badge, and thematic project placeholders`

---

### Task 4: Accessible Navigation Shell (`SkipLink`, `Header`, `ThemeToggle`, `LanguageSwitcher`, `MobileMenu`)

**Files:**
- Create: `src/components/layout/SkipLink.tsx`, `src/components/layout/ThemeToggle.tsx`, `src/components/layout/LanguageSwitcher.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Header.tsx`
- Test: `src/components/layout/Header.test.tsx`

**Interfaces:**
- Consumes: `useTheme`, `useLanguage`, `PROFILE`, `BrandLogo`, `resolveAssetUrl`
- Produces:
  - `SkipLink()` — `<a href="#main-content">` visually hidden until `:focus-visible`
  - `ThemeToggle()` — `<button type="button" aria-label={...}>`
  - `LanguageSwitcher()` — `<div role="group" aria-label={...}>` with `PT` and `EN` `<button aria-pressed>` controls
  - `MobileMenu({ isOpen: boolean; onClose: () => void; triggerRef: RefObject<HTMLButtonElement | null> })`
  - `Header()` — sticky `<header>` with brand link, 5-link `<nav>`, always-visible `LanguageSwitcher` + `ThemeToggle`, Resume PDF download `<a>`, `Let's talk` CTA, and mobile drawer trigger

- [ ] **Step 1: Write failing tests for Header, Resume download, Language/Theme toggles & MobileMenu keyboard behavior (pins Review Focus #5)**

```tsx
// src/components/layout/Header.test.tsx
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider } from '../../context/LanguageContext';
import { Header } from './Header';

function renderHeader() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </ThemeProvider>,
  );
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('felipe-resume-locale', 'en-US');
    document.body.style.overflow = '';
  });

  it('renders nav links, always-visible language/theme controls, and resume PDF download link', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pt/i })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: /en/i })).toHaveAttribute('aria-pressed', 'true');
    const downloadLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(downloadLinks[0]).toHaveAttribute('download', 'Felipe-Soares-Resume.pdf');
    expect(downloadLinks[0].getAttribute('href')).toContain('felipe-soares-resume-en.pdf');
  });

  it('switches language to pt-BR and updates resume download label to Currículo (EN)', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: /pt/i }));
    expect(screen.getByRole('link', { name: /experiência/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /currículo \(en\)/i })[0]).toBeInTheDocument();
  });

  it('opens mobile menu, locks body scroll, closes on Escape, and restores focus to trigger', async () => {
    const user = userEvent.setup();
    renderHeader();
    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/layout/Header.test.tsx`
  Expected: FAIL with missing modules.

- [ ] **Step 3: Implement `SkipLink`, `ThemeToggle`, `LanguageSwitcher`, `MobileMenu`, and `Header`**
  - Keep `LanguageSwitcher` and `ThemeToggle` in the always-visible utility cluster outside `<MobileMenu>`.
  - `MobileMenu` handles `keydown` `Escape`, sets `document.body.style.overflow = 'hidden'` while open (always restoring in cleanup), moves focus into the drawer on open, and restores focus to `triggerRef.current` on close; clicking any anchor link inside closes the drawer.
  - Resume download link uses `resolveAssetUrl(PROFILE.resumePdf[locale].file)` and `download={PROFILE.resumePdf[locale].downloadName}`.

- [ ] **Step 4: Run tests, typecheck, and lint, then commit**
  Run: `npx vitest run src/components/layout/Header.test.tsx && npm run typecheck && npm run lint`
  Expected: PASS, 0 errors.
  Commit: `feat: add accessible header, skip link, theme toggle, language switcher, and mobile drawer`

---

### Task 5: Hero, About Me & Selected Projects (`My recent work`) Sections

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`, `src/components/sections/Projects.tsx`
- Test: `src/components/sections/HeroAboutProjects.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `PROFILE`, `PROJECTS`, `SectionHeading`, `Badge`, `ProjectPlaceholder`, `LinkedInIcon`, `GitHubIcon`, `resolveAssetUrl`
- Produces:
  - `Hero()` — `<section id="top" aria-labelledby="hero-heading">` with the page's sole `<h1>`
  - `About()` — `<section id="about" aria-labelledby="about-heading">`
  - `Projects({ items?: readonly ProjectItem[] })` — `<section id="projects" aria-labelledby="projects-heading">` (optional `items` prop defaults to `PROJECTS` so tests can verify both `#` placeholder and real URL behavior)

- [ ] **Step 1: Write failing tests for Hero, About, and Projects placeholder link handling (pins Review Focus #4)**

```tsx
// src/components/sections/HeroAboutProjects.test.tsx
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { PROJECTS } from '../../data/projects';

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('Hero, About & Projects sections', () => {
  beforeEach(() => {
    localStorage.setItem('felipe-resume-locale', 'en-US');
  });

  it('renders single h1 with 8+ years badge and external social links', () => {
    renderWithLang(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/senior frontend engineer/i);
    expect(screen.getByText(/8\+ years of experience/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/felipe-soares-dev/',
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Felipe-Soaress',
    );
  });

  it('renders About section with 4 core engineering pillars', () => {
    renderWithLang(<About />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/turning complex problems/i);
    expect(screen.getByText(/performance focused/i)).toBeInTheDocument();
    expect(screen.getByText(/scalable architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/collaborative mindset/i)).toBeInTheDocument();
    expect(screen.getByText(/user-centric design/i)).toBeInTheDocument();
  });

  it('prevents default scroll jump on href="#" project placeholders while allowing real URLs', () => {
    const customProjects = [
      PROJECTS[0],
      { ...PROJECTS[1], url: 'https://example.com/project' },
    ];
    renderWithLang(<Projects items={customProjects} />);

    const placeholderLink = screen.getByRole('link', { name: /game platform & ops tooling/i });
    expect(placeholderLink).toHaveAttribute('href', '#');
    const placeholderEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(placeholderLink, placeholderEvent);
    expect(placeholderEvent.defaultPrevented).toBe(true);

    const realLink = screen.getByRole('link', { name: /analytics & moderation suite/i });
    expect(realLink).toHaveAttribute('href', 'https://example.com/project');
    const realEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(realLink, realEvent);
    expect(realEvent.defaultPrevented).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/sections/HeroAboutProjects.test.tsx`
  Expected: FAIL with missing modules.

- [ ] **Step 3: Implement `Hero.tsx`, `About.tsx`, and `Projects.tsx`**
  - `Hero.tsx`: 2-column desktop layout with green-dot `8+` badge, `<h1>` (`Senior Frontend` + gradient `Engineer`), subtitle, `Explore my work →` (`#projects`), `LinkedIn`, `GitHub`, and decorative right-side diagonal glass-ribbon SVG/CSS artwork (`aria-hidden="true"`).
  - `About.tsx`: `lg:grid-cols-12` split (`5` cols heading + `7` cols concise CV bio) and 4-column desktop / 2×2 mobile pillar strip with vertical hairlines.
  - `Projects.tsx`: 3-column responsive grid of `<article>` cards following Spec Section 4.3 anatomy (16:9 `ProjectPlaceholder` or `<img src={resolveAssetUrl(project.image)} alt={...} loading="lazy" />`, floating top-left icon badge, bottom scrim, `<h3>` + 2-line description + circular `→` indicator, tech tags row). Links use `href={project.url}`; if `project.url === '#'`, `onClick` calls `e.preventDefault()` and includes accessible "coming soon" context; if external URL, opens with `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 4: Run tests, typecheck, and lint, then commit**
  Run: `npx vitest run src/components/sections/HeroAboutProjects.test.tsx && npm run typecheck && npm run lint`
  Expected: PASS, 0 errors.
  Commit: `feat: implement hero, about me, and selected projects sections`

---

### Task 6: Experience & Education + Technical Expertise (`Skills`) Sections

**Files:**
- Create: `src/components/sections/Experience.tsx`, `src/components/sections/Skills.tsx`
- Test: `src/components/sections/ExperienceSkills.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `PROFILE`, `EXPERIENCE_ITEMS`, `EDUCATION`, `SKILL_CATEGORIES`, `SOFT_SKILL_IDS`, `SectionHeading`, `Badge`, `SkillIcon`
- Produces:
  - `Experience()` — `<section id="experience" aria-labelledby="experience-heading">`
  - `Skills()` — `<section id="skills" aria-labelledby="skills-heading">`

- [ ] **Step 1: Write failing tests for Experience accordions/education and Skills WAI-ARIA tabs**

```tsx
// src/components/sections/ExperienceSkills.test.tsx
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../../context/LanguageContext';
import { Experience } from './Experience';
import { Skills } from './Skills';

describe('Experience & Skills sections', () => {
  beforeEach(() => {
    localStorage.setItem('felipe-resume-locale', 'en-US');
  });

  it('expands first role by default, toggles roles and Expand All, and displays UTFPR education', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><Experience /></LanguageProvider>);

    const role1Btn = screen.getByRole('button', { name: /software engineer ii.*fortis games/i });
    const role2Btn = screen.getByRole('button', { name: /software engineer i.*fortis games/i });
    expect(role1Btn).toHaveAttribute('aria-expanded', 'true');
    expect(role2Btn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(/2,500\+ commits/i)).toBeInTheDocument();

    await user.click(role2Btn);
    expect(role2Btn).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: /expand all/i }));
    expect(screen.getByRole('button', { name: /full-stack developer.*yankton/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText(/federal university of technology/i)).toBeInTheDocument();
    expect(screen.getByText(/lego/i)).toBeInTheDocument();
  });

  it('renders 8 featured core skills by default and supports WAI-ARIA keyboard tab navigation', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><Skills /></LanguageProvider>);

    const coreTab = screen.getByRole('tab', { name: /core/i });
    expect(coreTab).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel');
    expect(panel.querySelectorAll('li')).toHaveLength(8);

    coreTab.focus();
    await user.keyboard('{ArrowRight}');
    const frontendTab = screen.getByRole('tab', { name: /frontend & state/i });
    expect(frontendTab).toHaveFocus();
    expect(frontendTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    const testingTab = screen.getByRole('tab', { name: /testing & devops/i });
    expect(testingTab).toHaveFocus();
    expect(screen.getByText('Playwright')).toBeInTheDocument();

    await user.keyboard('{Home}');
    expect(coreTab).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/components/sections/ExperienceSkills.test.tsx`
  Expected: FAIL with missing modules.

- [ ] **Step 3: Implement `Experience.tsx` and `Skills.tsx`**
  - `Experience.tsx`: `expandedIds` `Set<ExperienceId>` initialized to `new Set(['fortis-se2'])`; `Expand all / Collapse all` toggle button; 4 semantic `<article>` items with `<button type="button" aria-expanded aria-controls>` headers showing `<h3>` role, company, `<time dateTime="...">` range, location, and preview tags; expanded panel renders achievement `<ul>` + full `Key Technologies` tags. Below timeline, UTFPR Education card (`<article>`) with degree, `<time>2017 – 2019</time>`, 4 coursework chips, and LEGO Robotics extension summary.
  - `Skills.tsx`: 2-zone `lg:grid-cols-12` layout (`lg:col-span-4` heading + `role="tablist"` with roving `tabIndex` and `ArrowLeft`/`ArrowRight`/`Home`/`End` handlers; `lg:col-span-8` `role="tabpanel"` rendering icon+label skill cards `<ul>` with `<li>`). Below the 2-zone grid, a subtle horizontal divider and the 6 localized Soft Skills chips.

- [ ] **Step 4: Run tests, typecheck, and lint, then commit**
  Run: `npx vitest run src/components/sections/ExperienceSkills.test.tsx && npm run typecheck && npm run lint`
  Expected: PASS, 0 errors.
  Commit: `feat: implement experience/education timeline and accessible tabbed skills section`

---

### Task 7: Contact Banner, Footer, Full `App` Assembly & Automated WCAG Accessibility Suite

**Files:**
- Create: `src/components/sections/Contact.tsx`, `src/components/layout/Footer.tsx`, `src/App.tsx`, `src/main.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: All context providers, layout components, and section components from Tasks 2–6
- Produces:
  - `Contact()` — `<section id="contact" aria-labelledby="contact-heading">` with `mailto:`, LinkedIn, GitHub, and copy-email button + `aria-live="polite"` feedback
  - `Footer()` — `<footer>` with brand monogram, role, tagline (`BUILD · IMPROVE · INNOVATE`), and copyright year
  - `App()` — full semantic document shell (`ThemeProvider` → `LanguageProvider` → `SkipLink`, `Header`, `<main id="main-content">` with 6 sections, `Footer`)

- [ ] **Step 1: Write failing integration & automated WCAG accessibility tests (pins Review Focus #5 + all 4 theme×locale axe audits)**

```tsx
// src/App.test.tsx
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import App from './App';

describe('App integration & WCAG accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('felipe-resume-locale', 'en-US');
    localStorage.setItem('felipe-resume-theme', 'dark');
  });

  it('renders complete landmark structure with a single h1 and omits phone number from public HTML', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(document.body.textContent).not.toContain('99650-1981');
  });

  it('copies email with live confirmation and degrades gracefully if clipboard rejects', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    render(<App />);
    const copyBtn = screen.getByRole('button', { name: /copy email/i });
    await user.click(copyBtn);
    expect(writeText).toHaveBeenCalledWith('felipe.2013@alunos.utfpr.edu.br');
    expect(screen.getByRole('status')).toHaveTextContent(/copied/i);

    writeText.mockRejectedValueOnce(new Error('Clipboard unavailable'));
    await user.click(copyBtn);
    expect(screen.getByRole('status')).toHaveTextContent(/felipe\.2013@alunos\.utfpr\.edu\.br/i);
  });

  it.each([
    ['dark', 'en-US'],
    ['dark', 'pt-BR'],
    ['light', 'en-US'],
    ['light', 'pt-BR'],
  ] as const)('passes axe accessibility audit in %s theme and %s locale', async (theme, locale) => {
    localStorage.setItem('felipe-resume-theme', theme);
    localStorage.setItem('felipe-resume-locale', locale);
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/App.test.tsx`
  Expected: FAIL with missing `App` / `Contact` / `Footer`.

- [ ] **Step 3: Implement `Contact.tsx`, `Footer.tsx`, `App.tsx`, and `main.tsx`**
  - `Contact.tsx`: gradient-bordered `rounded-[20px]` banner matching Spec Section 4.3 with decorative curved SVG arc (`aria-hidden="true"`), `mailto:` gradient pill CTA, LinkedIn/GitHub/Email icon links, and Copy Email button calling `navigator.clipboard?.writeText(PROFILE.email)` inside `try/catch`; on success announces localized `"Email copied!"`, on rejection announces localized fallback containing `felipe.2013@alunos.utfpr.edu.br` inside `<span role="status" aria-live="polite">`.
  - `Footer.tsx`: hairline top border, `BrandLogo` + localized `Felipe Soares · Senior Frontend Engineer` on left, localized `BUILD · IMPROVE · INNOVATE` + year on right.
  - `App.tsx` & `main.tsx`: wrap with `ThemeProvider` and `LanguageProvider`, mount `<SkipLink />`, `<Header />`, `<main id="main-content" tabIndex={-1}>` containing `<Hero />`, `<About />`, `<Projects />`, `<Experience />`, `<Skills />`, `<Contact />`, and `<Footer />`.

- [ ] **Step 4: Run full test suite, typecheck, and lint, then commit**
  Run: `npm run test && npm run typecheck && npm run lint`
  Expected: All test files PASS (including all 4 `vitest-axe` audits), 0 TS errors, 0 ESLint errors.
  Commit: `feat: add contact banner, footer, full app shell, and automated wcag a11y tests`

---

### Task 8: GitHub Pages CI/CD Workflow, Documentation & Final Production Verification

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

**Interfaces:**
- Consumes: `package.json` scripts (`typecheck`, `lint`, `test`, `build`), `vite.config.ts` (`VITE_BASE_PATH`, `VITE_SITE_URL`)
- Produces: Automated GitHub Pages deployment pipeline and maintainer documentation

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**
  Configure `push` to `main` + `workflow_dispatch`, `permissions: { contents: read, pages: write, id-token: write }`, concurrency group `'pages'`, `build` job running `actions/checkout@v4`, `actions/setup-node@v4` (Node 22/LTS + npm cache), `actions/configure-pages@v5` (`id: pages`), `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` with `VITE_BASE_PATH` normalized from `steps.pages.outputs.base_path` (ensuring trailing `/`) and `VITE_SITE_URL` from `steps.pages.outputs.origin` + normalized base path, `actions/upload-pages-artifact@v3` (`path: dist`), and `deploy` job running `actions/deploy-pages@v4`.

- [ ] **Step 2: Create concise `README.md`**
  Document local commands (`npm install`, `npm run dev`, `npm run test`, `npm run build`), how to update the 3 project cards (`src/data/projects.ts` + `public/projects/`), how to add a Portuguese PDF later (`src/data/profile.ts` + `public/`), and the 2-step GitHub Pages activation (`Settings → Pages → Source: GitHub Actions`).

- [ ] **Step 3: Run full quality gate + subpath production build verification**
  Run:
  ```powershell
  npm run typecheck && npm run lint && npm run test && npm run build
  ```
  Then verify subpath build & generated assets:
  ```powershell
  $env:VITE_BASE_PATH="/felipe-soares-resume/"; $env:VITE_SITE_URL="https://felipe-soaress.github.io/felipe-soares-resume/"; npm run build
  ```
  Verify:
  - `dist/index.html` contains `felipe-resume-theme`, `https://felipe-soaress.github.io/felipe-soares-resume/og-image.png`, and `/felipe-soares-resume/assets/` bundle references.
  - `dist/felipe-soares-resume-en.pdf`, `dist/og-image.png`, and `dist/favicon.svg` exist.

- [ ] **Step 4: Commit workflow and documentation**
  Commit: `ci: add github pages deployment workflow and maintenance documentation`
