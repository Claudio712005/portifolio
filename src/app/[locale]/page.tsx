import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { groupSkillsByCategory } from '@/lib/group-skills'
import { Hero } from '@/features/hero/components/Hero'
import { About } from '@/features/about/components/About'
import { Skills } from '@/features/skills/components/Skills'
import { Projects } from '@/features/projects/components/Projects'
import { Experience } from '@/features/experience/components/Experience'
import { Education } from '@/features/education/components/Education'
import { Contact } from '@/features/contact/components/Contact'

interface PageProps {
  params: { locale: string }
}

export default async function HomePage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])
  const groupedSkills = groupSkillsByCategory(profile.skills)

  return (
    <>
      <Hero dict={dict.hero} basics={profile.basics} />
      <About dict={dict.about} />
      <Skills dict={dict.skills} groupedSkills={groupedSkills} />
      <Projects dict={dict.projects} projects={profile.projects} />
      <Experience dict={dict.experience} experience={profile.experience} />
      <Education dict={dict.education} education={profile.education} />
      <Contact dict={dict.contact} basics={profile.basics} />
    </>
  )
}
