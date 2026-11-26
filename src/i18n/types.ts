import type { ExperienceId } from '../data/experience';
import type { ProjectId } from '../data/projects';
import type { SkillCategoryId, SoftSkillId } from '../data/skills';

export type Locale = 'en-US' | 'pt-BR';
export const LOCALES: readonly Locale[] = ['en-US', 'pt-BR'];

export type PillarId = 'performance' | 'architecture' | 'collaboration' | 'user-centric';

export interface RoleCopy {
  title: string;
  location: string;
  achievements: readonly string[];
}

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    mobileNav: string;
    home: string;
    language: string;
    languageNames: Record<Locale, string>;
    switchToLight: string;
    switchToDark: string;
    openMenu: string;
    closeMenu: string;
    opensInNewTab: string;
    resumeDownload: string;
  };
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    letsTalk: string;
    resume: string;
  };
  hero: {
    badge: (years: number) => string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
  };
  about: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    paragraphs: readonly string[];
    pillarsLabel: string;
    pillars: Record<PillarId, string>;
  };
  projects: {
    eyebrow: string;
    title: string;
    viewAll: string;
    comingSoon: string;
    techLabel: string;
    items: Record<ProjectId, { title: string; description: string; imageAlt: string }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    highlight: (commits: string, repos: string) => string;
    expandAll: string;
    collapseAll: string;
    remote: string;
    keyTechnologies: string;
    roles: Record<ExperienceId, RoleCopy>;
    education: {
      heading: string;
      degree: string;
      institution: string;
      location: string;
      courseworkLabel: string;
      coursework: readonly string[];
      extensionTitle: string;
      extensionPoints: readonly string[];
    };
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    tablistLabel: string;
    categories: Record<SkillCategoryId, string>;
    softSkillsTitle: string;
    softSkills: Record<SoftSkillId, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    copyEmail: string;
    copied: string;
    copyFailed: (email: string) => string;
    socialLabel: string;
    linkedin: string;
    github: string;
    email: string;
  };
  footer: {
    role: string;
    tagline: readonly string[];
  };
}
