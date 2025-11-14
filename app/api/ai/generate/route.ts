import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { currentContent, instruction, fieldLabel } = await request.json()

    if (!currentContent || !instruction) {
      return NextResponse.json(
        { error: 'Current content and instruction are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a professional copywriter specializing in fitness and wellness content. Your task is to edit website content based on user instructions while maintaining the brand voice and ensuring the content is clear, engaging, and professional.

Guidelines:
- Keep the content concise and impactful
- Maintain a professional yet approachable tone
- Ensure the content is relevant to fitness and personal training
- Do not add unnecessary words or fluff
- Preserve the core message and intent
- Make sure the edited content flows naturally
- Do NOT wrap the response in quotes or quotation marks
- Return only the plain text content`

    const userPrompt = `Edit the following ${fieldLabel} content based on this instruction: "${instruction}"

Current content: "${currentContent}"

Please provide only the edited content without any explanations, additional text, or quotation marks. Return only the revised version of the content as plain text.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate content from OpenAI' },
        { status: response.status }
      )
    }

    const data = await response.json()
    let generatedContent = data.choices?.[0]?.message?.content?.trim()

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    // Remove surrounding quotes if present
    if (
      (generatedContent.startsWith('"') && generatedContent.endsWith('"')) ||
      (generatedContent.startsWith("'") && generatedContent.endsWith("'"))
    ) {
      generatedContent = generatedContent.slice(1, -1)
    }

    return NextResponse.json({ content: generatedContent })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'An error occurred while generating content' },
      { status: 500 }
    )
  }
}

