import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { Dictionary } from '@/types/dictionary'

interface AboutProps {
  dict: Dictionary['about']
}

export function About({ dict }: AboutProps) {
  return (
    <section id="about" className="py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionTitle title={dict.title} />
          <p className="text-center text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {dict.description}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
