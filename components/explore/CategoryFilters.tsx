'use client'

const categories = ['All', 'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Comedy', 'Horror', 'Slice of Life']

interface CategoryFiltersProps {
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === category
              ? 'bg-primary text-white shadow-neon'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}