'use client'

import { motion } from 'framer-motion'
import { FiEye, FiHeart, FiUsers, FiTrendingUp } from 'react-icons/fi'

const metrics = [
  { label: 'Total Views', value: '15.2K', icon: FiEye, change: '+12%', color: 'from-blue-500 to-cyan-500' },
  { label: 'Total Likes', value: '3.8K', icon: FiHeart, change: '+8%', color: 'from-pink-500 to-rose-500' },
  { label: 'Followers Gained', value: '456', icon: FiUsers, change: '+23%', color: 'from-green-500 to-emerald-500' },
  { label: 'Engagement Rate', value: '4.8%', icon: FiTrendingUp, change: '+2%', color: 'from-purple-500 to-indigo-500' },
]

export default function AnalyticsCards() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold">{metric.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="h-64 flex items-center justify-center border border-white/10 rounded-lg">
          <p className="text-gray-400">Analytics charts will be available after backend integration</p>
        </div>
      </div>
    </div>
  )
}