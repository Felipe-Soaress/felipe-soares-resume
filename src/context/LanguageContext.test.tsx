import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage, detectBrowserLocale, LOCALE_STORAGE_KEY } from './LanguageContext';

function Consumer() {
  const { locale, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale('pt-BR')}>PT</button>
      <button onClick={() => setLocale('en-US')}>EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('detects pt* as pt-BR and falls back to en-US for other languages', () => {
    expect(detectBrowserLocale(['pt-BR', 'en-US'])).toBe('pt-BR');
    expect(detectBrowserLocale(['pt-PT'])).toBe('pt-BR');
    expect(detectBrowserLocale(['fr-FR', 'es-ES'])).toBe('en-US');
    expect(detectBrowserLocale([], 'en-GB')).toBe('en-US');
    expect(detectBrowserLocale([], 'PT')).toBe('pt-BR');
    expect(detectBrowserLocale(['en-US', 'pt-BR'])).toBe('en-US');
  });

  it('syncs document.documentElement.lang, ignores invalid saved locale, and handles storage SecurityError', async () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr-FR');
    const langSpy = vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['de-DE']);
    const user = userEvent.setup();
    const { unmount } = render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en-US');
    expect(document.documentElement.lang).toBe('en-US');

    await user.click(screen.getByRole('button', { name: 'PT' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('pt-BR');
    unmount();

    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en-US');
    await user.click(screen.getByRole('button', { name: 'PT' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    langSpy.mockRestore();
    getSpy.mockRestore();
    setSpy.mockRestore();
  });

  it('auto-detects pt-BR from the browser and updates the document title', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['pt-BR', 'en-US']);
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(document.title).toMatch(/Engenheiro Frontend Sênior/);
  });
});
