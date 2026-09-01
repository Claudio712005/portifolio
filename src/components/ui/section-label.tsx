interface SectionLabelProps {
  /** Two-digit marker; omit where the sequence carries no information. */
  index?: string
  children: string
}

/**
 * Small technical label that opens a section. Sits on its own rule so the
 * heading below it never has to double as a signpost.
 *
 * @example <SectionLabel index="02">Selected work</SectionLabel>
 */
export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 border-b border-line pb-3 text-fg-subtle">
      {index && <span className="type-meta text-accent">{index}</span>}
      <span className="type-meta">{children}</span>
    </div>
  )
}
