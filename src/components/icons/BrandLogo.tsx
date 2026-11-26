import { useId } from 'react';

interface BrandLogoProps {
  className?: string;
}

/** Geometric slanted "F" monogram matching the brand identity; always decorative (parent provides accessible name). */
export function BrandLogo({ className = 'h-7 w-7' }: BrandLogoProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent-cyan)" />
          <stop offset="0.52" stopColor="var(--accent-indigo)" />
          <stop offset="1" stopColor="var(--accent-violet)" />
        </linearGradient>
      </defs>
      <path
        d="M12.5 5h14.5l-2.3 4.8h-9.8l-1.4 3h8.7l-2.3 4.8h-8.7L7.5 27H2.5L12.5 5Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
