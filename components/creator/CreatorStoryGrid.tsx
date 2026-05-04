'use client'

import StoryCard from '../ui/StoryCard'

interface CreatorStoryGridProps {
  stories: Array<{
    id: string
    title: string
    creator: string
    coverImage: string
    genre: string
    views: number
    likes: number
  }>
}

export default function CreatorStoryGrid({ stories }: CreatorStoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No stories published yet.</p>
      </div>
    )
  }

  return (
    <div className="grid-responsive">
      {stories.map((story) => (
        <StoryCard key={story.id} {...story} />
      ))}
    </div>
  )
}