import { GraduationCap, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { EDUCATION } from '../../data/experience';
import { BulletList } from '../ui/BulletList';
import { TagList } from '../ui/TagList';

export function EducationCard() {
  const { t } = useLanguage();
  const { education } = t.experience;

  return (
    <article aria-labelledby="education-heading" className="surface-card mt-8 rounded-2xl p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-accent bg-subtle text-violet">
            <GraduationCap aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h3
              id="education-heading"
              className="font-sans text-xs font-semibold tracking-[0.12em] uppercase text-cyan"
            >
              {education.heading}
            </h3>
            <h4 className="mt-1 text-lg font-bold text-fg">{education.degree}</h4>
            <p className="mt-1 text-sm font-medium text-accent">{education.institution}</p>
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
            <span>{education.location}</span>
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-fg-muted">
          {education.courseworkLabel}
        </p>
        <TagList items={education.coursework} itemClassName="px-2.5 py-1" />
      </div>

      <div className="mt-5 border-t border-line pt-5">
        <h5 className="text-sm font-semibold text-fg">{education.extensionTitle}</h5>
        <BulletList
          items={education.extensionPoints}
          dotClassName="bg-violet"
          className="mt-2.5 space-y-1.5"
          itemGapClassName="gap-2.5"
        />
      </div>
    </article>
  );
}
