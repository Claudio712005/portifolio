import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ExperienceEntry } from './experience-entry'
import type { Dictionary } from '@/types/dictionary'
import type { Experience as ExperienceItem } from '@/types/profile'

interface ExperienceProps {
  dict: Dictionary['experience']
  experience: ExperienceItem[]
}

export function Experience({ dict, experience }: ExperienceProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-b border-line bg-surface-2/50 px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionHeading
            titleId="experience-title"
            index="04"
            kicker={dict.kicker}
            title={dict.title}
            subtitle={dict.subtitle}
          />
        </Reveal>

        <div className="mt-12 border-l border-line">
          {experience.map((item, index) => (
            <Reveal
              key={`${item.company}-${item.period}`}
              delay={index * 0.05}
              className="pb-12 last:pb-0"
            >
              <ExperienceEntry
                experience={item}
                dict={dict}
                detailsId={`experience-details-${index}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
