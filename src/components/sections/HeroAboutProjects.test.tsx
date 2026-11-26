import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { PROJECTS } from '../../data/projects';

function renderWithLang(ui: ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('Hero, About & Projects sections', () => {
  beforeEach(() => {
    localStorage.setItem('felipe-resume-locale', 'en-US');
  });

  it('renders single h1 with 8+ years badge and external social links', () => {
    renderWithLang(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/senior frontend\s*engineer/i);
    expect(screen.getByText(/8\+ years of experience/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/felipe-soares-dev/',
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Felipe-Soaress',
    );
  });

  it('renders About section with 4 core engineering pillars', () => {
    renderWithLang(<About />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/turning complex problems/i);
    expect(screen.getByText(/performance focused/i)).toBeInTheDocument();
    expect(screen.getByText(/scalable architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/collaborative mindset/i)).toBeInTheDocument();
    expect(screen.getByText(/user-centric design/i)).toBeInTheDocument();
  });

  it('prevents default scroll jump on href="#" project placeholders while allowing real URLs', () => {
    const customProjects = [
      PROJECTS[0],
      { ...PROJECTS[1], url: 'https://example.com/project' },
    ];
    renderWithLang(<Projects items={customProjects} />);

    const placeholderLink = screen.getByRole('link', { name: /game platform & ops tooling/i });
    expect(placeholderLink).toHaveAttribute('href', '#');
    const placeholderEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(placeholderLink, placeholderEvent);
    expect(placeholderEvent.defaultPrevented).toBe(true);

    const realLink = screen.getByRole('link', { name: /analytics & moderation suite/i });
    expect(realLink).toHaveAttribute('href', 'https://example.com/project');
    expect(realLink).toHaveAttribute('target', '_blank');
    const realEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(realLink, realEvent);
    expect(realEvent.defaultPrevented).toBe(false);

    const viewAllLink = screen.getByRole('link', { name: /view all projects/i });
    expect(viewAllLink).toHaveAttribute('href', '#');
    const viewAllEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(viewAllLink, viewAllEvent);
    expect(viewAllEvent.defaultPrevented).toBe(true);
  });
});
