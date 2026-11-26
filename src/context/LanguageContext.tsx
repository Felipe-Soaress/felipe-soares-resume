import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DICTIONARIES } from '../i18n';
import type { Locale, TranslationDictionary } from '../i18n/types';

export type { Locale } from '../i18n/types';
export const LOCALE_STORAGE_KEY = 'felipe-resume-locale';

function isLocale(value: unknown): value is Locale {
  return value === 'en-US' || value === 'pt-BR';
}

/**
 * Picks the first supported language in the visitor's preference order:
 * any `pt*` tag → 'pt-BR', any `en*` tag → 'en-US'. Anything else falls back to 'en-US'.
 */
export function detectBrowserLocale(languages?: readonly string[], language?: string): Locale {
  const candidates = [...(languages ?? []), ...(language ? [language] : [])];
  for (const tag of candidates) {
    const normalized = tag.trim().toLowerCase();
    if (normalized.startsWith('pt')) return 'pt-BR';
    if (normalized.startsWith('en')) return 'en-US';
  }
  return 'en-US';
}

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage blocked: fall through to browser detection.
  }
  if (typeof navigator === 'undefined') return 'en-US';
  return detectBrowserLocale(navigator.languages, navigator.language);
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale);
  const t = DICTIONARIES[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Keep working in memory when storage is unavailable.
    }
  }, [locale, t]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>.');
  return context;
}
