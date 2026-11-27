import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'status';
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'border-line bg-subtle text-fg-secondary',
  accent: 'border-line-accent bg-elevated text-fg',
  status: 'border-line bg-elevated text-fg',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {variant === 'status' ? (
        <span className="h-2 w-2 rounded-full bg-status shadow-[0_0_8px_var(--status-dot)]" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}
