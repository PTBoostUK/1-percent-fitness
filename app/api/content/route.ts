import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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

export async function GET() {
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

    // Convert snake_case to camelCase
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj: any): any {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toSnakeCase)
  if (typeof obj !== 'object') return obj
  
  const snakeObj: any = {}
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    snakeObj[snakeKey] = toSnakeCase(obj[key])
  }
  return snakeObj
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { section, data } = body

    // Convert camelCase to snake_case for database
    const dbData = toSnakeCase(data)
    let result

    switch (section) {
      case 'hero':
        result = await supabase.from('hero_content').update(dbData).eq('id', dbData.id).select().single()
        break
      case 'about':
        result = await supabase.from('about_content').update(dbData).eq('id', dbData.id).select().single()
        break
      case 'services':
        // Update services content
        const { services: servicesArray, ...servicesContent } = dbData
        await supabase.from('services_content').update(servicesContent).eq('id', servicesContent.id)
        
        // Update individual services
        if (servicesArray) {
          for (const service of servicesArray) {
            await supabase.from('services').upsert(service, { onConflict: 'id' })
          }
        }
        result = { data: { ...servicesContent, services: servicesArray } }
        break
      case 'testimonials':
        // Update testimonials content
        const { testimonials: testimonialsArray, ...testimonialsContent } = dbData
        await supabase.from('testimonials_content').update(testimonialsContent).eq('id', testimonialsContent.id)
        
        // Update individual testimonials
        if (testimonialsArray) {
          for (const testimonial of testimonialsArray) {
            await supabase.from('testimonials').upsert(testimonial, { onConflict: 'id' })
          }
        }
        result = { data: { ...testimonialsContent, testimonials: testimonialsArray } }
        break
      case 'theme':
        result = await supabase.from('theme_settings').update(dbData).eq('id', dbData.id).select().single()
        break
      default:
        return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    // Convert back to camelCase
    const responseData = toCamelCase(result.data)
    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}

