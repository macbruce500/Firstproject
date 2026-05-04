'use client'

import Image from 'next/image'
import { FiHeart, FiShare2, FiBookmark, FiStar } from 'react-icons/fi'

interface StoryHeaderProps {
  story: {
    title: string
    creator: string
    coverImage: string
    description: string
    genre: string
    rating: number
    views: number
    likes: number
  }
}

export default function StoryHeader({ story }: StoryHeaderProps) {
  return (
    <div className="relative h-[400px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={story.coverImage}
        alt={story.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/70 to-transparent" />
      
      {/* Content */}
      <div className="relative container-custom h-full flex flex-col justify-end pb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{story.title}</h1>
        <p className="text-gray-300 mb-2">by {story.creator}</p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">{story.genre}</span>
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{story.rating}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{story.views.toLocaleString()} views</span>
          </div>
        </div>
        
        <p className="text-gray-300 max-w-2xl mb-6">{story.description}</p>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-medium hover:shadow-neon transition-all">
            <FiHeart className="w-4 h-4" />
            Like ({story.likes.toLocaleString()})
          </button>
          <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
            <FiBookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}