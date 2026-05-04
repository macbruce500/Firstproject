'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MouseTrail() {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    let counter = 0
    const handleMouseMove = (e: MouseEvent) => {
      counter++
      if (counter % 3 === 0) { // Add trail every 3 mouse movements
        setTrails(prev => {
          const newTrails = [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]
          if (newTrails.length > 15) newTrails.shift()
          return newTrails
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-10))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle
              cx="8"
              cy="8"
              r="4"
              fill="url(#trailGradient)"
              opacity={0.6 - index * 0.04}
            />
            <defs>
              <radialGradient id="trailGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF6584" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </>
  )
}