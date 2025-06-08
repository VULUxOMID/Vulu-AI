import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as File
    const prompt = formData.get('prompt') as string || 'What do you see in this image?'

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const base64Image = Buffer.from(bytes).toString('base64')

    // Get the Gemini Vision model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    // Create JARVIS-style vision analysis prompt
    const visionPrompt = `You are JARVIS, an advanced AI assistant with visual analysis capabilities. Analyze this image with the sophistication and detail that Tony Stark would expect. Be thorough but concise.

User request: ${prompt}

Please provide a detailed analysis of what you observe:`

    // Prepare the image data
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: image.type
      }
    }

    // Generate response
    const result = await model.generateContent([visionPrompt, imagePart])
    const response = await result.response
    const analysis = response.text()

    return NextResponse.json({ 
      analysis,
      timestamp: new Date().toISOString(),
      imageSize: bytes.byteLength,
      imageType: image.type
    })

  } catch (error) {
    console.error('Vision Analysis Error:', error)
    return NextResponse.json(
      { error: 'I apologize, but I\'m having trouble analyzing this image. Please try again.' }, 
      { status: 500 }
    )
  }
} 