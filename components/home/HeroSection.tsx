'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiPlay, FiInfo } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function HeroSection() {
  const welcomeText = "Welcome to the Future of Storytelling"
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= welcomeText.length) {
        setDisplayedText(welcomeText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Simple Light Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-white to-white" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      {/* Content - Centered */}
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse" />
              )}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="neon-text">Create, Share, </span>
            <span className="text-gray-900">Discover Stories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of creators from around the world. Upload your comics, manga, novels, and visual stories. Experience storytelling like never before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/explore">
  <button className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:bg-[#5865F2] hover:from-[#5865F2] hover:to-[#5865F2] hover:shadow-[0_0_15px_#5865F2] transition-all duration-300 text-lg font-semibold">
    <FiPlay className="w-5 h-5 group-hover:scale-110 transition-transform" />
    Start Exploring
  </button>
</Link>
            <Link href="/register">
              <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border-2 border-[#FFD700] text-gray-700 font-semibold hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white hover:shadow-[0_0_15px_#5865F2] transition-all duration-300 text-lg group">
                <FiInfo className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Join as Creator
              </button>
            </Link>
          </motion.div>

          {/* Stats - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            {[
              { label: 'Active Creators', start: 8500, end: 10000, live: true, incrementAmount: 3, incrementInterval: 8000 },
              { label: 'Stories Published', start: 42000, end: 50000, live: true, incrementAmount: 5, incrementInterval: 6000 },
              { label: 'Monthly Readers', start: 1500000, end: 2000000, live: true, incrementAmount: 50, incrementInterval: 4000 },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center">
                <div className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter 
                    start={stat.start}
                    end={stat.end} 
                    duration={2}
                    suffix="+"
                    live={stat.live}
                    incrementAmount={stat.incrementAmount}
                    incrementInterval={stat.incrementInterval}
                  />
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-2 mt-1">
                  {stat.live && (
                    <>
                      <span className="live-dot"></span>
                      <span className="live-indicator text-green-500 text-xs">Live</span>
                    </>
                  )}
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Centered */}
      {showScrollIndicator && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
          onClick={() => {
            const nextSection = document.getElementById('featured-section')
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center hover:border-primary transition-colors">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      )}
    </section>
  )
}