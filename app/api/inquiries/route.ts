import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import emailjs from '@emailjs/nodejs'

// POST - Submit a new inquiry (public)
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { name, email, goal, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Insert inquiry
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name,
        email,
        goal: goal || null,
        message: message || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting inquiry:', error)
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      )
    }

    // Send email notification to admin via EmailJS
    try {
      const emailjsServiceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY
      const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'one_percent_fitness'

      if (emailjsServiceId && (emailjsPrivateKey || emailjsPublicKey)) {
        // Build auth options: use private key for server-side, include public key if available
        const authOptions: any = emailjsPrivateKey
          ? { privateKey: emailjsPrivateKey, ...(emailjsPublicKey && { publicKey: emailjsPublicKey }) }
          : { publicKey: emailjsPublicKey }

        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            name: name,
            title: goal || message || 'New Inquiry',
            email: email,
            message: message || 'No message provided',
            goal: goal || 'Not specified',
          },
          authOptions
        )
      }
    } catch (emailError: any) {
      // Log email error but don't fail the request
      console.error('Error sending email notification:', emailError?.message || emailError)
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in POST /api/inquiries:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting the inquiry' },
      { status: 500 }
    )
  }
}

// GET - Fetch all inquiries (admin only)
export async function GET() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all inquiries, ordered by most recent first
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching inquiries:', error)
      return NextResponse.json(
        { error: 'Failed to fetch inquiries' },
        { status: 500 }
      )
    }

    // Convert snake_case to camelCase
    const inquiries = (data || []).map((inquiry) => ({
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      goal: inquiry.goal,
      message: inquiry.message,
      read: inquiry.read,
      createdAt: inquiry.created_at,
    }))

    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('Error in GET /api/inquiries:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching inquiries' },
      { status: 500 }
    )
  }
}

// PATCH - Update inquiry (mark as read/unread)
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, read } = body

    if (!id || typeof read !== 'boolean') {
      return NextResponse.json(
        { error: 'ID and read status are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update({ read })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating inquiry:', error)
      return NextResponse.json(
        { error: 'Failed to update inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        goal: data.goal,
        message: data.message,
        read: data.read,
        createdAt: data.created_at,
      },
    })
  } catch (error) {
    console.error('Error in PATCH /api/inquiries:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the inquiry' },
      { status: 500 }
    )
  }
}

// DELETE - Delete an inquiry
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting inquiry:', error)
      return NextResponse.json(
        { error: 'Failed to delete inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/inquiries:', error)
    return NextResponse.json(
      { error: 'An error occurred while deleting the inquiry' },
      { status: 500 }
    )
  }
}

