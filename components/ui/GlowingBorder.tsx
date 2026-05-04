'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowingBorderProps {
  children: ReactNode
  color?: 'primary' | 'secondary' | 'cyan' | 'purple'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

const colors = {
  primary: 'rgba(108, 99, 255,',
  secondary: 'rgba(255, 101, 132,',
  cyan: 'rgba(0, 240, 255,',
  purple: 'rgba(157, 78, 221,',
}

const intensities = {
  low: 0.3,
  medium: 0.5,
  high: 0.8,
}

export default function GlowingBorder({ children, color = 'primary', intensity = 'medium', className = '' }: GlowingBorderProps) {
  const glowColor = colors[color] + intensities[intensity] + ')'
  
  return (
    <motion.div
      className={`relative rounded-xl ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute -inset-0.5 rounded-xl opacity-75 blur-lg"
        style={{ 
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      <div className="relative bg-dark-400 rounded-xl">
        {children}
      </div>
    </motion.div>
  )
}