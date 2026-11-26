import { useState } from 'react';
import { Briefcase, ChevronDown, GitCommitHorizontal, GraduationCap, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { EDUCATION, EXPERIENCE_ITEMS, formatYearMonth, type ExperienceId } from '../../data/experience';
import { PROFILE } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  const { locale, t } = useLanguage();
  const [expandedIds, setExpandedIds] = useState<Set<ExperienceId>>(() => new Set(['fortis-se2']));

  const allExpanded = expandedIds.size === EXPERIENCE_ITEMS.length;

  const toggleRole = (id: ExperienceId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(EXPERIENCE_ITEMS.map((item) => item.id)));
    }
  };

  const formattedCommits = `${PROFILE.commitsCount.toLocaleString(locale)}+`;
  const formattedRepos = `${PROFILE.reposCount}+`;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="experience-heading"
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">
              <GitCommitHorizontal aria-hidden="true" className="h-3.5 w-3.5 text-cyan" />
              <span>{t.experience.highlight(formattedCommits, formattedRepos)}</span>
            </Badge>

            <button
              type="button"
              onClick={toggleAll}
              className="rounded-full border border-line bg-elevated px-3.5 py-1.5 text-xs font-semibold text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg"
            >
              {allExpanded ? t.experience.collapseAll : t.experience.expandAll}
            </button>
          </div>
        </div>

        <ol className="mt-10 space-y-4">
          {EXPERIENCE_ITEMS.map((role) => {
            const copy = t.experience.roles[role.id];
            const isExpanded = expandedIds.has(role.id);
            const buttonId = `exp-trigger-${role.id}`;
            const panelId = `exp-panel-${role.id}`;

            return (
              <li key={role.id}>
                <article className="surface-card overflow-hidden rounded-2xl transition-colors hover:border-line-strong">
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => toggleRole(role.id)}
                      className="flex w-full flex-col gap-3 p-5 text-left transition-colors hover:bg-elevated-hover sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-cyan">
                            <Briefcase aria-hidden="true" className="h-4 w-4" />
                          </span>
                          <span className="font-display text-lg font-bold text-fg">{copy.title}</span>
                          <span className="text-fg-muted"> · </span>
                          <span className="text-sm font-semibold text-accent">{role.company}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-10 text-xs text-fg-muted">
                          <span>
                            <time dateTime={role.startDate}>{formatYearMonth(role.startDate)}</time>
                            {' – '}
                            <time dateTime={role.endDate}>{formatYearMonth(role.endDate)}</time>
                          </span>
                          <span className="sr-only">, </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                            <span>{copy.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pl-10 sm:justify-end sm:pl-0">
                        {!isExpanded ? (
                          <div aria-hidden="true" className="hidden flex-wrap justify-end gap-1.5 md:flex">
                            {role.previewTags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-line bg-subtle px-2 py-0.5 text-xs font-medium text-fg-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <span
                          aria-hidden="true"
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-subtle text-fg-secondary"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </span>
                      </div>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isExpanded}
                    className="border-t border-line px-5 pt-5 pb-6 sm:px-6"
                  >
                    <ul className="space-y-2.5 text-sm leading-relaxed text-fg-secondary">
                      {copy.achievements.map((bullet, index) => (
                        <li key={index} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t border-line pt-4">
                      <p className="mb-2.5 text-xs font-semibold tracking-wider uppercase text-fg-muted">
                        {t.experience.keyTechnologies}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {role.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-xs font-medium text-fg-secondary"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <article
          aria-labelledby="education-heading"
          className="surface-card mt-8 rounded-2xl p-6 sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-accent bg-subtle text-violet">
                <GraduationCap aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-cyan">
                  {t.experience.education.heading}
                </p>
                <h3 id="education-heading" className="mt-1 text-lg font-bold text-fg">
                  {t.experience.education.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">{t.experience.education.institution}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted">
              <span>
                <time dateTime={String(EDUCATION.startYear)}>{EDUCATION.startYear}</time>
                {' – '}
                <time dateTime={String(EDUCATION.endYear)}>{EDUCATION.endYear}</time>
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{t.experience.education.location}</span>
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-fg-muted">
              {t.experience.education.courseworkLabel}
            </p>
            <ul className="flex flex-wrap gap-2">
              {t.experience.education.coursework.map((course) => (
                <li
                  key={course}
                  className="rounded-md border border-line bg-subtle px-2.5 py-1 text-xs font-medium text-fg-secondary"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            <h4 className="text-sm font-semibold text-fg">{t.experience.education.extensionTitle}</h4>
            <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-fg-secondary">
              {t.experience.education.extensionPoints.map((point, index) => (
                <li key={index} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
