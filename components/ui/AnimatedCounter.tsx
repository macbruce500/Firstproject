'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  live?: boolean
  incrementAmount?: number
  incrementInterval?: number
}

export default function AnimatedCounter({ 
  end, 
  start = 0,
  duration = 2, 
  suffix = '', 
  live = false,
  incrementAmount = 1,
  incrementInterval = 5000
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Initial count-up animation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          
          let startTime: number | null = null
          let animationFrame: number
          const startValue = start
          const endValue = end
          const totalDuration = duration * 1000

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / totalDuration, 1)
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(startValue + (easeOutQuart * (endValue - startValue)))
            
            setCount(currentCount)

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate)
            } else {
              setCount(endValue)
            }
          }

          animationFrame = requestAnimationFrame(animate)
          return () => cancelAnimationFrame(animationFrame)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, start, duration, hasStarted])

  // Live updates after initial count-up
  useEffect(() => {
    if (!live || !hasStarted) return

    const interval = setInterval(() => {
      setCount(prevCount => {
        const randomIncrement = Math.floor(Math.random() * incrementAmount) + 1
        return prevCount + randomIncrement
      })
    }, incrementInterval)

    return () => clearInterval(interval)
  }, [live, hasStarted, incrementAmount, incrementInterval])

  // Format number for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  )
}