export type ExperienceId = 'fortis-se2' | 'fortis-se1' | 'oktagon-fe' | 'yankton-fs';

export interface ExperienceItem {
  id: ExperienceId;
  company: string;
  /** ISO year-month, e.g. '2024-06'. */
  startDate: string;
  endDate: string;
  previewTags: readonly string[];
  technologies: readonly string[];
}

/** Reverse-chronological, as in the CV. */
export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    id: 'fortis-se2',
    company: 'Fortis Games',
    startDate: '2024-06',
    endDate: '2026-11',
    previewTags: ['React', 'TypeScript', 'Sanity CMS', 'Microfrontends'],
    technologies: [
      'React',
      'TypeScript',
      'Sanity CMS',
      'Builder.io',
      'AWS Amplify',
      'TanStack',
      'Microfrontends',
      'RBAC',
      'npm',
      'Model Context Protocol (MCP)',
      'Claude Code',
      'SBOM',
      'Unibom',
      'PixiJS',
    ],
  },
  {
    id: 'fortis-se1',
    company: 'Fortis Games',
    startDate: '2022-03',
    endDate: '2024-06',
    previewTags: ['React', 'Remix', 'Nx', 'single-spa'],
    technologies: [
      'React',
      'TypeScript',
      'Remix',
      'Nx',
      'Microfrontends',
      'single-spa',
      'Webpack',
      'Redux-Saga',
      'Ant Design',
      'socket.io',
      'Storybook',
      'Tailwind CSS',
    ],
  },
  {
    id: 'oktagon-fe',
    company: 'Oktagon Games',
    startDate: '2019-08',
    endDate: '2022-03',
    previewTags: ['React', 'Angular', 'Microfrontends', 'WebSockets'],
    technologies: ['Angular', 'React', 'JavaScript', 'Python', 'Context API', 'Redux', 'Microfrontends', 'WebSockets'],
  },
  {
    id: 'yankton-fs',
    company: 'Yankton Technologies',
    startDate: '2018-05',
    endDate: '2019-08',
    previewTags: ['React', 'Node.js', 'React Native', 'TypeScript'],
    technologies: ['React', 'Node.js', 'Angular', 'React Native', 'C#', 'MongoDB', 'SQL', 'TypeScript', 'Express'],
  },
];

export const EDUCATION = {
  startYear: 2017,
  endYear: 2019,
} as const;

/** Formats '2024-06' as '06/2024', matching the CV. */
export function formatYearMonth(isoYearMonth: string): string {
  const [year, month] = isoYearMonth.split('-');
  return `${month}/${year}`;
}
