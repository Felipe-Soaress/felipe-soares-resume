import { useId } from 'react';

export function HeroArtwork() {
  const uid = useId();
  const ribbonA = `${uid}-a`;
  const ribbonB = `${uid}-b`;
  const strokeA = `${uid}-sa`;
  const glow = `${uid}-glow`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] overflow-hidden lg:block"
    >
      <svg
        viewBox="0 0 640 540"
        fill="none"
        focusable="false"
        className="h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <radialGradient id={glow} cx="68%" cy="42%" r="55%">
            <stop offset="0%" stopColor="var(--glow-indigo)" />
            <stop offset="55%" stopColor="var(--glow-cyan)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id={ribbonA} x1="120" y1="520" x2="600" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.16" />
            <stop offset="50%" stopColor="var(--accent-indigo)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.46" />
          </linearGradient>
          <linearGradient id={ribbonB} x1="220" y1="540" x2="640" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.08" />
            <stop offset="60%" stopColor="var(--accent-indigo)" stopOpacity="0.24" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.38" />
          </linearGradient>
          <linearGradient id={strokeA} x1="120" y1="520" x2="600" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--ribbon-a)" />
            <stop offset="50%" stopColor="var(--ribbon-b)" />
            <stop offset="100%" stopColor="var(--ribbon-c)" />
          </linearGradient>
        </defs>

        <rect width="640" height="540" fill={`url(#${glow})`} />

        {/* Back architectural ribbon */}
        <path
          d="M270 540 L485 110 C497 86 520 72 546 72 L640 72 L640 165 L555 165 C538 165 522 175 514 190 L345 540 Z"
          fill={`url(#${ribbonA})`}
          stroke={`url(#${strokeA})`}
          strokeWidth="1.25"
        />

        {/* Mid angled glass card evoking the stylized F geometry */}
        <path
          d="M110 470 L255 190 C268 165 294 150 322 150 L575 150 L525 245 L330 245 C313 245 297 254 289 270 L185 470 Z"
          fill={`url(#${ribbonB})`}
          stroke={`url(#${strokeA})`}
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Lower glass highlight frame */}
        <path
          d="M250 540 L370 308 C383 284 408 268 436 268 L640 268 L640 540 Z"
          fill="var(--ribbon-fill)"
          stroke={`url(#${strokeA})`}
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
