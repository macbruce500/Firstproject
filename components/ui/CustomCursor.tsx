'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const pathname = usePathname()

  // Determine cursor style based on current page
  const getCursorStyle = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/explore') return 'explore'
    if (pathname === '/creators') return 'creators'
    if (pathname === '/upload') return 'upload'
    if (pathname === '/login' || pathname === '/register') return 'auth'
    if (pathname?.startsWith('/story')) return 'reading'
    if (pathname?.startsWith('/creator')) return 'profile'
    return 'default'
  }

  const cursorType = getCursorStyle()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Get cursor content based on page
  const getCursorContent = () => {
    switch(cursorType) {
      case 'home':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#FFD700"
              stroke="#FFA000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#FFA000" />
            <circle cx="20" cy="14" r="1.5" fill="#FFA000" />
            <path d="M13 20C14 21.5 18 21.5 19 20" stroke="#FFA000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      case 'explore':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#6C63FF"
              stroke="#4B3B8A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#4B3B8A" />
            <circle cx="20" cy="14" r="1.5" fill="#4B3B8A" />
            <path d="M16 19L18 23L20 19" stroke="#4B3B8A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      case 'creators':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#FF6584"
              stroke="#CC3366"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13" r="1.5" fill="#CC3366" />
            <circle cx="20" cy="13" r="1.5" fill="#CC3366" />
            <path d="M14 21C15 22 17 22 18 21" stroke="#CC3366" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      case 'upload':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#00F0FF"
              stroke="#00A0CC"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#00A0CC" />
            <circle cx="20" cy="14" r="1.5" fill="#00A0CC" />
            <path d="M16 11V19M13 16L16 19L19 16" stroke="#00A0CC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      case 'auth':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#9D4EDD"
              stroke="#7B2CBF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#7B2CBF" />
            <circle cx="20" cy="14" r="1.5" fill="#7B2CBF" />
            <path d="M14 18H18" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'reading':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#2ECC71"
              stroke="#229954"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#229954" />
            <circle cx="20" cy="14" r="1.5" fill="#229954" />
            <path d="M14 20L16 22L18 20" stroke="#229954" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      case 'profile':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#E67E22"
              stroke="#CA6F1E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#CA6F1E" />
            <circle cx="20" cy="14" r="1.5" fill="#CA6F1E" />
            <path d="M14 18C15 19.5 17 19.5 18 18" stroke="#CA6F1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L19.5 10.5L28 12L21.5 18.5L23.5 27L16 22.5L8.5 27L10.5 18.5L4 12L12.5 10.5L16 2Z"
              fill="#6C63FF"
              stroke="#5A4FDB"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="1.5" fill="#5A4FDB" />
            <circle cx="20" cy="14" r="1.5" fill="#5A4FDB" />
            <path d="M13 20C14 21.5 18 21.5 19 20" stroke="#5A4FDB" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )
    }
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isClicking ? 0.8 : 1,
        rotate: isClicking ? 10 : 0,
      }}
      transition={{
        type: 'tween',
        duration: 0.05,
        ease: 'linear',
      }}
    >
      {getCursorContent()}
    </motion.div>
  )
}