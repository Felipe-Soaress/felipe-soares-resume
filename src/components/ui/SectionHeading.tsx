interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  accentTitle?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  accentTitle,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-cyan">
        <span>{eyebrow}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
      </p>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
        {accentTitle ? (
          <>
            {' '}
            <span className="text-gradient inline-block">{accentTitle}</span>
          </>
        ) : null}
      </h2>
      {description ? <p className="mt-3 max-w-[60ch] text-base text-fg-secondary">{description}</p> : null}
    </div>
  );
}
