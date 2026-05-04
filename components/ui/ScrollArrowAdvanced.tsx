'use client'

import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

interface ScrollArrowAdvancedProps {
  sections: string[]
}

export default function ScrollArrowAdvanced({ sections }: ScrollArrowAdvancedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = () => {
    const nextIndex = (currentIndex + 1) % sections.length
    setCurrentIndex(nextIndex)
    
    const targetElement = document.getElementById(sections[nextIndex])
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      onClick={handleScroll}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-2 border-[#FFD700]/50 flex items-center justify-center hover:border-[#FFD700] transition-colors duration-300 bg-black/20 backdrop-blur-sm">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-[#FFD700]/10 animate-pulse" />
          
          {/* Arrow icon */}
          <FiChevronDown className="w-6 h-6 text-[#FFD700] group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Progress indicator */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#FFD700] font-semibold whitespace-nowrap bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {sections.length}
        </div>
        
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#FFD700]"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}