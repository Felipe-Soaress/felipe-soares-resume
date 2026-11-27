import { cn } from '../../utils/cn';

export const TAG_CHIP_BASE_CLASS =
  'rounded-md border border-line bg-subtle text-xs font-medium text-fg-secondary';

interface TagListProps {
  items: readonly string[];
  ariaLabel?: string;
  className?: string;
  itemClassName?: string;
}

export function TagList({ items, ariaLabel, className, itemClassName = 'px-2.5 py-0.5' }: TagListProps) {
  return (
    <ul aria-label={ariaLabel} className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item} className={cn(TAG_CHIP_BASE_CLASS, itemClassName)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
