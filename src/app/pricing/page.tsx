'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Weekly Plan',
    price: 9.99,
    period: 'week',
    credits: 1000,
    description: 'Perfect for trying out Vulu\'s capabilities',
    features: [
      '1,000 AI interactions',
      'Voice conversations',
      'Live vision analysis',
      'Screen sharing',
      'Camera integration',
      'Persistent memory',
      'Real-time responses',
      'Multi-device sync',
      'Basic support'
    ],
    limitations: [
      'Limited to 1,000 credits',
      'Standard response priority'
    ],
    stripePriceId: 'price_weekly',
    popular: false
  },
  {
    name: 'Monthly Plan', 
    price: 29.99,
    period: 'month',
    credits: 5000,
    description: 'Best value for regular users and professionals',
    features: [
      '5,000 AI interactions',
      'All Weekly Plan features',
      'Priority response queue',
      'Advanced analytics',
      'Usage insights',
      'Export conversation history',
      'Custom voice preferences',
      'Priority support',
      'Early access to new features'
    ],
    limitations: [],
    stripePriceId: 'price_monthly',
    popular: true
  }
]

const faqs = [
  {
    question: 'What counts as an AI interaction?',
    answer: 'Each message you send to Vulu counts as 1 credit. Vision analysis (camera/screen sharing) uses 3 credits per analysis. Text-to-speech responses use 1 credit each.'
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle.'
  },
  {
    question: 'What happens if I run out of credits?',
    answer: 'You\'ll receive notifications when you\'re running low. Once credits are exhausted, you can upgrade your plan or wait for your next billing cycle.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. All conversations are encrypted, and we never store your personal data longer than necessary. You can delete your data at any time.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied within the first week, contact us for a full refund.'
  }
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (planId: string, priceId: string) => {
    setIsLoading(true)
    setSelectedPlan(planId)
    
    try {
      // This will be implemented with Stripe integration
      console.log('Subscribing to plan:', planId, priceId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to Stripe checkout
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId })
      // })
      // const { url } = await response.json()
      // window.location.href = url
      
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="text-2xl font-bold text-white">
            🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white hover:text-purple-300 transition-colors">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Start with our flexible pricing. No hidden fees, cancel anytime.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white font-semibold mb-2">🎉 Limited Time Offer</p>
            <p className="text-gray-300">Get 50% off your first month with code: <span className="text-purple-400 font-mono">VULU50</span></p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10' 
                    : 'border-white/10 hover:border-purple-500/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-6xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-300 text-xl">/{plan.period}</span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <p className="text-white font-semibold">{plan.credits.toLocaleString()} Credits Included</p>
                    <p className="text-gray-300 text-sm">~{Math.floor(plan.credits / 5)} conversations</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-white font-semibold">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="text-white font-semibold mt-6">Limitations:</h4>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <XMarkIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <span className="text-gray-400">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.name, plan.stripePriceId)}
                  disabled={isLoading && selectedPlan === plan.name}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  } ${isLoading && selectedPlan === plan.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading && selectedPlan === plan.name ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    `Start ${plan.name}`
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Usage Guide */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Credit Usage Guide</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Text Conversations</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">1 Credit</div>
                <p className="text-gray-300 text-sm">Per message sent to Vulu</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Vision Analysis</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">3 Credits</div>
                <p className="text-gray-300 text-sm">Per image or screen analysis</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔊</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Voice Responses</h3>
                <div className="text-3xl font-bold text-emerald-400 mb-2">1 Credit</div>
                <p className="text-gray-300 text-sm">Per TTS voice response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Still have questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team is here to help you choose the right plan
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            <span>Contact Support</span>
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