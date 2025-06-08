# 🤖 Jarvis v1 - Advanced AI Assistant with Live Vision

## 🌟 **NEW: Live Vision Capabilities!**

Jarvis now has **real-time vision** through:
- **📹 Camera Access**: Jarvis can see you through your webcam
- **🖥️ Screen Sharing**: Jarvis can see your screen in real-time
- **👁️ Auto-Analysis**: Periodic analysis of what Jarvis is seeing
- **🧠 Instant Analysis**: Ask Jarvis what he sees anytime

---

## 🚀 **Key Features**

### 🧠 **Persistent Memory**
- Remembers your name, preferences, and conversation history
- Learns about you automatically through conversations
- Saves everything locally using browser storage
- Welcomes you back with personalized greetings

### 👁️ **Live Vision System**
- **Camera Mode**: See yourself through your webcam
- **Screen Share Mode**: Share your screen with Jarvis
- **Auto-Analysis**: Jarvis automatically analyzes what he sees every 10s/30s/1min
- **Manual Analysis**: Click "Analyze Now" for instant vision analysis
- **Smart Integration**: Jarvis includes vision context when you ask "what do you see?"

### 🎤 **Advanced Voice Interaction**
- **Instant Interruption**: Stop Jarvis mid-sentence by speaking
- **Multiple Detection Layers**: Speech start, interim results, and speech end detection
- **High-Quality TTS**: Google Cloud Text-to-Speech with Neural2 voices
- **Fallback Support**: Browser TTS if cloud services unavailable

### 🤖 **Powerful AI**
- **Google Gemini**: Advanced reasoning and conversation
- **Context Awareness**: Remembers conversation history
- **Vision Understanding**: Can analyze images, screens, and camera feeds
- **Personality**: Friendly, helpful, and conversational

---

## 🔧 **Setup Instructions**

### 1. **Google Cloud TTS Setup**
```bash
# Place your service account JSON file
cp your-service-account.json ./jarvis-tts-credentials.json

# Start the TTS server
python3 google_cloud_tts_server.py
```

### 2. **Configure API Keys**
Add your Google Gemini API key to `jarvis.js`:
```javascript
this.apiKey = 'YOUR_GEMINI_API_KEY_HERE';
```

### 3. **Launch Jarvis**
```bash
# Open in browser
open index.html
# or serve with a local server
python3 -m http.server 8000
```

---

## 📱 **How to Use**

### 🎤 **Voice Commands**
1. Click "Start Listening" or the microphone
2. Speak naturally to Jarvis
3. Jarvis will respond with voice and text
4. Speak anytime to interrupt Jarvis

### 👁️ **Vision Features**
1. **Camera**: Click "📹 Camera" to let Jarvis see you
2. **Screen Share**: Click "🖥️ Screen Share" to show your screen
3. **Auto-Analysis**: Enable to get periodic observations
4. **Manual Check**: Click "👁️ Analyze Now" for instant analysis
5. **Ask Questions**: "What do you see?" "Analyze my screen" etc.

### 🧠 **Memory & Conversations**
- Jarvis automatically learns about you
- All conversations are saved locally
- Clear conversation history with "Clear Chat"
- Persistent across browser sessions

---

## 🏗️ **System Architecture**

```
🎤 Speech Recognition (Browser)
    ↓
🧠 Google Gemini AI (Cloud)
    ↓
👁️ Google Gemini Vision (Cloud) ← 📹 Camera/Screen
    ↓
🗣️ Google Cloud TTS (Cloud)
    ↓
🔊 Audio Output (Browser)
```

### **Core Components**
- **jarvis.js**: Main AI logic with vision and memory
- **google_cloud_tts_server.py**: Google TTS with service account
- **index.html**: Clean, modern UI with vision controls
- **styles.css**: Beautiful gradient styling

---

## 🎯 **Vision Capabilities**

### **Camera Mode**
- Access your webcam feed
- See yourself in real-time
- Auto-analysis of facial expressions, activities
- "What am I doing?" "How do I look?" questions

### **Screen Share Mode** 
- Share your entire screen or specific windows
- Real-time analysis of what you're working on
- Help with coding, design, presentations
- "What's on my screen?" "Help me with this code"

### **Smart Analysis**
- Automatic periodic analysis (configurable intervals)
- Context-aware observations
- Only speaks when something interesting happens
- Cost-efficient (Google Vision pricing ~$0.0025/image)

---

## 💡 **Example Interactions**

### **With Camera**
```
You: "How do I look today?"
Jarvis: 👁️ "You look great! I can see you're in a well-lit room, and you appear to be in a good mood. Your setup looks professional with good lighting."
```

### **With Screen Share**
```
You: "Help me with this code"
Jarvis: 👁️ "I can see you're working on a JavaScript function. I notice there's a syntax error on line 15 - you're missing a closing bracket. Would you like me to help you fix it?"
```

### **Auto-Analysis**
```
Jarvis: 👁️ "I notice you've switched to your email application. Your inbox looks quite full - would you like some tips on email management?"
```

---

## 🛡️ **Privacy & Security**

- **Local Storage**: All conversations stored locally in browser
- **No Data Sharing**: Personal information never leaves your device
- **Permission-Based**: Camera/screen access only when explicitly granted
- **Secure APIs**: All cloud requests use HTTPS
- **Service Account**: Google services use secure authentication

---

## 🎨 **Customization**

### **Vision Settings**
- Auto-analysis intervals: 10s, 30s, or 1 minute
- Enable/disable automatic observations
- Manual analysis on demand

### **Voice Settings**
- Multiple voice options through Google Cloud TTS
- Adjustable speech rate and pitch
- Fallback to browser voices if needed

### **UI Customization**
- Modern gradient design
- Responsive layout
- Vision controls and status indicators
- Real-time video preview

---

## 🔧 **Technical Details**

### **Live Vision Implementation**
```javascript
// Camera access
navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 }
});

// Screen sharing
navigator.mediaDevices.getDisplayMedia({
    video: { width: 1920, height: 1080 }
});

// Frame capture for analysis
canvas.getContext('2d').drawImage(video, 0, 0);
const frame = canvas.toDataURL('image/jpeg', 0.8);
```

### **Memory System**
```javascript
// Persistent storage
localStorage.setItem('jarvis_memory', JSON.stringify(userMemory));
localStorage.setItem('jarvis_conversations', JSON.stringify(history));
```

### **Interruption Detection**
```javascript
// Multi-layer interruption
recognition.onspeechstart = () => stopCurrentSpeech();
recognition.onspeechend = () => updateStatus('Processing...');
recognition.onresult = (event) => {
    if (interim && isProcessing) stopCurrentSpeech();
};
```

---

## 🚀 **What's Next?**

- **Object Detection**: Identify specific objects in camera/screen
- **Gesture Recognition**: Respond to hand gestures and movements  
- **Screen Region Analysis**: Focus on specific areas of the screen
- **Multi-Modal Interaction**: Combine voice, vision, and text simultaneously
- **Real-time Collaboration**: Share vision sessions with others

---

## 🎉 **Ready to Experience the Future?**

Jarvis v1 combines the best of modern AI with intuitive voice and vision interfaces. Start a conversation, share your screen, or just let Jarvis see the world through your camera. The future of AI assistance is here!

**🔥 Key Highlights:**
- ✅ Real-time camera and screen vision
- ✅ Persistent memory across sessions  
- ✅ Instant voice interruption
- ✅ Google's most advanced AI models
- ✅ Beautiful, modern interface
- ✅ Privacy-focused local storage
- ✅ Professional-grade voice synthesis

**Start your conversation with Jarvis today!** 🎤👁️🤖 