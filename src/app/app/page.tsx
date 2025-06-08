'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  MicrophoneIcon, 
  StopIcon, 
  CameraIcon, 
  ComputerDesktopIcon,
  EyeIcon,
  TrashIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  CreditCardIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'user' | 'vulu'
  content: string
  timestamp: Date
}

export default function VuluApp() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'vulu',
      content: "Hello! I'm Vulu, your AI assistant. I can see, hear, and help you with anything. What would you like to do today?",
      timestamp: new Date()
    }
  ])
  const [currentCredits, setCurrentCredits] = useState(4750)
  const [maxCredits] = useState(5000)
  const [visionMode, setVisionMode] = useState<'none' | 'camera' | 'screen'>('none')
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')

        if (event.results[event.results.length - 1].isFinal) {
          handleUserMessage(transcript)
          setIsListening(false)
        }
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }

    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const handleUserMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    // Deduct credits for user message
    setCurrentCredits(prev => Math.max(0, prev - 1))

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const vuluResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'vulu',
        content: generateVuluResponse(content),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, vuluResponse])
      
      // Deduct credits for TTS response
      setCurrentCredits(prev => Math.max(0, prev - 1))
      
      // Play TTS response
      speakResponse(vuluResponse.content)
      
    } catch (error) {
      console.error('Error processing message:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateVuluResponse = (userInput: string): string => {
    const responses = [
      "I understand what you're saying! That's a great question. Let me help you with that.",
      "Absolutely! I can see your perspective on this. Here's what I think...",
      "That's interesting! Based on what I can process, I'd suggest...",
      "Perfect! I'm here to help. Let me break this down for you...",
      "I appreciate you sharing that with me. From my analysis..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const speakResponse = async (text: string) => {
    try {
      // Here we would integrate with your TTS server
      console.log('Speaking:', text)
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error('TTS error:', error)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setVisionMode('camera')
        // Deduct credits for vision analysis
        setCurrentCredits(prev => Math.max(0, prev - 3))
      }
    } catch (error) {
      console.error('Camera error:', error)
    }
  }

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setVisionMode('screen')
        // Deduct credits for vision analysis
        setCurrentCredits(prev => Math.max(0, prev - 3))
      }
    } catch (error) {
      console.error('Screen share error:', error)
    }
  }

  const stopVision = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setVisionMode('none')
  }

  const clearConversation = () => {
    setMessages([{
      id: Date.now().toString(),
      type: 'vulu',
      content: "Conversation cleared! I'm ready for a fresh start. What would you like to talk about?",
      timestamp: new Date()
    }])
  }

  const getCreditColor = () => {
    const percentage = (currentCredits / maxCredits) * 100
    if (percentage > 50) return 'bg-green-500'
    if (percentage > 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">
                🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
              </div>
            </div>

            {/* Credits Display */}
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm font-medium">Credits:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getCreditColor()}`}
                        style={{ width: `${(currentCredits / maxCredits) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-bold">
                      {currentCredits.toLocaleString()}/{maxCredits.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-white hover:text-purple-300 transition-colors">
                  <CreditCardIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-white hover:text-purple-300 transition-colors">
                  <Cog6ToothIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-white hover:text-purple-300 transition-colors">
                  <UserCircleIcon className="w-6 h-6" />
                </button>
                <button className="p-2 text-white hover:text-purple-300 transition-colors">
                  <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-white/5 border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Chat with Vulu</h2>
                    <p className="text-gray-300">Your AI assistant with vision and voice</p>
                  </div>
                  <button
                    onClick={clearConversation}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Vulu is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Controls */}
              <div className="bg-white/5 border-t border-white/10 p-6">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-4 rounded-full transition-all duration-200 ${
                      isListening
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                    }`}
                  >
                    {isListening ? (
                      <StopIcon className="w-6 h-6 text-white" />
                    ) : (
                      <MicrophoneIcon className="w-6 h-6 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={startCamera}
                    className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <CameraIcon className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={startScreenShare}
                    className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <ComputerDesktopIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-center text-gray-400 text-sm mt-4">
                  {isListening ? 'Listening... Speak now' : 'Click the microphone to start talking'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vision Panel */}
            {visionMode !== 'none' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {visionMode === 'camera' ? '📹 Camera' : '🖥️ Screen Share'}
                  </h3>
                  <button
                    onClick={stopVision}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <StopIcon className="w-5 h-5" />
                  </button>
                </div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full rounded-lg"
                />
                <button
                  onClick={() => {
                    // Analyze current vision
                    setCurrentCredits(prev => Math.max(0, prev - 3))
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>Analyze Now (3 credits)</span>
                </button>
              </div>
            )}

            {/* Credit Usage */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Credit Usage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Text Messages</span>
                  <span className="text-white font-medium">1 credit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Vision Analysis</span>
                  <span className="text-white font-medium">3 credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Voice Response</span>
                  <span className="text-white font-medium">1 credit</span>
                </div>
              </div>
              
              {currentCredits < 100 && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-300 text-sm">⚠️ Low credits! Consider upgrading your plan.</p>
                  <Link 
                    href="/pricing"
                    className="inline-block mt-2 text-red-300 hover:text-red-200 text-sm underline"
                  >
                    Upgrade Now
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2">
                  📝 Export conversation
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2">
                  ⚙️ Voice settings
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2">
                  📊 Usage analytics
                </button>
                <Link href="/pricing" className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors py-2">
                  💳 Manage subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 