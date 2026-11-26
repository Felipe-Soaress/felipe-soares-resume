import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import App from './App';

describe('App integration & WCAG accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('felipe-resume-locale', 'en-US');
    localStorage.setItem('felipe-resume-theme', 'dark');
  });

  it('renders complete landmark structure with a single h1, unbroken heading hierarchy, and omits phone number', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(document.body.textContent).not.toContain('99650-1981');

    // Verify heading levels never skip (e.g. h2 -> h4)
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let prevLevel = 0;
    for (const h of headings) {
      const level = Number(h.tagName.slice(1));
      if (prevLevel > 0) {
        expect(level - prevLevel).toBeLessThanOrEqual(1);
      }
      prevLevel = level;
    }
  });

  it('copies email with live confirmation and degrades gracefully if clipboard rejects', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    render(<App />);
    const copyBtn = screen.getByRole('button', { name: /copy email address/i });
    await user.click(copyBtn);
    expect(writeText).toHaveBeenCalledWith('felipe.2013@alunos.utfpr.edu.br');
    expect(screen.getByRole('status')).toHaveTextContent(/copied/i);

    writeText.mockRejectedValueOnce(new Error('Clipboard unavailable'));
    const timeoutSpy = vi.spyOn(window, 'setTimeout');
    await user.click(copyBtn);
    expect(screen.getByRole('status')).toHaveTextContent(/felipe\.2013@alunos\.utfpr\.edu\.br/i);
    // Clipboard failure fallback should stay visible (no 4000ms auto-clear timer)
    expect(timeoutSpy).not.toHaveBeenCalledWith(expect.any(Function), 4000);
    timeoutSpy.mockRestore();
  });

  it.each([
    ['dark', 'en-US'],
    ['dark', 'pt-BR'],
    ['light', 'en-US'],
    ['light', 'pt-BR'],
  ] as const)('passes axe-core WCAG audit in %s theme and %s locale', async (theme, locale) => {
    localStorage.setItem('felipe-resume-theme', theme);
    localStorage.setItem('felipe-resume-locale', locale);
    const { container } = render(<App />);

    // color-contrast is disabled only because jsdom does not compute CSS custom property colors
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });
});
