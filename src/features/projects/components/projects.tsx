import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { formatProjectIndex } from '@/lib/project-cover'
import { FeaturedProjectCard } from './featured-project-card'
import { SecondaryProjects } from './secondary-projects'
import type { Dictionary } from '@/types/dictionary'
import type { Project } from '@/types/profile'

interface ProjectsProps {
  dict: Dictionary['projects']
  featured: Project[]
  rest: Project[]
}

export function Projects({ dict, featured, rest }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-b border-line px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionHeading
            titleId="projects-title"
            index="03"
            kicker={dict.kicker}
            title={dict.title}
            subtitle={dict.subtitle}
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          {featured.map((project, index) => (
            <Reveal key={project.name} delay={0.04}>
              <FeaturedProjectCard
                project={project}
                index={formatProjectIndex(index)}
                dict={dict}
              />
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <SecondaryProjects projects={rest} dict={dict} />
          </div>
        )}
      </div>
    </section>
  )
}
