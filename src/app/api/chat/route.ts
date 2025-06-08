import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

interface UserMemory {
  name?: string
  preferences: Record<string, any>
  facts: string[]
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// Simple in-memory storage (in production, use a database)
const userMemory: UserMemory = {
  preferences: {},
  facts: []
}

function extractUserInfo(userText: string): void {
  const userTextLower = userText.toLowerCase()
  
  // Check for name introduction
  const namePatterns = [
    /my name is (\w+)/i,
    /i'm (\w+)/i,
    /i am (\w+)/i,
    /call me (\w+)/i,
    /i'm called (\w+)/i
  ]
  
  for (const pattern of namePatterns) {
    const match = userText.match(pattern)
    if (match && match[1]) {
      userMemory.name = match[1]
      console.log(`Remembered user's name: ${userMemory.name}`)
      break
    }
  }
  
  // Extract preferences and facts
  if (userTextLower.includes('i like') || userTextLower.includes('i love')) {
    const fact = userText.match(/i (like|love) (.+)/i)
    if (fact && fact[2]) {
      const preference = fact[2].trim()
      if (!userMemory.facts.includes(`likes ${preference}`)) {
        userMemory.facts.push(`likes ${preference}`)
        console.log(`Learned: User likes ${preference}`)
      }
    }
  }
  
  // Extract dislikes
  if (userTextLower.includes('i hate') || userTextLower.includes('i don\'t like')) {
    const fact = userText.match(/i (hate|don't like) (.+)/i)
    if (fact && fact[2]) {
      const dislike = fact[2].trim()
      if (!userMemory.facts.includes(`dislikes ${dislike}`)) {
        userMemory.facts.push(`dislikes ${dislike}`)
        console.log(`Learned: User dislikes ${dislike}`)
      }
    }
  }
  
  // Extract job/profession
  if (userTextLower.includes('i am a') || userTextLower.includes('i work as')) {
    const jobPattern = /i (am a|work as) (.+)/i
    const match = userText.match(jobPattern)
    if (match && match[2]) {
      const job = match[2].trim()
      if (!userMemory.facts.some(f => f.includes('works as') || f.includes('is a'))) {
        userMemory.facts.push(`works as ${job}`)
        console.log(`Learned: User works as ${job}`)
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [], hasVision = false } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Extract user information for memory
    extractUserInfo(message)

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Build enhanced context with time, memory, and conversation history
    const now = new Date()
    const currentTime = now.toLocaleTimeString()
    const currentDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    let context = `You are JARVIS (Just Another Rather Very Intelligent System), Tony Stark's intelligent AI assistant. You are helpful, sophisticated, but friendly and conversational. Be engaging and personable like a real assistant.

Current time: ${currentTime}
Current date: ${currentDate}

User said: "${message}"`

    // Add user memory if available
    if (userMemory.name) {
      context += `\nThe user's name is ${userMemory.name}.`
    }
    
    if (userMemory.facts.length > 0) {
      context += `\nWhat I know about the user: ${userMemory.facts.join(', ')}.`
    }

    // Include recent conversation history for context
    if (conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6) // Last 6 messages
      context += `\n\nRecent conversation:`
      recentHistory.forEach((msg: ConversationMessage) => {
        context += `\n${msg.role.toUpperCase()}: ${msg.content}`
      })
    }

    // Add vision context if available
    if (hasVision) {
      context += `\n\nVISION MODE: You have access to live camera/screen feed. You can see what the user sees in real-time.`
    }

    context += `\n\nPlease respond as JARVIS would - be helpful, intelligent, conversational, and engaging. Keep responses under 150 words unless more detail is requested. Sound natural and alive, not robotic.

If the user tells you personal information, acknowledge it warmly and remember it for future conversations.

For time/date questions, use the current time and date provided above.

If asked about system operations (Bluetooth, WiFi, etc.), explain what would typically be done but mention you don't have direct system access in this browser environment.`

    // Generate response
    const result = await model.generateContent(context)
    const response = await result.response
    const aiResponse = response.text()

    return NextResponse.json({ 
      response: aiResponse,
      userMemory: userMemory,
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