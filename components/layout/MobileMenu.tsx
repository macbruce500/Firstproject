'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiX, FiHome, FiCompass, FiUpload, FiUser, FiLogIn } from 'react-icons/fi'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Explore', icon: FiCompass, href: '/explore' },
  { name: 'Studio', icon: FiUpload, href: '/upload' },
  { name: 'Profile', icon: FiUser, href: '/login' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 glass z-50 shadow-2xl"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

// Find the logo section and update to:
<h1 className="text-2xl font-display font-bold text-white">
  GoodLantey
  <span className="inline-block relative">
    <span className="text-white">.</span>
    <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-white rounded-full animate-pulse" />
  </span>
</h1>

            <div className="flex flex-col gap-2 p-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium">{item.name}</span>
                </Link>
              ))}

              <div className="mt-8 pt-8 border-t border-white/10">
                <Link href="/register" onClick={onClose}>
                  <button className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-medium hover:shadow-neon transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}