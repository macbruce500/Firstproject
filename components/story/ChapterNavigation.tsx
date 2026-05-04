'use client'

import { FiChevronLeft, FiChevronRight, FiList } from 'react-icons/fi'

interface ChapterNavigationProps {
  currentChapter: number
  totalChapters: number
  onChapterChange: (chapter: number) => void
}

export default function ChapterNavigation({
  currentChapter,
  totalChapters,
  onChapterChange,
}: ChapterNavigationProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10">
      <button
        onClick={() => onChapterChange(Math.max(1, currentChapter - 1))}
        disabled={currentChapter === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <FiList className="w-4 h-4 text-gray-400" />
        <span className="text-sm">
          Chapter {currentChapter} of {totalChapters}
        </span>
      </div>
      
      <button
        onClick={() => onChapterChange(Math.min(totalChapters, currentChapter + 1))}
        disabled={currentChapter === totalChapters}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}