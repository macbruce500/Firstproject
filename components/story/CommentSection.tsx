'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiHeart, FiMessageCircle } from 'react-icons/fi'

interface Comment {
  id: string
  user: string
  avatar: string
  content: string
  likes: number
  timestamp: string
}

const mockComments: Comment[] = [
  {
    id: '1',
    user: 'Alex Reader',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    content: 'Amazing artwork! The cyberpunk aesthetic is incredible.',
    likes: 45,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    user: 'MangaFan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'The story keeps getting better each chapter!',
    likes: 32,
    timestamp: '5 hours ago',
  },
]

interface CommentSectionProps {
  storyId: string
}

export default function CommentSection({ storyId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // Mock adding comment (no backend)
      alert('Comment functionality will be available after backend integration!')
      setNewComment('')
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiMessageCircle className="w-5 h-5" />
        Comments ({mockComments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this chapter..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-medium hover:shadow-neon transition-all"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {mockComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <Image
              src={comment.avatar}
              alt={comment.user}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{comment.user}</span>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
              <button className="flex items-center gap-1 mt-2 text-sm text-gray-400 hover:text-primary transition-colors">
                <FiHeart className="w-3 h-3" />
                {comment.likes}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}