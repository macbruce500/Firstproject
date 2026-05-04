'use client'

import Image from 'next/image'
import Link from 'next/link'

const recommendedStories = [
  { id: '2', title: 'Dragon\'s Legacy', creator: 'Marcus Lee', coverImage: 'https://images.unsplash.com/photo-1578632768492-bc6c34b9e6e0?w=200', genre: 'Fantasy' },
  { id: '3', title: 'Love Algorithm', creator: 'Emma Watson', coverImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=200', genre: 'Romance' },
  { id: '4', title: 'Ghost Protocol', creator: 'James Chen', coverImage: 'https://images.unsplash.com/photo-1545671913-e89dcf0db69e?w=200', genre: 'Sci-Fi' },
]

interface RecommendedSidebarProps {
  currentStoryId: string
}

export default function RecommendedSidebar({ currentStoryId }: RecommendedSidebarProps) {
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
      <div className="space-y-4">
        {recommendedStories.map((story) => (
          <Link key={story.id} href={`/story/${story.id}`}>
            <div className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="relative w-16 h-24 flex-shrink-0">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {story.title}
                </h4>
                <p className="text-sm text-gray-400">{story.creator}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary inline-block mt-1">
                  {story.genre}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}