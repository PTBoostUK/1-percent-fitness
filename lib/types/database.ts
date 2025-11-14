export interface HeroContent {
  id: string
  tagline: string
  title: string
  subtitle: string
  buttonText: string
  backgroundImage?: string
  stats?: {
    clients: string
    years: string
    committed: string
  }
}

export interface AboutContent {
  id: string
  badge: string
  title: string
  description: string
  paragraph1: string
  paragraph2: string
  features: Array<{
    title: string
    description: string
  }>
  stats: {
    years: string
    clients: string
    results: string
  }
  certifications: {
    certification: string
    specialization: string
  }
  image?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  order: number
}

export interface ServicesContent {
  id: string
  badge: string
  title: string
  subtitle: string
  services: Service[]
}

export interface Testimonial {
  id: string
  name: string
  result: string
  quote: string
  rating: number
  order: number
}

export interface TestimonialsContent {
  id: string
  badge: string
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export interface ThemeSettings {
  id: string
  primaryColor: string
  secondaryColor?: string
  fontFamily: string
  headingFont?: string
}

export interface WebsiteContent {
  hero: HeroContent
  about: AboutContent
  services: ServicesContent
  testimonials: TestimonialsContent
  theme: ThemeSettings
}

