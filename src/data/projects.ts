export type ProjectId = 'game-ops-platform' | 'analytics-moderation' | 'web-game-lab';
export type ProjectPlaceholderVariant = 'game-ops' | 'analytics-moderation' | 'web-game-lab';
export type ProjectIconId = 'gamepad' | 'chart' | 'sparkles';

export interface ProjectItem {
  id: ProjectId;
  /** Use '#' while the project page is not ready; replace with a real https:// URL later. */
  url: string;
  /** Path inside `public/` (e.g. 'projects/game-ops.webp') or null to show the illustrated placeholder. */
  image: string | null;
  placeholderVariant: ProjectPlaceholderVariant;
  icon: ProjectIconId;
  tags: readonly string[];
}

/** Link for the "View all projects" action. Replace '#' with a portfolio or GitHub URL later. */
export const ALL_PROJECTS_URL = '#';

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: 'game-ops-platform',
    url: '#',
    image: null,
    placeholderVariant: 'game-ops',
    icon: 'gamepad',
    tags: ['React', 'TypeScript', 'Microfrontends', 'RBAC'],
  },
  {
    id: 'analytics-moderation',
    url: '#',
    image: null,
    placeholderVariant: 'analytics-moderation',
    icon: 'chart',
    tags: ['React', 'Remix', 'Nx', 'Tailwind CSS'],
  },
  {
    id: 'web-game-lab',
    url: '#',
    image: null,
    placeholderVariant: 'web-game-lab',
    icon: 'sparkles',
    tags: ['React', 'PixiJS', 'TypeScript', 'MCP'],
  },
];
