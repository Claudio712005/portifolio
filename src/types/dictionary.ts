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
    home: string
    work: string
    about: string
    contact: string
  }
  home: {
    scroll_cue: string
    work_title: string
    work_lead: string
    work_all: string
    capabilities_title: string
    capabilities_lead: string
    trajectory_title: string
    trajectory_all: string
    contact_title: string
  }
  work: {
    title: string
    lead: string
    count_label: string
    featured_label: string
    year_label: string
    stack_label: string
    problem_title: string
    approach_title: string
    view_code: string
    view_live: string
    no_repo: string
    back: string
    next_label: string
  }
  about: {
    title: string
    lead: string
    paragraphs: string[]
    facts_title: string
    facts: { label: string; value: string }[]
    experience_title: string
    education_title: string
    skills_title: string
    skills_lead: string
    current_label: string
    stack_label: string
    show_more: string
    show_less: string
  }
  skills: {
    categories: Record<string, string>
  }
  contact: {
    title: string
    description: string
    email_label: string
    github_label: string
    linkedin_label: string
    resume_label: string
    location_label: string
    availability_label: string
  }
  footer: {
    built_with: string
    rights: string
  }
}
