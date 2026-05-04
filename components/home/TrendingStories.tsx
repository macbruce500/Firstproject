'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiHeart, FiEye, FiMessageCircle, FiTrendingUp, FiStar, FiBookOpen } from 'react-icons/fi'

const trendingStories = [
  {
    id: '1',
    title: 'Diesel',
    creator: 'Tyson Hesse',
    creatorAvatar: '/avatar1.jpg',
    coverImage: '/popular1.jpg',
    genre: 'Cyberpunk',
    views: 150000,
    likes: 23000,
    comments: 1234,
    chapters: 24,
    rating: 4.8,
    trendingRank: 1,
  },
  {
    id: '2',
    title: "Ghost Pepper",
    creator: 'Adriano Lucas',
    creatorAvatar: '/avatar2.jpg',
    coverImage: '/popular2.jpg',
    genre: 'Horror',
    views: 120000,
    likes: 18000,
    comments: 987,
    chapters: 18,
    rating: 4.7,
    trendingRank: 2,
  },
  {
    id: '3',
    title: 'Flynn',
    creator: 'Emma Watson',
    creatorAvatar: '/avatar3.jpg',
    coverImage: '/popular3.jpg',
    genre: 'Action',
    views: 98000,
    likes: 15000,
    comments: 876,
    chapters: 12,
    rating: 4.9,
    trendingRank: 3,
  },
]

export default function TrendingStories() {
  const [timeFilter, setTimeFilter] = useState('weekly')

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Header - Centered */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiTrendingUp className="w-6 h-6 text-[#FF6584]" />
            <span className="text-[#FF6584] font-semibold text-sm uppercase tracking-wider">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3">
            Most Popular <span className="text-primary">Stories</span>
          </h2>
          <p className="text-gray-600 text-lg">Discover what readers are loving right now</p>

          {/* Time Filter - Centered under description */}
          <div className="flex justify-center gap-2 bg-gray-100 rounded-full p-1 mt-8 inline-flex mx-auto">
            {['Daily', 'Weekly', 'Monthly', 'All time'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter.toLowerCase())}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  timeFilter === filter.toLowerCase()
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Trending Cards - Centered */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          {trendingStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <Link href={`/story/${story.id}`}>
                <div className="relative">
                  {/* Cover Image Container */}
                  <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    
                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-0 group-hover:border-4 group-hover:border-[#5865F2] transition-all duration-300 pointer-events-none" />
                    
                    {/* Trending Rank Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6584] to-[#FF6584] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_#FF6584] transition-all duration-300">
                        <span className="text-white font-bold text-xl">#{story.trendingRank}</span>
                      </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 rounded-full bg-primary/30 text-primary text-xs font-semibold backdrop-blur-sm">
                          {story.genre}
                        </span>
                        <div className="flex items-center gap-1">
                          <FiStar className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-white text-sm font-semibold">{story.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-200">
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
                      </div>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mt-4 px-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={story.creatorAvatar} alt={story.creator} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Created by</p>
                      <p className="text-gray-900 text-sm font-medium">{story.creator}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* More Stories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <button className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-transparent border-2 border-primary text-primary font-semibold text-base hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300 mx-auto">
              <FiBookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>More Stories</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}