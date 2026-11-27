import type { MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ALL_PROJECTS_URL, PROJECTS, type ProjectItem } from '../../data/projects';
import { isSafeExternalUrl } from '../../utils/assets';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  items?: readonly ProjectItem[];
}

export function Projects({ items = PROJECTS }: ProjectsProps) {
  const { t } = useLanguage();

  const preventPlaceholderJump = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const viewAllIsPlaceholder = ALL_PROJECTS_URL === '#' || !isSafeExternalUrl(ALL_PROJECTS_URL);
  const viewAllHref = viewAllIsPlaceholder ? '#' : ALL_PROJECTS_URL;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="projects-heading"
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
          />

          <a
            href={viewAllHref}
            onClick={viewAllIsPlaceholder ? preventPlaceholderJump : undefined}
            target={viewAllIsPlaceholder ? undefined : '_blank'}
            rel={viewAllIsPlaceholder ? undefined : 'noopener noreferrer'}
            title={viewAllIsPlaceholder ? t.projects.comingSoon : undefined}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            <span>{t.projects.viewAll}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
            {viewAllIsPlaceholder ? (
              <span className="sr-only"> ({t.projects.comingSoon})</span>
            ) : (
              <span className="sr-only"> {t.a11y.opensInNewTab}</span>
            )}
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} onPlaceholderClick={preventPlaceholderJump} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
