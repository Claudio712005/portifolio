import { ExpandableText } from '@/components/ui/expandable-text'
import type { Experience } from '@/types/profile'

interface ExperienceCardProps {
  experience: Experience
  presentLabel: string
  showMoreLabel: string
  showLessLabel: string
}

export function ExperienceCard({
  experience,
  presentLabel,
  showMoreLabel,
  showLessLabel,
}: ExperienceCardProps) {
  const period = experience.period.includes('Present')
    ? experience.period.replace('Present', presentLabel)
    : experience.period

  return (
    <article className="relative border-l-2 border-slate-200 pl-6 dark:border-slate-700">
      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-900" />

      <p className="mb-1 font-mono text-xs text-indigo-500 dark:text-indigo-400">{period}</p>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{experience.role}</h3>
      <p className="mb-3 font-semibold text-slate-500 dark:text-slate-400">{experience.company}</p>

      {experience.description && (
        <ExpandableText
          text={experience.description}
          showMoreLabel={showMoreLabel}
          showLessLabel={showLessLabel}
        />
      )}
    </article>
  )
}
