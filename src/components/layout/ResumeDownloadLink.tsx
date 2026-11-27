import { forwardRef } from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { resolveAssetUrl } from '../../utils/assets';

interface ResumeDownloadLinkProps {
  variant: 'header' | 'mobile';
  sizer?: string;
  onClick?: () => void;
}

export const ResumeDownloadLink = forwardRef<HTMLAnchorElement, ResumeDownloadLinkProps>(
  function ResumeDownloadLink({ variant, sizer, onClick }, ref) {
    const { locale, t } = useLanguage();
    const resume = PROFILE.resumePdf[locale];
    const resumeHref = resolveAssetUrl(resume.file);

    if (variant === 'mobile') {
      return (
        <a
          ref={ref}
          href={resumeHref}
          download={resume.downloadName}
          aria-label={t.a11y.resumeDownload}
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          <span>{t.nav.resume}</span>
        </a>
      );
    }

    return (
      <a
        ref={ref}
        href={resumeHref}
        download={resume.downloadName}
        aria-label={t.a11y.resumeDownload}
        onClick={onClick}
        className="gradient-border hidden place-items-center rounded-full bg-elevated px-3.5 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-elevated-hover md:inline-grid xl:px-4"
      >
        <span className="col-start-1 row-start-1 inline-flex items-center gap-1.5 whitespace-nowrap">
          <Download aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-cyan" />
          <span>{t.nav.resume}</span>
        </span>
        {sizer ? (
          <span
            aria-hidden="true"
            data-sizer={sizer}
            className="stable-pill-sizer col-start-1 row-start-1 inline-flex items-center gap-1.5"
          >
            <span className="h-3.5 w-3.5 shrink-0" />
          </span>
        ) : null}
      </a>
    );
  },
);
