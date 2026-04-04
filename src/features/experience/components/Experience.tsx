import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ExperienceCard } from './ExperienceCard'
import type { Dictionary } from '@/types/dictionary'
import type { Experience as ExperienceType } from '@/types/profile'

interface ExperienceProps {
  dict: Dictionary['experience']
  experience: ExperienceType[]
}

export function Experience({ dict, experience }: ExperienceProps) {
  return (
    <section id="experience" className="bg-slate-50 px-4 py-24 dark:bg-slate-800/20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionTitle title={dict.title} />
        </AnimatedSection>

        <div className="flex flex-col gap-10">
          {experience.map((entry, index) => (
            <AnimatedSection key={`${entry.company}-${entry.role}`} delay={index * 0.1}>
              <ExperienceCard
                experience={entry}
                presentLabel={dict.present}
                showMoreLabel={dict.show_more}
                showLessLabel={dict.show_less}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
