'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiBook, FiZap, FiHeart, FiSmile, FiShield, FiGlobe } from 'react-icons/fi'

const categories = [
  { id: 1, name: 'Action', icon: FiZap, color: '#FF4444', count: '2.3K', description: 'High-octane adventures', image: '/category1.jpg' },
  { id: 2, name: 'Romance', icon: FiHeart, color: '#FF69B4', count: '1.8K', description: 'Heartfelt love stories', image: '/category2.jpg' },
  { id: 3, name: 'Fantasy', icon: FiBook, color: '#9B59B6', count: '3.1K', description: 'Magical realms', image: '/category3.jpg' },
  { id: 4, name: 'Comedy', icon: FiSmile, color: '#F1C40F', count: '1.2K', description: 'Laugh-out-loud funny', image: '/category4.jpg' },
  { id: 5, name: 'Superhero', icon: FiShield, color: '#3498DB', count: '987', description: 'Capes and masks', image: '/category5.jpg' },
  { id: 6, name: 'Horror', icon: FiGlobe, color: '#E67E22', count: '654', description: 'Terrifying tales', image: '/category6.jpg' },
  { id: 7, name: 'Sci-Fi', icon: FiGlobe, color: '#00F0FF', count: '1.5K', description: 'Futuristic worlds', image: '/category7.jpg' },
  { id: 8, name: 'Slice of Life', icon: FiBook, color: '#2ECC71', count: '876', description: 'Everyday moments', image: '/category8.jpg' },
  { id: 9, name: 'Mystery', icon: FiGlobe, color: '#8E44AD', count: '543', description: 'Suspenseful secrets', image: '/category9.jpg' },
  { id: 10, name: 'Historical', icon: FiBook, color: '#D35400', count: '432', description: 'Past adventures', image: '/category10.jpg' },
]

// Duplicate for endless scroll
const endlessCategories = [...categories, ...categories, ...categories]

export default function CategoriesSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [isHoveringScroll, setIsHoveringScroll] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect with 3 cards visible before starting
  useEffect(() => {
    if (!isHoveringScroll && scrollContainerRef.current) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current && !isHoveringScroll) {
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
          // Start scrolling after showing 3 cards
          if (scrollContainerRef.current.scrollLeft >= maxScroll - scrollContainerRef.current.clientWidth / 2) {
            scrollContainerRef.current.scrollTo({ left: 1, behavior: 'auto' })
          } else {
            scrollContainerRef.current.scrollBy({ left: 2, behavior: 'smooth' })
          }
        }
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isHoveringScroll])

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="container-custom">
        {/* Header - Matching Popular Creators style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <FiBook className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Explore Genres</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3">
            Browse by <span className="text-[#5865F2]">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover stories that match your taste
          </p>
        </motion.div>

        {/* Scrollable Categories - Larger cards */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHoveringScroll(true)}
          onMouseLeave={() => setIsHoveringScroll(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-6 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {endlessCategories.map((category, index) => (
            <motion.div
              key={`${category.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % categories.length) * 0.05 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="flex-shrink-0 w-72 group/card cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                {/* Category Image - Optimized for landscape */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Icon overlay - Top right */}
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/20">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content - Larger text like Popular Creators */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${category.color}15` }}
                    >
                      <span className="text-xs font-bold" style={{ color: category.color }}>{category.count}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-3">{category.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{category.count} stories</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color, opacity: 0.5 }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color, opacity: 0.2 }} />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect - Subtle */}
                {hoveredCategory === category.id && (
                  <motion.div
                    layoutId="categoryGlow"
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: `0 0 20px ${category.color}30` }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Scroll to explore more →</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}