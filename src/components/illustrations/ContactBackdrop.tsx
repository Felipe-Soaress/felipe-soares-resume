import { useId } from 'react';

export function ContactBackdrop() {
  const uid = useId();
  const arcGrad = `${uid}-arc`;
  const glowGrad = `${uid}-glow`;

  return (
    <svg
      viewBox="0 0 1120 300"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id={glowGrad} cx="88%" cy="22%" r="55%">
          <stop offset="0%" stopColor="var(--glow-indigo)" />
          <stop offset="60%" stopColor="var(--glow-cyan)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={arcGrad} x1="600" y1="300" x2="1080" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.6" />
          <stop offset="55%" stopColor="var(--accent-indigo)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="1120" height="300" fill={`url(#${glowGrad})`} />
      <path d="M640 310 C720 140 870 30 1130 -10" stroke={`url(#${arcGrad})`} strokeWidth="1.25" />
    </svg>
  );
}
