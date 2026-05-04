'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'

interface FloatingNavigationProps {
  sections: string[]
}

export default function FloatingNavigation({ sections }: FloatingNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isNearFooter, setIsNearFooter] = useState(false)
  const isNavigating = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if near footer
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isNearBottom = scrollPosition >= documentHeight - 200
      setIsNearFooter(isNearBottom)
      
      let visibleIndex = 0
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            visibleIndex = i
            break
          }
        }
      }
      setCurrentIndex(visibleIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (index: number) => {
    isNavigating.current = true
    const section = document.getElementById(sections[index])
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setTimeout(() => {
      isNavigating.current = false
    }, 1000)
  }

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      scrollToSection(currentIndex - 1)
    }
  }

  const getSectionName = (index: number) => {
    const section = sections[index]
    if (section === 'hero-section') return 'Home'
    if (section === 'featured-section') return 'Featured'
    if (section === 'trending-section') return 'Trending'
    if (section === 'latest-section') return 'Latest'
    if (section === 'creators-section') return 'Creators'
    if (section === 'categories-section') return 'Categories'
    if (section === 'cta-section') return 'CTA'
    return section.replace('-section', '').charAt(0).toUpperCase() + section.replace('-section', '').slice(1)
  }

  // Hide when near footer
  if (isNearFooter) return null

  return (
    <>
      {/* Left Side - Up Arrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
      >
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`w-10 h-10 rounded-full bg-dark-400 shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 ${
            currentIndex === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-primary hover:text-white hover:border-primary hover:shadow-xl cursor-pointer'
          }`}
        >
          <FiChevronUp className={`w-5 h-5 ${currentIndex === 0 ? 'text-gray-500' : 'text-white'}`} />
        </button>
      </motion.div>

      {/* Right Side - Down Arrow */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
      >
        <button
          onClick={goToNext}
          disabled={currentIndex === sections.length - 1}
          className={`w-10 h-10 rounded-full bg-dark-400 shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 ${
            currentIndex === sections.length - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-primary hover:text-white hover:border-primary hover:shadow-xl cursor-pointer'
          }`}
        >
          <FiChevronDown className={`w-5 h-5 ${currentIndex === sections.length - 1 ? 'text-gray-500' : 'text-white'}`} />
        </button>
      </motion.div>

      {/* Bottom Center - Page Name */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ bottom: '30px' }}
      >
        <div className="bg-dark-400/90 backdrop-blur-sm px-5 py-1.5 rounded-full shadow-lg border border-white/20">
          <span className="text-xs font-medium text-white tracking-wide">
            {getSectionName(currentIndex)}
          </span>
        </div>
      </div>
    </>
  )
}