import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from '../ui/IconAction';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const label = isDark ? t.a11y.switchToLight : t.a11y.switchToDark;

  return (
    <IconButton
      size="sm"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="hover:border-line-strong"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-4 w-4 text-cyan" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4 text-indigo" />
      )}
    </IconButton>
  );
}
