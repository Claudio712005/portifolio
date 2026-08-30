import { Icon } from '@/components/ui/icon'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Dictionary } from '@/types/dictionary'
import type { ProfileBasics } from '@/types/profile'

interface ContactProps {
  dict: Dictionary['contact']
  basics: ProfileBasics
}

export function Contact({ dict, basics }: ContactProps) {
  const links = [
    { href: basics.github, label: dict.github_label, icon: 'github' as const, external: true },
    { href: basics.linkedin, label: dict.linkedin_label, icon: 'linkedin' as const, external: true },
    { href: '/portifolio/resume.pdf', label: dict.resume_label, icon: 'download' as const, external: false },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden px-5 py-24 lg:px-8"
    >
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-shell">
        <Reveal>
          <SectionHeading
            titleId="contact-title"
            index="06"
            kicker={dict.kicker}
            title={dict.title}
            subtitle={dict.description}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <a
            href={`mailto:${basics.email}`}
            className="group mt-12 flex items-center justify-between gap-4 border border-line bg-surface p-6 transition-colors hover:border-accent lg:p-8"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                {dict.email_label}
              </span>
              <span className="mt-2 block break-words text-lg font-medium tracking-tight text-fg group-hover:text-accent sm:text-2xl">
                {basics.email}
              </span>
            </span>
            <Icon
              name="arrow-up-right"
              className="h-6 w-6 shrink-0 text-fg-subtle transition-colors group-hover:text-accent"
            />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { download: true })}
                className="flex items-center gap-3 bg-surface px-5 py-4 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon name={link.icon} className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-fg-subtle">
            <Icon name="pin" className="h-3.5 w-3.5" />
            <span className="uppercase tracking-[0.18em]">{dict.location_label}:</span>
            <span>{basics.location}</span>
            <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
            <span>{basics.availability}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
