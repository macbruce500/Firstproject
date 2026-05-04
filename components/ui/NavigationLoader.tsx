'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ComicLoader from './ComicLoader'

export default function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const pathname = usePathname()

  // Handle initial page load - wait for loader to finish before any animations start
  useEffect(() => {
    if (isFirstLoad) {
      // Remove page-loaded class if exists
      document.body.classList.remove('page-loaded')
      
      // Wait 2.5 seconds for loader to complete before showing page and animations
      const timer = setTimeout(() => {
        setIsLoading(false)
        setIsFirstLoad(false)
        // Add class to trigger all page animations and effects
        document.body.classList.add('page-loaded')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isFirstLoad])

  // Handle navigation - ensure loader completes before new page effects
  useEffect(() => {
    if (!isFirstLoad) {
      // Remove page-loaded class to prevent animations
      document.body.classList.remove('page-loaded')
      setIsLoading(true)
      
      // Wait for loader to complete before showing new page content
      const timer = setTimeout(() => {
        setIsLoading(false)
        // Re-enable animations after loader finishes
        document.body.classList.add('page-loaded')
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [pathname, isFirstLoad])

  return <ComicLoader isLoading={isLoading} />
}