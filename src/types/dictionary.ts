export interface Dictionary {
  nav: {
    logo: string
    about: string
    skills: string
    projects: string
    experience: string
    education: string
    contact: string
  }
  hero: {
    greeting: string
    cta_projects: string
    cta_contact: string
    cta_resume: string | null
  }
  about: {
    title: string
    description: string
  }
  skills: {
    title: string
    categories: Record<string, string>
  }
  projects: {
    title: string
    view_code: string
    no_repo: string
    view_more: string
    view_less: string
    read_more: string
    read_less: string
  }
  education: {
    title: string
  }
  experience: {
    title: string
    present: string
    show_more: string
    show_less: string
  }
  contact: {
    title: string
    description: string
    github: string
    linkedin: string
  }
  footer: {
    built_with: string
  }
}
