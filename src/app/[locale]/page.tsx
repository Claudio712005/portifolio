import { PageStage } from '@/components/layout/page-stage'
import { StageMeta } from '@/features/home/components/stage-meta'
import { Manifesto } from '@/features/home/components/manifesto'
import { SelectedWork } from '@/features/home/components/selected-work'
import { Capabilities } from '@/features/home/components/capabilities'
import { Trajectory } from '@/features/home/components/trajectory'
import { ContactBlock } from '@/features/home/components/contact-block'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProfile } from '@/lib/get-profile'
import { groupSkillsByCategory } from '@/lib/group-skills'
import { featuredEntries, toProjectEntries } from '@/lib/projects'
import { toHeadlineLines } from '@/lib/headline'

interface PageProps {
  params: { locale: string }
}

export default async function HomePage({ params }: PageProps) {
  const [dict, profile] = await Promise.all([
    getDictionary(params.locale),
    getProfile(params.locale),
  ])

  const entries = toProjectEntries(profile.projects)

  return (
    <>
      <PageStage title={profile.basics.name} lines={toHeadlineLines(profile.basics.name)}>
        <StageMeta dict={dict.home} basics={profile.basics} />
      </PageStage>

      <div className="relative bg-bg">
        <Manifesto basics={profile.basics} />
        <SelectedWork
          dict={dict}
          projects={featuredEntries(entries)}
          total={entries.length}
          locale={params.locale}
        />
        <Capabilities dict={dict} groups={groupSkillsByCategory(profile.skills)} />
        <Trajectory dict={dict} experience={profile.experience} locale={params.locale} />
        <ContactBlock dict={dict} basics={profile.basics} />
      </div>
    </>
  )
}
