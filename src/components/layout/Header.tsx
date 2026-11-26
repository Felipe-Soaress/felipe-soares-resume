import { useCallback, useRef, useState } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { DICTIONARIES } from '../../i18n';
import { LOCALES, type TranslationDictionary } from '../../i18n/types';
import { resolveAssetUrl } from '../../utils/assets';
import { BrandLogo } from '../icons/BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu, type NavItem } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

type NavKey = keyof TranslationDictionary['nav'];

function getLongestNavLabel(key: NavKey): string {
  return LOCALES.reduce((longest, loc) => {
    const candidate = DICTIONARIES[loc].nav[key];
    return candidate.length > longest.length ? candidate : longest;
  }, '');
}

const NAV_SIZERS: Record<NavKey, string> = {
  about: getLongestNavLabel('about'),
  projects: getLongestNavLabel('projects'),
  experience: getLongestNavLabel('experience'),
  skills: getLongestNavLabel('skills'),
  contact: getLongestNavLabel('contact'),
  resume: getLongestNavLabel('resume'),
  letsTalk: getLongestNavLabel('letsTalk'),
};

export function Header() {
  const { locale, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const navItems: readonly (NavItem & { sizer: string })[] = [
    { href: '#about', label: t.nav.about, sizer: NAV_SIZERS.about },
    { href: '#projects', label: t.nav.projects, sizer: NAV_SIZERS.projects },
    { href: '#experience', label: t.nav.experience, sizer: NAV_SIZERS.experience },
    { href: '#skills', label: t.nav.skills, sizer: NAV_SIZERS.skills },
    { href: '#contact', label: t.nav.contact, sizer: NAV_SIZERS.contact },
  ];

  const resume = PROFILE.resumePdf[locale];
  const resumeHref = resolveAssetUrl(resume.file);

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-40 border-b border-line bg-[var(--bg-header)] backdrop-blur-md"
      >
        <div className="container-page flex h-16 items-center justify-between gap-2 xl:gap-3">
          <a
            href="#top"
            aria-label={t.a11y.home}
            className="inline-flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-fg transition-opacity hover:opacity-90"
          >
            <BrandLogo className="h-7 w-7" />
            <span className="font-display">{PROFILE.name}</span>
          </a>

          <nav aria-label={t.a11y.primaryNav} className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-sizer={item.sizer}
                className="stable-label text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />

            <a
              href={resumeHref}
              download={resume.downloadName}
              aria-label={t.a11y.resumeDownload}
              className="hidden place-items-center rounded-full border border-line bg-elevated px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-line-accent hover:bg-elevated-hover md:inline-grid xl:px-3.5"
            >
              <span className="col-start-1 row-start-1 inline-flex items-center gap-1.5 whitespace-nowrap">
                <Download aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-cyan" />
                <span>{t.nav.resume}</span>
              </span>
              <span
                aria-hidden="true"
                data-sizer={NAV_SIZERS.resume}
                className="stable-pill-sizer col-start-1 row-start-1 inline-flex items-center gap-1.5"
              >
                <span className="h-3.5 w-3.5 shrink-0" />
              </span>
            </a>

            <a
              href="#contact"
              className="gradient-border hidden place-items-center rounded-full bg-elevated px-3.5 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-elevated-hover lg:inline-grid xl:px-4"
            >
              <span className="col-start-1 row-start-1 inline-flex items-center gap-1.5 whitespace-nowrap">
                <span>{t.nav.letsTalk}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-violet" />
              </span>
              <span
                aria-hidden="true"
                data-sizer={NAV_SIZERS.letsTalk}
                className="stable-pill-sizer col-start-1 row-start-1 inline-flex items-center gap-1.5"
              >
                <span className="h-3.5 w-3.5 shrink-0" />
              </span>
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-strong hover:text-fg lg:hidden"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Menu aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMenu}
        triggerRef={triggerRef}
        navItems={navItems}
      />
    </>
  );
}
