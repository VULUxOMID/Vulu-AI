'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  ChartBarIcon,
  CpuChipIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BanknotesIcon,
  UserPlusIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  userGrowth: number
}

interface RevenueStats {
  totalRevenue: number
  monthlyRevenue: number
  averageRevenue: number
  revenueGrowth: number
}

interface UsageStats {
  totalInteractions: number
  averageInteractionsPerUser: number
  visionAnalyses: number
  voiceMessages: number
}

interface SystemStats {
  serverUptime: number
  apiLatency: number
  errorRate: number
  totalApiCosts: number
}

interface RecentActivity {
  id: string
  type: 'signup' | 'payment' | 'usage' | 'error'
  description: string
  timestamp: Date
  amount?: number
}

export default function AdminDashboard() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 12567,
    activeUsers: 8432,
    newUsersToday: 156,
    userGrowth: 12.5
  })

  const [revenueStats, setRevenueStats] = useState<RevenueStats>({
    totalRevenue: 89420,
    monthlyRevenue: 23580,
    averageRevenue: 7.12,
    revenueGrowth: 18.3
  })

  const [usageStats, setUsageStats] = useState<UsageStats>({
    totalInteractions: 1234567,
    averageInteractionsPerUser: 147,
    visionAnalyses: 89432,
    voiceMessages: 456789
  })

  const [systemStats, setSystemStats] = useState<SystemStats>({
    serverUptime: 99.9,
    apiLatency: 145,
    errorRate: 0.02,
    totalApiCosts: 2847.32
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'payment',
      description: 'New monthly subscription - John Doe',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      amount: 29.99
    },
    {
      id: '2',
      type: 'signup',
      description: 'New user registration - jane@example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
    },
    {
      id: '3',
      type: 'usage',
      description: 'High usage detected - user@domain.com (1000+ interactions)',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: '4',
      type: 'error',
      description: 'API timeout error - Vision service',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    }
  ])

  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'payment':
        return <BanknotesIcon className="w-4 h-4 text-green-400" />
      case 'signup':
        return <UserPlusIcon className="w-4 h-4 text-blue-400" />
      case 'usage':
        return <ChartBarIcon className="w-4 h-4 text-purple-400" />
      case 'error':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
    }
  }

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'payment':
        return 'border-green-500/50 bg-green-500/10'
      case 'signup':
        return 'border-blue-500/50 bg-blue-500/10'
      case 'usage':
        return 'border-purple-500/50 bg-purple-500/10'
      case 'error':
        return 'border-red-500/50 bg-red-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">
                🤖 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vulu.ai</span>
              </div>
              <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                ADMIN
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              
              <Link 
                href="/app"
                className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{formatNumber(userStats.totalUsers)}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <ArrowUpIcon className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">+{userStats.userGrowth}%</span>
                </div>
              </div>
              <UserGroupIcon className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(revenueStats.monthlyRevenue)}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <ArrowUpIcon className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">+{revenueStats.revenueGrowth}%</span>
                </div>
              </div>
              <CurrencyDollarIcon className="w-12 h-12 text-green-400" />
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-white">{formatNumber(userStats.activeUsers)}</p>
                <p className="text-gray-400 text-sm mt-2">Online now</p>
              </div>
              <div className="relative">
                <DevicePhoneMobileIcon className="w-12 h-12 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">System Uptime</p>
                <p className="text-3xl font-bold text-white">{systemStats.serverUptime}%</p>
                <p className="text-green-400 text-sm mt-2">All systems operational</p>
              </div>
              <CpuChipIcon className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Revenue Analytics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(revenueStats.totalRevenue)}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Avg Revenue per User</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(revenueStats.averageRevenue)}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold text-green-400">+{revenueStats.revenueGrowth}%</p>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Usage Statistics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Interactions</span>
                    <span className="text-white font-bold">{formatNumber(usageStats.totalInteractions)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Vision Analyses</span>
                    <span className="text-white font-bold">{formatNumber(usageStats.visionAnalyses)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Voice Messages</span>
                    <span className="text-white font-bold">{formatNumber(usageStats.voiceMessages)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Avg per User</span>
                    <span className="text-white font-bold">{usageStats.averageInteractionsPerUser}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Analysis */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Cost Analysis</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Google AI API Costs</p>
                    <p className="text-gray-400 text-sm">Gemini Vision + TTS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(systemStats.totalApiCosts)}</p>
                    <p className="text-gray-400 text-sm">This month</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Cost per User</p>
                    <p className="text-gray-400 text-sm">Average monthly cost</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatCurrency(systemStats.totalApiCosts / userStats.activeUsers)}</p>
                    <p className="text-green-400 text-sm">Profitable margin</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div>
                    <p className="text-white font-medium">Net Profit</p>
                    <p className="text-gray-400 text-sm">Revenue - Costs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-xl">
                      {formatCurrency(revenueStats.monthlyRevenue - systemStats.totalApiCosts)}
                    </p>
                    <p className="text-green-400 text-sm">This month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Live Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">
                          {activity.description}
                        </p>
                        {activity.amount && (
                          <p className="text-green-400 text-sm font-bold">
                            {formatCurrency(activity.amount)}
                          </p>
                        )}
                        <p className="text-gray-400 text-xs">
                          {activity.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">API Latency</span>
                  <span className="text-white font-medium">{systemStats.apiLatency}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Error Rate</span>
                  <span className="text-green-400 font-medium">{systemStats.errorRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Uptime</span>
                  <span className="text-green-400 font-medium">{systemStats.serverUptime}%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
                  📊 Generate Report
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
                  👥 Manage Users
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
                  ⚙️ System Settings
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
                  📈 Analytics Deep Dive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 