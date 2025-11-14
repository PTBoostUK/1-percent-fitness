import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { ThemeApplier } from "@/components/theme-applier"
import { createClient } from "@/lib/supabase/server"

// Helper function to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toCamelCase)
  if (typeof obj !== 'object') return obj
  
  const camelObj: any = {}
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    camelObj[camelKey] = toCamelCase(obj[key])
  }
  return camelObj
}

async function getContent() {
  try {
    const supabase = await createClient()

    // Fetch all content sections
    const [heroResult, aboutResult, servicesResult, testimonialsResult, themeResult] = await Promise.all([
      supabase.from('hero_content').select('*').single(),
      supabase.from('about_content').select('*').single(),
      supabase.from('services_content').select('*').single(),
      supabase.from('testimonials_content').select('*').single(),
      supabase.from('theme_settings').select('*').single(),
    ])

    // Fetch services and testimonials arrays
    const services = await supabase.from('services').select('*').order('order')
    const testimonials = await supabase.from('testimonials').select('*').order('order')

    return {
      hero: toCamelCase(heroResult.data),
      about: toCamelCase(aboutResult.data),
      services: {
        ...toCamelCase(servicesResult.data),
        services: (services.data || []).map(toCamelCase),
      },
      testimonials: {
        ...toCamelCase(testimonialsResult.data),
        testimonials: (testimonials.data || []).map(toCamelCase),
      },
      theme: toCamelCase(themeResult.data),
    }
  } catch (error) {
    console.error('Error fetching content:', error)
    // Return null to use default content
    return null
  }
}

export default async function Home() {
  const content = await getContent()

  return (
    <main className="min-h-screen bg-black">
      <ThemeApplier theme={content?.theme} />
      <HeroSection content={content?.hero} />
      <AboutSection content={content?.about} />
      <ServicesSection content={content?.services} />
      <TestimonialsSection content={content?.testimonials} />
      <ContactForm />
      <Footer />
    </main>
  )
}
