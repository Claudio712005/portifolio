interface SectionHeadingProps {
  /** Id applied to the heading, referenced by the section's `aria-labelledby`. */
  titleId: string
  /** Two-digit section marker, e.g. `02`. */
  index: string
  kicker: string
  title: string
  subtitle?: string
}

/**
 * Numbered section header with a hairline rule, shared by every page section.
 *
 * @example <SectionHeading titleId="projects-title" index="03" kicker="Projects" title="What I built" />
 */
export function SectionHeading({ titleId, index, kicker, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true">{index}</span>
        <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
        <span>{kicker}</span>
      </div>

      <h2
        id={titleId}
        className="mt-5 text-balance text-3xl font-semibold tracking-tightest text-fg sm:text-4xl"
      >
        {title}
      </h2>

      {subtitle && <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{subtitle}</p>}
    </div>
  )
}
