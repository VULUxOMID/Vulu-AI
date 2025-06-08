class JarvisAssistant {
    constructor() {
        this.apiKey = 'AIzaSyDvzaYB59z4PYoWtRLmLLLy5S2ICI3cnU8';
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.conversationHistory = [];
        this.microphoneBlocked = false;
        this.permissionMessageShown = false;
        this.userMemory = {
            name: null,
            preferences: {},
            facts: []
        };
        
        // Interruption handling
        this.isProcessing = false;
        this.currentAudio = null;
        this.currentRequest = null;
        this.speechQueue = [];
        
        // Persistent memory
        this.storageKey = 'jarvis_memory';
        this.conversationKey = 'jarvis_conversations';
        
        // Live Vision capabilities
        this.currentVideoStream = null;
        this.visionMode = null; // 'camera' or 'screen'
        this.autoAnalyzeInterval = null;
        this.visionCanvas = null;
        this.visionContext = null;
        
        this.initializeElements();
        this.initializeSpeechRecognition();
        this.initializeEventListeners();
        this.initializeVoices();
        this.loadPersistentMemory();
        this.updateDebugInfo();
    }

    initializeElements() {
        this.elements = {
            status: document.getElementById('status'),
            voiceCircle: document.getElementById('voiceCircle'),
            conversation: document.getElementById('conversation'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            clearBtn: document.getElementById('clearBtn'),
            speechStatus: document.getElementById('speechStatus'),
            lastCommand: document.getElementById('lastCommand'),
            processingMode: document.getElementById('processingMode'),
            apiStatus: document.getElementById('apiStatus'),
            cameraBtn: document.getElementById('cameraBtn'),
            screenShareBtn: document.getElementById('screenShareBtn'),
            stopVisionBtn: document.getElementById('stopVisionBtn'),
            visionContainer: document.getElementById('visionContainer'),
            visionVideo: document.getElementById('visionVideo'),
            visionStatus: document.getElementById('visionStatus'),
            autoAnalyze: document.getElementById('autoAnalyze'),
            analyzeInterval: document.getElementById('analyzeInterval'),
            analyzeNowBtn: document.getElementById('analyzeNowBtn')
        };
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => this.onRecognitionStart();
            this.recognition.onresult = (event) => this.onRecognitionResult(event);
            this.recognition.onerror = (event) => this.onRecognitionError(event);
            this.recognition.onend = () => this.onRecognitionEnd();
            this.recognition.onspeechstart = () => this.onSpeechStart();
            this.recognition.onspeechend = () => this.onSpeechEnd();
            
            this.updateDebugInfo('speechStatus', 'Ready to start');
        } else {
            this.updateDebugInfo('speechStatus', 'Not supported');
            this.addMessage('jarvis', 'Sorry, speech recognition is not supported in this browser.');
        }
    }

    initializeEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startListening());
        this.elements.stopBtn.addEventListener('click', () => this.stopListening());
        this.elements.clearBtn.addEventListener('click', () => this.clearConversation());
        this.elements.voiceCircle.addEventListener('click', () => this.toggleListening());
        
        // Live Vision event listeners
        this.elements.cameraBtn.addEventListener('click', () => this.startCamera());
        this.elements.screenShareBtn.addEventListener('click', () => this.startScreenShare());
        this.elements.stopVisionBtn.addEventListener('click', () => this.stopVision());
        this.elements.analyzeNowBtn.addEventListener('click', () => this.analyzeCurrentView());
        this.elements.autoAnalyze.addEventListener('change', () => this.toggleAutoAnalyze());
    }

    async startListening() {
        if (!this.recognition) {
            this.addMessage('jarvis', 'Speech recognition is not available.');
            return;
        }

        if (this.microphoneBlocked) {
            if (!this.permissionMessageShown) {
                this.addMessage('jarvis', 'Microphone access is blocked. Please click "Clear Chat" and try again, or refresh the page.');
                this.permissionMessageShown = true;
            }
            return;
        }

        // Check for microphone permission first
        try {
            if (navigator.permissions && navigator.permissions.query) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                if (permission.state === 'denied') {
                    this.microphoneBlocked = true;
                    this.addMessage('jarvis', 'Microphone access is permanently denied. Please enable it in your browser settings.');
                    this.updateDebugInfo('speechStatus', 'Permission denied');
                    return;
                }
            }
        } catch (error) {
            console.log('Permission API not available, proceeding with speech recognition');
        }

        try {
            this.updateDebugInfo('speechStatus', 'Requesting permission...');
            this.recognition.start();
            this.isListening = true;
            this.updateUI('listening');
        } catch (error) {
            console.error('Error starting recognition:', error);
            this.handleRecognitionStartError(error);
        }
    }

    handleRecognitionStartError(error) {
        if (error.name === 'NotAllowedError' || error.message.includes('not-allowed')) {
            this.microphoneBlocked = true;
            this.isListening = false;
            this.updateUI('idle');
            this.updateDebugInfo('speechStatus', 'Permission denied');
            if (!this.permissionMessageShown) {
                this.addMessage('jarvis', 'Microphone access denied. Please refresh the page and click "Allow" when prompted.');
                this.permissionMessageShown = true;
            }
        } else if (error.name === 'InvalidStateError') {
            this.updateDebugInfo('speechStatus', 'Already listening');
        } else {
            this.updateDebugInfo('speechStatus', `Error: ${error.name}`);
            this.addMessage('jarvis', `Error starting speech recognition: ${error.message}`);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateUI('idle');
            this.updateDebugInfo('speechStatus', 'Stopped');
        }
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    onRecognitionStart() {
        console.log('Speech recognition started');
        this.updateStatus('Listening...');
        this.updateDebugInfo('speechStatus', 'Listening...');
        // Reset permission flags on successful start
        this.microphoneBlocked = false;
        this.permissionMessageShown = false;
    }

    onRecognitionResult(event) {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        // ENHANCED INTERRUPTION: Stop Jarvis even on interim speech detection
        if (interimTranscript.trim().length > 0 && this.isProcessing) {
            console.log('🎤 Interim speech detected - interrupting Jarvis immediately!');
            this.stopCurrentSpeech();
            this.updateStatus('User speaking...');
        }

        if (finalTranscript) {
            this.handleUserInput(finalTranscript.trim());
        }
    }

    onRecognitionError(event) {
        console.error('Speech recognition error:', event.error);
        this.updateDebugInfo('speechStatus', `Error: ${event.error}`);
        
        if (event.error === 'no-speech') {
            this.updateStatus('No speech detected');
        } else if (event.error === 'not-allowed') {
            this.microphoneBlocked = true;
            this.isListening = false;
            this.updateStatus('Microphone access denied');
            this.updateUI('idle');
            if (!this.permissionMessageShown) {
                this.addMessage('jarvis', 'Microphone access denied. Please refresh the page and allow microphone access when prompted.');
                this.permissionMessageShown = true;
            }
        } else {
            this.updateStatus('Speech recognition error');
        }
    }

    onRecognitionEnd() {
        console.log('Speech recognition ended');
        if (this.isListening && !this.microphoneBlocked) {
            // Restart recognition if we're supposed to be listening and microphone isn't blocked
            setTimeout(() => {
                if (this.isListening && !this.microphoneBlocked) {
                    try {
                        this.recognition.start();
                    } catch (error) {
                        console.error('Error restarting recognition:', error);
                        if (error.name === 'NotAllowedError') {
                            this.microphoneBlocked = true;
                            this.isListening = false;
                            this.updateUI('idle');
                        }
                    }
                }
            }, 100);
        } else {
            this.updateStatus('Ready');
            this.updateUI('idle');
        }
    }

    async handleUserInput(text) {
        console.log('User said:', text);
        
        // INTERRUPTION HANDLING: Stop any current speech/processing
        if (this.isProcessing) {
            console.log('🔄 Interrupting current response...');
            await this.stopCurrentSpeech();
        }
        
        this.isProcessing = true;
        
        this.updateDebugInfo('lastCommand', text);
        this.addMessage('user', text);

        // Determine if this needs local or cloud processing
        const needsCloudProcessing = this.shouldUseCloudAPI(text);
        this.updateDebugInfo('processingMode', needsCloudProcessing ? 'Cloud (Gemini)' : 'Local');

        this.updateUI('processing');
        this.updateStatus('Processing...');

        try {
            let response;
            if (needsCloudProcessing) {
                response = await this.processWithGemini(text);
            } else {
                response = this.processLocally(text);
            }

            // Check if we were interrupted during processing
            if (!this.isProcessing) {
                console.log('Processing was interrupted, skipping response');
                return;
            }

            if (response) {
                this.addMessage('jarvis', response);
                
                // Save memory after each interaction
                this.savePersistentMemory();
                
                await this.speak(response);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was cancelled due to interruption');
                return;
            }
            console.error('Error processing command:', error);
            const errorResponse = "I'm sorry, I encountered an error processing your request.";
            this.addMessage('jarvis', errorResponse);
            this.speak(errorResponse);
        }

        this.isProcessing = false;
        this.updateUI('listening');
        this.updateStatus('Listening...');
    }

    shouldUseCloudAPI(text) {
        const textLower = text.toLowerCase();
        
        // Only keep the most basic commands local for speed
        const pureLocalCommands = [
            'clear', 'clear chat', 'clear conversation'
        ];

        // Check if it's a clear command (instant response needed)
        if (pureLocalCommands.some(cmd => textLower.includes(cmd))) {
            return false;
        }

        // Send EVERYTHING else to Gemini for maximum intelligence
        // This includes greetings, time, date, and all questions
        return true;
    }

    processLocally(text) {
        const textLower = text.toLowerCase();

        // Greetings
        if (textLower.includes('hello') || textLower.includes('hi') || textLower.includes('hey')) {
            const greetings = [
                "Hello! I'm Jarvis, your AI assistant. How can I assist you today?",
                "Hi there! I'm ready to help. What would you like to know?",
                "Hello! Great to see you. What can I do for you?",
                "Hey! I'm here and ready to assist. What's on your mind?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // Time queries
        if (textLower.includes('time')) {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            return `It's currently ${timeString}. Anything else I can help you with?`;
        }
        
        // Date queries
        if (textLower.includes('date') || textLower.includes('day')) {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            return `Today is ${dateString}. What else would you like to know?`;
        }
        
        // Help queries
        if (textLower.includes('help') || textLower.includes('what can you do')) {
            return "I'm your intelligent AI assistant! I can help you with research, answer questions, explain concepts, find information, solve problems, and much more. Just ask me anything - from simple questions to complex topics. What would you like to explore?";
        }
        
        // Clear commands
        if (textLower.includes('clear')) {
            this.clearConversation();
            return "Conversation cleared! I'm ready for a fresh start. What can I help you with?";
        }

        // If we get here, something went wrong with our decision logic
        // This should rarely happen now
        return "I'm here to help! Feel free to ask me any questions or give me tasks to work on.";
    }

    async processWithGemini(text) {
        this.updateDebugInfo('apiStatus', 'Calling Gemini...');
        
        // Build context with user memory and current info
        const now = new Date();
        const currentTime = now.toLocaleTimeString();
        const currentDate = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        let context = `You are Jarvis, an intelligent AI assistant. The user said: "${text}".

Current time: ${currentTime}
Current date: ${currentDate}`;
        
        if (this.userMemory.name) {
            context += `\nThe user's name is ${this.userMemory.name}.`;
        }
        
        if (this.userMemory.facts.length > 0) {
            context += `\nHere are some things I know about the user: ${this.userMemory.facts.join(', ')}.`;
        }
        
        // Include recent conversation history for context
        if (this.conversationHistory.length > 0) {
            const recentHistory = this.conversationHistory.slice(-6); // Last 6 messages (3 exchanges)
            context += `\n\nRecent conversation history:`;
            recentHistory.forEach(msg => {
                context += `\n${msg.sender.toUpperCase()}: ${msg.text}`;
            });
        }
        
        // Add live vision context if active
        if (this.visionMode) {
            context += `\n\nLIVE VISION: You currently have ${this.visionMode === 'camera' ? 'camera access (you can see the user)' : 'screen sharing access (you can see their screen)'}. You can analyze what you're seeing in real-time.`;
        }

        context += `

Please respond as Jarvis would - be helpful, intelligent, conversational, and engaging. Be friendly and personable like a real assistant. 

For time/date questions, use the current time and date provided above.

If they're asking about system operations (like turning off Bluetooth, WiFi, etc.), explain what would typically need to be done, but mention that you don't have direct system access in this browser environment.

If the user tells you their name or personal information, acknowledge it warmly and remember it for future conversations.

${this.currentImage ? 'VISION MODE: You can see the image the user shared. Analyze it carefully and provide detailed, helpful observations.' : ''}

Keep responses conversational and under 150 words unless more detail is specifically requested. Sound alive, natural, and engaging - not robotic or overly formal.`;
        
        
        try {
            // Create AbortController for request cancellation
            const controller = new AbortController();
            this.currentRequest = controller;
            
            // Prepare content parts
            let contentParts = [{
                text: context
            }];
            
            // Add current vision frame if available and user asks about vision
            if (this.visionMode && (text.toLowerCase().includes('see') || text.toLowerCase().includes('look') || text.toLowerCase().includes('what') || text.toLowerCase().includes('analyze'))) {
                try {
                    const video = this.elements.visionVideo;
                    if (video && video.readyState >= 2) {
                        this.visionCanvas.width = video.videoWidth;
                        this.visionCanvas.height = video.videoHeight;
                        this.visionContext.drawImage(video, 0, 0);
                        const currentFrame = this.visionCanvas.toDataURL('image/jpeg', 0.8);
                        
                        console.log('👁️ Including current vision frame in request');
                        contentParts.push({
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: currentFrame.split(',')[1]
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error capturing vision frame:', error);
                }
            }
            
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + this.apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: contentParts
                    }]
                }),
                signal: controller.signal
            });
            
            this.currentRequest = null;

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.updateDebugInfo('apiStatus', 'Success');
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const response_text = data.candidates[0].content.parts[0].text;
                this.extractUserInfo(text, response_text);
                return response_text;
            } else {
                throw new Error('Unexpected response format from Gemini API');
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            this.updateDebugInfo('apiStatus', `Error: ${error.message}`);
            throw error;
        }
    }

    extractUserInfo(userText, aiResponse) {
        const userTextLower = userText.toLowerCase();
        
        // Check for name introduction
        const namePatterns = [
            /my name is (\w+)/i,
            /i'm (\w+)/i,
            /i am (\w+)/i,
            /call me (\w+)/i,
            /i'm called (\w+)/i
        ];
        
        for (const pattern of namePatterns) {
            const match = userText.match(pattern);
            if (match && match[1]) {
                this.userMemory.name = match[1];
                console.log(`Remembered user's name: ${this.userMemory.name}`);
                this.savePersistentMemory();
                break;
            }
        }
        
        // Extract preferences and facts from user input
        if (userTextLower.includes('i like') || userTextLower.includes('i love')) {
            const fact = userText.match(/i (like|love) (.+)/i);
            if (fact && fact[2]) {
                const preference = fact[2].trim();
                if (!this.userMemory.facts.includes(`likes ${preference}`)) {
                    this.userMemory.facts.push(`likes ${preference}`);
                    console.log(`Learned: User likes ${preference}`);
                    this.savePersistentMemory();
                }
            }
        }
        
        // Extract dislikes
        if (userTextLower.includes('i hate') || userTextLower.includes('i don\'t like')) {
            const fact = userText.match(/i (hate|don't like) (.+)/i);
            if (fact && fact[2]) {
                const dislike = fact[2].trim();
                if (!this.userMemory.facts.includes(`dislikes ${dislike}`)) {
                    this.userMemory.facts.push(`dislikes ${dislike}`);
                    console.log(`Learned: User dislikes ${dislike}`);
                    this.savePersistentMemory();
                }
            }
        }
        
        // Extract personal facts
        if (userTextLower.includes('i am a') || userTextLower.includes('i work as')) {
            const jobPattern = /i (am a|work as) (.+)/i;
            const match = userText.match(jobPattern);
            if (match && match[2]) {
                const job = match[2].trim();
                if (!this.userMemory.facts.some(f => f.includes('works as') || f.includes('is a'))) {
                    this.userMemory.facts.push(`works as ${job}`);
                    console.log(`Learned: User works as ${job}`);
                    this.savePersistentMemory();
                }
            }
        }
    }

    async speak(text) {
        console.log('Speaking:', text);
        
        // Try modern TTS APIs first, fallback to browser if needed
        const success = await this.speakWithModernTTS(text);
        if (!success) {
            this.speakWithBrowserTTS(text);
        }
    }

    async speakWithModernTTS(text) {
        try {
            // First: Try Google Cloud TTS (when properly configured)
            const googleTTSSuccess = await this.speakWithGoogleTTS(text);
            if (googleTTSSuccess) {
                return true;
            }

            // Second: ResponsiveVoice (good quality web TTS)
            if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
                console.log('🗣️ Using ResponsiveVoice (Google TTS not available)');
                
                const voiceOptions = [
                    "US English Male",
                    "UK English Male", 
                    "Australian English Male",
                    "US English Female"
                ];
                
                const selectedVoice = voiceOptions[0];
                
                window.responsiveVoice.speak(text, selectedVoice, {
                    rate: 0.9,
                    pitch: 1.0,
                    volume: 0.9,
                    onstart: () => console.log('✅ ResponsiveVoice: Speech started'),
                    onend: () => console.log('🔊 ResponsiveVoice: Speech ended'),
                    onerror: (error) => {
                        console.error('ResponsiveVoice error:', error);
                        this.speakWithBrowserTTS(text);
                    }
                });
                return true;
            }

            // Third: Try premium browser voices (last resort)
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                const voices = await this.getAvailableVoices();
                const premiumVoice = this.findPremiumVoice(voices);
                
                if (premiumVoice) {
                    utterance.voice = premiumVoice;
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 0.9;
                    utterance.lang = 'en-US';
                    
                    speechSynthesis.speak(utterance);
                    console.log(`Using browser voice: ${premiumVoice.name}`);
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Modern TTS failed:', error);
            return false;
        }
    }

    async speakWithGoogleTTS(text) {
        try {
            console.log('🌟 Trying Google Cloud TTS...');
            
            const response = await fetch('http://localhost:5050/speak', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    text: text,
                    voice: 'en-US-Neural2-J'  // High-quality neural voice
                })
            });

            if (response.ok) {
                console.log('✅ Google Cloud TTS responded');
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                
                const audio = new Audio(audioUrl);
                audio.volume = 0.9;
                
                // Store reference for interruption handling
                this.currentAudio = audio;
                
                return new Promise((resolve) => {
                    audio.onended = () => {
                        URL.revokeObjectURL(audioUrl);
                        this.currentAudio = null;
                        console.log('🔊 Google TTS playback finished');
                        resolve(true);
                    };
                    
                    audio.onerror = (error) => {
                        console.error('Audio playback error:', error);
                        URL.revokeObjectURL(audioUrl);
                        this.currentAudio = null;
                        resolve(false);
                    };
                    
                    // Check if we were interrupted before playing
                    if (!this.isProcessing) {
                        console.log('Speech cancelled before playback');
                        URL.revokeObjectURL(audioUrl);
                        resolve(false);
                        return;
                    }
                    
                    audio.play().then(() => {
                        console.log('🗣️  Playing Google Cloud TTS audio (Neural2)');
                    }).catch((error) => {
                        console.error('Audio play error:', error);
                        this.currentAudio = null;
                        resolve(false);
                    });
                });
            } else {
                console.log('❌ Google TTS server not available');
                return false;
            }
        } catch (error) {
            console.log('❌ Google TTS server connection failed:', error.message);
            return false;
        }
    }

    async getAvailableVoices() {
        return new Promise((resolve) => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                resolve(voices);
                return;
            }
            
            // Wait for voices to load
            speechSynthesis.addEventListener('voiceschanged', () => {
                resolve(speechSynthesis.getVoices());
            }, { once: true });
        });
    }

    findPremiumVoice(voices) {
        // Look for high-quality voices first
        const premiumVoices = [
            // Google Premium voices
            name => name.includes('Google') && name.includes('Wavenet'),
            name => name.includes('Google') && name.includes('Neural'),
            name => name.includes('Google') && name.includes('Standard'),
            // Microsoft Premium voices
            name => name.includes('Microsoft') && name.includes('Neural'),
            name => name.includes('Microsoft David') && name.includes('Desktop'),
            // Apple Premium voices
            name => name.includes('Alex') && !name.includes('Compact'),
            name => name.includes('Daniel') && !name.includes('Compact'),
            // Any non-compact voice
            name => !name.includes('Compact') && name.includes('en-US')
        ];

        for (const preference of premiumVoices) {
            const voice = voices.find(voice => preference(voice.name));
            if (voice) {
                return voice;
            }
        }

        return null;
    }

    speakWithBrowserTTS(text) {
        if (this.synthesis) {
            // Cancel any ongoing speech
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Find the best natural-sounding voice
            const voices = this.synthesis.getVoices();
            const bestVoice = this.findBestVoice(voices);
            
            if (bestVoice) {
                utterance.voice = bestVoice;
                console.log(`Using fallback voice: ${bestVoice.name} (${bestVoice.lang})`);
            }
            
            // Optimized settings for natural speech
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 0.9;
            
            this.synthesis.speak(utterance);
        }
    }

    findBestVoice(voices) {
        if (voices.length === 0) return null;
        
        // Priority order for natural-sounding voices
        const voicePreferences = [
            // Google voices (usually highest quality)
            name => name.includes('Google') && (name.includes('US') || name.includes('UK')),
            // Microsoft voices (good quality on Windows)
            name => name.includes('Microsoft') && (name.includes('David') || name.includes('Mark') || name.includes('Zira')),
            // Apple voices (good on macOS)
            name => name.includes('Alex') || name.includes('Daniel') || name.includes('Samantha'),
            // Other high-quality voices
            name => name.includes('Natural') || name.includes('Neural'),
            // Fallback to any English voice
            name => name.includes('en-') || name.includes('English'),
            // Last resort - any male voice
            name => name.toLowerCase().includes('male') || name.includes('David') || name.includes('Mark')
        ];
        
        for (const preference of voicePreferences) {
            const voice = voices.find(voice => preference(voice.name));
            if (voice) {
                return voice;
            }
        }
        
        // If all else fails, return the first available voice
        return voices[0];
    }

    // Initialize better voice loading and debugging
    initializeVoices() {
        console.log('🎤 Initializing voice system...');
        
        // Check for ResponsiveVoice
        const checkResponsiveVoice = () => {
            if (window.responsiveVoice) {
                console.log('✅ ResponsiveVoice loaded successfully');
                console.log('Available ResponsiveVoice voices:', window.responsiveVoice.getVoices());
            } else {
                console.log('❌ ResponsiveVoice not available, using browser TTS');
            }
        };

        const loadVoices = () => {
            const voices = this.synthesis.getVoices();
            if (voices.length > 0) {
                const bestVoice = this.findBestVoice(voices);
                const premiumVoice = this.findPremiumVoice(voices);
                
                console.log(`🔊 Browser voices loaded: ${voices.length} total`);
                console.log(`Best fallback voice: ${bestVoice ? bestVoice.name : 'None'}`);
                console.log(`Premium voice found: ${premiumVoice ? premiumVoice.name : 'None'}`);
                
                // Log top 5 voices for debugging
                console.log('Top browser voices:', voices.slice(0, 5).map(v => `${v.name} (${v.lang})`));
            }
        };
        
        // Check ResponsiveVoice after a short delay
        setTimeout(checkResponsiveVoice, 1000);
        
        // Load browser voices when they become available
        if (this.synthesis.getVoices().length === 0) {
            this.synthesis.addEventListener('voiceschanged', loadVoices);
        } else {
            loadVoices();
        }
    }

    addMessage(sender, text, saveToHistory = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const speakerSpan = document.createElement('span');
        speakerSpan.className = 'speaker';
        speakerSpan.textContent = sender === 'user' ? 'YOU:' : 'JARVIS:';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.textContent = text;
        
        messageDiv.appendChild(speakerSpan);
        messageDiv.appendChild(textSpan);
        
        this.elements.conversation.appendChild(messageDiv);
        this.elements.conversation.scrollTop = this.elements.conversation.scrollHeight;
        
        // Store in conversation history
        if (saveToHistory) {
            this.conversationHistory.push({ sender, text, timestamp: new Date() });
        }
    }

    clearConversation() {
        this.elements.conversation.innerHTML = '';
        this.conversationHistory = [];
        this.clearPersistentMemory();
        // Clear vision data
        this.currentImage = null;
        this.imageContext = null;
        // Reset permission flags when clearing conversation
        this.microphoneBlocked = false;
        this.permissionMessageShown = false;
        this.addMessage('jarvis', "Everything cleared! I'm Jarvis, your AI assistant. I'm ready for a fresh start. What can I help you with?");
    }

    updateUI(state) {
        this.elements.voiceCircle.className = 'voice-circle';
        
        switch (state) {
            case 'listening':
                this.elements.voiceCircle.classList.add('listening');
                this.elements.startBtn.disabled = true;
                this.elements.stopBtn.disabled = false;
                break;
            case 'processing':
                this.elements.voiceCircle.classList.add('processing');
                this.elements.startBtn.disabled = true;
                this.elements.stopBtn.disabled = false;
                break;
            case 'idle':
            default:
                this.elements.startBtn.disabled = false;
                this.elements.stopBtn.disabled = true;
                break;
        }
    }

    updateStatus(status) {
        this.elements.status.textContent = status;
    }

    updateDebugInfo(field, value) {
        if (this.elements[field]) {
            this.elements[field].textContent = value || 'Unknown';
        }
    }

    // === PERSISTENT MEMORY SYSTEM ===
    
    loadPersistentMemory() {
        try {
            // Load user memory
            const savedMemory = localStorage.getItem(this.storageKey);
            if (savedMemory) {
                this.userMemory = JSON.parse(savedMemory);
                console.log('📚 Loaded user memory:', this.userMemory);
            }
            
            // Load conversation history
            const savedConversations = localStorage.getItem(this.conversationKey);
            if (savedConversations) {
                this.conversationHistory = JSON.parse(savedConversations);
                console.log(`📖 Loaded ${this.conversationHistory.length} previous conversations`);
                
                // Restore conversation in UI
                this.conversationHistory.forEach(msg => {
                    this.addMessage(msg.sender, msg.text, false); // false = don't save to history again
                });
                
                // Welcome back message if we have memory
                if (this.userMemory.name) {
                    this.addMessage('jarvis', `Welcome back, ${this.userMemory.name}! I remember our previous conversations. How can I help you today?`, false);
                }
            }
        } catch (error) {
            console.error('Error loading persistent memory:', error);
        }
    }
    
    savePersistentMemory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.userMemory));
            localStorage.setItem(this.conversationKey, JSON.stringify(this.conversationHistory));
            console.log('💾 Memory saved successfully');
        } catch (error) {
            console.error('Error saving persistent memory:', error);
        }
    }
    
    clearPersistentMemory() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.conversationKey);
            this.userMemory = { name: null, preferences: {}, facts: [] };
            this.conversationHistory = [];
            console.log('🗑️ Persistent memory cleared');
        } catch (error) {
            console.error('Error clearing persistent memory:', error);
        }
    }

    // === INTERRUPTION HANDLING ===
    
    async stopCurrentSpeech() {
        // Stop any current audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
            console.log('🛑 Stopped current audio');
        }
        
        // Cancel speech synthesis
        if (this.synthesis) {
            this.synthesis.cancel();
            console.log('🛑 Cancelled speech synthesis');
        }
        
        // Cancel ongoing API request
        if (this.currentRequest) {
            this.currentRequest.abort();
            this.currentRequest = null;
            console.log('🛑 Cancelled API request');
        }
        
        // Clear speech queue
        this.speechQueue = [];
        
        // Reset processing state
        this.isProcessing = false;
    }

    // === INSTANT INTERRUPTION DETECTION ===
    
    onSpeechStart() {
        console.log('🎤 User started speaking - interrupting Jarvis!');
        // INSTANT interruption the moment user starts talking
        if (this.isProcessing) {
            this.stopCurrentSpeech();
            this.updateStatus('User speaking...');
        }
    }
    
    onSpeechEnd() {
        console.log('🎤 User stopped speaking');
        this.updateStatus('Processing...');
    }

    // === LIVE VISION CAPABILITIES ===
    
    async startCamera() {
        try {
            this.currentVideoStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: false
            });
            
            this.visionMode = 'camera';
            this.setupVisionDisplay();
            this.addMessage('jarvis', "📹 Camera activated! I can now see you. Feel free to ask me what I observe or let me analyze what's happening!");
            
            console.log('📹 Camera started successfully');
        } catch (error) {
            console.error('Error starting camera:', error);
            this.addMessage('jarvis', 'Sorry, I need camera permission to see you. Please allow camera access when prompted.');
        }
    }
    
    async startScreenShare() {
        try {
            this.currentVideoStream = await navigator.mediaDevices.getDisplayMedia({
                video: { width: 1920, height: 1080 },
                audio: false
            });
            
            this.visionMode = 'screen';
            this.setupVisionDisplay();
            this.addMessage('jarvis', "🖥️ Screen sharing activated! I can now see your screen. Ask me about anything you're working on!");
            
            console.log('🖥️ Screen sharing started successfully');
        } catch (error) {
            console.error('Error starting screen share:', error);
            this.addMessage('jarvis', 'Sorry, I need screen sharing permission. Please allow screen capture when prompted.');
        }
    }
    
    setupVisionDisplay() {
        // Show vision container
        this.elements.visionContainer.style.display = 'block';
        this.elements.stopVisionBtn.style.display = 'inline-block';
        
        // Set video stream
        this.elements.visionVideo.srcObject = this.currentVideoStream;
        
        // Update status
        this.elements.visionStatus.textContent = `${this.visionMode === 'camera' ? '📹 Camera' : '🖥️ Screen'} Vision Active`;
        
        // Create canvas for frame capture
        this.visionCanvas = document.createElement('canvas');
        this.visionContext = this.visionCanvas.getContext('2d');
        
        // Start auto-analysis if enabled
        this.toggleAutoAnalyze();
        
        // Handle stream end
        this.currentVideoStream.getTracks().forEach(track => {
            track.onended = () => {
                this.stopVision();
            };
        });
    }
    
    stopVision() {
        if (this.currentVideoStream) {
            this.currentVideoStream.getTracks().forEach(track => track.stop());
            this.currentVideoStream = null;
        }
        
        if (this.autoAnalyzeInterval) {
            clearInterval(this.autoAnalyzeInterval);
            this.autoAnalyzeInterval = null;
        }
        
        this.elements.visionContainer.style.display = 'none';
        this.elements.stopVisionBtn.style.display = 'none';
        this.visionMode = null;
        
        this.addMessage('jarvis', "👁️ Vision deactivated. I can no longer see your camera or screen.");
        console.log('👁️ Vision stopped');
    }
    
    toggleAutoAnalyze() {
        if (this.autoAnalyzeInterval) {
            clearInterval(this.autoAnalyzeInterval);
            this.autoAnalyzeInterval = null;
        }
        
        if (this.elements.autoAnalyze.checked && this.currentVideoStream) {
            const interval = parseInt(this.elements.analyzeInterval.value);
            this.autoAnalyzeInterval = setInterval(() => {
                this.analyzeCurrentView();
            }, interval);
            
            console.log(`🔄 Auto-analysis enabled every ${interval/1000}s`);
        }
    }
    
    async analyzeCurrentView() {
        if (!this.currentVideoStream || !this.elements.visionVideo.readyState) {
            console.log('No video stream available for analysis');
            return;
        }
        
        try {
            // Capture current frame
            const video = this.elements.visionVideo;
            this.visionCanvas.width = video.videoWidth;
            this.visionCanvas.height = video.videoHeight;
            this.visionContext.drawImage(video, 0, 0);
            
            // Convert to base64
            const base64Image = this.visionCanvas.toDataURL('image/jpeg', 0.8);
            
            // Send for analysis
            const context = `You are Jarvis with live vision capabilities. You are currently viewing the user's ${this.visionMode === 'camera' ? 'camera feed (you can see the user)' : 'screen (you can see what they\'re working on)'}.
            
Analyze what you see in the image and provide a brief, natural observation. Be conversational and helpful. Only mention significant changes or interesting things you notice.

Current time: ${new Date().toLocaleTimeString()}
Vision mode: ${this.visionMode === 'camera' ? 'Camera' : 'Screen sharing'}`;
            
            const analysisResult = await this.analyzeImageWithGemini(base64Image, context);
            
            if (analysisResult && analysisResult.trim()) {
                this.addMessage('jarvis', `👁️ ${analysisResult}`);
            }
            
        } catch (error) {
            console.error('Error analyzing current view:', error);
        }
    }
    
    async analyzeImageWithGemini(base64Image, context) {
        try {
            const controller = new AbortController();
            this.currentRequest = controller;
            
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + this.apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: context },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: base64Image.split(',')[1]
                                }
                            }
                        ]
                    }]
                }),
                signal: controller.signal
            });
            
            this.currentRequest = null;
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }
            
            return null;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Vision analysis cancelled');
                return null;
            }
            console.error('Gemini Vision API error:', error);
            return null;
        }
    }

    // Cleanup method
    cleanup() {
        this.stopVision();
        if (this.currentRequest) {
            this.currentRequest.abort();
        }
    }
}

// Initialize Jarvis when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.jarvis = new JarvisAssistant();
});

// Handle page visibility changes to manage speech recognition
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.jarvis && window.jarvis.isListening) {
        // Optionally pause listening when tab is not visible
        console.log('Tab hidden, speech recognition may be affected');
    }
}); 