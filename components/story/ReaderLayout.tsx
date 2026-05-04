'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ReaderLayoutProps {
  chapterNumber: number
  storyId: string
}

// Mock pages for the chapter
const generateChapterPages = (chapterNum: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${storyId}-${chapterNum}-${i}/800/1200`,
  }))
}

export default function ReaderLayout({ chapterNumber, storyId }: ReaderLayoutProps) {
  const pages = generateChapterPages(chapterNumber)

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <Image
              src={page.url}
              alt={`Page ${index + 1}`}
              width={800}
              height={1200}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}