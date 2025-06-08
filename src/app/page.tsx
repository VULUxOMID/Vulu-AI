import Link from 'next/link'
import { ArrowRightIcon, MicrophoneIcon, EyeIcon, CameraIcon, CloudIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">
            🤖 <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">J.A.R.V.I.S</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="/chat" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Chat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Meet Your Personal
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Just Another Rather Very Intelligent System - Your personal AI companion with 
              voice, vision, and real-time capabilities. Built for you, by you.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/chat"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Conversation</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/capabilities"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                View Capabilities
              </Link>
            </div>

            {/* Hero Animation */}
            <div className="mt-16 relative">
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse delay-300"></div>
                <div className="absolute inset-16 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <MicrophoneIcon className="w-24 h-24 text-blue-400 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Core Capabilities
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your personal JARVIS combines cutting-edge AI with seamless interaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voice Intelligence */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MicrophoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Voice Intelligence</h3>
              <p className="text-gray-300">
                Natural conversation with advanced speech recognition and realistic text-to-speech. Talk to JARVIS like a friend.
              </p>
            </div>

            {/* Live Vision */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Visual Understanding</h3>
              <p className="text-gray-300">
                Real-time camera and screen analysis. JARVIS can see what you see and help with visual tasks instantly.
              </p>
            </div>

            {/* Persistent Memory */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Memory & Context</h3>
              <p className="text-gray-300">
                JARVIS remembers your preferences, conversations, and context. Every interaction builds on the last.
              </p>
            </div>

            {/* Instant Response */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Processing</h3>
              <p className="text-gray-300">
                Lightning-fast response times with intelligent interruption detection. JARVIS knows when to listen and respond.
              </p>
            </div>

            {/* Multi-Modal */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Modal AI</h3>
              <p className="text-gray-300">
                Text, voice, and vision combined. JARVIS processes multiple input types simultaneously for rich understanding.
              </p>
            </div>

            {/* Learning & Adaptation */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
              <p className="text-gray-300">
                JARVIS learns from every interaction, adapting to your preferences and becoming more helpful over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal AI Statement */}
      <section className="py-24 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Personal AI Companion
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Built for learning, experimentation, and pushing the boundaries of what's possible with AI
          </p>
          <Link 
            href="/chat"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
          >
            <span>Let's Start Building</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <div className="text-2xl font-bold text-white mb-4">
              🤖 <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">J.A.R.V.I.S</span>
            </div>
            <p>Just Another Rather Very Intelligent System - Personal AI Assistant</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
