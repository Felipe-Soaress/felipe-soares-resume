import { useEffect, useRef, type RefObject } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { resolveAssetUrl } from '../../utils/assets';

export interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  navItems: readonly NavItem[];
}

export function MobileMenu({ isOpen, onClose, triggerRef, navItems }: MobileMenuProps) {
  const { locale, t } = useLanguage();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        triggerRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const resume = PROFILE.resumePdf[locale];
  const resumeHref = resolveAssetUrl(resume.file);

  return (
    <div id="mobile-menu" className="lg:hidden">
      <div
        className="fixed inset-x-0 top-16 bottom-0 z-30 bg-black/50 backdrop-blur-xs"
        aria-hidden="true"
        onClick={onClose}
      />
      <nav
        aria-label={t.a11y.mobileNav}
        className="fixed inset-x-0 top-16 z-40 border-b border-line bg-elevated px-5 py-6 shadow-2xl"
      >
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <a
            ref={firstLinkRef}
            href={resumeHref}
            download={resume.downloadName}
            aria-label={t.a11y.resumeDownload}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-accent bg-subtle px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-elevated-hover"
          >
            <Download aria-hidden="true" className="h-4 w-4 text-cyan" />
            <span>{t.nav.resume}</span>
          </a>

          <ul className="flex flex-col divide-y divide-line">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-base font-medium text-fg-secondary transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </div>
  );
}
