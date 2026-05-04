'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface CategoryCardProps {
  name: string
  icon: IconType
  color: string
  count: number
  onClick?: () => void
}

export default function CategoryCard({ name, icon: Icon, color, count, onClick }: CategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
      <div className="relative glass-card p-6 text-center cursor-pointer">
        <Icon className={`w-10 h-10 mx-auto mb-3 text-transparent bg-gradient-to-r ${color} bg-clip-text`} />
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-400">{count.toLocaleString()} stories</p>
      </div>
    </motion.button>
  )
}