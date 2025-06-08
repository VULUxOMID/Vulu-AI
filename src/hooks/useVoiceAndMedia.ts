'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseVoiceAndMediaReturn {
  // Speech Recognition
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  
  // Text to Speech
  speak: (text: string) => void
  isSpeaking: boolean
  stopSpeaking: () => void
  
  // Camera
  videoRef: React.RefObject<HTMLVideoElement | null>
  isCameraActive: boolean
  startCamera: () => Promise<void>
  stopCamera: () => void
  capturePhoto: () => string | null
  
  // Screen Sharing
  isScreenSharing: boolean
  startScreenShare: () => Promise<void>
  stopScreenShare: () => void
  captureScreen: () => string | null
  
  // Error handling
  error: string | null
  clearError: () => void
}

export function useVoiceAndMedia(): UseVoiceAndMediaReturn {
  // Speech Recognition State
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  // Text to Speech State
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  
  // Media State
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  
  // Error State
  const [error, setError] = useState<string | null>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      if (recognition) {
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript)
          }
        }
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          setError(`Speech recognition error: ${event.error}`)
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
      }
    }

    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Speech Recognition Functions
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      setError(null)
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        setError('Could not start speech recognition')
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  // Text to Speech Functions
  const speak = useCallback((text: string) => {
    if (synthRef.current) {
      // Stop any ongoing speech
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      // Try to find a good voice (prefer neural/enhanced voices)
      const voices = synthRef.current.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Neural') || 
        voice.name.includes('Enhanced') ||
        voice.name.includes('Google')
      ) || voices.find(voice => voice.lang.startsWith('en'))
      
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => {
        setIsSpeaking(false)
        setError('Text-to-speech error')
      }
      
      synthRef.current.speak(utterance)
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }, [])

  // Camera Functions
  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      setError('Could not access camera')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  const capturePhoto = useCallback((): string | null => {
    if (videoRef.current && isCameraActive) {
      const canvas = document.createElement('canvas')
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        return canvas.toDataURL('image/jpeg', 0.8)
      }
    }
    return null
  }, [isCameraActive])

  // Screen Sharing Functions
  const startScreenShare = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true, 
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScreenSharing(true)
        
        // Handle screen share end
        stream.getVideoTracks()[0].onended = () => {
          stopScreenShare()
        }
      }
    } catch (err) {
      setError('Could not start screen sharing')
    }
  }, [])

  const stopScreenShare = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsScreenSharing(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  const captureScreen = useCallback((): string | null => {
    if (videoRef.current && isScreenSharing) {
      const canvas = document.createElement('canvas')
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        return canvas.toDataURL('image/jpeg', 0.8)
      }
    }
    return null
  }, [isScreenSharing])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Speech Recognition
    isListening,
    transcript,
    startListening,
    stopListening,
    
    // Text to Speech
    speak,
    isSpeaking,
    stopSpeaking,
    
    // Camera
    videoRef,
    isCameraActive,
    startCamera,
    stopCamera,
    capturePhoto,
    
    // Screen Sharing
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    captureScreen,
    
    // Error handling
    error,
    clearError
  }
} 