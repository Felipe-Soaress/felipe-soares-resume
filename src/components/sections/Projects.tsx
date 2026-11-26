import type { MouseEvent } from 'react';
import { ArrowRight, BarChart3, Gamepad2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ALL_PROJECTS_URL, PROJECTS, type ProjectIconId, type ProjectItem } from '../../data/projects';
import { resolveAssetUrl } from '../../utils/assets';
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder';
import { SectionHeading } from '../ui/SectionHeading';

function ProjectBadgeIcon({ icon }: { icon: ProjectIconId }) {
  switch (icon) {
    case 'gamepad':
      return <Gamepad2 aria-hidden="true" className="h-5 w-5 text-cyan" />;
    case 'chart':
      return <BarChart3 aria-hidden="true" className="h-5 w-5 text-indigo" />;
    case 'sparkles':
      return <Sparkles aria-hidden="true" className="h-5 w-5 text-violet" />;
  }
}

interface ProjectsProps {
  items?: readonly ProjectItem[];
}

export function Projects({ items = PROJECTS }: ProjectsProps) {
  const { t } = useLanguage();

  const handleLinkClick = (url: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (url === '#') {
      event.preventDefault();
    }
  };

  const viewAllIsPlaceholder = ALL_PROJECTS_URL === '#';

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
            href={ALL_PROJECTS_URL}
            onClick={handleLinkClick(ALL_PROJECTS_URL)}
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

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => {
            const copy = t.projects.items[project.id];
            const isPlaceholder = project.url === '#';

            return (
              <article
                key={project.id}
                className="surface-card group relative flex flex-col overflow-hidden rounded-2xl transition-colors focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2 focus-within:ring-offset-base hover:border-line-accent"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
                  {project.image ? (
                    <img
                      src={resolveAssetUrl(project.image)}
                      alt={copy.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <ProjectPlaceholder variant={project.placeholderVariant} />
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent"
                  />

                  <span className="absolute top-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-[var(--bg-header)] backdrop-blur-md">
                    <ProjectBadgeIcon icon={project.icon} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-fg">
                      <a
                        href={project.url}
                        onClick={handleLinkClick(project.url)}
                        target={isPlaceholder ? undefined : '_blank'}
                        rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                        title={isPlaceholder ? t.projects.comingSoon : undefined}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {copy.title}
                        {isPlaceholder ? (
                          <span className="sr-only"> ({t.projects.comingSoon})</span>
                        ) : (
                          <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                        )}
                      </a>
                    </h3>

                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-subtle text-fg-secondary transition-colors group-hover:border-line-accent group-hover:text-cyan"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-secondary">
                    {copy.description}
                  </p>

                  <ul aria-label={t.projects.techLabel} className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-xs font-medium text-fg-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
