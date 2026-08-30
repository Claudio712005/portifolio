import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Dictionary } from '@/types/dictionary'

interface AboutProps {
  dict: Dictionary['about']
}

export function About({ dict }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-line px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionHeading titleId="about-title" index="01" kicker={dict.kicker} title={dict.title} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal delay={0.05} className="space-y-6">
            {dict.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-pretty leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="divide-y divide-line border-y border-line">
              {dict.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
