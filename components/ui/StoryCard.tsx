'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiEye, FiHeart, FiBookmark } from 'react-icons/fi'

interface StoryCardProps {
  id: string
  title: string
  creator: string
  coverImage: string
  genre: string
  views: number
  likes: number
  featured?: boolean
}

export default function StoryCard({
  id,
  title,
  creator,
  coverImage,
  genre,
  views,
  likes,
  featured = false,
}: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link href={`/story/${id}`}>
        <div className="relative overflow-hidden rounded-xl">
          {/* Cover Image */}
          <div className="aspect-[2/3] relative">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300 pointer-events-none" />

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-gradient-to-r from-primary to-secondary text-xs font-semibold">
              FEATURED
            </div>
          )}

          {/* Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-500 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <FiEye className="w-3 h-3" />
                <span>{views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiHeart className="w-3 h-3" />
                <span>{likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{creator}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
              {genre}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}