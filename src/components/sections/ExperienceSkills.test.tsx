import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../../context/LanguageContext';
import { Experience } from './Experience';
import { Skills } from './Skills';

describe('Experience & Skills sections', () => {
  beforeEach(() => {
    localStorage.setItem('felipe-resume-locale', 'en-US');
  });

  it('expands first role by default, toggles roles and Expand All, and displays UTFPR education', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Experience />
      </LanguageProvider>,
    );

    const role1Btn = screen.getByRole('button', { name: /software engineer ii\b.*fortis games/i });
    const role2Btn = screen.getByRole('button', { name: /software engineer i\b.*fortis games/i });
    expect(role1Btn.querySelector('div')).toBeNull();
    expect(role2Btn.querySelector('div')).toBeNull();
    expect(role1Btn).toHaveAttribute('aria-expanded', 'true');
    expect(role2Btn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(/2,500\+ commits/i)).toBeInTheDocument();

    await user.click(role2Btn);
    expect(role2Btn).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: /expand all/i }));
    const role4Btn = screen.getByRole('button', { name: /full-stack developer.*yankton/i });
    expect(role4Btn).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: /collapse all/i }));
    expect(role1Btn).toHaveAttribute('aria-expanded', 'false');

    expect(screen.getByText(/federal university of technology/i)).toBeInTheDocument();
    expect(screen.getByText(/lego educational robotics/i)).toBeInTheDocument();
  });

  it('renders 8 featured core skills by default and supports WAI-ARIA keyboard tab navigation', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Skills />
      </LanguageProvider>,
    );

    const coreTab = screen.getByRole('tab', { name: 'Core' });
    expect(coreTab).toHaveAttribute('aria-selected', 'true');
    const allTabs = screen.getAllByRole('tab');
    for (const tab of allTabs) {
      const panelId = tab.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId!)).not.toBeNull();
    }
    const panel = screen.getByRole('tabpanel');
    expect(panel.querySelectorAll('li')).toHaveLength(8);
    expect(panel.querySelector('ul')?.className).toContain('sm:grid-cols-3 xl:grid-cols-4');

    coreTab.focus();
    await user.keyboard('{ArrowRight}');
    const frontendTab = screen.getByRole('tab', { name: 'Frontend & State' });
    expect(frontendTab).toHaveFocus();
    expect(frontendTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    const testingTab = screen.getByRole('tab', { name: 'Testing & DevOps' });
    expect(testingTab).toHaveFocus();
    expect(screen.getByText('Playwright')).toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Backend, AI & Games' })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(coreTab).toHaveFocus();
  });
});
