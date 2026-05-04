'use client'

import { useEffect, useRef } from 'react'

export default function ScrollFade() {
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()
  const isNavigating = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if this is manual scroll or navigation
      if (!isNavigating.current) {
        isScrolling.current = true
      }
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
        isNavigating.current = false
      }, 300)
      
      const contentContainers = document.querySelectorAll('.container-custom')
      const navbarHeight = 80
      
      contentContainers.forEach((container) => {
        const rect = container.getBoundingClientRect()
        const distanceFromTop = rect.top
        
        // Only fade when content is COMPLETELY under the navbar (distance <= 0)
        if (isScrolling.current && !isNavigating.current) {
          if (distanceFromTop <= 0) {
            // Fully under navbar - fade out
            ;(container as HTMLElement).style.opacity = '0'
            ;(container as HTMLElement).style.transition = 'opacity 0.2s ease-out'
          } else {
            // Not under navbar yet - fully visible
            ;(container as HTMLElement).style.opacity = '1'
          }
        } else {
          // During navigation, keep everything visible
          ;(container as HTMLElement).style.opacity = '1'
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  return null
}