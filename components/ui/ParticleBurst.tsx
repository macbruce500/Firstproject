'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  angle: number
  velocity: number
}

export default function ParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle: (i * 18) * Math.PI / 180,
          velocity: Math.random() * 8 + 4,
        })
      }
      setParticles(newParticles)

      // Clear particles after animation
      setTimeout(() => {
        setParticles([])
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[10000]"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * particle.velocity * 10,
            y: particle.y + Math.sin(particle.angle) * particle.velocity * 10,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, #FFD700, #FF6584)`,
              boxShadow: '0 0 4px gold',
            }}
          />
        </motion.div>
      ))}
    </>
  )
}