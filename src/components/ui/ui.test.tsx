import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';
import { Badge } from './Badge';
import { ProjectPlaceholder } from './ProjectPlaceholder';
import { BrandLogo } from '../icons/BrandLogo';

describe('UI primitives', () => {
  it('renders SectionHeading with accessible h2 id, eyebrow, and optional accent text', () => {
    render(
      <SectionHeading
        id="skills-heading"
        eyebrow="Technical Expertise"
        title="Technologies &"
        accentTitle="Skills"
      />,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Technologies & Skills' });
    expect(heading).toHaveAttribute('id', 'skills-heading');
    expect(screen.getByText('Technical Expertise')).toBeInTheDocument();
  });

  it('renders Badge variants with visible content', () => {
    render(<Badge variant="status">8+ Years of Experience</Badge>);
    expect(screen.getByText('8+ Years of Experience')).toBeInTheDocument();
  });

  it('marks decorative brand and project placeholder SVGs as aria-hidden', () => {
    const { container } = render(
      <>
        <BrandLogo />
        <ProjectPlaceholder variant="game-ops" />
        <ProjectPlaceholder variant="analytics-moderation" />
        <ProjectPlaceholder variant="web-game-lab" />
      </>,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
  });
});
