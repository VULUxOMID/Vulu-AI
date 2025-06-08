'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseVoiceAndMediaProps {
  onTranscript?: (text: string, isFinal: boolean) => void
  onError?: (error: string) => void
  onVisionCapture?: (imageData: string, context: string) => void
}

interface UserMemory {
  name?: string
  preferences: Record<string, any>
  facts: string[]
}

interface TTSConfig {
  text: string
  fallbacks: Array<{
    type: string
    voice?: string
    endpoint?: string
    voices?: string[]
    voicePreferences?: string[]
    settings: {
      rate: number
      pitch: number
      volume: number
      lang?: string
    }
  }>
}

interface UseVoiceAndMediaReturn {
  // Speech Recognition
  isListening: boolean
  transcript: string
  interimTranscript: string
  startListening: () => void
  stopListening: () => void
  
  // Text to Speech
  speak: (text: string) => void
  isSpeaking: boolean
  stopSpeaking: () => void
  
  // Camera
  videoRef: React.RefObject<HTMLVideoElement | null>
  hasVideoPermission: boolean
  isVideoActive: boolean
  videoMode: 'camera' | 'screen' | null
  startCamera: () => Promise<void>
  startScreenShare: () => Promise<void>
  stopVideo: () => void
  captureFrame: () => string | null
  analyzeCurrentView: (context?: string) => Promise<string | null>
  
  // Screen Sharing
  isScreenSharing: boolean
  captureScreen: () => string | null
  
  // Error handling
  permissionStatus: string
  lastError: string | null
  debugInfo: Record<string, string>
  
  // Memory
  userMemory: UserMemory
  
  // Utilities
  setLastError: (error: string | null) => void
}

export function useVoiceAndMedia({ onTranscript, onError, onVisionCapture }: UseVoiceAndMediaProps = {}) {
  // Voice Recognition States
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  
  // Media States
  const [hasVideoPermission, setHasVideoPermission] = useState(false)
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [videoMode, setVideoMode] = useState<'camera' | 'screen' | null>(null)
  
  // Status and Error States
  const [permissionStatus, setPermissionStatus] = useState('unknown')
  const [lastError, setLastError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<Record<string, string>>({})
  
  // Refs for media and recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const isProcessingRef = useRef(false)
  
  // Memory and conversation state
  const [userMemory, setUserMemory] = useState<UserMemory>({ preferences: {}, facts: [] })
  const conversationHistoryRef = useRef<Array<{ role: string; content: string; timestamp: string }>>([])

  // Load persistent memory on mount
  useEffect(() => {
    try {
      const savedMemory = localStorage.getItem('jarvis_memory')
      if (savedMemory) {
        const memory = JSON.parse(savedMemory)
        setUserMemory(memory)
        console.log('🧠 Loaded user memory:', memory)
      }
      
      const savedConversation = localStorage.getItem('jarvis_conversations')
      if (savedConversation) {
        conversationHistoryRef.current = JSON.parse(savedConversation)
        console.log('💬 Loaded conversation history')
      }
    } catch (error) {
      console.error('Failed to load persistent memory:', error)
    }
  }, [])

  // Save memory to localStorage
  const saveMemory = useCallback(() => {
    try {
      localStorage.setItem('jarvis_memory', JSON.stringify(userMemory))
      localStorage.setItem('jarvis_conversations', JSON.stringify(conversationHistoryRef.current))
    } catch (error) {
      console.error('Failed to save memory:', error)
    }
  }, [userMemory])

  // Enhanced TTS with multiple fallbacks
  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return false

    console.log('🗣️ Speaking:', text)
    setIsSpeaking(true)
    isProcessingRef.current = true

    try {
      // Get TTS configuration from API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error('TTS API failed')
      }

      const { config }: { config: TTSConfig } = await response.json()
      
      // Try each fallback in order
      for (const fallback of config.fallbacks) {
        if (!isProcessingRef.current) break // Interrupted

        const success = await tryTTSFallback(fallback, text)
        if (success) {
          console.log(`✅ TTS success with: ${fallback.type}`)
          return true
        }
      }

      console.warn('❌ All TTS fallbacks failed')
      setLastError('Voice synthesis unavailable')
      return false

    } catch (error) {
      console.error('🚨 TTS Error:', error)
      setLastError('Voice synthesis error')
      return false
    } finally {
      setIsSpeaking(false)
      isProcessingRef.current = false
    }
  }, [])

  // Try individual TTS fallback
  const tryTTSFallback = useCallback(async (fallback: any, text: string): Promise<boolean> => {
    try {
      switch (fallback.type) {
        case 'google-cloud':
          return await tryGoogleCloudTTS(fallback, text)
        
        case 'responsive-voice':
          return await tryResponsiveVoice(fallback, text)
        
        case 'browser-premium':
          return await tryBrowserPremiumTTS(fallback, text)
        
        case 'browser-fallback':
          return await tryBrowserFallbackTTS(fallback, text)
        
        default:
          return false
      }
    } catch (error) {
      console.error(`TTS fallback ${fallback.type} failed:`, error)
      return false
    }
  }, [])

  // Google Cloud TTS
  const tryGoogleCloudTTS = useCallback(async (fallback: any, text: string): Promise<boolean> => {
    try {
      console.log('🌟 Trying Google Cloud TTS...')
      
      const response = await fetch(fallback.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: fallback.voice })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        return new Promise((resolve) => {
          const audio = new Audio(audioUrl)
          audio.volume = fallback.settings.volume
          currentAudioRef.current = audio

          audio.onended = () => {
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            console.log('🔊 Google TTS playback finished')
            resolve(true)
          }

          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl)
            currentAudioRef.current = null
            resolve(false)
          }

          if (!isProcessingRef.current) {
            URL.revokeObjectURL(audioUrl)
            resolve(false)
            return
          }

          audio.play().catch(() => resolve(false))
        })
      }
      
      return false
    } catch (error) {
      console.log('❌ Google TTS unavailable')
      return false
    }
  }, [])

  // ResponsiveVoice TTS
  const tryResponsiveVoice = useCallback(async (fallback: any, text: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!(window as any).responsiveVoice?.voiceSupport()) {
        resolve(false)
        return
      }

      console.log('🗣️ Using ResponsiveVoice')
      
      const selectedVoice = fallback.voices[0]
      
      ;(window as any).responsiveVoice.speak(text, selectedVoice, {
        rate: fallback.settings.rate,
        pitch: fallback.settings.pitch,
        volume: fallback.settings.volume,
        onstart: () => console.log('✅ ResponsiveVoice started'),
        onend: () => {
          console.log('🔊 ResponsiveVoice finished')
          resolve(true)
        },
        onerror: () => resolve(false)
      })
    })
  }, [])

  // Browser Premium TTS
  const tryBrowserPremiumTTS = useCallback(async (fallback: any, text: string): Promise<boolean> => {
    if (!('speechSynthesis' in window)) return false

    try {
      const voices = await getAvailableVoices()
      const premiumVoice = findPremiumVoice(voices, fallback.voicePreferences)
      
      if (premiumVoice) {
        return new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.voice = premiumVoice
          utterance.rate = fallback.settings.rate
          utterance.pitch = fallback.settings.pitch
          utterance.volume = fallback.settings.volume
          utterance.lang = fallback.settings.lang || 'en-US'
          
          utterance.onend = () => {
            console.log(`🔊 Browser premium TTS finished: ${premiumVoice.name}`)
            resolve(true)
          }
          
          utterance.onerror = () => resolve(false)
          
          speechSynthesis.speak(utterance)
          console.log(`Using premium voice: ${premiumVoice.name}`)
        })
      }
      
      return false
    } catch (error) {
      return false
    }
  }, [])

  // Browser Fallback TTS
  const tryBrowserFallbackTTS = useCallback(async (fallback: any, text: string): Promise<boolean> => {
    if (!('speechSynthesis' in window)) return false

    return new Promise((resolve) => {
      speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = fallback.settings.rate
      utterance.pitch = fallback.settings.pitch
      utterance.volume = fallback.settings.volume
      
      utterance.onend = () => {
        console.log('🔊 Browser fallback TTS finished')
        resolve(true)
      }
      
      utterance.onerror = () => resolve(false)
      
      speechSynthesis.speak(utterance)
    })
  }, [])

  // Get available voices
  const getAvailableVoices = useCallback((): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices()
      if (voices.length > 0) {
        resolve(voices)
        return
      }
      
      speechSynthesis.addEventListener('voiceschanged', () => {
        resolve(speechSynthesis.getVoices())
      }, { once: true })
    })
  }, [])

  // Find premium voice
  const findPremiumVoice = useCallback((voices: SpeechSynthesisVoice[], preferences: string[]): SpeechSynthesisVoice | null => {
    for (const preference of preferences) {
      const voice = voices.find(voice => voice.name.includes(preference))
      if (voice) return voice
    }
    return null
  }, [])

  // Stop current speech
  const stopSpeaking = useCallback(() => {
    console.log('🛑 Stopping speech...')
    
    // Stop all TTS methods
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
    
    if ((window as any).responsiveVoice) {
      (window as any).responsiveVoice.cancel()
    }
    
    setIsSpeaking(false)
    isProcessingRef.current = false
  }, [])

  // Initialize speech recognition with smart interruption
  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setLastError('Speech recognition not supported')
      return false
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    
    recognition.onstart = () => {
      console.log('🎤 Speech recognition started')
      setPermissionStatus('granted')
      setDebugInfo(prev => ({ ...prev, speechStatus: 'Listening...' }))
    }
    
    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      // SMART INTERRUPTION: Stop JARVIS immediately when user starts speaking
      if (interimTranscript.trim().length > 0 && (isSpeaking || isProcessingRef.current)) {
        console.log('🚫 User interruption detected - stopping JARVIS')
        stopSpeaking()
      }

      setTranscript(finalTranscript)
      setInterimTranscript(interimTranscript)
      
      if (onTranscript) {
        onTranscript(finalTranscript || interimTranscript, !!finalTranscript)
      }
      
      // Auto-send final transcripts
      if (finalTranscript.trim()) {
        console.log('📝 Final transcript:', finalTranscript)
        // Could trigger auto-send here
      }
    }
    
    recognition.onerror = (event: any) => {
      console.error('🚨 Speech recognition error:', event.error)
      
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        setPermissionStatus('denied')
        setLastError('Microphone permission denied. Please refresh and allow access.')
      } else if (event.error === 'network') {
        setLastError('Network error during speech recognition')
      } else {
        setLastError(`Speech recognition error: ${event.error}`)
      }
      
      setIsListening(false)
      setDebugInfo(prev => ({ ...prev, speechStatus: `Error: ${event.error}` }))
      
      if (onError) {
        onError(event.error)
      }
    }
    
    recognition.onend = () => {
      console.log('🎤 Speech recognition ended')
      setIsListening(false)
      setDebugInfo(prev => ({ ...prev, speechStatus: 'Stopped' }))
    }

    recognitionRef.current = recognition
    return true
  }, [isSpeaking, onTranscript, onError, stopSpeaking])

  // Start listening
  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      const initialized = initSpeechRecognition()
      if (!initialized) return false
    }

    try {
      recognitionRef.current?.start()
      setIsListening(true)
      setLastError(null)
      return true
    } catch (error) {
      console.error('Failed to start listening:', error)
      setLastError('Failed to start speech recognition')
      return false
    }
  }, [initSpeechRecognition])

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Camera access
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 }, 
        audio: false 
      })
      
      streamRef.current = stream
      setIsVideoActive(true)
      setVideoMode('camera')
      setHasVideoPermission(true)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      console.log('📹 Camera started')
      return true
    } catch (error) {
      console.error('Camera error:', error)
      setLastError('Camera access denied or unavailable')
      return false
    }
  }, [])

  // Screen sharing
  const startScreenShare = useCallback(async () => {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { width: 1280, height: 720 },
        audio: false
      })
      
      streamRef.current = stream
      setIsVideoActive(true)
      setVideoMode('screen')
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      console.log('🖥️ Screen sharing started')
      return true
    } catch (error) {
      console.error('Screen share error:', error)
      setLastError('Screen sharing denied or unavailable')
      return false
    }
  }, [])

  // Stop video
  const stopVideo = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsVideoActive(false)
    setVideoMode(null)
    console.log('📹 Video stopped')
  }, [])

  // Capture current video frame
  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current || !contextRef.current) {
      return null
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = contextRef.current

    if (video.readyState >= 2) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      return canvas.toDataURL('image/jpeg', 0.8)
    }

    return null
  }, [])

  // Analyze current view with AI
  const analyzeCurrentView = useCallback(async (context = '') => {
    const imageData = captureFrame()
    if (!imageData) {
      setLastError('No video frame available to analyze')
      return null
    }

    if (onVisionCapture) {
      onVisionCapture(imageData, context)
    }

    return imageData
  }, [captureFrame, onVisionCapture])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
      stopVideo()
      stopSpeaking()
    }
  }, [stopListening, stopVideo, stopSpeaking])

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d')
    }
  }, [])

  // Save memory when it changes
  useEffect(() => {
    saveMemory()
  }, [saveMemory])

  return {
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
    
    // Refs
    videoRef,
    canvasRef,
    
    // Status and Debug
    permissionStatus,
    lastError,
    debugInfo,
    
    // Memory
    userMemory,
    
    // Utilities
    setLastError: (error: string | null) => setLastError(error)
  }
} 