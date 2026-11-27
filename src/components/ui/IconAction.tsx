import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type IconActionSize = 'sm' | 'md';

const SIZE_CLASSES: Record<IconActionSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
};

export function iconActionClassName(size: IconActionSize = 'md', className?: string): string {
  return cn(
    'inline-flex items-center justify-center rounded-full border border-line bg-elevated text-fg-secondary transition-colors hover:border-line-accent hover:bg-elevated-hover hover:text-fg',
    SIZE_CLASSES[size],
    className,
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconActionSize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size = 'md', className, type = 'button', ...props },
  ref,
) {
  return <button ref={ref} type={type} className={iconActionClassName(size, className)} {...props} />;
});
