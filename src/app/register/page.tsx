'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[^A-Za-z0-9]/, text: 'One special character' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!passwordRequirements.every(req => req.regex.test(formData.password))) {
      newErrors.password = 'Password does not meet requirements'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Here we'll integrate with NextAuth and your API
      console.log('Registering user:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to dashboard or onboarding
      // router.push('/dashboard')
      
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => req.regex.test(formData.password))
    return metRequirements.length
  }

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength()
    if (strength < 2) return { label: 'Weak', color: 'text-red-400' }
    if (strength < 4) return { label: 'Fair', color: 'text-yellow-400' }
    if (strength < 5) return { label: 'Good', color: 'text-blue-400' }
    return { label: 'Strong', color: 'text-green-400' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-white hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Registration Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-white mb-2">
              🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-gray-300">Join thousands of users experiencing the future of AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {errors.general}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Password Strength:</span>
                    <span className={`text-sm font-medium ${getPasswordStrengthLabel().color}`}>
                      {getPasswordStrengthLabel().label}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        getPasswordStrength() < 2 ? 'bg-red-500' :
                        getPasswordStrength() < 4 ? 'bg-yellow-500' :
                        getPasswordStrength() < 5 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        {requirement.regex.test(formData.password) ? (
                          <CheckIcon className="w-3 h-3 text-green-400" />
                        ) : (
                          <XMarkIcon className="w-3 h-3 text-gray-400" />
                        )}
                        <span className={requirement.regex.test(formData.password) ? 'text-green-400' : 'text-gray-400'}>
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Privacy */}
            <div className="text-sm text-gray-300">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </Link>
              .
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Account...</span>
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-gray-300">Already have an account? </span>
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">Trusted by thousands of users worldwide</p>
          <div className="flex justify-center space-x-8 text-white/50">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-xs">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-xs">Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 