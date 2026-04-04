'use client'

import { useState } from 'react'

interface ExpandableTextProps {
  text: string
  showMoreLabel: string
  showLessLabel: string
  maxLength?: number
}

export function ExpandableText({
  text,
  showMoreLabel,
  showLessLabel,
  maxLength = 160,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false)

  if (text.length <= maxLength) {
    return <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-500">{text}</p>
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-500">
        {expanded ? text : `${text.slice(0, maxLength)}…`}
      </p>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-1.5 text-xs font-medium text-indigo-500 transition-colors hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        {expanded ? showLessLabel : showMoreLabel}
      </button>
    </div>
  )
}
