import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { GitHubIcon, LinkedInIcon } from '../icons/SocialIcons';
import { HeroArtwork } from '../illustrations/HeroArtwork';
import { Badge } from '../ui/Badge';
import { ExternalLink } from '../ui/ExternalLink';

const SOCIAL_LINK_CLASS =
  'inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-line-accent hover:bg-elevated-hover';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
    >
      <HeroArtwork />

      <div className="container-page relative z-10">
        <div className="max-w-2xl">
          <Badge variant="status" className="mb-6">
            {t.hero.badge(PROFILE.experienceYears)}
          </Badge>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-fg sm:text-6xl lg:text-[4rem]"
          >
            <span className="block">{t.hero.titleLead}</span>
            <span className="text-gradient inline-block">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-fg-secondary sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-opacity hover:opacity-95"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>

            <ExternalLink href={PROFILE.linkedin} className={SOCIAL_LINK_CLASS}>
              <LinkedInIcon className="h-4 w-4 text-fg" />
              <span>{t.contact.linkedin}</span>
            </ExternalLink>

            <ExternalLink href={PROFILE.github} className={SOCIAL_LINK_CLASS}>
              <GitHubIcon className="h-4 w-4 text-fg" />
              <span>{t.contact.github}</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
