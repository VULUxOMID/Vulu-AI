import Link from 'next/link'
import { 
  MicrophoneIcon, 
  EyeIcon, 
  CameraIcon, 
  CloudIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  HomeIcon,
  CpuChipIcon,
  SparklesIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

export default function CapabilitiesPage() {
  const capabilities = [
    {
      icon: MicrophoneIcon,
      title: "Voice Intelligence",
      description: "Advanced speech recognition and natural language processing",
      features: [
        "Real-time speech-to-text conversion",
        "Natural language understanding",
        "Context-aware responses",
        "Multiple language support",
        "Voice activity detection"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: EyeIcon,
      title: "Computer Vision",
      description: "Real-time visual analysis and understanding",
      features: [
        "Object detection and recognition",
        "Scene understanding",
        "Text extraction from images",
        "Real-time camera feed analysis",
        "Screen sharing analysis"
      ],
      color: "from-teal-500 to-green-500"
    },
    {
      icon: CpuChipIcon,
      title: "AI Processing",
      description: "Multi-modal AI with advanced reasoning capabilities",
      features: [
        "Large language model integration",
        "Contextual memory retention",
        "Multi-turn conversations",
        "Code generation and analysis",
        "Creative problem solving"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CloudIcon,
      title: "Memory System",
      description: "Persistent context and preference learning",
      features: [
        "Conversation history",
        "User preference learning",
        "Context continuity",
        "Knowledge accumulation",
        "Personalized responses"
      ],
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: BoltIcon,
      title: "Real-time Processing",
      description: "Lightning-fast response and interaction capabilities",
      features: [
        "Sub-second response times",
        "Streaming responses",
        "Interruption handling",
        "Concurrent processing",
        "Low-latency communication"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: SparklesIcon,
      title: "Adaptive Learning",
      description: "Continuous improvement and personalization",
      features: [
        "Usage pattern analysis",
        "Preference adaptation",
        "Response optimization",
        "Feature enhancement",
        "Behavioral learning"
      ],
      color: "from-violet-500 to-purple-500"
    }
  ]

  const techSpecs = [
    { label: "AI Model", value: "GPT-4 / Claude / Gemini" },
    { label: "Voice Engine", value: "Web Speech API + Custom TTS" },
    { label: "Vision Model", value: "Computer Vision API" },
    { label: "Response Time", value: "< 500ms average" },
    { label: "Memory Storage", value: "Local + Encrypted" },
    { label: "Platform", value: "Web-based (PWA Ready)" }
  ]

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
                <span className="text-gray-400 text-sm ml-2">Capabilities</span>
              </div>
            </div>
            <Link 
              href="/chat"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Chat
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            JARVIS <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Capabilities</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the full range of features and capabilities that make JARVIS your ultimate personal AI assistant
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <capability.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{capability.title}</h3>
              <p className="text-gray-300 mb-6">{capability.description}</p>
              
              <ul className="space-y-2">
                {capability.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">{spec.label}</div>
                <div className="text-white font-semibold text-lg">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Development Roadmap</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 1 (Current):</strong> Basic chat interface and UI framework
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 2:</strong> AI integration (OpenAI GPT-4, Claude, or local models)
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 3:</strong> Voice recognition and text-to-speech capabilities
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 4:</strong> Computer vision and image analysis
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 5:</strong> Memory system and context persistence
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <div className="text-white">
                <strong>Phase 6:</strong> Advanced features and optimization
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience JARVIS?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start chatting with your personal AI assistant today
          </p>
          <Link 
            href="/chat"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
          >
            <span>Start Conversation</span>
            <MicrophoneIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  )
} 