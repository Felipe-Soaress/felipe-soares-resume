import type { Locale } from '../i18n/types';

export type SkillCategoryId = 'core' | 'frontend' | 'architecture' | 'backend-ai' | 'testing-devops';
export type SoftSkillId =
  | 'collaboration'
  | 'international'
  | 'communication'
  | 'problem-solving'
  | 'code-reviews'
  | 'knowledge-sharing';

export type SkillIconId =
  | 'react'
  | 'typescript'
  | 'remix'
  | 'tailwind'
  | 'microfrontends'
  | 'monorepo'
  | 'cms'
  | 'performance'
  | 'code'
  | 'state'
  | 'design-system'
  | 'globe'
  | 'server'
  | 'database'
  | 'ai'
  | 'shield'
  | 'game'
  | 'test'
  | 'cloud'
  | 'terminal'
  | 'mobile'
  | 'package'
  | 'workflow';

export interface Skill {
  /** A plain string when the name is the same in every language. */
  name: string | Record<Locale, string>;
  icon: SkillIconId;
}

export interface SkillCategory {
  id: SkillCategoryId;
  skills: readonly Skill[];
}

const s = (name: Skill['name'], icon: SkillIconId): Skill => ({ name, icon });

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: 'core',
    skills: [
      s('React', 'react'),
      s('TypeScript', 'typescript'),
      s('Remix', 'remix'),
      s('Tailwind CSS', 'tailwind'),
      s('Microfrontends', 'microfrontends'),
      s('Monorepos (Nx, Turborepo)', 'monorepo'),
      s('Sanity CMS', 'cms'),
      s({ 'en-US': 'Performance & A11y', 'pt-BR': 'Performance e A11y' }, 'performance'),
    ],
  },
  {
    id: 'frontend',
    skills: [
      s('React', 'react'),
      s('TypeScript', 'typescript'),
      s('JavaScript', 'code'),
      s('Remix', 'remix'),
      s('Angular', 'code'),
      s('React Native', 'mobile'),
      s('TanStack Router', 'workflow'),
      s('TanStack Query', 'state'),
      s('React Router', 'workflow'),
      s('Tailwind CSS', 'tailwind'),
      s('styled-components', 'design-system'),
      s('Ant Design', 'design-system'),
      s('Redux / Redux-Saga', 'state'),
      s('Context API', 'state'),
      s('GrowthBook', 'state'),
      s('WebSockets / socket.io', 'globe'),
      s('HTML5 & CSS3', 'code'),
    ],
  },
  {
    id: 'architecture',
    skills: [
      s('Microfrontends (single-spa, Webpack)', 'microfrontends'),
      s('Monorepos (Nx, Turborepo)', 'monorepo'),
      s('Design Systems', 'design-system'),
      s({ 'en-US': 'Component libraries', 'pt-BR': 'Bibliotecas de componentes' }, 'design-system'),
      s('Storybook', 'design-system'),
      s('Changesets', 'package'),
      s({ 'en-US': 'npm package publishing', 'pt-BR': 'Publicação de pacotes npm' }, 'package'),
      s('Sanity CMS', 'cms'),
      s('Builder.io', 'cms'),
      s('Headless CMS', 'cms'),
      s('SEO', 'performance'),
      s('Stripe', 'server'),
      s('Greenhouse', 'server'),
      s({ 'en-US': 'Internationalization (i18n)', 'pt-BR': 'Internacionalização (i18n)' }, 'globe'),
      s({ 'en-US': 'Geolocation', 'pt-BR': 'Geolocalização' }, 'globe'),
    ],
  },
  {
    id: 'backend-ai',
    skills: [
      s('Node.js', 'server'),
      s('Express', 'server'),
      s('Python', 'code'),
      s('C#', 'code'),
      s('SQL', 'database'),
      s('REST APIs', 'server'),
      s('OpenAPI', 'server'),
      s('Model Context Protocol (MCP)', 'ai'),
      s('Claude Code', 'ai'),
      s({ 'en-US': 'Workflow automation', 'pt-BR': 'Automação de fluxos' }, 'workflow'),
      s('SBOM / Unibom', 'shield'),
      s('JWT', 'shield'),
      s('RBAC', 'shield'),
      s('MongoDB', 'database'),
      s('PixiJS', 'game'),
      s('Howler', 'game'),
    ],
  },
  {
    id: 'testing-devops',
    skills: [
      s('Vitest', 'test'),
      s('Jest', 'test'),
      s('React Testing Library', 'test'),
      s('Playwright', 'test'),
      s('WebdriverIO', 'test'),
      s('Mock Service Worker (MSW)', 'test'),
      s('Storybook Accessibility', 'performance'),
      s('Docker', 'cloud'),
      s('Terraform (HCL)', 'cloud'),
      s('AWS SDK', 'cloud'),
      s('AWS Amplify', 'cloud'),
      s('GitHub Actions', 'workflow'),
      s('Vite', 'package'),
      s('Webpack', 'package'),
      s('Shell', 'terminal'),
      s('Makefile', 'terminal'),
    ],
  },
];

export const SOFT_SKILL_IDS: readonly SoftSkillId[] = [
  'collaboration',
  'international',
  'communication',
  'problem-solving',
  'code-reviews',
  'knowledge-sharing',
];

export function skillName(skill: Skill, locale: Locale): string {
  return typeof skill.name === 'string' ? skill.name : skill.name[locale];
}
