import { NextRequest, NextResponse } from 'next/server'

// Available premium voices (will be populated by browser)
const PREMIUM_VOICES = [
  // Google Premium voices
  'Google US English',
  'Google Wavenet',
  'Google Neural',
  'Google Standard',
  // Microsoft Premium voices
  'Microsoft David Desktop',
  'Microsoft Neural',
  // Apple Premium voices
  'Alex',
  'Daniel',
  // Any high-quality voices
  'en-US'
]

export async function POST(req: NextRequest) {
  try {
    const { text, voiceSettings = {} } = await req.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Return configuration for client-side TTS with multiple fallbacks
    const ttsConfig = {
      text,
      fallbacks: [
        {
          type: 'google-cloud',
          endpoint: 'http://localhost:5050/speak',
          voice: 'en-US-Neural2-J',
          settings: {
            rate: 0.9,
            pitch: 1.0,
            volume: 0.9
          }
        },
        {
          type: 'responsive-voice',
          voices: [
            'US English Male',
            'UK English Male',
            'Australian English Male',
            'US English Female'
          ],
          settings: {
            rate: 0.9,
            pitch: 1.0,
            volume: 0.9
          }
        },
        {
          type: 'browser-premium',
          voicePreferences: PREMIUM_VOICES,
          settings: {
            rate: 1.0,
            pitch: 1.0,
            volume: 0.9,
            lang: 'en-US'
          }
        },
        {
          type: 'browser-fallback',
          settings: {
            rate: 1.0,
            pitch: 1.0,
            volume: 0.9
          }
        }
      ]
    }

    return NextResponse.json({ 
      success: true,
      config: ttsConfig,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('TTS API Error:', error)
    return NextResponse.json(
      { error: 'Text-to-speech service unavailable' }, 
      { status: 500 }
    )
  }
}

// Health check for external TTS services
export async function GET() {
  const healthStatus = {
    timestamp: new Date().toISOString(),
    services: {
      'google-cloud-tts': 'unknown',
      'responsive-voice': 'browser-dependent',
      'browser-tts': 'available'
    }
  }

  // Check Google Cloud TTS server
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch('http://localhost:5050/health', {
      method: 'GET',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      healthStatus.services['google-cloud-tts'] = 'available'
    } else {
      healthStatus.services['google-cloud-tts'] = 'error'
    }
  } catch (error) {
    healthStatus.services['google-cloud-tts'] = 'unavailable'
  }

  return NextResponse.json(healthStatus)
} 