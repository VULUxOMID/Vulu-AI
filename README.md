# 🤖 J.A.R.V.I.S - Personal AI Assistant

**Just Another Rather Very Intelligent System** - A sophisticated personal AI assistant built with Next.js, featuring advanced voice interaction, computer vision, and persistent memory.

## ✨ Key Features

### 🧠 **Advanced AI with Memory**
- **Persistent Memory**: Remembers your name, preferences, and personal facts across sessions
- **Conversation History**: Maintains context from previous conversations
- **Intelligent Learning**: Automatically extracts and stores personal information

### 🎤 **Superior Voice Processing**
- **Multi-Tier TTS**: Google Cloud Neural voices → ResponsiveVoice → Browser Premium → Fallback
- **Smart Interruption**: Automatically stops speaking when you start talking
- **Premium Voice Selection**: Intelligently selects the highest quality available voice

### 👁️ **Live Vision Capabilities**
- **Real-time Analysis**: Camera and screen sharing with AI vision
- **Multi-modal AI**: Combines text, voice, and vision for comprehensive understanding
- **Auto-capture**: Continuous analysis of video feeds

### 🚀 **Modern Interface**
- **Responsive Design**: Beautiful, modern UI with real-time status indicators
- **Keyboard Shortcuts**: `Ctrl + Space` to toggle voice, `Escape` to stop
- **Debug Mode**: Comprehensive status monitoring and error handling

## 📦 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+ (for Google Cloud TTS server)
- **Google AI API Key** (for Gemini)
- **Google Cloud Account** (optional, for premium TTS)

### Quick Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd vulu-ai
   npm install
   ```

2. **Environment Configuration**
   Create `.env.local`:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access JARVIS**
   Open [http://localhost:3000](http://localhost:3000)

## 🔧 Advanced Setup (Optional)

### Google Cloud TTS (High-Quality Voices)

For premium neural voices, set up Google Cloud TTS:

1. **Install Python Dependencies**
   ```bash
   pip install flask flask-cors google-auth requests
   ```

2. **Google Cloud Setup**
   - Create a Google Cloud project
   - Enable the Text-to-Speech API
   - Create a service account
   - Download the JSON credentials as `jarvis-tts-credentials.json`

3. **Start TTS Server**
   ```bash
   python google_cloud_tts_server.py
   ```

4. **Test TTS Server**
   ```bash
   curl http://localhost:5050/health
   ```

## 🎯 Usage Guide

### Basic Chat
- Type messages or use voice input
- JARVIS remembers your conversations and learns about you
- Responses are automatically spoken aloud

### Voice Commands
- **Start Listening**: Click microphone or press `Ctrl + Space`
- **Stop Speaking**: Press `Escape` or click stop button
- **Auto-send**: Final voice transcripts are automatically sent

### Vision Features
- **Camera**: Enable camera for real-time face-to-face interaction
- **Screen Share**: Share your screen for JARVIS to see what you're working on
- **Analysis**: Click "Analyze" button for AI vision analysis

### Memory System
- **Introduction**: "My name is John" → JARVIS remembers your name
- **Preferences**: "I like pizza" → Stored in memory
- **Facts**: "I work as a developer" → Remembered for context

### Keyboard Shortcuts
- `Ctrl + Space`: Toggle voice listening
- `Escape`: Stop current speech/listening
- `Enter`: Send message

## 🏗️ Architecture

### Frontend (Next.js)
- **React Components**: Modern React with TypeScript
- **Custom Hooks**: `useVoiceAndMedia` for advanced capabilities
- **Real-time UI**: Status indicators and debug information

### Backend APIs
- **`/api/chat`**: Google Gemini integration with memory
- **`/api/vision`**: Computer vision analysis
- **`/api/tts`**: Text-to-speech configuration

### External Services
- **Google Gemini**: Advanced AI conversation
- **Google Cloud TTS**: Premium neural voices
- **Web Speech API**: Browser-based voice recognition
- **ResponsiveVoice**: Fallback TTS service

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── api/          # API endpoints
│   ├── chat/         # Chat interface
│   └── capabilities/ # Feature overview
├── hooks/            # Custom React hooks
└── types/            # TypeScript definitions
```

### Key Files
- **`src/hooks/useVoiceAndMedia.ts`**: Core voice/media functionality
- **`src/app/api/chat/route.ts`**: AI chat with memory
- **`src/app/chat/page.tsx`**: Main chat interface
- **`google_cloud_tts_server.py`**: Premium TTS server

### Adding Features
1. **New API Endpoints**: Add to `src/app/api/`
2. **UI Components**: Extend chat interface
3. **Voice Commands**: Modify voice processing logic
4. **Memory Types**: Enhance user memory structure

## 🚨 Troubleshooting

### Common Issues

**Voice Recognition Not Working**
- Ensure microphone permissions are granted
- Check browser compatibility (Chrome/Edge recommended)
- Refresh page and allow microphone access

**TTS Quality Poor**
- Set up Google Cloud TTS server for premium voices
- Check network connection for external TTS services
- Verify browser voice support

**API Errors**
- Verify Google AI API key in `.env.local`
- Check API quotas and billing
- Ensure internet connectivity

**Memory Not Persisting**
- Check browser localStorage support
- Verify no private/incognito mode restrictions
- Clear browser cache if corrupted

### Debug Mode
Enable debug mode in the chat interface to see:
- Speech recognition status
- Permission states
- Memory contents
- API call status
- Error messages

## 🔒 Privacy & Security

- **Local Storage**: User memory stored locally in browser
- **No Data Transmission**: Personal data stays on your device
- **API Security**: Only necessary data sent to AI services
- **Microphone Privacy**: Audio not stored, only processed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for personal use only. Commercial use requires proper licensing.

## 🙏 Acknowledgments

- **Google Gemini**: Advanced AI capabilities
- **Web Speech API**: Browser voice recognition
- **Google Cloud TTS**: Premium voice synthesis
- **Next.js**: Modern React framework

---

**Built with ❤️ for personal AI assistance**

*"Sometimes you gotta run before you can walk."* - Tony Stark
