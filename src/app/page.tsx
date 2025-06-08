import Link from 'next/link'
import { ArrowRightIcon, MicrophoneIcon, EyeIcon, CameraIcon, CloudIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">
            🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-purple-300 transition-colors">
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Meet Your AI
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Voice Assistant
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Experience the future of AI interaction with Vulu - your intelligent companion with 
              voice, vision, and real-time capabilities that understands you like never before.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/register"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                Watch Demo
              </Link>
            </div>

            {/* Hero Animation */}
            <div className="mt-16 relative">
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full blur-2xl animate-pulse delay-300"></div>
                <div className="absolute inset-16 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <MicrophoneIcon className="w-24 h-24 text-purple-400 animate-bounce" />
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
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Vulu combines cutting-edge AI with intuitive interaction for an unprecedented user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voice Intelligence */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MicrophoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Voice Intelligence</h3>
              <p className="text-gray-300">
                Natural conversation with advanced speech recognition and ultra-realistic text-to-speech powered by Google Neural voices.
              </p>
            </div>

            {/* Live Vision */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Vision</h3>
              <p className="text-gray-300">
                Real-time camera and screen sharing analysis. Vulu can see what you see and help with visual tasks instantly.
              </p>
            </div>

            {/* Persistent Memory */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Persistent Memory</h3>
              <p className="text-gray-300">
                Vulu remembers your preferences, conversations, and context across sessions for truly personalized interactions.
              </p>
            </div>

            {/* Instant Response */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Response</h3>
              <p className="text-gray-300">
                Lightning-fast interruption detection and response. Vulu knows when to listen and when to speak.
              </p>
            </div>

            {/* Multi-Platform */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Platform</h3>
              <p className="text-gray-300">
                Works seamlessly across all devices - desktop, mobile, tablet. Your AI assistant anywhere, anytime.
              </p>
            </div>

            {/* Advanced AI */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced AI</h3>
              <p className="text-gray-300">
                Powered by Google Gemini Vision - the latest in multimodal AI for understanding text, images, and context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Weekly Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Weekly Plan</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">$9</span>
                  <span className="text-gray-300">.99/week</span>
                </div>
                <ul className="text-gray-300 space-y-3 mb-8">
                  <li>✅ 1,000 AI interactions</li>
                  <li>✅ Voice & Vision capabilities</li>
                  <li>✅ Real-time responses</li>
                  <li>✅ Memory & context</li>
                </ul>
                <Link 
                  href="/pricing"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 block text-center"
                >
                  Start Weekly
                </Link>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-purple-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Monthly Plan</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">$29</span>
                  <span className="text-gray-300">.99/month</span>
                </div>
                <ul className="text-gray-300 space-y-3 mb-8">
                  <li>✅ 5,000 AI interactions</li>
                  <li>✅ All Weekly features</li>
                  <li>✅ Priority support</li>
                  <li>✅ Advanced analytics</li>
                </ul>
                <Link 
                  href="/pricing"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 block text-center shadow-lg hover:shadow-xl"
                >
                  Start Monthly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Meet Your AI Assistant?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of users already experiencing the future of AI interaction
          </p>
          <Link 
            href="/register"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <div className="text-2xl font-bold text-white mb-4">
              🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
            </div>
            <p>&copy; 2024 Vulu.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
