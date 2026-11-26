import {
  Blocks,
  Boxes,
  Cloud,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  Gamepad2,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Package,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';
import type { SkillIconId } from '../../data/skills';

interface SkillIconProps {
  id: SkillIconId;
  className?: string;
}

export function SkillIcon({ id, className = 'h-5 w-5 shrink-0' }: SkillIconProps) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={`${className} text-cyan`}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="currentColor" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.8"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.8"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
          <path
            d="M6.5 11.4h6.2v1.6h-2.2V19H8.7v-6H6.5v-1.6Zm11.7 5.2c0 1.6-1.2 2.6-3.1 2.6-1.1 0-2-.3-2.6-.8v-1.7c.7.5 1.5.9 2.4.9.9 0 1.4-.3 1.4-.9 0-.5-.4-.8-1.4-1.2-1.4-.5-2.3-1.1-2.3-2.4 0-1.4 1.1-2.4 2.9-2.4.9 0 1.7.2 2.2.5v1.6c-.6-.3-1.3-.6-2-.6-.8 0-1.2.3-1.2.8 0 .5.4.7 1.3 1.1 1.5.5 2.4 1.2 2.4 2.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'remix':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={`${className} text-fg`}>
          <path
            d="M5 4h8.6c3.2 0 5.4 1.8 5.4 4.7 0 2.1-1.2 3.7-3.1 4.3 1.9.6 2.9 1.9 3.1 4.2L19.3 20h-4.1l-.3-2.6c-.2-1.7-1-2.4-2.8-2.4H5v-3.5h7.6c1.5 0 2.3-.7 2.3-1.9s-.8-2-2.3-2H5V4Zm0 12.6h4.2V20H5v-3.4Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={`${className} text-cyan`}>
          <path
            d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.6 7.2 14.5 6 12 6Zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-1-1-2.1-2.2-4.6-2.2Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'microfrontends':
      return <Boxes aria-hidden="true" className={`${className} text-indigo`} />;
    case 'monorepo':
      return <Layers aria-hidden="true" className={`${className} text-violet`} />;
    case 'cms':
      return <Blocks aria-hidden="true" className={`${className} text-cyan`} />;
    case 'performance':
      return <Gauge aria-hidden="true" className={`${className} text-cyan`} />;
    case 'code':
      return <Code2 aria-hidden="true" className={`${className} text-indigo`} />;
    case 'state':
      return <GitBranch aria-hidden="true" className={`${className} text-violet`} />;
    case 'design-system':
      return <Palette aria-hidden="true" className={`${className} text-violet`} />;
    case 'globe':
      return <Globe aria-hidden="true" className={`${className} text-cyan`} />;
    case 'server':
      return <Server aria-hidden="true" className={`${className} text-indigo`} />;
    case 'database':
      return <Database aria-hidden="true" className={`${className} text-cyan`} />;
    case 'ai':
      return <Sparkles aria-hidden="true" className={`${className} text-violet`} />;
    case 'shield':
      return <ShieldCheck aria-hidden="true" className={`${className} text-indigo`} />;
    case 'game':
      return <Gamepad2 aria-hidden="true" className={`${className} text-violet`} />;
    case 'test':
      return <FlaskConical aria-hidden="true" className={`${className} text-cyan`} />;
    case 'cloud':
      return <Cloud aria-hidden="true" className={`${className} text-indigo`} />;
    case 'terminal':
      return <Terminal aria-hidden="true" className={`${className} text-fg-secondary`} />;
    case 'mobile':
      return <Smartphone aria-hidden="true" className={`${className} text-cyan`} />;
    case 'package':
      return <Package aria-hidden="true" className={`${className} text-violet`} />;
    case 'workflow':
      return <Workflow aria-hidden="true" className={`${className} text-indigo`} />;
    default:
      return <FileCode2 aria-hidden="true" className={`${className} text-fg-secondary`} />;
  }
}
