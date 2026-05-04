'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function UploadStoryForm() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [chapters, setChapters] = useState([{ title: 'Chapter 1', pages: 0 }])

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addChapter = () => {
    setChapters([...chapters, { title: `Chapter ${chapters.length + 1}`, pages: 0 }])
  }

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Story upload functionality will be available after backend integration!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
        
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Story Title *</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none"
              placeholder="Enter your story title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none resize-none"
              placeholder="Tell readers what your story is about..."
              required
            />
          </div>

          {/* Genre & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Genre *</label>
              <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none">
                <option>Action</option>
                <option>Fantasy</option>
                <option>Romance</option>
                <option>Sci-Fi</option>
                <option>Comedy</option>
                <option>Horror</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none"
                placeholder="cyberpunk, adventure, drama"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Cover Image</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="cursor-pointer">
                <FiUpload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-400">Click to upload cover image</p>
                <p className="text-xs text-gray-500 mt-1">Recommended: 800x1200px, JPG or PNG</p>
              </label>
            </div>
          </div>
          {coverPreview && (
            <div className="w-40">
              <img src={coverPreview} alt="Cover preview" className="w-full rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Chapters */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Chapters</h2>
          <button
            type="button"
            onClick={addChapter}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Chapter
          </button>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => {
                    const newChapters = [...chapters]
                    newChapters[index].title = e.target.value
                    setChapters(newChapters)
                  }}
                  className="w-full px-3 py-1 rounded bg-white/10 border border-white/10 text-white focus:border-primary focus:outline-none"
                  placeholder="Chapter title"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{chapter.pages} pages</span>
                <label className="cursor-pointer px-3 py-1 rounded bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors">
                  Upload
                  <input type="file" accept="image/*" multiple className="hidden" />
                </label>
                {chapters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChapter(index)}
                    className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-medium hover:shadow-neon transition-all"
        >
          Publish Story
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded-full glass border border-white/20 hover:border-primary/50 transition-all"
        >
          Save as Draft
        </button>
      </div>
    </form>
  )
}