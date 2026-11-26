# Felipe Soares — Resume & Portfolio Website Design Specification

**Date:** 2026-11-26  
**Project Folder:** `C:\Users\felip\Projects\felipe-soares-resume`  
**Deployment Target:** GitHub Pages (static site via GitHub Actions)  
**Design Reference:** `c:\Users\felip\Downloads\a_sleek_dark_modern_professional_developer_portf.png` *(self-sufficient visual specs transcribed in Sections 4 & 6)*  
**Source Data:** `c:\Users\felip\Downloads\main.pdf` *(complete factual CV data transcribed in Section 10)*

---

## 1. Intent & Why

Build a fast, accessible, bilingual (`pt-BR` / `en-US`) personal resume and portfolio website for **Felipe Soares da Silva**, Senior Frontend Engineer (8+ years of experience), ready to host on **GitHub Pages**.

The site serves two audiences simultaneously:
1. **Recruiters & Hiring Managers** who need to scan career progression, impact metrics, core technologies, contact links, and download the PDF resume in seconds.
2. **Engineering Leads & Technical Peers** who evaluate code craftsmanship, semantic HTML, accessibility rigor, performance, visual polish, and architecture directly from both the live page and the GitHub repository.

### Goals
- Faithful visual translation of the reference dark aesthetic (deep midnight navy canvas, electric cyan-to-violet gradient accents, crisp glass/hairline surfaces, geometric "F" monogram and diagonal hero light-ribbon motif) paired with an equally intentional **Light** theme.
- Complete resume depth on a single cohesive page (**Option A**): Hero, About Me + 4 pillars, Selected Projects (*My recent work*), Professional Experience & Education, Technical Expertise (featured highlights + categorized skill matrix), Contact CTA banner, and Footer.
- **Dark mode by default**, toggleable to **Light mode**, persisted in `localStorage` with zero flash of wrong theme (anti-FOUC inline script).
- **Bilingual (`pt-BR` and `en-US`)** with automatic browser language detection (`pt*` → `pt-BR`, fallback → `en-US`), persisted in `localStorage`, and an always-visible `PT / EN` switcher in the top header.
- **Resume PDF download** accessible directly from the top header navigation.
- **Semantic HTML5 + WCAG 2.1 AA accessibility** as a first-class engineering standard, backed by automated accessibility tests (`vitest-axe`) and ESLint (`eslint-plugin-jsx-a11y`).
- **Maintainable data layer** so updating project links/images, career milestones, PDF files, or translations requires editing typed data files rather than hunting through JSX.
- **Zero-friction GitHub Pages deployment** via GitHub Actions automatically supporting user sites (`<owner>.github.io`), project sites (`<owner>.github.io/<repo>/`), and custom domains (`CNAME`).

### Non-Goals
- No backend server, CMS integration, database, or server-side contact form submission (contact uses direct `mailto:`, copy-email button, LinkedIn, and GitHub links).
- No multi-page client-side router (single-page anchor navigation `#about`, `#projects`, `#experience`, `#skills`, `#contact` avoids SPA 404 issues on GitHub Pages).
- No heavy third-party i18n runtime (e.g., `i18next`), UI component library (e.g., MUI/AntD), or heavy animation framework (e.g., GSAP/Three.js).
- No real external URLs or screenshots for the 3 project cards yet — links point to `#` and visuals use clean custom placeholder artwork ready for future replacement.

### Anti-Goals (What Would Make This Fail)
- A Light theme that looks like an inverted afterthought or fails WCAG AA contrast (e.g., bright cyan text on white).
- Flash of light theme before dark theme loads, or flash of wrong language.
- Generic unsemantic `<div>` soup, missing skip-links, inaccessible custom tabs/accordions, or keyboard traps in the mobile menu.
- Wall-of-text resume dump that breaks the airy, scannable rhythm of the reference design.
- Hardcoded root-absolute asset paths (`/resume.pdf`) that 404 when deployed to a subpath (`https://felipe-soaress.github.io/<repo>/`).

---

## 2. Approaches Considered & Selected

Three architectural approaches were evaluated:

1. **React 19 + TypeScript + Vite + Tailwind CSS v4 (Selected)**
   - *How:* Static SPA built with Vite, strict TypeScript, semantic React components, CSS custom properties for dark/light tokens, typed `pt-BR`/`en-US` dictionaries, Vitest + React Testing Library + `vitest-axe`, deployed via GitHub Actions to GitHub Pages.
   - *Why chosen:* Mirrors Felipe's core professional stack in the CV (turning the repository itself into a technical portfolio piece), gives instant zero-reload theme and language switching, clean accessible state management for skill tabs/experience accordions/mobile drawer, and works cleanly on any GitHub Pages base path.
   - *Trade-off:* Content renders client-side via JS (mitigated for SEO/social previews with static meta tags, Open Graph tags + raster `og-image.png`, and JSON-LD `Person` schema in `index.html`).

2. **Astro + React Islands + TypeScript + Tailwind CSS v4 (Not selected)**
   - *Trade-off:* Superior pre-rendered bilingual SEO with separate `/en/` and `/pt-br/` URLs, but introduces Astro (outside the CV stack) and requires page navigation to switch languages plus stricter subpath routing handling on GitHub Pages.

3. **Semantic HTML5 + Modern CSS + Vanilla TypeScript via Vite (Not selected)**
   - *Trade-off:* Smallest possible bundle, but misses the opportunity to showcase React/component architecture/RTL testing and makes complex ARIA widget patterns (tabs, accordions, focus-trapped mobile drawer) more error-prone to maintain manually.

---

## 3. Constraints & Technical Standards

- **Runtime / Tooling:** Node.js `v26.x`, npm `v11.x`, Vite `6.x` (or latest compatible), React `19.x`, TypeScript `5.x` (strict mode enabled), Tailwind CSS `v4.x`, `lucide-react` for UI icons + custom inline SVGs for brand monogram, tech logos, and LinkedIn/GitHub marks.
- **Minimal Dependencies:**
  - Runtime: `react`, `react-dom`, `lucide-react`.
  - Dev/Test/Lint: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `typescript`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `vitest-axe`, `jsdom`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`.
- **Base Path & Origin Safety:**
  - All static asset references (PDF resume, future project images) MUST resolve through `import.meta.env.BASE_URL` (helper `resolveAssetUrl(path)`).
  - `vite.config.ts` reads `VITE_BASE_PATH` (default `'/'`) and `VITE_SITE_URL` (default `'https://felipe-soaress.github.io/'`). A Vite HTML transform plugin injects absolute `og:url`, `og:image`, canonical `<link>`, and JSON-LD `url` values at build time.
  - In GitHub Actions, `actions/configure-pages@v5` supplies `steps.pages.outputs.base_path` and `steps.pages.outputs.origin`, automatically supporting `<owner>.github.io`, `/<repo>/`, and custom domains (`CNAME`) with zero manual config.
- **Resume PDF Asset:**
  - Source file `c:\Users\felip\Downloads\main.pdf` (English) is copied into `public/felipe-soares-resume-en.pdf`.
  - `src/data/profile.ts` maps `resumePdf: Record<Locale, { file: string; downloadName: string; isEnglishOnly?: boolean }>` so both locales currently point cleanly to `felipe-soares-resume-en.pdf` (with the `pt-BR` header label clearly indicating `Currículo (EN)` / `aria-label` noting English PDF), and swapping in a Portuguese PDF later is a single-line config update.
- **Open Graph Preview Asset:**
  - Include a crisp `1200x630` raster `public/og-image.png` matching the site's dark navy/cyan-violet aesthetic (`Felipe Soares · Senior Frontend Engineer · React · TypeScript · 8+ Years`) so LinkedIn, WhatsApp, and Slack previews render reliably.
- **Accessibility Floor (WCAG 2.1 AA):**
  - Skip link (`Skip to main content` / `Pular para o conteúdo principal`) visible on keyboard focus.
  - Proper HTML5 landmarks: `<header>`, `<nav aria-label="...">`, `<main id="main-content">`, `<section aria-labelledby="...">`, `<article>`, `<time dateTime="...">`, `<footer>`.
  - Exactly one `<h1>` per page (`Senior Frontend Engineer` / `Engenheiro Frontend Sênior`), strict heading hierarchy (`h1` → `h2` → `h3`) with no skipped levels.
  - Visible focus ring (`:focus-visible`) with ≥ 3:1 contrast in both themes.
  - Color contrast ≥ 4.5:1 for normal text and ≥ 3:1 for large text/UI icons in BOTH Dark and Light themes.
  - Full keyboard support for theme toggle, language switcher, mobile navigation drawer (`Escape` closes, focus moves into drawer and returns to trigger on close, body scroll locked while open), skill category tabs (WAI-ARIA Tabs pattern with `ArrowLeft`/`ArrowRight`/`Home`/`End` keys), and expandable experience items (`<button aria-expanded aria-controls>`).
  - Respect `prefers-reduced-motion: reduce` (disable transitions/ambient transforms).
  - Polite live region (`aria-live="polite"`) for interactive feedback (e.g., copying email, theme/language status if announced).
- **Placeholder Project Links Behavior:**
  - Project card links and `View all projects` link use `href="#"` as requested.
  - When `project.url === '#'`, `onClick={(e) => e.preventDefault()}` prevents jumping to the top of the page, and cards display a subtle localized indicator (`Coming soon` / `Em breve`) in the card's accessible label/tooltip while staying clean visually.

---

## 4. Visual Design System & Theme Specification

### 4.1 Typography
- **Display / Headings:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` (weights 600, 700, 800; tight tracking `-0.025em` on hero/section headings).
- **Body / UI:** `'Inter', system-ui, -apple-system, sans-serif` (weights 400, 500, 600; comfortable measure ≤ 72ch on body paragraphs, line-height `1.65`).
- Loaded via Google Fonts (`display=swap`) with `preconnect` hints in `index.html`.

### 4.2 Color Tokens (CSS Custom Properties via `:root` and `[data-theme="light"]`)

| Token | Dark (Default) | Light | Role |
|---|---|---|---|
| `--bg-base` | `#060913` | `#F8FAFC` | Page canvas |
| `--bg-elevated` | `#0D1220` | `#FFFFFF` | Cards, skill pills, header glass backdrop |
| `--bg-elevated-hover` | `#141C30` | `#F1F5F9` | Interactive hover surface |
| `--bg-subtle` | `#0A0F1C` | `#EEF2F7` | Tag pills, icon badges, subtle insets |
| `--border-subtle` | `rgba(148, 163, 184, 0.14)` | `rgba(15, 23, 42, 0.10)` | Hairline borders & dividers |
| `--border-accent` | `rgba(99, 102, 241, 0.40)` | `rgba(79, 70, 229, 0.30)` | Highlighted CTA & active tab borders |
| `--text-primary` | `#F8FAFC` | `#0F172A` | Headings & primary copy |
| `--text-secondary` | `#94A3B8` | `#475569` | Descriptions, body text |
| `--text-muted` | `#7E8FA6` | `#526277` | Metadata, dates, secondary labels (≥ 4.5:1) |
| `--accent-cyan` | `#38BDF8` | `#0369A1` | Eyebrow accents, icon highlights (AA-safe in light) |
| `--accent-indigo` | `#6366F1` | `#4F46E5` | Gradient mid / focus rings |
| `--accent-violet` | `#8B5CF6` | `#7C3AED` | Gradient end / icons |
| `--accent-gradient` | `linear-gradient(135deg, #38BDF8 0%, #6366F1 52%, #8B5CF6 100%)` | `linear-gradient(135deg, #0284C7 0%, #4F46E5 52%, #7C3AED 100%)` | Primary buttons, display accent text |
| `--status-dot` | `#22C55E` | `#16A34A` | Experience badge indicator |

### 4.3 Concrete Visual Spec (Self-Sufficient Reference Translation)
- **Brand Monogram (`F`):** `28×28` geometric inline SVG composed of two slanted parallelogram strokes (diagonal left spine + upper bar + shorter mid bar) filled with the cyan→indigo→violet gradient.
- **Hero Right-Side Artwork (`aria-hidden="true"`):** Abstract architectural glass geometry occupying the right ~45% of the hero on desktop (`lg:` and up), built with layered angled rounded-corner SVG/CSS translucent panels (`skewX(-22deg)` / diagonal ribbons) with subtle gradient borders (`cyan` → `violet`) and a soft radial indigo glow behind them. In Light mode, renders as delicate frosted translucent indigo/sky glass shapes with soft ambient sheen instead of bright neon.
- **Section Eyebrow Treatment:** Small uppercase tracked eyebrow (`11px`, `letter-spacing: 0.12em`, `font-semibold`, `--accent-cyan`) paired with a horizontal `48px` hairline rule (`--border-accent`) to its right, immediately above the `<h2>`.
- **Project Card Anatomy:** Rounded `16px` card (`--bg-elevated`, `1px solid --border-subtle`), overflow hidden:
  1. Top visual container (`aspect-[16/9]`): custom thematic SVG artwork placeholder (when `image: null`) or `<img>` (when user adds a real image), with a subtle bottom gradient scrim transitioning seamlessly into the card body.
  2. Floating icon badge (`40×40`, rounded `10px`, frosted dark/light surface with subtle border) pinned top-left (`top-3 left-3`) over the visual container.
  3. Card body (`p-5`): flex row with `<h3>` title + 2-line description on the left, and a `36×36` circular subtle-bordered `→` arrow button on the right; below that, a wrap row of compact pill tags (`text-xs`, `--bg-subtle`, `--border-subtle`).
- **Skills Section 2-Zone Grid (Concrete Split):**
  - On desktop (`lg:grid-cols-12 gap-8 items-start`):
    - **Left zone (`lg:col-span-4`):** Eyebrow (`TECHNICAL EXPERTISE`) + `<h2>` (`Technologies & Skills`) + concise subtitle + vertical or compact pill category tabs (`role="tablist"`).
    - **Right zone (`lg:col-span-8`):** Responsive card grid (`grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3`), where each skill card is a sleek rounded `12px` pill-card (`px-4 py-3.5`, `--bg-elevated`, `1px solid --border-subtle`) with a crisp `22px` icon on the left and skill name on the right.
  - Below the 2-zone grid: a compact horizontal **Soft Skills** strip separated by a top hairline divider.
- **Contact CTA Banner:** Rounded `20px` full-width container with subtle `1px` gradient-tinted border (`--border-accent`), dark navy-to-indigo radial glow in the top-right corner, a subtle sweeping curved accent line (`SVG` arc, `aria-hidden="true"`), left column with eyebrow + `<h2>` + short paragraph, and right column with the primary gradient pill CTA (`Get in touch →`) stacked above a centered horizontal row of social icon buttons (`LinkedIn`, `GitHub`, `Email`, plus `Copy email`).

---

## 5. Theme & Internationalization Behavior

### 5.1 Theme Management (`ThemeProvider` + `index.html` inline script)
- **Storage Key:** `felipe-resume-theme` (`'dark' | 'light'`).
- **Resolution Order on Initial Load:**
  1. Valid saved value in `localStorage` (`'dark'` or `'light'`).
  2. Default to **`'dark'`** (explicit requirement: dark by default regardless of OS preference until toggled by user).
- **Anti-FOUC:** Synchronous inline `<script>` in `index.html` `<head>` reads `localStorage.getItem('felipe-resume-theme')` (in `try/catch` for privacy modes), applies `document.documentElement.dataset.theme` (`'dark'` or `'light'`) and `document.documentElement.style.colorScheme` before first paint.
- **Toggle Control:** Accessible icon button in header (`aria-label` describes target action, e.g., `"Switch to light theme"` / `"Alternar para tema claro"`), sun/moon icons, keyboard focusable.

### 5.2 Language Management (`LanguageProvider`)
- **Supported Locales:** `'en-US'` and `'pt-BR'`.
- **Storage Key:** `felipe-resume-locale`.
- **Resolution Order on Initial Load:**
  1. Valid saved value in `localStorage` (`'pt-BR'` or `'en-US'`).
  2. Browser detection via `navigator.languages` (iterated in preference order; first matching `'pt'` or `'en'` wins, with any `pt*` → `'pt-BR'` and any `en*` → `'en-US'`) or fallback to `navigator.language`.
  3. Final fallback to **`'en-US'`**.
- **DOM Synchronization:** Whenever locale changes:
  - Update `document.documentElement.lang` (`'pt-BR'` or `'en-US'`).
  - Update `document.title` and `<meta name="description">` to the active locale's copy.
- **Switcher Control:** Always visible in the top header on BOTH desktop and mobile (never tucked inside the mobile drawer), implemented as a segmented pill (`role="group"` with `aria-label="Language"` / `"Idioma"`) containing two buttons (`PT` and `EN`) with `aria-pressed`.

---

## 6. Information Architecture & Section Specifications

Single-page vertical flow, max container width `1200px`, responsive padding (`px-5 sm:px-8 lg:px-10`):

1. **Header (`<header>`):**
   - Sticky (`sticky top-0 z-40`), blurred glass surface, bottom hairline border.
   - Left: Brand link (`href="#top"`) with `F` monogram + `Felipe Soares`.
   - Center (`<nav aria-label="Primary navigation">`): `About`, `Projects`, `Experience`, `Skills`, `Contact` (localized: `Sobre`, `Projetos`, `Experiência`, `Habilidades`, `Contato`).
   - Right utility bar:
     - `PT | EN` switcher (always visible at all viewports).
     - Theme toggle button (always visible at all viewports).
     - Resume PDF download button (`Resume` / `Currículo (EN)` with download icon) — visible on `md:`+ in the header bar AND pinned at the top of the mobile menu drawer on `< md`.
     - `Let's talk →` / `Vamos conversar →` outlined gradient-tinted pill (`href="#contact"`) — visible on `lg:`+ in header AND inside mobile menu drawer.
     - Mobile menu button (`<button aria-expanded aria-controls="mobile-menu">`) visible on `< lg`.
2. **Hero (`<section id="top" aria-labelledby="hero-heading">`):**
   - Experience pill badge: green status dot + `8+ Years of Experience` / `8+ Anos de Experiência`.
   - `<h1 id="hero-heading">`: `Senior Frontend` + gradient `Engineer` (`pt-BR`: `Engenheiro Frontend` + gradient `Sênior`).
   - Subtitle describing fast, scalable, accessible web apps across microfrontends, design systems, headless CMS, and AI-assisted workflows.
   - Primary actions: `Explore my work →` (`#projects`), `LinkedIn`, and `GitHub`.
   - Right-side decorative geometric glass artwork (`aria-hidden="true"`).
3. **About Me (`<section id="about" aria-labelledby="about-heading">`):**
   - 2-column split (`lg:grid-cols-12`): left 5 cols (`ABOUT ME` eyebrow + `Turning complex problems into simple solutions.`), right 7 cols (authentic concise bio grounded in Section 10's Professional Summary).
   - 4 pillars strip below with vertical hairlines on desktop (`grid-cols-2 lg:grid-cols-4`):
     - `Performance Focused` / `Foco em Performance`
     - `Scalable Architecture` / `Arquitetura Escalável`
     - `Collaborative Mindset` / `Mentalidade Colaborativa`
     - `User-Centric Design` / `Design Centrado no Usuário`
4. **Selected Projects (`<section id="projects" aria-labelledby="projects-heading">`):**
   - Header row: `SELECTED PROJECTS` + `My recent work` / `Trabalhos recentes` on left; `View all projects →` (`href="#"`, placeholder) on right.
   - 3 responsive `<article>` cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`):
     1. **Game Platform & Ops Tooling** (`React`, `TypeScript`, `Microfrontends`, `RBAC`) — `url: '#'`, `image: null` (custom game-ops UI SVG placeholder).
     2. **Analytics & Moderation Suite** (`React`, `Remix`, `Nx`, `Tailwind CSS`) — `url: '#'`, `image: null` (custom analytics dashboard SVG placeholder).
     3. **Web Game & Interactive Lab** (`React`, `PixiJS`, `TypeScript`, `MCP`) — `url: '#'`, `image: null` (custom isometric game scene SVG placeholder).
5. **Experience & Education (`<section id="experience" aria-labelledby="experience-heading">`):**
   - Header row: `CAREER JOURNEY` + `Experience & Education` / `Experiência e Formação` + impact badge (`2,500+ commits · 30+ repos at Fortis Games`) + `Expand all / Collapse all` utility button.
   - Reverse-chronological career timeline with 4 accessible disclosure `<article>` items (see Section 10 for exact bullets & technologies):
     - Role 1 (`Software Engineer II — Fortis Games`) **expanded by default**.
     - Roles 2, 3, 4 collapsed by default, expandable individually or via `Expand all`.
     - Each header displays role title (`<h3>`), company, `<time>` range, location/remote, and 3–4 preview tech chips.
   - **Education card** directly below the timeline: UTFPR Systems Analysis & Development (`2017 – 2019`), 4 coursework chips, and the LEGO Educational Robotics extension project summary.
6. **Technical Expertise (`<section id="skills" aria-labelledby="skills-heading">`):**
   - 2-zone grid (Section 4.3) with 5 WAI-ARIA tabs:
     1. `Core` / `Principais` (default — 8 signature skill cards: React, TypeScript, Remix, Tailwind CSS, Microfrontends, Monorepos, Sanity CMS, Performance & A11y).
     2. `Frontend & State`
     3. `Architecture & CMS`
     4. `Backend, AI & Games`
     5. `Testing & DevOps`
   - Complete CV technologies mapped across tabs (Section 10.3).
   - Compact **Soft Skills** strip below (6 items from Section 10.4).
7. **Let's Connect (`<section id="contact" aria-labelledby="contact-heading">`):**
   - Gradient-bordered CTA banner (Section 4.3).
   - Primary CTA `Get in touch →` (`mailto:felipe.2013@alunos.utfpr.edu.br`), plus icon buttons for LinkedIn, GitHub, Email, and a Copy Email button with polite live-region feedback.
8. **Footer (`<footer>`):**
   - Left: Brand `F` monogram + `Felipe Soares · Senior Frontend Engineer` (localized).
   - Right: `BUILD · IMPROVE · INNOVATE` (`pt-BR`: `CONSTRUIR · EVOLUIR · INOVAR`) + copyright year.

---

## 7. Project Architecture & File Organization

```text
felipe-soares-resume/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # Typecheck, lint, test, build & deploy via actions/configure-pages
├── docs/
│   ├── specs/
│   │   └── 2026-11-26-resume-site-design.md
│   └── plans/                          # Step-by-step implementation plan
├── public/
│   ├── favicon.svg                     # Brand "F" monogram favicon
│   ├── og-image.png                    # 1200x630 Open Graph preview card
│   └── felipe-soares-resume-en.pdf     # Copied from c:\Users\felip\Downloads\main.pdf
├── src/
│   ├── components/
│   │   ├── icons/                      # BrandLogo, SocialIcons, SkillIcons
│   │   ├── ui/                         # SectionHeading, Badge, ProjectPlaceholder
│   │   ├── layout/                     # SkipLink, Header, MobileMenu, ThemeToggle, LanguageSwitcher, Footer
│   │   └── sections/                   # Hero, About, Projects, Experience, Skills, Contact
│   ├── context/
│   │   ├── ThemeContext.tsx            # Dark-default theme state + localStorage persistence
│   │   └── LanguageContext.tsx         # Browser-detected locale + fallback en-US + t()
│   ├── data/
│   │   ├── profile.ts                  # Links, email, location, metrics, resumePdf map
│   │   ├── projects.ts                 # 3 project placeholders (url: '#', image: null)
│   │   ├── experience.ts               # 4 roles + UTFPR education metadata & tech stacks
│   │   └── skills.ts                   # 5 skill categories + soft skills metadata
│   ├── i18n/
│   │   ├── types.ts                    # Strictly typed translation schema
│   │   ├── en-US.ts                    # Complete English copy
│   │   └── pt-BR.ts                    # Complete Brazilian Portuguese copy
│   ├── utils/
│   │   └── assets.ts                   # resolveAssetUrl() using import.meta.env.BASE_URL
│   ├── styles/
│   │   └── theme.css                   # Tailwind v4 + dark/light tokens + reduced-motion + focus-visible
│   ├── test/
│   │   └── setup.ts                    # Vitest + jest-dom + vitest-axe + matchMedia mock
│   ├── App.tsx
│   └── main.tsx
├── index.html                          # Anti-FOUC script, Google Fonts, SEO/OG meta + JSON-LD
├── eslint.config.js                    # Flat config with jsx-a11y + react-hooks + TS
├── vite.config.ts                      # Vite + Tailwind v4 + HTML SEO injection + Vitest config
├── tsconfig.json
└── package.json
```

---

## 8. Quality, Verification & Deployment Strategy

- **Unit, Interaction & Accessibility Tests (Vitest + React Testing Library + `vitest-axe`):**
  - Theme initialization (defaults to `dark`), `localStorage` persistence, and toggle to `light`.
  - Language auto-detection (`pt-BR`, `pt-PT`, `en-US`, `es-ES`/`fr-FR` fallback to `en-US`), `localStorage` override, `<html lang>` + `<title>` sync, and switcher interaction.
  - Header resume download link resolves with `BASE_URL` and includes `download` attribute.
  - Experience accordion default state (1st role expanded, others collapsed), individual toggle, and `Expand all / Collapse all`.
  - Skills WAI-ARIA tab switching via mouse click and keyboard (`ArrowRight`, `ArrowLeft`, `Home`, `End`).
  - Project placeholder cards preserve `href="#"` and prevent default jump when clicked.
  - Mobile drawer open/close via click, link click, and `Escape` with focus restoration.
  - Copy-email action updates live region confirmation.
  - Zero `axe()` accessibility violations in both `dark` and `light` themes and both `en-US` and `pt-BR` locales.
- **Static Quality Gates:**
  - `npm run typecheck` (`tsc --noEmit`)
  - `npm run lint` (`eslint .`)
  - `npm run test` (`vitest run`)
  - `npm run build` (`vite build`)
- **GitHub Pages CI/CD (`.github/workflows/deploy.yml`):**
  - Triggers on push to `main` and `workflow_dispatch`.
  - Calls `actions/configure-pages@v5` (`id: pages`) so `VITE_BASE_PATH` is derived from `steps.pages.outputs.base_path` (normalized with trailing `/`) and `VITE_SITE_URL` from `steps.pages.outputs.origin` + `base_path` — automatically handling user sites, project sites, and custom domains.
  - Runs `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`, uploads `dist/` via `actions/upload-pages-artifact@v3`, and deploys with `actions/deploy-pages@v4`.

---

## 9. Explicit Designer Calls & Builder Latitude

### Explicit Designer Calls (Open for User Adjustment)
- **Folder name:** `C:\Users\felip\Projects\felipe-soares-resume`.
- **Experience years:** Updated from `7+` (reference mockup) to **`8+`** to match `main.pdf` (`05/2018 – 11/2026`).
- **Single English PDF handling:** Since only one English CV (`main.pdf`) was provided, both locales serve `felipe-soares-resume-en.pdf`, with the `pt-BR` header button clearly labeled `Currículo (EN)` and typed config ready for a separate `pt-BR` PDF later.
- **Contact phone privacy:** Public HTML shows Email, LinkedIn, and GitHub only; personal phone number stays inside the downloadable PDF to avoid spam scraping.
- **Initial project cards:** Seeded with 3 realistic titles/descriptions aligned with Felipe's CV domains (Game Platform & Ops Tooling, Analytics & Moderation Suite, Web Game & Interactive Lab), all linked to `#` with custom SVG artwork placeholders.
- **Copy-email utility:** Added next to social icons in the Contact banner with accessible `aria-live` feedback.
- **Automatic GitHub Pages origin/base path:** Handled dynamically via `actions/configure-pages@v5` + raster `public/og-image.png` so social link previews work regardless of custom domain or subpath.

### Left to the Builder
- Exact CSS spacing micro-tweaks, shadow opacity tuning, and SVG path coordinates for the Hero glass-ribbon and 3 project card placeholders (provided they follow Section 4 tokens and respect reduced motion).
- Specific test file decomposition and optional `@media print` polish rules.

---

## 10. Source CV Data Reference (Transcribed Verbatim from `main.pdf`)

### 10.1 Personal & Contact Metadata
- **Full Name:** Felipe Soares da Silva (Display Name: `Felipe Soares`)
- **Headline:** Senior Frontend Engineer | React.js Developer | TypeScript
- **Location:** Londrina, Paraná, Brazil
- **Email:** `felipe.2013@alunos.utfpr.edu.br`
- **LinkedIn:** `https://www.linkedin.com/in/felipe-soares-dev/`
- **GitHub:** `https://github.com/Felipe-Soaress`
- **Notable Metric:** Fortis Games Contributions — Over 2,500 commits across 30+ repositories within the organization.

### 10.2 Professional Summary
> Software Engineer with 8+ years of experience in software development, specializing in web applications, React, JavaScript, and TypeScript. Experienced in designing and evolving microfrontend architectures, monorepos, design systems, component libraries, and headless CMS platforms, including Sanity. Hands-on experience across multiple product domains, including gaming platforms, administrative tools, content moderation systems, localization platforms, web/mobile integrations, and workflow automation. Additional expertise in backend development, APIs, infrastructure, and AI tool integrations, working with Node.js, Python, OpenAPI, and Model Context Protocol (MCP). Proven ability to collaborate with international and cross-functional teams, participate in technical decisions and code reviews, and deliver software solutions from initial design through production.

### 10.3 Complete Technical Skills Matrix
- **Programming Languages:** TypeScript, JavaScript, Python, C#, SQL, HTML5, CSS3, Shell, HCL (Terraform)
- **Frontend & Frameworks:** React, Remix, Angular, React Native, TanStack Router, React Router, Tailwind CSS, styled-components, Ant Design
- **State Management & Communication:** Redux, Redux-Saga, Context API, TanStack Query, GrowthBook, WebSockets, socket.io
- **Architecture & Design Systems:** Microfrontends (single-spa, Webpack), Monorepos (Nx, Turborepo), Design Systems, Storybook, Changesets, component libraries, npm package publishing
- **CMS & Integrations:** Sanity CMS, Builder.io, Headless CMS, SEO, Stripe, Greenhouse, internationalization (i18n), geolocation
- **Backend & APIs:** Node.js, Express, Python, REST APIs, OpenAPI, Model Context Protocol (MCP), JWT, RBAC, MongoDB, SQL
- **AI & Automation:** Claude Code, MCP, workflow automation, SBOM (Software Bill of Materials), Unibom
- **Testing & Quality:** Vitest, Jest, React Testing Library, Playwright, WebdriverIO, Mock Service Worker (MSW), Storybook Accessibility
- **DevOps & Infrastructure:** Docker, Terraform, AWS SDK, AWS Amplify, GitHub Actions, Vite, Webpack, Shell, Makefile
- **Web Game Development:** PixiJS, Howler

### 10.4 Soft Skills
- Cross-functional Collaboration
- International Team Collaboration
- Technical Communication
- Problem-Solving and Adaptability
- Technical Discussions and Code Reviews
- Knowledge Sharing

### 10.5 Professional Experience (4 Roles, 17 Achievement Bullets)

1. **Software Engineer II — Fortis Games** (`06/2024 – 11/2026` · Remote)
   - *Preview tags:* `React`, `TypeScript`, `Sanity CMS`, `Microfrontends`
   - *Achievements (7):*
     1. Led the frontend implementation of Fortis Games' corporate website, starting with technology evaluations and Proofs of Concept (POCs) using Sanity and Builder.io. Served as the sole frontend developer for approximately 80% of the development process.
     2. Architected the Sanity dataset and content structure, creating dynamic components to render different document types. The platform supported multiple languages, geolocation-based content, Greenhouse job listings, company articles, and dedicated pages for individual games.
     3. Enhanced the company's central game content and operations platform, introducing functionality for managing in-game events, store items, and game content catalogs.
     4. Extended Model Context Protocol (MCP) tooling integrated with Claude Code, enabling QA engineers and Producers to query game information by game ID, content, or package, including availability, descriptions, and item pricing.
     5. Established an extensible microfrontend platform where independent teams could integrate their own applications while leveraging shared authentication, Role-Based Access Control (RBAC), and reusable component libraries published as npm packages.
     6. Automated the game's third-party license documentation workflow through a custom skill that processed SBOM files generated by Unibom, classified dependencies against internal policies, flagged items requiring legal review, and prepared content for publication in Sanity.
     7. Joined an internal game incubation initiative, prototyping web games with PixiJS and AI-assisted development workflows, delivering playable builds at the end of each weekly development cycle.
   - *Key Technologies:* React, TypeScript, Sanity CMS, Builder.io, AWS Amplify, TanStack, Microfrontends, RBAC, npm, Model Context Protocol (MCP), Claude Code, SBOM, Unibom, PixiJS.

2. **Software Engineer I — Fortis Games** (`03/2022 – 06/2024` · Remote)
   - *Preview tags:* `React`, `Remix`, `Nx`, `single-spa`
   - *Achievements (3):*
     1. Expanded the Magic: Puzzle Quest administrative support platform with features for scheduling in-game events, composing player messages, handling support requests, reviewing player history, verifying reward eligibility, and managing cheating-related flags.
     2. Delivered the web frontend for a game that already had a mobile client built with Unity, using a monorepo architecture with Remix and React. The application enabled gameplay and data exchange with the mobile version, alongside dedicated pages for achievements, levels, and unlockable reaction emojis that players could equip in decks.
     3. Designed an administrative video moderation platform for reviewing player-uploaded and reported videos. The interface consolidated automated validation results, processing statuses, and player reports, allowing moderators to review comments, approve or remove videos, and rerun validation processes when processing failures occurred.
   - *Key Technologies:* React, TypeScript, Remix, Nx, Microfrontends, single-spa, Webpack, Redux-Saga, Ant Design, socket.io, Storybook, Tailwind CSS.

3. **Front-End Developer — Oktagon Games** (`08/2019 – 03/2022` · Londrina, Paraná, Brazil)
   - *Preview tags:* `React`, `Angular`, `Microfrontends`, `WebSockets`
   - *Achievements (4):*
     1. Enhanced PopBase, an interactive platform that helped content creators gamify audience engagement, by introducing URL-based video imports, video editing capabilities such as trimming and subtitles, and interactive elements displayed during playback.
     2. Designed analytical dashboards and data visualizations for content creators, presenting metrics such as video views, user interactions, and player spending.
     3. Streamlined the Magic: Puzzle Quest player support application by introducing filtering capabilities and reorganizing player information to improve data visibility and simplify support workflows.
     4. Orchestrated the frontend modules of a microfrontend architecture, including dashboards with charts generated by Python services and a game localization platform for external translators. The system featured role-specific interfaces, translation key validation, similarity-based search and ranking, and WebSocket communication.
   - *Key Technologies:* Angular, React, JavaScript, Python, Context API, Redux, Microfrontends, WebSockets.

4. **Full-Stack Developer — Yankton Technologies** (`05/2018 – 08/2019` · Cornélio Procópio, Paraná, Brazil)
   - *Preview tags:* `React`, `Node.js`, `React Native`, `TypeScript`
   - *Achievements (3):*
     1. Contributed to an employee time-tracking system, including worked-hours calculations and overtime balance management.
     2. Helped launch a mobile application for a barbershop using React Native, allowing customers to browse service prices and schedule appointments.
     3. Maintained and extended a legacy Human Resources management system built with C# and SQL, while using MongoDB as the primary database in other projects.
   - *Key Technologies:* React, Node.js, Angular, React Native, C#, MongoDB, SQL, TypeScript, Express.

### 10.6 Education & Extension Project
- **Degree:** Technology Degree in Systems Analysis and Development (`2017 – 2019`)
- **Institution:** Federal University of Technology – Paraná (UTFPR) — Cornélio Procópio, Paraná, Brazil
- **Key Coursework:**
  - Software Engineering and Development Methodologies
  - Database Management Systems
  - Web Application Development
  - Computer Networks and Software Architecture
- **Extension Project — Educational Robotics and Programming for Children:**
  - Participated in a university extension project focused on teaching programming logic to children from public schools through LEGO educational robotics.
  - Supported hands-on learning activities using LEGO robots to introduce programming concepts and computational thinking.
  - Helped integrate robotics and programming into educational activities designed to support children's learning across different school subjects.
