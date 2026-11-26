import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider } from '../../context/LanguageContext';
import { Header } from './Header';
import { SkipLink } from './SkipLink';

function renderHeader() {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <SkipLink />
        <Header />
      </LanguageProvider>
    </ThemeProvider>,
  );
}

describe('Header & SkipLink', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('felipe-resume-locale', 'en-US');
    localStorage.setItem('felipe-resume-theme', 'dark');
    document.body.style.overflow = '';
  });

  it('renders skip link, nav links, always-visible language/theme controls, and resume PDF download link', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Português (Brasil)' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');

    const downloadLink = screen.getByRole('link', { name: /download resume/i });
    expect(downloadLink).toHaveAttribute('download', 'Felipe-Soares-Resume.pdf');
    expect(downloadLink.getAttribute('href')).toContain('felipe-soares-resume-en.pdf');
  });

  it('switches language to pt-BR and toggles theme to light', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Português (Brasil)' }));
    expect(screen.getByRole('link', { name: 'Experiência' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /baixar currículo em inglês/i })).toHaveTextContent('Currículo (EN)');

    await user.click(screen.getByRole('button', { name: /alternar para tema claro/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /alternar para tema escuro/i })).toBeInTheDocument();
  });

  it('opens mobile menu, locks body scroll, closes on Escape, and restores focus to trigger', async () => {
    const user = userEvent.setup();
    renderHeader();
    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  });
});
