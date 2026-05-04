'use client'

import { useParams } from 'next/navigation'
import CreatorProfileHeader from '@/components/creator/CreatorProfileHeader'
import CreatorStoryGrid from '@/components/creator/CreatorStoryGrid'

// Mock creator data
const creator = {
  id: '1',
  name: 'Sarah Kim',
  handle: '@sarahkim',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
  bio: 'Award-winning comic artist and storyteller. Creating immersive cyberpunk and fantasy worlds. ✨',
  location: 'Seoul, South Korea',
  joined: 'January 2023',
  followers: 125000,
  following: 342,
  website: 'https://sarahkimart.com',
  twitter: '@sarahkim',
  instagram: '@sarahkim_art',
}

const creatorStories = [
  { id: '1', title: 'Neon Shadows', creator: creator.name, coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', genre: 'Action', views: 150000, likes: 23000 },
  { id: '5', title: 'Midnight Café', creator: creator.name, coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400', genre: 'Slice of Life', views: 50000, likes: 8000 },
]

export default function CreatorProfilePage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen">
      <CreatorProfileHeader creator={creator} />
      <div className="container-custom py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold mb-2">Stories by {creator.name}</h2>
          <p className="text-gray-400">{creatorStories.length} stories published</p>
        </div>
        <CreatorStoryGrid stories={creatorStories} />
      </div>
    </div>
  )
}