import { Briefcase, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { formatYearMonth, type ExperienceItem } from '../../data/experience';
import { cn } from '../../utils/cn';
import { BulletList } from '../ui/BulletList';
import { TAG_CHIP_BASE_CLASS, TagList } from '../ui/TagList';

interface ExperienceRoleItemProps {
  role: ExperienceItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExperienceRoleItem({ role, isExpanded, onToggle }: ExperienceRoleItemProps) {
  const { t } = useLanguage();
  const copy = t.experience.roles[role.id];
  const buttonId = `exp-trigger-${role.id}`;
  const panelId = `exp-panel-${role.id}`;

  return (
    <li>
      <article className="surface-card overflow-hidden rounded-2xl transition-colors hover:border-line-strong">
        <h3 className="m-0">
          <button
            id={buttonId}
            type="button"
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full flex-col gap-3 p-5 text-left transition-colors hover:bg-elevated-hover sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <span className="block space-y-1.5">
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-cyan">
                  <Briefcase aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="font-display text-lg font-bold text-fg">{copy.title}</span>
                <span className="sr-only">, </span>
                <span aria-hidden="true" className="text-fg-muted">
                  ·
                </span>
                <span className="text-sm font-semibold text-accent">{role.company}</span>
              </span>

              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-10 text-xs text-fg-muted">
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
              </span>
            </span>

            <span className="flex items-center justify-between gap-3 pl-10 sm:justify-end sm:pl-0">
              {!isExpanded ? (
                <span aria-hidden="true" className="hidden flex-wrap justify-end gap-1.5 md:flex">
                  {role.previewTags.map((tag) => (
                    <span key={tag} className={cn(TAG_CHIP_BASE_CLASS, 'px-2 py-0.5')}>
                      {tag}
                    </span>
                  ))}
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-subtle text-fg-secondary"
              >
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')}
                />
              </span>
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!isExpanded}
          className="border-t border-line px-5 pt-5 pb-6 sm:px-6"
        >
          <BulletList items={copy.achievements} dotClassName="bg-cyan" />

          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 text-xs font-semibold tracking-wider uppercase text-fg-muted">
              {t.experience.keyTechnologies}
            </p>
            <TagList items={role.technologies} />
          </div>
        </div>
      </article>
    </li>
  );
}
