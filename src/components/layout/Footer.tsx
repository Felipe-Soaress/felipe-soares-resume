import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { BrandLogo } from '../icons/BrandLogo';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-line py-8">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3 text-sm">
          <BrandLogo className="h-6 w-6" />
          <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
          <p className="text-fg-secondary">
            <span className="font-semibold text-fg">{PROFILE.name}</span>
            <span aria-hidden="true" className="mx-2 text-fg-muted">
              ·
            </span>
            <span>{t.footer.role}</span>
          </p>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-fg-muted">
          <span>{t.footer.tagline.join(' · ')}</span>
          <span aria-hidden="true">·</span>
          <span>© {year}</span>
        </p>
      </div>
    </footer>
  );
}
