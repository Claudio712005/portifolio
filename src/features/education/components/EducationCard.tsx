import type { Education } from '@/types/profile'

interface EducationCardProps {
  education: Education
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <article className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-indigo-500 before:bg-white before:dark:bg-slate-900">
      <div className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-indigo-500/50 dark:border-slate-700 dark:bg-slate-800/50">
        <p className="mb-1 font-mono text-xs font-medium text-indigo-500 dark:text-indigo-400">
          {education.period}
        </p>
        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
          {education.degree}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{education.institution}</p>
      </div>
    </article>
  )
}
