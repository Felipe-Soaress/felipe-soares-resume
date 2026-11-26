import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROFILE } from '../../data/profile';
import { GitHubIcon, LinkedInIcon } from '../icons/SocialIcons';
import { SectionHeading } from '../ui/SectionHeading';

type CopyStatus = 'idle' | 'copied' | 'failed';

export function Contact() {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const timerRef = useRef<number | null>(null);
  const uid = useId();
  const arcGrad = `${uid}-arc`;
  const glowGrad = `${uid}-glow`;

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
          {/* Decorative sweeping arc and ambient corner glow matching reference */}
          <svg
            viewBox="0 0 1120 300"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id={glowGrad} cx="88%" cy="22%" r="55%">
                <stop offset="0%" stopColor="var(--glow-indigo)" />
                <stop offset="60%" stopColor="var(--glow-cyan)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id={arcGrad} x1="600" y1="300" x2="1080" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.6" />
                <stop offset="55%" stopColor="var(--accent-indigo)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect width="1120" height="300" fill={`url(#${glowGrad})`} />
            <path
              d="M640 310 C720 140 870 30 1130 -10"
              stroke={`url(#${arcGrad})`}
              strokeWidth="1.25"
            />
          </svg>

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

              <div
                aria-label={t.contact.socialLabel}
                className="flex items-center gap-3 text-fg-secondary"
              >
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.contact.linkedin} ${t.a11y.opensInNewTab}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.contact.github} ${t.a11y.opensInNewTab}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label={t.contact.email}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={t.contact.copyEmail}
                  title={t.contact.copyEmail}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg"
                >
                  {copyStatus === 'copied' ? (
                    <Check aria-hidden="true" className="h-4 w-4 text-status-text" />
                  ) : (
                    <Copy aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>

              <span
                role="status"
                aria-live="polite"
                className={`min-h-[1.25rem] text-xs font-medium ${
                  copyStatus === 'copied' ? 'text-status-text' : 'text-fg-secondary'
                }`}
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
