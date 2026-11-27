import { useState } from 'react';
import { GitCommitHorizontal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { EXPERIENCE_ITEMS, type ExperienceId } from '../../data/experience';
import { PROFILE } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';
import { EducationCard } from './EducationCard';
import { ExperienceRoleItem } from './ExperienceRoleItem';

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
          {EXPERIENCE_ITEMS.map((role) => (
            <ExperienceRoleItem
              key={role.id}
              role={role}
              isExpanded={expandedIds.has(role.id)}
              onToggle={() => toggleRole(role.id)}
            />
          ))}
        </ol>

        <EducationCard />
      </div>
    </section>
  );
}
