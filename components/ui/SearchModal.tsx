'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSearch } from 'react-icons/fi'
import Link from 'next/link'

interface Story {
  id: string
  title: string
  creator: string
  coverImage: string
  genre: string
}

const mockStories: Story[] = [
  { id: '1', title: 'Neon Shadows', creator: 'Sarah Kim', coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200', genre: 'Action' },
  { id: '2', title: 'Dragon\'s Legacy', creator: 'Marcus Lee', coverImage: 'https://images.unsplash.com/photo-1578632768492-bc6c34b9e6e0?w=200', genre: 'Fantasy' },
  { id: '3', title: 'Love Algorithm', creator: 'Emma Watson', coverImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=200', genre: 'Romance' },
  { id: '4', title: 'Ghost Protocol', creator: 'James Chen', coverImage: 'https://images.unsplash.com/photo-1545671913-e89dcf0db69e?w=200', genre: 'Sci-Fi' },
  { id: '5', title: 'Midnight Café', creator: 'Yuki Tanaka', coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200', genre: 'Slice of Life' },
  { id: '6', title: 'Infinite Realms', creator: 'David Park', coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200', genre: 'Fantasy' },
  { id: '7', title: 'Whispers of the Past', creator: 'Maria Garcia', coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200', genre: 'Historical' },
  { id: '8', title: 'Digital Hearts', creator: 'Tom Anderson', coverImage: 'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=200', genre: 'Romance' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Story[]>([])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([])
      return
    }

    const filtered = mockStories.filter(story =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setResults(filtered)
  }, [searchQuery])

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stories, creators, or genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="p-8 text-center text-gray-400">
                    <FiSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Search for stories, creators, or genres...</p>
                    <p className="text-sm mt-2">Try: "Action", "Sarah Kim", "Romance"</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try different keywords</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {results.map((story) => (
                      <Link
                        key={story.id}
                        href={`/story/${story.id}`}
                        onClick={onClose}
                      >
                        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold group-hover:text-primary transition-colors">
                                {story.title}
                              </h4>
                              <p className="text-sm text-gray-400">by {story.creator}</p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                  {story.genre}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Tips */}
              {searchQuery.trim() !== '' && results.length > 0 && (
                <div className="p-3 border-t border-white/10 bg-white/5">
                  <p className="text-xs text-gray-400 text-center">
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}