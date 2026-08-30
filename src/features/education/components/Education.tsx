import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Dictionary } from '@/types/dictionary'
import type { Education as EducationItem } from '@/types/profile'

interface EducationProps {
  dict: Dictionary['education']
  education: EducationItem[]
}

export function Education({ dict, education }: EducationProps) {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="border-b border-line px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionHeading index="05" titleId="education-title" kicker={dict.kicker} title={dict.title} />
        </Reveal>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {education.map((item, index) => (
            <li key={`${item.institution}-${item.degree}`}>
              <Reveal delay={index * 0.05}>
                <div className="grid gap-2 py-6 sm:grid-cols-[minmax(0,170px)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <p className="font-mono text-xs text-fg-subtle">{item.period}</p>
                  <div>
                    <h3 className="text-base font-medium text-fg">{item.degree}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{item.institution}</p>
                  </div>
                  <Badge label={item.status} variant="outline" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
