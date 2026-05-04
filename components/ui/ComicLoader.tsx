'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ComicLoaderProps {
  isLoading: boolean
}

export default function ComicLoader({ isLoading }: ComicLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark-500"
        >
          <div className="text-center">
            {/* Speech Bubble Loader */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              }}
              className="relative w-20 h-20 mx-auto mb-4"
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <motion.path
                  d="M40 10C22.5 10 10 22.5 10 40C10 55 18.5 67.5 32 72L28 80L40 72C57.5 72 70 59.5 70 40C70 22.5 57.5 10 40 10Z"
                  fill="#6C63FF"
                  stroke="#FF6584"
                  strokeWidth="2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.circle
                  cx="30"
                  cy="38"
                  r="3"
                  fill="#FFA000"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.circle
                  cx="40"
                  cy="38"
                  r="3"
                  fill="#FFA000"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.circle
                  cx="50"
                  cy="38"
                  r="3"
                  fill="#FFA000"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </svg>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-3"
            >
              <span className="text-sm font-semibold tracking-wider text-primary">
                LOADING
              </span>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}