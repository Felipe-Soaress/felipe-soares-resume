import { useCallback, useRef, useState } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { resolveAssetUrl } from '../../utils/assets';
import { BrandLogo } from '../icons/BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu, type NavItem } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { locale, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  const navItems: readonly NavItem[] = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ];

  const resume = PROFILE.resumePdf[locale];
  const resumeHref = resolveAssetUrl(resume.file);

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-40 border-b border-line bg-[var(--bg-header)] backdrop-blur-md"
      >
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <a
            href="#top"
            aria-label={t.a11y.home}
            className="inline-flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-fg transition-opacity hover:opacity-90"
          >
            <BrandLogo className="h-7 w-7" />
            <span className="font-display">{PROFILE.name}</span>
          </a>

          <nav aria-label={t.a11y.primaryNav} className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />

            <a
              href={resumeHref}
              download={resume.downloadName}
              aria-label={t.a11y.resumeDownload}
              className="hidden items-center gap-1.5 rounded-full border border-line bg-elevated px-3.5 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-line-accent hover:bg-elevated-hover md:inline-flex"
            >
              <Download aria-hidden="true" className="h-3.5 w-3.5 text-cyan" />
              <span>{t.nav.resume}</span>
            </a>

            <a
              href="#contact"
              className="gradient-border hidden items-center gap-1.5 rounded-full bg-elevated px-4 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-elevated-hover lg:inline-flex"
            >
              <span>{t.nav.letsTalk}</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-violet" />
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
