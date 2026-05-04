'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import StoryHeader from '@/components/story/StoryHeader'
import ReaderLayout from '@/components/story/ReaderLayout'
import ChapterNavigation from '@/components/story/ChapterNavigation'
import CommentSection from '@/components/story/CommentSection'
import RecommendedSidebar from '@/components/story/RecommendedSidebar'

export default function StoryPage() {
  const { id } = useParams()
  const [currentChapter, setCurrentChapter] = useState(1)
  const totalChapters = 24

  // Mock story data
  const story = {
    id,
    title: 'Neon Shadows',
    creator: 'Sarah Kim',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    description: 'In a neon-drenched cyberpunk Tokyo, a lone samurai fights against corporate tyranny...',
    genre: 'Action',
    rating: 4.8,
    views: 150000,
    likes: 23000,
  }

  return (
    <div className="min-h-screen bg-dark-500">
      <StoryHeader story={story} />
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <ChapterNavigation
              currentChapter={currentChapter}
              totalChapters={totalChapters}
              onChapterChange={setCurrentChapter}
            />
            <ReaderLayout chapterNumber={currentChapter} storyId={id as string} />
            <CommentSection storyId={id as string} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80">
            <RecommendedSidebar currentStoryId={id as string} />
          </div>
        </div>
      </div>
    </div>
  )
}