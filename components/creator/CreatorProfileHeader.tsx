'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiGlobe, FiTwitter, FiInstagram, FiUsers } from 'react-icons/fi'

interface CreatorProfileHeaderProps {
  creator: {
    name: string
    handle: string
    avatar: string
    banner: string
    bio: string
    location: string
    joined: string
    followers: number
    following: number
    website?: string
    twitter?: string
    instagram?: string
  }
}

export default function CreatorProfileHeader({ creator }: CreatorProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={creator.banner}
          alt={creator.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="container-custom relative">
        <div className="flex flex-col md:flex-row gap-6 -mt-20 pb-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-primary/50 overflow-hidden">
              <Image
                src={creator.avatar}
                alt={creator.name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">{creator.name}</h1>
                <p className="text-gray-400">{creator.handle}</p>
              </div>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-medium hover:shadow-neon transition-all">
                Follow
              </button>
            </div>

            <p className="text-gray-300 mt-4 max-w-2xl">{creator.bio}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
              {creator.location && (
                <div className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4" />
                  <span>{creator.location}</span>
                </div>
              )}
              {creator.joined && (
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>Joined {creator.joined}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FiUsers className="w-4 h-4" />
                <span>{creator.followers.toLocaleString()} followers</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {creator.website && (
                <a href={creator.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 transition-colors">
                  <FiGlobe className="w-4 h-4" />
                </a>
              )}
              {creator.twitter && (
                <a href={`https://twitter.com/${creator.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 transition-colors">
                  <FiTwitter className="w-4 h-4" />
                </a>
              )}
              {creator.instagram && (
                <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 transition-colors">
                  <FiInstagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}