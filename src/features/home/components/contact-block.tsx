import { Icon } from '@/components/ui/icon'
import { SectionLabel } from '@/components/ui/section-label'
import type { Dictionary } from '@/types/dictionary'
import type { ProfileBasics } from '@/types/profile'

interface ContactBlockProps {
  dict: Dictionary
  basics: ProfileBasics
}

/**
 * Closing block. The address is set at display scale with the accent sitting
 * slightly out of register behind it — the same idea as the WebGL headline,
 * held still.
 */
export function ContactBlock({ dict, basics }: ContactBlockProps) {
  const links = [
    { href: basics.github, label: dict.contact.github_label, icon: 'github' as const, external: true },
    { href: basics.linkedin, label: dict.contact.linkedin_label, icon: 'linkedin' as const, external: true },
    { href: '/portifolio/resume.pdf', label: dict.contact.resume_label, icon: 'download' as const, external: false },
  ]

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-shell px-5 py-24 lg:px-8 lg:py-32">
        <SectionLabel index="04">{dict.home.contact_title}</SectionLabel>

        <a
          href={`mailto:${basics.email}`}
          className="group relative mt-12 block w-fit max-w-full"
        >
          <span
            aria-hidden="true"
            className="type-display absolute inset-0 translate-x-[0.022em] translate-y-[0.012em] break-all text-d3 text-accent/75 transition-transform duration-500 ease-out group-hover:translate-x-[0.05em]"
          >
            {basics.email}
          </span>
          <span className="type-display relative block break-all text-d3 text-fg">
            {basics.email}
          </span>
        </a>

        <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
          {dict.contact.description}
        </p>

        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : { download: true })}
              className="group flex items-center justify-between gap-3 bg-bg px-5 py-5 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-accent"
            >
              <span className="flex items-center gap-3">
                <Icon name={link.icon} className="h-4 w-4" />
                {link.label}
              </span>
              <Icon
                name="arrow-up-right"
                className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
          <div>
            <dt className="type-meta text-fg-subtle">{dict.contact.location_label}</dt>
            <dd className="mt-1.5 font-mono text-sm text-fg-muted">{basics.location}</dd>
          </div>
          <div>
            <dt className="type-meta text-fg-subtle">{dict.contact.availability_label}</dt>
            <dd className="mt-1.5 font-mono text-sm text-fg-muted">{basics.availability}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
