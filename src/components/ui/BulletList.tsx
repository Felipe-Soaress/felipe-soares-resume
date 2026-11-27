import { cn } from '../../utils/cn';

interface BulletListProps {
  items: readonly string[];
  dotClassName?: string;
  className?: string;
  itemGapClassName?: string;
}

export function BulletList({
  items,
  dotClassName = 'bg-cyan',
  className,
  itemGapClassName = 'gap-3',
}: BulletListProps) {
  return (
    <ul className={cn('space-y-2.5 text-sm leading-relaxed text-fg-secondary', className)}>
      {items.map((item, index) => (
        <li key={index} className={cn('flex', itemGapClassName)}>
          <span
            aria-hidden="true"
            className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', dotClassName)}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
