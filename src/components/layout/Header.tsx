import { useCallback, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { DICTIONARIES } from '../../i18n';
import { LOCALES, type TranslationDictionary } from '../../i18n/types';
import { BrandLogo } from '../icons/BrandLogo';
import { IconButton } from '../ui/IconAction';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu, type NavItem } from './MobileMenu';
import { ResumeDownloadLink } from './ResumeDownloadLink';
import { ThemeToggle } from './ThemeToggle';

type NavKey = keyof TranslationDictionary['nav'];
type SectionNavKey = Exclude<NavKey, 'resume'>;

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
};

const NAV_CONFIG: readonly { key: SectionNavKey; href: string }[] = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const navItems: readonly (NavItem & { sizer: string })[] = NAV_CONFIG.map(({ key, href }) => ({
    href,
    label: t.nav[key],
    sizer: NAV_SIZERS[key],
  }));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-[var(--bg-header)] backdrop-blur-md">
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
            <ResumeDownloadLink variant="header" sizer={NAV_SIZERS.resume} />

            <IconButton
              ref={triggerRef}
              size="sm"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              className="hover:border-line-strong lg:hidden"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Menu aria-hidden="true" className="h-4 w-4" />
              )}
            </IconButton>
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
