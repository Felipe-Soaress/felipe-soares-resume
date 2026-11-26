import { useLanguage } from '../../context/LanguageContext';

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only-focusable fixed top-3 left-3 z-50 rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
