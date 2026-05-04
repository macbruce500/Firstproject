'use client'

import { useMemo } from 'react'
import StoryCard from '../ui/StoryCard'

const allStories = [
  { id: '1', title: 'Neon Shadows', creator: 'Sarah Kim', coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', genre: 'Action', views: 150000, likes: 23000, rating: 4.8, createdAt: '2024-01-15' },
  { id: '2', title: 'Dragon\'s Legacy', creator: 'Marcus Lee', coverImage: 'https://images.unsplash.com/photo-1578632768492-bc6c34b9e6e0?w=400', genre: 'Fantasy', views: 120000, likes: 18000, rating: 4.7, createdAt: '2024-01-20' },
  { id: '3', title: 'Love Algorithm', creator: 'Emma Watson', coverImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400', genre: 'Romance', views: 98000, likes: 15000, rating: 4.9, createdAt: '2024-01-18' },
  { id: '4', title: 'Ghost Protocol', creator: 'James Chen', coverImage: 'https://images.unsplash.com/photo-1545671913-e89dcf0db69e?w=400', genre: 'Sci-Fi', views: 87000, likes: 12000, rating: 4.6, createdAt: '2024-01-22' },
  { id: '5', title: 'Midnight Café', creator: 'Yuki Tanaka', coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400', genre: 'Slice of Life', views: 50000, likes: 8000, rating: 4.5, createdAt: '2024-01-25' },
  { id: '6', title: 'Infinite Realms', creator: 'David Park', coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', genre: 'Fantasy', views: 42000, likes: 6500, rating: 4.7, createdAt: '2024-01-23' },
  { id: '7', title: 'Whispers of the Past', creator: 'Maria Garcia', coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400', genre: 'Action', views: 38000, likes: 5200, rating: 4.4, createdAt: '2024-01-21' },
  { id: '8', title: 'Digital Hearts', creator: 'Tom Anderson', coverImage: 'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=400', genre: 'Romance', views: 31000, likes: 4300, rating: 4.6, createdAt: '2024-01-24' },
]

interface StoryGridProps {
  searchQuery: string
  category: string
  sortBy: string
}

export default function StoryGrid({ searchQuery, category, sortBy }: StoryGridProps) {
  const filteredStories = useMemo(() => {
    let filtered = [...allStories]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.creator.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((story) => story.genre === category)
    }

    // Sort
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'top_rated':
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    return filtered
  }, [searchQuery, category, sortBy])

  if (filteredStories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No stories found. Try a different search!</p>
      </div>
    )
  }

  return (
    <div className="grid-responsive">
      {filteredStories.map((story) => (
        <StoryCard key={story.id} {...story} />
      ))}
    </div>
  )
}