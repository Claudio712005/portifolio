import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectsGrid } from './ProjectsGrid'
import type { Dictionary } from '@/types/dictionary'
import type { Project } from '@/types/profile'

interface ProjectsProps {
  dict: Dictionary['projects']
  projects: Project[]
}

export function Projects({ dict, projects }: ProjectsProps) {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <SectionTitle title={dict.title} />
        </AnimatedSection>

        <div className="mt-10">
          <ProjectsGrid
            projects={projects}
            labels={{
              view_code: dict.view_code,
              no_repo: dict.no_repo,
              view_more: dict.view_more,
              view_less: dict.view_less,
              read_more: dict.read_more,
              read_less: dict.read_less,
            }}
          />
        </div>
      </div>
    </section>
  )
}
