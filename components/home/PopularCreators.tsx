'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiUsers, FiTwitter, FiInstagram, FiGlobe, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const creators = [
  {
    id: '1',
    name: 'Alex Chen',
    handle: '@alexchen',
    avatar: '/creatorP1.jpg',
    bio: 'Award-winning cyberpunk artist creating immersive futuristic worlds.',
    followers: '125K',
    stories: 24,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    handle: '@maya_art',
    avatar: '/creatorP2.jpg',
    bio: 'Fantasy illustrator crafting magical realms and mythical creatures.',
    followers: '98K',
    stories: 18,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Kenji Tanaka',
    handle: '@kenji_manga',
    avatar: '/creatorP3.jpg',
    bio: 'Master of suspense and thriller manga with edge-of-your-seat stories.',
    followers: '87K',
    stories: 31,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Emma Watson',
    handle: '@emmawatsonart',
    avatar: '/creatorP4.jpg',
    bio: 'Romance artist capturing heartfelt moments and authentic emotions.',
    followers: '76K',
    stories: 15,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Marcus Lee',
    handle: '@marcus_lee',
    avatar: '/creatorP5.jpg',
    bio: 'Epic fantasy artist creating grand adventures and legendary heroes.',
    followers: '68K',
    stories: 20,
    rating: 4.8,
  },
  {
    id: '6',
    name: 'Sophia White',
    handle: '@sophia_art',
    avatar: '/creatorP6.jpg',
    bio: 'Slice-of-life artist capturing beautiful everyday moments.',
    followers: '54K',
    stories: 12,
    rating: 4.7,
  },
]

export default function PopularCreators() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const visibleCreators = 2
  const totalPages = Math.ceil(creators.length / visibleCreators)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentCreators = creators.slice(
    currentIndex * visibleCreators,
    currentIndex * visibleCreators + visibleCreators
  )

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <FiUsers className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Meet Our Stars</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3">
            Popular <span className="text-primary">Creators</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the talented artists behind your favorite stories
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows - Fixed position */}
          <button
            onClick={prevSlide}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Creators Grid - 2 at a time */}
          <div className="overflow-hidden px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid md:grid-cols-2 gap-8"
              >
                {currentCreators.map((creator) => (
                  <motion.div
                    key={creator.id}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-dark-400 to-dark-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-primary/30">
                      {/* Layout: Image on left, content stacked on right */}
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Side - Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="relative w-full md:w-40 h-48 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-primary/20 group-hover:ring-primary/40">
                            <Image
                              src={creator.avatar}
                              alt={creator.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>

                        {/* Right Side - Content stacked vertically */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Top section - Name and Rating */}
                          <div>
                            <div className="mb-2">
                              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                                {creator.name}
                              </h3>
                              <p className="text-primary/70 text-sm">{creator.handle}</p>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <FiStar 
                                    className={`w-4 h-4 ${i < Math.floor(creator.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                                  />
                                </motion.div>
                              ))}
                              <span className="text-sm text-gray-400 ml-1">{creator.rating}</span>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                              {creator.bio}
                            </p>
                          </div>

                          {/* Bottom section - Stats and Buttons */}
                          <div>
                            {/* Stats Pills */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="text-sm font-semibold text-white">{creator.followers}</span>
                                <span className="text-xs text-gray-400">followers</span>
                              </div>
                              <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="text-sm font-semibold text-white">{creator.stories}</span>
                                <span className="text-xs text-gray-400">stories</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-4">
                              <button className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-[0_0_15px_#5865F2] transition-all duration-300">
                                Follow
                              </button>
                              <Link href={`/creator/${creator.id}`} className="flex-1">
                                <button className="w-full py-2.5 rounded-full border-2 border-white/20 text-gray-300 font-semibold text-sm hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300">
                                  Profile
                                </button>
                              </Link>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2 border-t border-white/10">
                              <motion.button 
                                whileHover={{ y: -3, scale: 1.1 }}
                                className="text-gray-500 hover:text-[#1DA1F2] transition-all duration-300"
                              >
                                <FiTwitter className="w-4 h-4" />
                              </motion.button>
                              <motion.button 
                                whileHover={{ y: -3, scale: 1.1 }}
                                className="text-gray-500 hover:text-[#E4405F] transition-all duration-300"
                              >
                                <FiInstagram className="w-4 h-4" />
                              </motion.button>
                              <motion.button 
                                whileHover={{ y: -3, scale: 1.1 }}
                                className="text-gray-500 hover:text-primary transition-all duration-300"
                              >
                                <FiGlobe className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1)
                  setCurrentIndex(idx)
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-primary to-secondary'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/creators">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base hover:shadow-[0_0_20px_#5865F2] transition-all duration-300"
            >
              <FiUsers className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>View All Creators</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}