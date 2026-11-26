import { Box, Heart, Users, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { PillarId } from '../../i18n/types';
import { SectionHeading } from '../ui/SectionHeading';

const PILLARS: readonly { id: PillarId; Icon: typeof Zap; colorClass: string }[] = [
  { id: 'performance', Icon: Zap, colorClass: 'text-cyan' },
  { id: 'architecture', Icon: Box, colorClass: 'text-indigo' },
  { id: 'collaboration', Icon: Users, colorClass: 'text-violet' },
  { id: 'user-centric', Icon: Heart, colorClass: 'text-violet' },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <SectionHeading
            id="about-heading"
            eyebrow={t.about.eyebrow}
            title={t.about.titleLead}
            accentTitle={t.about.titleAccent}
            className="lg:col-span-5"
          />

          <div className="space-y-4 text-base leading-relaxed text-fg-secondary lg:col-span-7 lg:border-l lg:border-line lg:pl-10">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="max-w-[66ch]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ul
          aria-label={t.about.pillarsLabel}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line"
        >
          {PILLARS.map(({ id, Icon, colorClass }) => (
            <li key={id} className="flex items-center gap-3.5 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated">
                <Icon aria-hidden="true" className={`h-5 w-5 ${colorClass}`} />
              </span>
              <span className="text-sm font-medium text-fg">{t.about.pillars[id]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
