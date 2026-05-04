'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FiHeart, FiMessageCircle, FiBookOpen, FiShare2, 
  FiX, FiTwitter, FiInstagram, FiFacebook, FiCopy, FiStar
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const featuredStories = [
  {
    id: '1',
    title: 'Primer',
    creator: 'Alex Chen',
    creatorAvatar: '/avatar1.jpg',
    description: 'In a neon-drenched cyberpunk Tokyo, a lone samurai fights against corporate tyranny.',
    coverImage: '/1.jpg',
    genre: 'Action',
    likes: 23456,
    rating: 4.8,
    chapters: 24,
    views: 150000,
  },
  {
    id: '2',
    title: 'The New Girl',
    creator: 'Cassandra Calin',
    creatorAvatar: '/avatar2.jpg',
    description: 'A magical journey through space and time where dreams become reality.',
    coverImage: '/4.jpg',
    genre: 'Fantasy',
    likes: 18765,
    rating: 4.9,
    chapters: 18,
    views: 98000,
  },
  {
    id: '3',
    title: 'Big Girls 6',
    creator: 'Jason Howard',
    creatorAvatar: '/avatar3.jpg',
    description: 'Time-bending thriller about a detective who can see glimpses of the future.',
    coverImage: '/2.jpg',
    genre: 'Sci-Fi',
    likes: 15432,
    rating: 4.7,
    chapters: 31,
    views: 87000,
  },
]

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(featuredStories[0]?.likes || 0)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const story = featuredStories[current]

  // Simple auto-rotation with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredStories.length)
      setLiked(false)
      setLikesCount(featuredStories[(current + 1) % featuredStories.length]?.likes || 0)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [current])

  const handleLike = () => {
    if (!liked) {
      setLikesCount(prev => prev + 1)
      setLiked(true)
    } else {
      setLikesCount(prev => prev - 1)
      setLiked(false)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out "${story.title}" on GoodLantey!`
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank')
        break
    }
    setShowShareModal(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!story) return null

  return (
    <>
      {/* Featured Section */}
      <div className="min-h-screen w-full bg-white">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-6">
              {/* Genre Badge */}
              <div>
                <span className="px-4 py-2 rounded-full bg-[#5865F2]/20 text-[#5865F2] text-sm font-semibold">
                  {story.genre}
                </span>
              </div>

              {/* Title with colors */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                {story.title === 'The New Girl' ? (
                  <>
                    The <span className="text-[#088f98]">New</span>{' '}
                    <span className="text-[#dd419a]">Girl</span>
                  </>
                ) : story.title === 'Big Girls 6' ? (
                  <>
                    Big <span className="text-[#b0cbd0]">Girls</span>{' '}
                    <span className="text-[#c44f64]">6</span>
                  </>
                ) : story.title === 'Primer' ? (
                  <span className="text-[#6170ab]">Primer</span>
                ) : (
                  story.title
                )}
              </h2>

              {/* Creator */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={story.creatorAvatar} alt={story.creator} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Created by</p>
                  <p className="text-gray-900 font-semibold">{story.creator}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {story.description}
              </p>

              {/* Buttons with Hovers - Color only, no scaling */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/story/${story.id}`}>
                  <button className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border-2 border-[#FFD700] hover:border-[#5865F2] hover:bg-[#5865F2] transition-all duration-200 font-semibold text-gray-900">
                    <FiBookOpen className="w-5 h-5 text-[#FFD700] group-hover:text-white" />
                    <span className="text-[#FFD700] group-hover:text-white">Read More</span>
                  </button>
                </Link>

                <button 
                  onClick={handleLike} 
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-full border-2 transition-all duration-200 font-semibold ${
                    liked ? 'border-[#FF6584] bg-[#FF6584]/20 text-[#FF6584]' : 'border-gray-300 bg-white text-gray-700 hover:border-[#FF6584] hover:bg-[#FF6584]/10'
                  }`}
                >
                  <FiHeart className={`w-5 h-5 ${liked ? 'fill-[#FF6584]' : ''}`} />
                  <span>{likesCount.toLocaleString()}</span>
                </button>

                <button 
                  onClick={() => setShowShareModal(true)} 
                  className="p-3.5 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-200"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(story.rating) ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-gray-900 font-semibold ml-2">{story.rating}</span>
                </div>
                <div className="text-gray-500 text-sm">{story.chapters} chapters</div>
                <div className="text-gray-500 text-sm">{story.views.toLocaleString()} views</div>
              </div>
            </div>

            {/* Right Side - Cover Image - NO HOVER EFFECTS */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={story.coverImage} 
                    alt={story.title} 
                    fill 
                    className="object-cover" 
                    quality={75}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Dots Navigation */}
              <div className="flex gap-3 mt-8">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index)
                      setLiked(false)
                      setLikesCount(featuredStories[index]?.likes || 0)
                    }}
                    className={`transition-all duration-150 rounded-full ${
                      index === current
                        ? 'w-10 h-2 bg-gradient-to-r from-primary to-secondary'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Share "{story.title}"</h3>
              <button onClick={() => setShowShareModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-[#1DA1F2]/10 transition-all">
                <FiTwitter className="w-6 h-6 text-[#1DA1F2]" />
                <span>Twitter</span>
              </button>
              <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-[#4267B2]/10 transition-all">
                <FiFacebook className="w-6 h-6 text-[#4267B2]" />
                <span>Facebook</span>
              </button>
              <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-[#25D366]/10 transition-all">
                <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button onClick={copyLink} className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
                {copied ? <FiCheck className="w-5 h-5 text-green-500" /> : <FiCopy className="w-5 h-5" />}
                <span>{copied ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}