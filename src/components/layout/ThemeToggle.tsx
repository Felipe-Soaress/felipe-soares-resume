import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const label = isDark ? t.a11y.switchToLight : t.a11y.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-strong hover:bg-elevated-hover hover:text-fg"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-4 w-4 text-cyan" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4 text-indigo" />
      )}
    </button>
  );
}
