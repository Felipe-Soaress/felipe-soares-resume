import type { ReactNode } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { isSafeExternalUrl } from '../../utils/assets';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

/**
 * External link that enforces `target="_blank"`, `rel="noopener noreferrer"`,
 * URL scheme allowlisting, and screen-reader new-tab announcement.
 */
export function ExternalLink({ href, children, className, ariaLabel, title }: ExternalLinkProps) {
  const { t } = useLanguage();
  const safeHref = isSafeExternalUrl(href) ? href : '#';

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} ${t.a11y.opensInNewTab}` : undefined}
      title={title}
      className={className}
    >
      {children}
      {!ariaLabel ? <span className="sr-only"> {t.a11y.opensInNewTab}</span> : null}
    </a>
  );
}
