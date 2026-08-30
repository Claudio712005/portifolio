'use client'

import { useState } from 'react'

interface ExpandableTextProps {
  text: string
  showMoreLabel: string
  showLessLabel: string
  /** Character budget before the text is truncated. */
  maxLength?: number
  className?: string
}

/**
 * Truncates long copy to a character budget and toggles the full text.
 *
 * @example <ExpandableText text={project.description} showMoreLabel="Read more" showLessLabel="Read less" />
 */
export function ExpandableText({
  text,
  showMoreLabel,
  showLessLabel,
  maxLength = 190,
  className = 'text-sm leading-relaxed text-fg-muted',
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false)

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>
  }

  return (
    <div>
      <p className={className}>{expanded ? text : `${text.slice(0, maxLength).trimEnd()}…`}</p>
      <button
        type="button"
        onClick={() => setExpanded((previous) => !previous)}
        aria-expanded={expanded}
        className="mt-2 rounded-[3px] font-mono text-[11px] uppercase tracking-wider text-accent underline-offset-4 transition-colors hover:underline"
      >
        {expanded ? showLessLabel : showMoreLabel}
      </button>
    </div>
  )
}
