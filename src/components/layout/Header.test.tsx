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

    // WCAG 2.5.3 Label in Name: accessible name must include the visible text ("PT", "EN", "Resume")
    const ptBtn = screen.getByRole('button', { name: /pt.*português/i });
    const enBtn = screen.getByRole('button', { name: /en.*english/i });
    expect(ptBtn).toHaveAttribute('aria-pressed', 'false');
    expect(enBtn).toHaveAttribute('aria-pressed', 'true');

    const downloadLink = screen.getByRole('link', { name: /resume.*pdf/i });
    expect(downloadLink).toHaveAttribute('download', 'Felipe-Soares-Resume.pdf');
    expect(downloadLink.getAttribute('href')).toContain('felipe-soares-resume-en.pdf');
  });

  it('switches language to pt-BR and toggles theme to light with Label-in-Name compliant labels', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: /pt.*português/i }));
    expect(screen.getByRole('link', { name: 'Experiência' })).toBeInTheDocument();
    const ptResumeLink = screen.getByRole('link', { name: /currículo \(en\)/i });
    expect(ptResumeLink).toHaveTextContent('Currículo (EN)');

    await user.click(screen.getByRole('button', { name: /alternar para tema claro/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /alternar para tema escuro/i })).toBeInTheDocument();
  });

  it('keeps constant width sizers on nav links and header CTAs across locales without leaking hidden text', async () => {
    const user = userEvent.setup();
    renderHeader();

    const getSizers = () =>
      Array.from(document.querySelectorAll('header [data-sizer]')).map((el) => el.getAttribute('data-sizer'));

    const enSizers = getSizers();
    expect(enSizers).toEqual([
      'About',
      'Projects',
      'Experiência',
      'Habilidades',
      'Contact',
      'Currículo (EN)',
    ]);

    // Visible textContent must contain only the active locale label (no duplicate sizer text in DOM)
    expect(screen.getByRole('link', { name: 'Skills' }).textContent).toBe('Skills');
    expect(screen.getByRole('link', { name: /resume.*pdf/i }).textContent).toBe('Resume');

    await user.click(screen.getByRole('button', { name: /pt.*português/i }));

    expect(getSizers()).toEqual(enSizers);
    expect(screen.getByRole('link', { name: 'Habilidades' }).textContent).toBe('Habilidades');
    expect(screen.getByRole('link', { name: /currículo \(en\)/i }).textContent).toBe('Currículo (EN)');
  });

  it('mounts mobile menu outside <header>, locks scroll, closes on Escape restoring focus, and does not steal focus on nav click', async () => {
    const user = userEvent.setup();
    renderHeader();
    const header = screen.getByRole('banner');
    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).not.toBeNull();
    // Prevents backdrop-filter on <header> from trapping position:fixed descendants
    expect(header.contains(mobileMenu)).toBe(false);
    const mobileNav = screen.getByRole('navigation', { name: /mobile/i });
    expect(mobileNav.className).toContain('overflow-y-auto');

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();

    // Re-open and click an in-page nav link: menu closes without snapping focus back to trigger
    await user.click(trigger);
    await user.click(screen.getByRole('navigation', { name: /mobile/i }).querySelector('a[href="#about"]')!);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(trigger).not.toHaveFocus();
  });
});
