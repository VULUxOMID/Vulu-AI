(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/hooks/useVoiceAndMedia.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useVoiceAndMedia": (()=>useVoiceAndMedia)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useVoiceAndMedia({ onTranscript, onError, onVisionCapture } = {}) {
    _s();
    // Voice Recognition States
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [interimTranscript, setInterimTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Media States
    const [hasVideoPermission, setHasVideoPermission] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoActive, setIsVideoActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoMode, setVideoMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Status and Error States
    const [permissionStatus, setPermissionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('unknown');
    const [lastError, setLastError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [debugInfo, setDebugInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Refs for media and recognition
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isProcessingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Memory and conversation state
    const [userMemory, setUserMemory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        preferences: {},
        facts: []
    });
    const conversationHistoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Load persistent memory on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVoiceAndMedia.useEffect": ()=>{
            try {
                const savedMemory = localStorage.getItem('jarvis_memory');
                if (savedMemory) {
                    const memory = JSON.parse(savedMemory);
                    setUserMemory(memory);
                    console.log('🧠 Loaded user memory:', memory);
                }
                const savedConversation = localStorage.getItem('jarvis_conversations');
                if (savedConversation) {
                    conversationHistoryRef.current = JSON.parse(savedConversation);
                    console.log('💬 Loaded conversation history');
                }
            } catch (error) {
                console.error('Failed to load persistent memory:', error);
            }
        }
    }["useVoiceAndMedia.useEffect"], []);
    // Save memory to localStorage
    const saveMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[saveMemory]": ()=>{
            try {
                localStorage.setItem('jarvis_memory', JSON.stringify(userMemory));
                localStorage.setItem('jarvis_conversations', JSON.stringify(conversationHistoryRef.current));
            } catch (error) {
                console.error('Failed to save memory:', error);
            }
        }
    }["useVoiceAndMedia.useCallback[saveMemory]"], [
        userMemory
    ]);
    // Enhanced TTS with multiple fallbacks
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[speak]": async (text)=>{
            if (!text.trim()) return false;
            console.log('🗣️ Speaking:', text);
            setIsSpeaking(true);
            isProcessingRef.current = true;
            try {
                // Get TTS configuration from API
                const response = await fetch('/api/tts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text
                    })
                });
                if (!response.ok) {
                    throw new Error('TTS API failed');
                }
                const { config } = await response.json();
                // Try each fallback in order
                for (const fallback of config.fallbacks){
                    if (!isProcessingRef.current) break; // Interrupted
                    const success = await tryTTSFallback(fallback, text);
                    if (success) {
                        console.log(`✅ TTS success with: ${fallback.type}`);
                        return true;
                    }
                }
                console.warn('❌ All TTS fallbacks failed');
                setLastError('Voice synthesis unavailable');
                return false;
            } catch (error) {
                console.error('🚨 TTS Error:', error);
                setLastError('Voice synthesis error');
                return false;
            } finally{
                setIsSpeaking(false);
                isProcessingRef.current = false;
            }
        }
    }["useVoiceAndMedia.useCallback[speak]"], []);
    // Try individual TTS fallback
    const tryTTSFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[tryTTSFallback]": async (fallback, text)=>{
            try {
                switch(fallback.type){
                    case 'google-cloud':
                        return await tryGoogleCloudTTS(fallback, text);
                    case 'responsive-voice':
                        return await tryResponsiveVoice(fallback, text);
                    case 'browser-premium':
                        return await tryBrowserPremiumTTS(fallback, text);
                    case 'browser-fallback':
                        return await tryBrowserFallbackTTS(fallback, text);
                    default:
                        return false;
                }
            } catch (error) {
                console.error(`TTS fallback ${fallback.type} failed:`, error);
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[tryTTSFallback]"], []);
    // Google Cloud TTS
    const tryGoogleCloudTTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[tryGoogleCloudTTS]": async (fallback, text)=>{
            try {
                console.log('🌟 Trying Google Cloud TTS...');
                const response = await fetch(fallback.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text,
                        voice: fallback.voice
                    })
                });
                if (response.ok) {
                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    return new Promise({
                        "useVoiceAndMedia.useCallback[tryGoogleCloudTTS]": (resolve)=>{
                            const audio = new Audio(audioUrl);
                            audio.volume = fallback.settings.volume;
                            currentAudioRef.current = audio;
                            audio.onended = ({
                                "useVoiceAndMedia.useCallback[tryGoogleCloudTTS]": ()=>{
                                    URL.revokeObjectURL(audioUrl);
                                    currentAudioRef.current = null;
                                    console.log('🔊 Google TTS playback finished');
                                    resolve(true);
                                }
                            })["useVoiceAndMedia.useCallback[tryGoogleCloudTTS]"];
                            audio.onerror = ({
                                "useVoiceAndMedia.useCallback[tryGoogleCloudTTS]": ()=>{
                                    URL.revokeObjectURL(audioUrl);
                                    currentAudioRef.current = null;
                                    resolve(false);
                                }
                            })["useVoiceAndMedia.useCallback[tryGoogleCloudTTS]"];
                            if (!isProcessingRef.current) {
                                URL.revokeObjectURL(audioUrl);
                                resolve(false);
                                return;
                            }
                            audio.play().catch({
                                "useVoiceAndMedia.useCallback[tryGoogleCloudTTS]": ()=>resolve(false)
                            }["useVoiceAndMedia.useCallback[tryGoogleCloudTTS]"]);
                        }
                    }["useVoiceAndMedia.useCallback[tryGoogleCloudTTS]"]);
                }
                return false;
            } catch (error) {
                console.log('❌ Google TTS unavailable');
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[tryGoogleCloudTTS]"], []);
    // ResponsiveVoice TTS
    const tryResponsiveVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[tryResponsiveVoice]": async (fallback, text)=>{
            return new Promise({
                "useVoiceAndMedia.useCallback[tryResponsiveVoice]": (resolve)=>{
                    if (!window.responsiveVoice?.voiceSupport()) {
                        resolve(false);
                        return;
                    }
                    console.log('🗣️ Using ResponsiveVoice');
                    const selectedVoice = fallback.voices[0];
                    window.responsiveVoice.speak(text, selectedVoice, {
                        rate: fallback.settings.rate,
                        pitch: fallback.settings.pitch,
                        volume: fallback.settings.volume,
                        onstart: {
                            "useVoiceAndMedia.useCallback[tryResponsiveVoice]": ()=>console.log('✅ ResponsiveVoice started')
                        }["useVoiceAndMedia.useCallback[tryResponsiveVoice]"],
                        onend: {
                            "useVoiceAndMedia.useCallback[tryResponsiveVoice]": ()=>{
                                console.log('🔊 ResponsiveVoice finished');
                                resolve(true);
                            }
                        }["useVoiceAndMedia.useCallback[tryResponsiveVoice]"],
                        onerror: {
                            "useVoiceAndMedia.useCallback[tryResponsiveVoice]": ()=>resolve(false)
                        }["useVoiceAndMedia.useCallback[tryResponsiveVoice]"]
                    });
                }
            }["useVoiceAndMedia.useCallback[tryResponsiveVoice]"]);
        }
    }["useVoiceAndMedia.useCallback[tryResponsiveVoice]"], []);
    // Browser Premium TTS
    const tryBrowserPremiumTTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]": async (fallback, text)=>{
            if (!('speechSynthesis' in window)) return false;
            try {
                const voices = await getAvailableVoices();
                const premiumVoice = findPremiumVoice(voices, fallback.voicePreferences);
                if (premiumVoice) {
                    return new Promise({
                        "useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]": (resolve)=>{
                            const utterance = new SpeechSynthesisUtterance(text);
                            utterance.voice = premiumVoice;
                            utterance.rate = fallback.settings.rate;
                            utterance.pitch = fallback.settings.pitch;
                            utterance.volume = fallback.settings.volume;
                            utterance.lang = fallback.settings.lang || 'en-US';
                            utterance.onend = ({
                                "useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]": ()=>{
                                    console.log(`🔊 Browser premium TTS finished: ${premiumVoice.name}`);
                                    resolve(true);
                                }
                            })["useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]"];
                            utterance.onerror = ({
                                "useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]": ()=>resolve(false)
                            })["useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]"];
                            speechSynthesis.speak(utterance);
                            console.log(`Using premium voice: ${premiumVoice.name}`);
                        }
                    }["useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]"]);
                }
                return false;
            } catch (error) {
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[tryBrowserPremiumTTS]"], []);
    // Browser Fallback TTS
    const tryBrowserFallbackTTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]": async (fallback, text)=>{
            if (!('speechSynthesis' in window)) return false;
            return new Promise({
                "useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]": (resolve)=>{
                    speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = fallback.settings.rate;
                    utterance.pitch = fallback.settings.pitch;
                    utterance.volume = fallback.settings.volume;
                    utterance.onend = ({
                        "useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]": ()=>{
                            console.log('🔊 Browser fallback TTS finished');
                            resolve(true);
                        }
                    })["useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]"];
                    utterance.onerror = ({
                        "useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]": ()=>resolve(false)
                    })["useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]"];
                    speechSynthesis.speak(utterance);
                }
            }["useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]"]);
        }
    }["useVoiceAndMedia.useCallback[tryBrowserFallbackTTS]"], []);
    // Get available voices
    const getAvailableVoices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[getAvailableVoices]": ()=>{
            return new Promise({
                "useVoiceAndMedia.useCallback[getAvailableVoices]": (resolve)=>{
                    const voices = speechSynthesis.getVoices();
                    if (voices.length > 0) {
                        resolve(voices);
                        return;
                    }
                    speechSynthesis.addEventListener('voiceschanged', {
                        "useVoiceAndMedia.useCallback[getAvailableVoices]": ()=>{
                            resolve(speechSynthesis.getVoices());
                        }
                    }["useVoiceAndMedia.useCallback[getAvailableVoices]"], {
                        once: true
                    });
                }
            }["useVoiceAndMedia.useCallback[getAvailableVoices]"]);
        }
    }["useVoiceAndMedia.useCallback[getAvailableVoices]"], []);
    // Find premium voice
    const findPremiumVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[findPremiumVoice]": (voices, preferences)=>{
            for (const preference of preferences){
                const voice = voices.find({
                    "useVoiceAndMedia.useCallback[findPremiumVoice].voice": (voice)=>voice.name.includes(preference)
                }["useVoiceAndMedia.useCallback[findPremiumVoice].voice"]);
                if (voice) return voice;
            }
            return null;
        }
    }["useVoiceAndMedia.useCallback[findPremiumVoice]"], []);
    // Stop current speech
    const stopSpeaking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[stopSpeaking]": ()=>{
            console.log('🛑 Stopping speech...');
            // Stop all TTS methods
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current = null;
            }
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
            if (window.responsiveVoice) {
                window.responsiveVoice.cancel();
            }
            setIsSpeaking(false);
            isProcessingRef.current = false;
        }
    }["useVoiceAndMedia.useCallback[stopSpeaking]"], []);
    // Initialize speech recognition with smart interruption
    const initSpeechRecognition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[initSpeechRecognition]": ()=>{
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                setLastError('Speech recognition not supported');
                return false;
            }
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            recognition.onstart = ({
                "useVoiceAndMedia.useCallback[initSpeechRecognition]": ()=>{
                    console.log('🎤 Speech recognition started');
                    setPermissionStatus('granted');
                    setDebugInfo({
                        "useVoiceAndMedia.useCallback[initSpeechRecognition]": (prev)=>({
                                ...prev,
                                speechStatus: 'Listening...'
                            })
                    }["useVoiceAndMedia.useCallback[initSpeechRecognition]"]);
                }
            })["useVoiceAndMedia.useCallback[initSpeechRecognition]"];
            recognition.onresult = ({
                "useVoiceAndMedia.useCallback[initSpeechRecognition]": (event)=>{
                    let finalTranscript = '';
                    let interimTranscript = '';
                    for(let i = event.resultIndex; i < event.results.length; i++){
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript;
                        } else {
                            interimTranscript += transcript;
                        }
                    }
                    // SMART INTERRUPTION: Stop JARVIS immediately when user starts speaking
                    if (interimTranscript.trim().length > 0 && (isSpeaking || isProcessingRef.current)) {
                        console.log('🚫 User interruption detected - stopping JARVIS');
                        stopSpeaking();
                    }
                    setTranscript(finalTranscript);
                    setInterimTranscript(interimTranscript);
                    if (onTranscript) {
                        onTranscript(finalTranscript || interimTranscript, !!finalTranscript);
                    }
                    // Auto-send final transcripts
                    if (finalTranscript.trim()) {
                        console.log('📝 Final transcript:', finalTranscript);
                    // Could trigger auto-send here
                    }
                }
            })["useVoiceAndMedia.useCallback[initSpeechRecognition]"];
            recognition.onerror = ({
                "useVoiceAndMedia.useCallback[initSpeechRecognition]": (event)=>{
                    console.error('🚨 Speech recognition error:', event.error);
                    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                        setPermissionStatus('denied');
                        setLastError('Microphone permission denied. Please refresh and allow access.');
                    } else if (event.error === 'network') {
                        setLastError('Network error during speech recognition');
                    } else {
                        setLastError(`Speech recognition error: ${event.error}`);
                    }
                    setIsListening(false);
                    setDebugInfo({
                        "useVoiceAndMedia.useCallback[initSpeechRecognition]": (prev)=>({
                                ...prev,
                                speechStatus: `Error: ${event.error}`
                            })
                    }["useVoiceAndMedia.useCallback[initSpeechRecognition]"]);
                    if (onError) {
                        onError(event.error);
                    }
                }
            })["useVoiceAndMedia.useCallback[initSpeechRecognition]"];
            recognition.onend = ({
                "useVoiceAndMedia.useCallback[initSpeechRecognition]": ()=>{
                    console.log('🎤 Speech recognition ended');
                    setIsListening(false);
                    setDebugInfo({
                        "useVoiceAndMedia.useCallback[initSpeechRecognition]": (prev)=>({
                                ...prev,
                                speechStatus: 'Stopped'
                            })
                    }["useVoiceAndMedia.useCallback[initSpeechRecognition]"]);
                }
            })["useVoiceAndMedia.useCallback[initSpeechRecognition]"];
            recognitionRef.current = recognition;
            return true;
        }
    }["useVoiceAndMedia.useCallback[initSpeechRecognition]"], [
        isSpeaking,
        onTranscript,
        onError,
        stopSpeaking
    ]);
    // Start listening
    const startListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[startListening]": async ()=>{
            if (!recognitionRef.current) {
                const initialized = initSpeechRecognition();
                if (!initialized) return false;
            }
            try {
                recognitionRef.current?.start();
                setIsListening(true);
                setLastError(null);
                return true;
            } catch (error) {
                console.error('Failed to start listening:', error);
                setLastError('Failed to start speech recognition');
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[startListening]"], [
        initSpeechRecognition
    ]);
    // Stop listening
    const stopListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[stopListening]": ()=>{
            if (recognitionRef.current && isListening) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
        }
    }["useVoiceAndMedia.useCallback[stopListening]"], [
        isListening
    ]);
    // Toggle listening
    const toggleListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[toggleListening]": ()=>{
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        }
    }["useVoiceAndMedia.useCallback[toggleListening]"], [
        isListening,
        startListening,
        stopListening
    ]);
    // Camera access
    const startCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[startCamera]": async ()=>{
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 640,
                        height: 480
                    },
                    audio: false
                });
                streamRef.current = stream;
                setIsVideoActive(true);
                setVideoMode('camera');
                setHasVideoPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                console.log('📹 Camera started');
                return true;
            } catch (error) {
                console.error('Camera error:', error);
                setLastError('Camera access denied or unavailable');
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[startCamera]"], []);
    // Screen sharing
    const startScreenShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[startScreenShare]": async ()=>{
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        width: 1280,
                        height: 720
                    },
                    audio: false
                });
                streamRef.current = stream;
                setIsVideoActive(true);
                setVideoMode('screen');
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                console.log('🖥️ Screen sharing started');
                return true;
            } catch (error) {
                console.error('Screen share error:', error);
                setLastError('Screen sharing denied or unavailable');
                return false;
            }
        }
    }["useVoiceAndMedia.useCallback[startScreenShare]"], []);
    // Stop video
    const stopVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[stopVideo]": ()=>{
            if (streamRef.current) {
                streamRef.current.getTracks().forEach({
                    "useVoiceAndMedia.useCallback[stopVideo]": (track)=>track.stop()
                }["useVoiceAndMedia.useCallback[stopVideo]"]);
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setIsVideoActive(false);
            setVideoMode(null);
            console.log('📹 Video stopped');
        }
    }["useVoiceAndMedia.useCallback[stopVideo]"], []);
    // Capture current video frame
    const captureFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[captureFrame]": ()=>{
            if (!videoRef.current || !canvasRef.current || !contextRef.current) {
                return null;
            }
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = contextRef.current;
            if (video.readyState >= 2) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                return canvas.toDataURL('image/jpeg', 0.8);
            }
            return null;
        }
    }["useVoiceAndMedia.useCallback[captureFrame]"], []);
    // Analyze current view with AI
    const analyzeCurrentView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoiceAndMedia.useCallback[analyzeCurrentView]": async (context = '')=>{
            const imageData = captureFrame();
            if (!imageData) {
                setLastError('No video frame available to analyze');
                return null;
            }
            if (onVisionCapture) {
                onVisionCapture(imageData, context);
            }
            return imageData;
        }
    }["useVoiceAndMedia.useCallback[analyzeCurrentView]"], [
        captureFrame,
        onVisionCapture
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVoiceAndMedia.useEffect": ()=>{
            return ({
                "useVoiceAndMedia.useEffect": ()=>{
                    stopListening();
                    stopVideo();
                    stopSpeaking();
                }
            })["useVoiceAndMedia.useEffect"];
        }
    }["useVoiceAndMedia.useEffect"], [
        stopListening,
        stopVideo,
        stopSpeaking
    ]);
    // Initialize canvas context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVoiceAndMedia.useEffect": ()=>{
            if (canvasRef.current) {
                contextRef.current = canvasRef.current.getContext('2d');
            }
        }
    }["useVoiceAndMedia.useEffect"], []);
    // Save memory when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVoiceAndMedia.useEffect": ()=>{
            saveMemory();
        }
    }["useVoiceAndMedia.useEffect"], [
        saveMemory
    ]);
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
        setLastError: (error)=>setLastError(error)
    };
}
_s(useVoiceAndMedia, "4ypCX7JSuK/95xdsSgHsB04bIcE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/chat/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVoiceAndMedia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useVoiceAndMedia.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ChatPage() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputText, setInputText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDebugInfo, setShowDebugInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { // Voice Recognition
    isListening, isSpeaking, transcript, interimTranscript, startListening, stopListening, toggleListening, // Text-to-Speech
    speak, stopSpeaking, // Video/Camera
    hasVideoPermission, isVideoActive, videoMode, startCamera, startScreenShare, stopVideo, captureFrame, analyzeCurrentView, videoRef, canvasRef, // Status and Debug
    permissionStatus, lastError, debugInfo, userMemory, setLastError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVoiceAndMedia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVoiceAndMedia"])({
        onTranscript: {
            "ChatPage.useVoiceAndMedia": (text, isFinal)=>{
                if (isFinal && text.trim()) {
                    // Auto-send on final transcript
                    handleSendMessage(text.trim());
                } else if (!isFinal) {
                    // Show interim transcript in input
                    setInputText(text);
                }
            }
        }["ChatPage.useVoiceAndMedia"],
        onError: {
            "ChatPage.useVoiceAndMedia": (error)=>{
                console.error('Voice/Media Error:', error);
            }
        }["ChatPage.useVoiceAndMedia"],
        onVisionCapture: {
            "ChatPage.useVoiceAndMedia": async (imageData, context)=>{
                await handleVisionAnalysis(imageData, context);
            }
        }["ChatPage.useVoiceAndMedia"]
    });
    // Auto-scroll to bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatPage.useEffect"], [
        messages
    ]);
    // Handle keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            const handleKeyPress = {
                "ChatPage.useEffect.handleKeyPress": (e)=>{
                    if (e.key === ' ' && e.ctrlKey) {
                        e.preventDefault();
                        toggleListening();
                    }
                    if (e.key === 'Escape') {
                        stopSpeaking();
                        stopListening();
                    }
                }
            }["ChatPage.useEffect.handleKeyPress"];
            window.addEventListener('keydown', handleKeyPress);
            return ({
                "ChatPage.useEffect": ()=>window.removeEventListener('keydown', handleKeyPress)
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], [
        toggleListening,
        stopSpeaking,
        stopListening
    ]);
    const handleSendMessage = async (messageText)=>{
        const text = messageText || inputText.trim();
        if (!text || isLoading) return;
        // Stop any ongoing speech
        stopSpeaking();
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date().toISOString()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInputText('');
        setIsLoading(true);
        setLastError(null);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    conversationHistory: messages.slice(-10),
                    hasVision: isVideoActive
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: data.timestamp
            };
            setMessages((prev)=>[
                    ...prev,
                    assistantMessage
                ]);
            // Speak the response
            if (data.response) {
                speak(data.response);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I apologize, but I\'m experiencing technical difficulties. Please try again.',
                timestamp: new Date().toISOString()
            };
            setMessages((prev)=>[
                    ...prev,
                    errorMessage
                ]);
            setLastError('Failed to get AI response');
        } finally{
            setIsLoading(false);
        }
    };
    const handleVisionAnalysis = async (imageData, context)=>{
        setIsLoading(true);
        try {
            const response = await fetch('/api/vision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData.split(',')[1],
                    prompt: `Analyze this ${videoMode === 'camera' ? 'camera' : 'screen'} image. ${context || 'What do you see?'}`
                })
            });
            if (!response.ok) {
                throw new Error('Vision analysis failed');
            }
            const data = await response.json();
            const visionMessage = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `👁️ **Vision Analysis**: ${data.analysis}`,
                timestamp: new Date().toISOString()
            };
            setMessages((prev)=>[
                    ...prev,
                    visionMessage
                ]);
            speak(data.analysis);
        } catch (error) {
            console.error('Vision analysis error:', error);
            setLastError('Vision analysis failed');
        } finally{
            setIsLoading(false);
        }
    };
    const clearMessages = ()=>{
        setMessages([]);
        localStorage.removeItem('jarvis_conversations');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8 h-screen flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl font-bold",
                                        children: "J"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold",
                                            children: "J.A.R.V.I.S"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-blue-300 text-sm",
                                            children: userMemory.name ? `Hello, ${userMemory.name}` : 'Your Personal AI Assistant'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDebugInfo(!showDebugInfo),
                                    className: "px-3 py-1 text-xs bg-slate-700 rounded hover:bg-slate-600 transition-colors",
                                    children: "Debug"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: clearMessages,
                                    className: "px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700 transition-colors",
                                    children: "Clear"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                showDebugInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800 rounded-lg p-4 mb-4 text-xs font-mono",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 md:grid-cols-4 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Speech: ",
                                        debugInfo.speechStatus || 'Ready'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Permission: ",
                                        permissionStatus
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Listening: ",
                                        isListening ? '🎤' : '⭕'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Speaking: ",
                                        isSpeaking ? '🗣️' : '⭕'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Video: ",
                                        isVideoActive ? `📹 ${videoMode}` : '⭕'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Memory: ",
                                        userMemory.facts.length,
                                        " facts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        lastError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400 mt-2",
                            children: [
                                "Error: ",
                                lastError
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 256,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleListening,
                                    className: `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: isListening ? '🛑' : '🎤'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isListening ? 'Stop Listening' : 'Start Listening'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                isSpeaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: stopSpeaking,
                                    className: "flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: "🔇"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Stop Speaking"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: !isVideoActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startCamera,
                                        className: "flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "📹"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Camera"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startScreenShare,
                                        className: "flex items-center space-x-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "🖥️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Screen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 px-3 py-2 bg-green-600 rounded-lg text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: videoMode === 'camera' ? '📹' : '🖥️'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "capitalize",
                                                children: [
                                                    videoMode,
                                                    " Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>analyzeCurrentView(),
                                        className: "flex items-center space-x-2 px-3 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "👁️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Analyze"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: stopVideo,
                                        className: "flex items-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "⏹️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Stop"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this),
                isVideoActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-64 h-48 bg-black rounded-lg overflow-hidden mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: videoRef,
                                autoPlay: true,
                                muted: true,
                                playsInline: true,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 335,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded",
                                children: [
                                    "LIVE • ",
                                    videoMode?.toUpperCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 342,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chat/page.tsx",
                        lineNumber: 334,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 333,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    style: {
                        display: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 350,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto mb-4 space-y-4",
                    children: [
                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-slate-400 mt-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-4",
                                    children: "🤖"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold mb-2",
                                    children: "Welcome to J.A.R.V.I.S"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4",
                                    children: "Your personal AI assistant is ready to help!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "💬 Type a message or use voice commands"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 360,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "🎤 Press ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                    className: "bg-slate-700 px-2 py-1 rounded text-xs",
                                                    children: "Ctrl + Space"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 29
                                                }, this),
                                                " to toggle listening"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "📹 Enable camera or screen sharing for vision analysis"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 362,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "🧠 I remember our conversations and learn about you"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this) : messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `max-w-[80%] p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "whitespace-pre-wrap",
                                            children: message.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs opacity-70 mt-2",
                                            children: new Date(message.timestamp).toLocaleTimeString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 17
                                }, this)
                            }, message.id, false, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, this)),
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-700 text-white p-4 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "JARVIS is thinking..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 390,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 389,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: messagesEndRef
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: inputText,
                            onChange: (e)=>setInputText(e.target.value),
                            onKeyPress: (e)=>e.key === 'Enter' && handleSendMessage(),
                            placeholder: isListening ? interimTranscript || "Listening... (speak now)" : "Type your message or press Ctrl+Space to use voice...",
                            className: "flex-1 p-3 bg-slate-800 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none text-white placeholder-slate-400",
                            disabled: isLoading
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSendMessage(),
                            disabled: !inputText.trim() || isLoading,
                            className: "px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors",
                            children: "Send"
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 417,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 403,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-xs text-slate-400 mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                isListening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-400",
                                    children: "🎤 Listening"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 29
                                }, this),
                                isSpeaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-400 animate-pulse",
                                    children: "🗣️ Speaking"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 430,
                                    columnNumber: 28
                                }, this),
                                isVideoActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-purple-400",
                                    children: "📹 Vision Active"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 431,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                userMemory.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "👤 ",
                                        userMemory.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 434,
                                    columnNumber: 33
                                }, this),
                                userMemory.facts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-2",
                                    children: [
                                        "🧠 ",
                                        userMemory.facts.length,
                                        " facts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 435,
                                    columnNumber: 45
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/chat/page.tsx",
            lineNumber: 214,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/chat/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s(ChatPage, "WLcqYHKfSA86FZcE4wJqq4A1qcw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVoiceAndMedia$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVoiceAndMedia"]
    ];
});
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_6e66e368._.js.map