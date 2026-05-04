'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiMenu, FiSearch, FiUpload, FiUser } from 'react-icons/fi'
import MobileMenu from './MobileMenu'
import SearchModal from '@/components/ui/SearchModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const pathname = usePathname()

  // Wait for page to be fully loaded before starting animations
  useEffect(() => {
    const checkPageLoaded = () => {
      if (document.body.classList.contains('page-loaded')) {
        setIsPageLoaded(true)
      } else {
        setTimeout(checkPageLoaded, 100)
      }
    }
    checkPageLoaded()
  }, [])

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Creators', path: '/creators' },
    { name: 'Studio', path: '/upload' },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const logoVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.6 
      }
    },
  }

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.5 
      }
    },
  }

  const actionVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.6 
      }
    },
  }

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-6xl transition-all duration-300 rounded-2xl ${
            scrolled ? 'bg-[#5865F2]/95 shadow-lg backdrop-blur-sm' : 'bg-[#5865F2]'
          }`}
        >
          <div className="px-6 py-3">
            <motion.div 
              className="flex items-center justify-between"
              variants={containerVariants}
              initial="hidden"
              animate={isPageLoaded ? "visible" : "hidden"}
            >
              {/* Logo - Left with blinking dot */}
              <motion.div
                variants={logoVariants}
                className="flex-shrink-0 z-10"
              >
                <Link href="/" className="group relative block">
                  <h1 className="text-xl font-display font-bold text-white">
                    GoodLantey
                    <span className="inline-block relative">
                      <motion.span
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-1 -right-1.5 w-2 h-2 bg-white rounded-full"
                      />
                    </span>
                  </h1>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>

              {/* Desktop Navigation - Center */}
              <motion.div 
                variants={navVariants}
                className="hidden lg:flex items-center gap-1"
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path))
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </motion.div>

              {/* Desktop Actions - Right */}
              <motion.div 
                variants={actionVariants}
                className="hidden lg:flex items-center gap-2 flex-shrink-0 z-10"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchModalOpen(true)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                >
                  <FiSearch className="w-4 h-4" />
                </motion.button>
                <Link href="/upload">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#5865F2] hover:bg-white/90 hover:shadow-lg transition-all duration-300 font-medium text-sm group"
                  >
                    <FiUpload className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Upload</span>
                  </motion.button>
                </Link>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
                  >
                    <FiUser className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                variants={actionVariants}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors z-10 text-white"
              >
                <FiMenu className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  )
}