'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  MicrophoneIcon, 
  PaperAirplaneIcon, 
  StopIcon,
  CameraIcon,
  PhotoIcon,
  HomeIcon,
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useVoiceAndMedia } from '@/hooks/useVoiceAndMedia'

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
  const [isLoading, setIsLoading] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Voice and Media capabilities
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    isSpeaking,
    stopSpeaking,
    videoRef,
    isCameraActive,
    startCamera,
    stopCamera,
    capturePhoto,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    captureScreen,
    error: mediaError,
    clearError
  } = useVoiceAndMedia()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Send to AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
      // Speak the response
      speak(data.response)
      
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing technical difficulties. Please check your API configuration.",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle voice input
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
      // Auto-send if transcript ends with clear intent
      if (transcript.toLowerCase().includes('send') || transcript.toLowerCase().includes('go')) {
        handleSendMessage(transcript)
      }
    }
  }, [transcript])

  const handleImageCapture = async (imageData: string, source: 'camera' | 'screen') => {
    setIsLoading(true)
    try {
      const response = await fetch(imageData)
      const blob = await response.blob()
      
      const formData = new FormData()
      formData.append('image', blob, `${source}-capture.jpg`)
      formData.append('prompt', `Analyze this ${source} capture and describe what you see in detail.`)

      const visionResponse = await fetch('/api/vision', {
        method: 'POST',
        body: formData
      })

      const data = await visionResponse.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const visionMessage: Message = {
        id: Date.now().toString(),
        content: `📸 ${source.charAt(0).toUpperCase() + source.slice(1)} Analysis: ${data.analysis}`,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, visionMessage])
      speak(data.analysis)
      
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Sorry, I couldn't analyze the ${source} capture. Please try again.`,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
    setIsLoading(false)
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
        {/* Error Display */}
        {mediaError && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300">{mediaError}</span>
            <button 
              onClick={clearError}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        )}

        {/* Video Display */}
        {showVideo && (isCameraActive || isScreenSharing) && (
          <div className="mb-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">
                {isCameraActive ? '📷 Camera Feed' : '🖥️ Screen Share'}
              </h3>
              <button 
                onClick={() => setShowVideo(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              className="w-full max-w-md mx-auto rounded-lg bg-black"
            />
          </div>
        )}

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
              {/* Media Controls */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowVideo(!showVideo)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <PhotoIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className={`p-2 rounded-lg transition-colors ${
                    isCameraActive 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <CameraIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                  className={`p-2 rounded-lg transition-colors ${
                    isScreenSharing 
                      ? 'text-blue-400 bg-blue-400/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ComputerDesktopIcon className="w-5 h-5" />
                </button>
                {(isCameraActive || isScreenSharing) && (
                  <button 
                    onClick={() => {
                      const imageData = isCameraActive ? capturePhoto() : captureScreen()
                      if (imageData) {
                        handleImageCapture(imageData, isCameraActive ? 'camera' : 'screen')
                      }
                    }}
                    className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-colors"
                  >
                    📸
                  </button>
                )}
                {isSpeaking && (
                  <button 
                    onClick={stopSpeaking}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <SpeakerXMarkIcon className="w-5 h-5" />
                  </button>
                )}
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
                onClick={isListening ? stopListening : startListening}
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
                onClick={() => handleSendMessage()}
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