import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EducationCard } from './EducationCard'
import type { Dictionary } from '@/types/dictionary'
import type { Education as EducationType } from '@/types/profile'

interface EducationProps {
  dict: Dictionary['education']
  education: EducationType[]
}

export function Education({ dict, education }: EducationProps) {
  return (
    <section id="education" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionTitle title={dict.title} />
        </AnimatedSection>

        <div className="relative ml-1 mt-10 border-l-2 border-indigo-500/30 pl-6">
          <div className="flex flex-col gap-8">
            {education.map((item, index) => (
              <AnimatedSection key={item.institution + item.degree} delay={index * 0.1}>
                <EducationCard education={item} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
