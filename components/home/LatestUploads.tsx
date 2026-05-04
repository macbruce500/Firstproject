'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiHeart, FiEye, FiMessageCircle, FiClock, FiStar, FiBookOpen } from 'react-icons/fi'

const latestStories = [
  {
    id: '1',
    title: 'Textos et Cie',
    creator: 'piranha Bouille',
    creatorAvatar: '/avatar1.jpg',
    coverImage: '/latest1.jpg',
    genre: 'Romance',
    views: 50000,
    likes: 8000,
    comments: 432,
    chapters: 15,
    rating: 4.5,
    uploadedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Sisters',
    creator: 'Gazenove William',
    creatorAvatar: '/avatar2.jpg',
    coverImage: '/latest2.jpg',
    genre: 'Family',
    views: 42000,
    likes: 6500,
    comments: 345,
    chapters: 22,
    rating: 4.7,
    uploadedAt: '5 hours ago',
  },
  {
    id: '3',
    title: 'Angus',
    creator: 'Mark Garcia',
    creatorAvatar: '/avatar3.jpg',
    coverImage: '/latest3.jpg',
    genre: 'Action',
    views: 38000,
    likes: 5200,
    comments: 234,
    chapters: 18,
    rating: 4.4,
    uploadedAt: '1 day ago',
  },
  {
    id: '4',
    title: 'Coconauts',
    creator: 'Gene Goldstein',
    creatorAvatar: '/avatar3.jpg',
    coverImage: '/latest4.jpg',
    genre: 'For Kids',
    views: 31000,
    likes: 4300,
    comments: 198,
    chapters: 12,
    rating: 4.6,
    uploadedAt: '2 days ago',
  },
  {
    id: '5',
    title: 'Ghost Centaur',
    creator: 'Steph Mided',
    creatorAvatar: '/avatar1.jpg',
    coverImage: '/latest5.jpg',
    genre: 'Adventure',
    views: 28000,
    likes: 3900,
    comments: 167,
    chapters: 20,
    rating: 4.8,
    uploadedAt: '3 days ago',
  },
  {
    id: '6',
    title: 'Twins',
    creator: 'Shannon Wright',
    creatorAvatar: '/avatar2.jpg',
    coverImage: '/latest6.jpg',
    genre: 'Drama',
    views: 25000,
    likes: 3500,
    comments: 145,
    chapters: 16,
    rating: 4.7,
    uploadedAt: '4 days ago',
  },
]

// Duplicate for endless scroll
const endlessStories = [...latestStories, ...latestStories, ...latestStories]

export default function LatestUploads() {
  const [isHoveringScroll, setIsHoveringScroll] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect with endless loop
  useEffect(() => {
    if (!isHoveringScroll && scrollContainerRef.current) {
      const interval = setInterval(() => {
        if (scrollContainerRef.current && !isHoveringScroll) {
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
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
    <section className="bg-white py-12 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiClock className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Fresh Content</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Latest <span className="text-[#5865F2]">Uploads</span>
              </h2>
              <p className="text-gray-600 text-lg mt-1">New stories added by our community</p>
            </div>
            <Link href="/explore">
              <button className="group flex items-center gap-2 px-5 py-2 rounded-full bg-transparent border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300">
                <span>View All</span>
                <FiBookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Horizontal Scrollable Cards - Full covers */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHoveringScroll(true)}
          onMouseLeave={() => setIsHoveringScroll(false)}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {endlessStories.map((story, index) => (
            <motion.div
              key={`${story.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % latestStories.length) * 0.05 }}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-72 group/card cursor-pointer"
            >
              <Link href={`/story/${story.id}`}>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Full Cover Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Genre Badge - Top Left */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm text-white text-xs font-medium">
                        {story.genre}
                      </span>
                    </div>

                    {/* Rating Badge - Top Right */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                        <FiStar className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-white text-xs font-semibold">{story.rating}</span>
                      </div>
                    </div>

                    {/* Content Overlay at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{story.title}</h3>
                      
                      {/* Creator Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white/30">
                          <Image src={story.creatorAvatar} alt={story.creator} fill className="object-cover" />
                        </div>
                        <span className="text-xs text-white/90">{story.creator}</span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <FiEye className="w-3 h-3" />
                            <span>{(story.views / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiHeart className="w-3 h-3" />
                            <span>{(story.likes / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMessageCircle className="w-3 h-3" />
                            <span>{story.comments}</span>
                          </div>
                        </div>
                        <div className="text-xs text-white/60">{story.uploadedAt}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Scroll to see more →</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}