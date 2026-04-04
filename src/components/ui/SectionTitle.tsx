interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600 dark:text-slate-400">{subtitle}</p>}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-indigo-500" />
    </div>
  )
}
