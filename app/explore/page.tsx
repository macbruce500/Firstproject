'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/explore/SearchBar'
import CategoryFilters from '@/components/explore/CategoryFilters'
import StoryGrid from '@/components/explore/StoryGrid'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('trending')

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gradient-to-r from-primary/20 via-secondary/20 to-neon-cyan/20 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500 to-transparent" />
        <div className="relative container-custom h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Explore <span className="neon-text">Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl"
          >
            Discover amazing comics, manga, and visual stories from creators around the world
          </motion.p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-20 glass border-b border-white/10">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="flex flex-wrap gap-3">
              <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none"
              >
                <option value="trending">Trending</option>
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="top_rated">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Story Grid */}
      <div className="container-custom py-8">
        <StoryGrid searchQuery={searchQuery} category={selectedCategory} sortBy={sortBy} />
      </div>
    </div>
  )
}