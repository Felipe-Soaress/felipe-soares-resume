import { useRef, useState, type KeyboardEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  SKILL_CATEGORIES,
  SOFT_SKILL_IDS,
  skillName,
  type SkillCategoryId,
} from '../../data/skills';
import { SkillIcon } from '../icons/SkillIcons';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  const { locale, t } = useLanguage();
  const [activeId, setActiveId] = useState<SkillCategoryId>('core');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeCategory =
    SKILL_CATEGORIES.find((category) => category.id === activeId) ?? SKILL_CATEGORIES[0];

  const handleTabKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = SKILL_CATEGORIES.length;
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % count;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + count) % count;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextCategory = SKILL_CATEGORIES[nextIndex];
    setActiveId(nextCategory.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading
              id="skills-heading"
              eyebrow={t.skills.eyebrow}
              title={t.skills.title}
              description={t.skills.description}
            />

            <div
              role="tablist"
              aria-label={t.skills.tablistLabel}
              className="mt-6 flex flex-wrap gap-2"
            >
              {SKILL_CATEGORIES.map((category, index) => {
                const isSelected = category.id === activeCategory.id;
                return (
                  <button
                    key={category.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    id={`skills-tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`skills-panel-${category.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActiveId(category.id)}
                    onKeyDown={handleTabKeyDown(index)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'border-line-accent bg-accent-gradient text-white shadow-sm'
                        : 'border-line bg-elevated text-fg-secondary hover:border-line-strong hover:bg-elevated-hover hover:text-fg'
                    }`}
                  >
                    {t.skills.categories[category.id]}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id={`skills-panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeCategory.id}`}
            tabIndex={0}
            className="lg:col-span-8"
          >
            <ul
              className={`grid gap-3 ${
                activeCategory.id === 'core'
                  ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              }`}
            >
              {activeCategory.skills.map((skill) => {
                const label = skillName(skill, locale);
                return (
                  <li
                    key={label}
                    className="surface-card flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:border-line-accent"
                  >
                    <SkillIcon id={skill.icon} className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium text-fg">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-fg-muted">
            {t.skills.softSkillsTitle}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {SOFT_SKILL_IDS.map((id) => (
              <li
                key={id}
                className="rounded-full border border-line bg-elevated px-4 py-1.5 text-xs font-medium text-fg-secondary"
              >
                {t.skills.softSkills[id]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
