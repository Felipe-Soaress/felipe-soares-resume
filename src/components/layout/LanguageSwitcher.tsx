import { useLanguage, type Locale } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

const OPTIONS: readonly { locale: Locale; shortLabel: string }[] = [
  { locale: 'pt-BR', shortLabel: 'PT' },
  { locale: 'en-US', shortLabel: 'EN' },
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className="inline-flex items-center rounded-full border border-line bg-elevated p-0.5 text-xs font-semibold"
    >
      {OPTIONS.map((option) => {
        const active = locale === option.locale;
        return (
          <button
            key={option.locale}
            type="button"
            lang={option.locale}
            onClick={() => setLocale(option.locale)}
            aria-pressed={active}
            aria-label={t.a11y.languageNames[option.locale]}
            className={cn(
              'rounded-full px-2.5 py-1 transition-colors',
              active ? 'bg-accent-gradient text-white shadow-sm' : 'text-fg-secondary hover:text-fg',
            )}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
