import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Build conversation context
    const context = conversationHistory
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n')

    // Create the prompt with JARVIS personality
    const prompt = `You are JARVIS (Just Another Rather Very Intelligent System), a personal AI assistant. You are helpful, intelligent, and have a slightly sophisticated but friendly personality like Tony Stark's JARVIS from Iron Man. Be concise but thorough in your responses.

Previous conversation:
${context}

User: ${message}

JARVIS:`

    // Generate response
    const result = await model.generateContent(prompt)
    const response = await result.response
    const aiResponse = response.text()

    return NextResponse.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'I apologize, but I\'m experiencing technical difficulties. Please try again.' }, 
      { status: 500 }
    )
  }
} 