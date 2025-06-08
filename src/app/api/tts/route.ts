import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'en-US-Neural2-J' } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // For now, we'll return the text and let the client handle TTS with Web Speech API
    // This can be enhanced with Google Cloud TTS later if needed
    return NextResponse.json({ 
      text,
      voice,
      timestamp: new Date().toISOString(),
      message: 'Use Web Speech API on client side for now'
    })

  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json(
      { error: 'Text-to-speech service unavailable' }, 
      { status: 500 }
    )
  }
} 