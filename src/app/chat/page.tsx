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
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    // Voice Recognition
    isListening,
    isSpeaking,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
    
    // Text-to-Speech
    speak,
    stopSpeaking,
    
    // Video/Camera
    hasVideoPermission,
    isVideoActive,
    videoMode,
    startCamera,
    startScreenShare,
    stopVideo,
    captureFrame,
    analyzeCurrentView,
    videoRef,
    canvasRef,
    
    // Status and Debug
    permissionStatus,
    lastError,
    debugInfo,
    userMemory,
    setLastError
  } = useVoiceAndMedia({
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        // Auto-send on final transcript
        handleSendMessage(text.trim())
      } else if (!isFinal) {
        // Show interim transcript in input
        setInputText(text)
      }
    },
    onError: (error) => {
      console.error('Voice/Media Error:', error)
    },
    onVisionCapture: async (imageData, context) => {
      await handleVisionAnalysis(imageData, context)
    }
  })

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' && e.ctrlKey) {
        e.preventDefault()
        toggleListening()
      }
      if (e.key === 'Escape') {
        stopSpeaking()
        stopListening()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [toggleListening, stopSpeaking, stopListening])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputText.trim()
    if (!text || isLoading) return

    // Stop any ongoing speech
    stopSpeaking()

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    setLastError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-10), // Last 10 messages for context
          hasVision: isVideoActive
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      }

      setMessages(prev => [...prev, assistantMessage])

      // Speak the response
      if (data.response) {
        speak(data.response)
      }

    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
      setLastError('Failed to get AI response')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVisionAnalysis = async (imageData: string, context: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
          prompt: `Analyze this ${videoMode === 'camera' ? 'camera' : 'screen'} image. ${context || 'What do you see?'}`
        })
      })

      if (!response.ok) {
        throw new Error('Vision analysis failed')
      }

      const data = await response.json()
      
      const visionMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `👁️ **Vision Analysis**: ${data.analysis}`,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, visionMessage])
      speak(data.analysis)

    } catch (error) {
      console.error('Vision analysis error:', error)
      setLastError('Vision analysis failed')
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    localStorage.removeItem('jarvis_conversations')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">J</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">J.A.R.V.I.S</h1>
              <p className="text-blue-300 text-sm">
                {userMemory.name ? `Hello, ${userMemory.name}` : 'Your Personal AI Assistant'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className="px-3 py-1 text-xs bg-slate-700 rounded hover:bg-slate-600 transition-colors"
            >
              Debug
            </button>
            <button
              onClick={clearMessages}
              className="px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Debug Info */}
        {showDebugInfo && (
          <div className="bg-slate-800 rounded-lg p-4 mb-4 text-xs font-mono">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>Speech: {debugInfo.speechStatus || 'Ready'}</div>
              <div>Permission: {permissionStatus}</div>
              <div>Listening: {isListening ? '🎤' : '⭕'}</div>
              <div>Speaking: {isSpeaking ? '🗣️' : '⭕'}</div>
              <div>Video: {isVideoActive ? `📹 ${videoMode}` : '⭕'}</div>
              <div>Memory: {userMemory.facts.length} facts</div>
            </div>
            {lastError && <div className="text-red-400 mt-2">Error: {lastError}</div>}
          </div>
        )}

        {/* Voice & Video Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
          {/* Voice Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleListening}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <span className="text-xl">{isListening ? '🛑' : '🎤'}</span>
              <span>{isListening ? 'Stop Listening' : 'Start Listening'}</span>
            </button>
            
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors"
              >
                <span className="text-xl">🔇</span>
                <span>Stop Speaking</span>
              </button>
            )}
          </div>

          {/* Video Controls */}
          <div className="flex items-center space-x-2">
            {!isVideoActive ? (
              <>
                <button
                  onClick={startCamera}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>📹</span>
                  <span>Camera</span>
                </button>
                <button
                  onClick={startScreenShare}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>🖥️</span>
                  <span>Screen</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-600 rounded-lg text-sm">
                  <span>{videoMode === 'camera' ? '📹' : '🖥️'}</span>
                  <span className="capitalize">{videoMode} Active</span>
                </div>
                <button
                  onClick={() => analyzeCurrentView()}
                  className="flex items-center space-x-2 px-3 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>👁️</span>
                  <span>Analyze</span>
                </button>
                <button
                  onClick={stopVideo}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>⏹️</span>
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Video Preview */}
        {isVideoActive && (
          <div className="mb-4">
            <div className="relative w-64 h-48 bg-black rounded-lg overflow-hidden mx-auto">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                LIVE • {videoMode?.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 mt-20">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-xl font-semibold mb-2">Welcome to J.A.R.V.I.S</h2>
              <p className="mb-4">Your personal AI assistant is ready to help!</p>
              <div className="text-sm space-y-1">
                <p>💬 Type a message or use voice commands</p>
                <p>🎤 Press <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">Ctrl + Space</kbd> to toggle listening</p>
                <p>📹 Enable camera or screen sharing for vision analysis</p>
                <p>🧠 I remember our conversations and learn about you</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-white'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-white p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  <span>JARVIS is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              isListening 
                ? interimTranscript || "Listening... (speak now)" 
                : "Type your message or press Ctrl+Space to use voice..."
            }
            className="flex-1 p-3 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
          <div className="flex items-center space-x-4">
            {isListening && <span className="text-green-400">🎤 Listening</span>}
            {isSpeaking && <span className="text-blue-400 animate-pulse">🗣️ Speaking</span>}
            {isVideoActive && <span className="text-purple-400">📹 Vision Active</span>}
          </div>
          <div>
            {userMemory.name && <span>👤 {userMemory.name}</span>}
            {userMemory.facts.length > 0 && <span className="ml-2">🧠 {userMemory.facts.length} facts</span>}
          </div>
        </div>
      </div>
    </div>
  )
} 