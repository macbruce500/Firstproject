'use client'

import { FiUpload, FiFolder, FiEdit, FiBarChart2, FiFileText } from 'react-icons/fi'

interface SidebarNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'upload', label: 'Upload Story', icon: FiUpload },
  { id: 'stories', label: 'My Stories', icon: FiFolder },
  { id: 'drafts', label: 'Drafts', icon: FiFileText },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
]

export default function SidebarNavigation({ activeTab, onTabChange }: SidebarNavigationProps) {
  return (
    <div className="glass-card p-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-l-2 border-primary'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <tab.icon className="w-5 h-5" />
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}