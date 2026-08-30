export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  nav: {
    logo: string
    primary_nav: string
    skip_to_content: string
    open_menu: string
    close_menu: string
    theme_toggle: string
    language_select: string
    about: string
    skills: string
    projects: string
    experience: string
    education: string
    contact: string
  }
  hero: {
    kicker: string
    cta_projects: string
    cta_contact: string
    cta_resume: string
    stats: { label: string; value: string }[]
  }
  about: {
    kicker: string
    title: string
    paragraphs: string[]
    facts: { label: string; value: string }[]
  }
  skills: {
    kicker: string
    title: string
    subtitle: string
    categories: Record<string, string>
  }
  projects: {
    kicker: string
    title: string
    subtitle: string
    featured_label: string
    problem_label: string
    stack_label: string
    view_code: string
    view_live: string
    no_repo: string
    more_title: string
    view_more: string
    view_less: string
    read_more: string
    read_less: string
  }
  experience: {
    kicker: string
    title: string
    subtitle: string
    current_label: string
    stack_label: string
    show_more: string
    show_less: string
  }
  education: {
    kicker: string
    title: string
  }
  contact: {
    kicker: string
    title: string
    description: string
    email_label: string
    github_label: string
    linkedin_label: string
    resume_label: string
    location_label: string
  }
  footer: {
    built_with: string
    rights: string
  }
}
