import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { groupSkillsByCategory } from '@/lib/group-skills'
import { splitProjects } from '@/lib/split-projects'
import { Hero } from '@/features/hero/components/hero'
import { About } from '@/features/about/components/about'
import { Skills } from '@/features/skills/components/skills'
import { Projects } from '@/features/projects/components/projects'
import { Experience } from '@/features/experience/components/experience'
import { Education } from '@/features/education/components/education'
import { Contact } from '@/features/contact/components/contact'

interface PageProps {
  params: { locale: string }
}

export default async function HomePage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  const skillGroups = groupSkillsByCategory(profile.skills)
  const { featured, rest } = splitProjects(profile.projects)

  return (
    <>
      <Hero dict={dict.hero} basics={profile.basics} />
      <About dict={dict.about} />
      <Skills dict={dict.skills} groups={skillGroups} />
      <Projects dict={dict.projects} featured={featured} rest={rest} />
      <Experience dict={dict.experience} experience={profile.experience} />
      <Education dict={dict.education} education={profile.education} />
      <Contact dict={dict.contact} basics={profile.basics} />
    </>
  )
}
