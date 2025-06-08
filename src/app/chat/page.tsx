'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  MicrophoneIcon, 
  PaperAirplaneIcon, 
  StopIcon,
  CameraIcon,
  PhotoIcon,
  HomeIcon 
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm JARVIS, your personal AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you said: \"" + userMessage.content + "\". This is a placeholder response. Soon I'll be connected to real AI capabilities!",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Voice recognition will be implemented here
    if (!isListening) {
      // Start listening
      console.log('Starting voice recognition...')
    } else {
      // Stop listening
      console.log('Stopping voice recognition...')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-blue-300 transition-colors">
                <HomeIcon className="w-6 h-6" />
              </Link>
              <div className="text-xl font-bold text-white">
                🤖 <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">J.A.R.V.I.S</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-[calc(100vh-200px)] flex flex-col">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white border border-white/20 rounded-2xl px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-6">
            <div className="flex items-end space-x-4">
              {/* Attachment buttons */}
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <PhotoIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <CameraIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Message input */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Talk to JARVIS..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[48px] max-h-32"
                  rows={1}
                />
              </div>

              {/* Voice button */}
              <button
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white'
                }`}
              >
                {isListening ? (
                  <StopIcon className="w-5 h-5" />
                ) : (
                  <MicrophoneIcon className="w-5 h-5" />
                )}
              </button>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Status indicators */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Press Enter to send, Shift+Enter for new line</span>
                {isListening && (
                  <span className="text-red-400 animate-pulse">🎤 Listening...</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>JARVIS is ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 