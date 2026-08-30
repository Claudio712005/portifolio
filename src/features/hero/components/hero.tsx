import Image from 'next/image'
import { Icon } from '@/components/ui/icon'
import type { Dictionary } from '@/types/dictionary'
import type { ProfileBasics } from '@/types/profile'

interface HeroProps {
  dict: Dictionary['hero']
  basics: ProfileBasics
}

export function Hero({ dict, basics }: HeroProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-line"
    >
      <div className="bg-blueprint mask-fade-b pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-shell gap-12 px-5 py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-2 pr-3 font-mono text-[11px] uppercase tracking-wider text-fg-muted backdrop-blur">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
            </span>
            {dict.kicker}
          </p>

          <h1
            id="hero-name"
            className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-tightest text-fg sm:text-6xl lg:text-7xl"
          >
            {basics.name}
          </h1>

          <p className="mt-5 font-mono text-sm leading-relaxed text-fg-muted">
            <span className="text-accent">{basics.role}</span>
            <span className="mx-2 hidden text-line-strong sm:inline" aria-hidden="true">
              |
            </span>
            <span className="block sm:inline">{basics.title}</span>
          </p>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {basics.valueProp}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[4px] bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {dict.cta_projects}
              <Icon name="arrow-down" className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[4px] border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {dict.cta_contact}
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
            <a
              href="/portifolio/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-[4px] px-3 py-3 text-sm font-medium text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Icon name="download" className="h-4 w-4" />
              {dict.cta_resume}
            </a>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-3">
            {dict.stats.map((stat) => (
              <div key={stat.label} className="bg-bg px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-base font-medium text-fg">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-first justify-self-start lg:order-none lg:justify-self-end">
          <div className="relative h-40 w-40 border border-line-strong p-1.5 sm:h-52 sm:w-52 lg:h-64 lg:w-64">
            <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" aria-hidden="true" />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden bg-surface-2 grayscale-[0.15]">
              <Image
                src="/portifolio/img/profile.png"
                alt={basics.name}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 256px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {basics.location}
          </p>
        </div>
      </div>
    </section>
  )
}
