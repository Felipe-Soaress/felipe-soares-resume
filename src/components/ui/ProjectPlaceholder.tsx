import { useId } from 'react';
import type { ProjectPlaceholderVariant } from '../../data/projects';

interface ProjectPlaceholderProps {
  variant: ProjectPlaceholderVariant;
}

/**
 * Thematic vector artwork shown when a project has `image: null`.
 * Uses theme tokens so it integrates cleanly with both dark and light modes.
 */
export function ProjectPlaceholder({ variant }: ProjectPlaceholderProps) {
  const uid = useId();
  const bgId = `${uid}-bg`;
  const accentId = `${uid}-accent`;

  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="480" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--bg-subtle)" />
          <stop offset="0.55" stopColor="var(--bg-elevated)" />
          <stop offset="1" stopColor="var(--bg-base)" />
        </linearGradient>
        <linearGradient id={accentId} x1="40" y1="220" x2="440" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent-cyan)" />
          <stop offset="0.5" stopColor="var(--accent-indigo)" />
          <stop offset="1" stopColor="var(--accent-violet)" />
        </linearGradient>
      </defs>

      <rect width="480" height="270" fill={`url(#${bgId})`} />

      {/* Subtle architectural grid */}
      <g stroke="var(--border-subtle)" strokeWidth="1" opacity="0.7">
        <path d="M0 54h480M0 108h480M0 162h480M0 216h480" />
        <path d="M96 0v270M192 0v270M288 0v270M384 0v270" />
      </g>

      {variant === 'game-ops' && (
        <g>
          <circle cx="380" cy="56" r="110" fill="var(--glow-indigo)" />
          <circle cx="110" cy="210" r="95" fill="var(--glow-cyan)" />
          {/* Modular ops workspace panels */}
          <rect x="64" y="42" width="352" height="186" rx="14" fill="var(--bg-elevated)" stroke="var(--border-accent)" />
          <rect x="82" y="60" width="96" height="150" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="94" y="76" width="60" height="8" rx="4" fill={`url(#${accentId})`} />
          <rect x="94" y="96" width="72" height="6" rx="3" fill="var(--text-muted)" opacity="0.45" />
          <rect x="94" y="112" width="54" height="6" rx="3" fill="var(--text-muted)" opacity="0.3" />
          <rect x="94" y="128" width="66" height="6" rx="3" fill="var(--text-muted)" opacity="0.3" />

          {/* Live event cards */}
          <rect x="194" y="60" width="204" height="66" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <circle cx="214" cy="82" r="5" fill="var(--status-dot)" />
          <rect x="228" y="77" width="94" height="9" rx="4" fill="var(--text-primary)" opacity="0.85" />
          <rect x="210" y="99" width="166" height="8" rx="4" fill={`url(#${accentId})`} opacity="0.6" />

          <rect x="194" y="140" width="96" height="70" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="208" y="156" width="44" height="7" rx="3" fill="var(--accent-cyan)" opacity="0.8" />
          <rect x="208" y="172" width="66" height="22" rx="4" fill="var(--accent-indigo)" opacity="0.28" />

          <rect x="302" y="140" width="96" height="70" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="316" y="156" width="52" height="7" rx="3" fill="var(--accent-violet)" opacity="0.85" />
          <rect x="316" y="172" width="66" height="22" rx="4" fill="var(--accent-cyan)" opacity="0.24" />
        </g>
      )}

      {variant === 'analytics-moderation' && (
        <g>
          <circle cx="340" cy="70" r="120" fill="var(--glow-cyan)" />
          <circle cx="140" cy="220" r="100" fill="var(--glow-indigo)" />
          <rect x="52" y="38" width="376" height="194" rx="14" fill="var(--bg-elevated)" stroke="var(--border-accent)" />
          {/* Top KPI strip */}
          <rect x="70" y="56" width="104" height="44" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="82" y="68" width="42" height="6" rx="3" fill="var(--text-muted)" opacity="0.5" />
          <rect x="82" y="81" width="64" height="10" rx="4" fill="var(--accent-cyan)" />

          <rect x="188" y="56" width="104" height="44" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="200" y="68" width="48" height="6" rx="3" fill="var(--text-muted)" opacity="0.5" />
          <rect x="200" y="81" width="56" height="10" rx="4" fill="var(--accent-indigo)" />

          <rect x="306" y="56" width="104" height="44" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          <rect x="318" y="68" width="44" height="6" rx="3" fill="var(--text-muted)" opacity="0.5" />
          <rect x="318" y="81" width="60" height="10" rx="4" fill="var(--accent-violet)" />

          {/* Bar + trend line chart */}
          <rect x="70" y="114" width="340" height="102" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
          {[36, 52, 44, 68, 58, 76, 62, 84].map((h, i) => (
            <rect
              key={i}
              x={92 + i * 38}
              y={204 - h}
              width="20"
              height={h}
              rx="4"
              fill={`url(#${accentId})`}
              opacity={0.45 + i * 0.06}
            />
          ))}
          <path
            d="M102 164 L140 148 L178 156 L216 132 L254 142 L292 124 L330 136 L368 118"
            stroke="var(--accent-cyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {variant === 'web-game-lab' && (
        <g>
          <circle cx="240" cy="95" r="130" fill="var(--glow-indigo)" />
          <circle cx="370" cy="210" r="95" fill="var(--glow-cyan)" />
          {/* Isometric tile platform */}
          <polygon
            points="240,56 396,132 240,208 84,132"
            fill="var(--bg-elevated)"
            stroke="var(--border-accent)"
            strokeWidth="1.5"
          />
          <polygon
            points="240,208 396,132 396,154 240,230"
            fill="var(--accent-indigo)"
            opacity="0.35"
          />
          <polygon
            points="240,208 84,132 84,154 240,230"
            fill="var(--accent-cyan)"
            opacity="0.24"
          />
          {/* Isometric grid lines on platform */}
          <path
            d="M162 94 L318 170 M123 113 L279 189 M201 75 L357 151 M318 94 L162 170 M279 75 L123 151 M357 113 L201 189"
            stroke="var(--border-subtle)"
            strokeWidth="1"
          />
          {/* Stylized isometric blocks / interactive game nodes */}
          <polygon points="240,86 276,104 240,122 204,104" fill={`url(#${accentId})`} />
          <polygon points="240,122 276,104 276,134 240,152" fill="var(--accent-violet)" opacity="0.8" />
          <polygon points="240,122 204,104 204,134 240,152" fill="var(--accent-cyan)" opacity="0.7" />

          <polygon points="164,124 190,137 164,150 138,137" fill="var(--accent-cyan)" opacity="0.85" />
          <polygon points="316,120 342,133 316,146 290,133" fill="var(--accent-violet)" opacity="0.85" />
        </g>
      )}
    </svg>
  );
}
