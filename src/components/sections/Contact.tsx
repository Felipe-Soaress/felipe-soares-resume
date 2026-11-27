import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { cn } from '../../utils/cn';
import { GitHubIcon, LinkedInIcon } from '../icons/SocialIcons';
import { ContactBackdrop } from '../illustrations/ContactBackdrop';
import { ExternalLink } from '../ui/ExternalLink';
import { IconButton, iconActionClassName } from '../ui/IconAction';
import { SectionHeading } from '../ui/SectionHeading';

type CopyStatus = 'idle' | 'copied' | 'failed';

export function Contact() {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyStatus('copied');
      timerRef.current = window.setTimeout(() => {
        setCopyStatus('idle');
      }, 4000);
    } catch {
      setCopyStatus('failed');
    }
  };

  const liveMessage =
    copyStatus === 'copied'
      ? t.contact.copied
      : copyStatus === 'failed'
        ? t.contact.copyFailed(PROFILE.email)
        : '';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="gradient-border surface-card relative overflow-hidden rounded-[20px] p-8 sm:p-10 lg:p-12">
          <ContactBackdrop />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading
              id="contact-heading"
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              description={t.contact.description}
              className="max-w-xl"
            />

            <div className="flex flex-col items-start gap-5 lg:items-center">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-opacity hover:opacity-95"
              >
                <span>{t.contact.cta}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>

              <ul
                aria-label={t.contact.socialLabel}
                className="flex items-center gap-3 text-fg-secondary"
              >
                <li>
                  <ExternalLink
                    href={PROFILE.linkedin}
                    ariaLabel={t.contact.linkedin}
                    className={iconActionClassName('md')}
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </ExternalLink>
                </li>

                <li>
                  <ExternalLink
                    href={PROFILE.github}
                    ariaLabel={t.contact.github}
                    className={iconActionClassName('md')}
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </ExternalLink>
                </li>

                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label={t.contact.email}
                    className={iconActionClassName('md')}
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>

                <li>
                  <IconButton
                    size="md"
                    onClick={handleCopyEmail}
                    aria-label={t.contact.copyEmail}
                    title={t.contact.copyEmail}
                  >
                    {copyStatus === 'copied' ? (
                      <Check aria-hidden="true" className="h-4 w-4 text-status-text" />
                    ) : (
                      <Copy aria-hidden="true" className="h-4 w-4" />
                    )}
                  </IconButton>
                </li>
              </ul>

              <span
                role="status"
                className={cn(
                  'min-h-[1.25rem] text-xs font-medium',
                  copyStatus === 'copied' ? 'text-status-text' : 'text-fg-secondary',
                )}
              >
                {liveMessage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
