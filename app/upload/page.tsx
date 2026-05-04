'use client'

import { useState } from 'react'
import SidebarNavigation from '@/components/upload/SidebarNavigation'
import UploadStoryForm from '@/components/upload/UploadStoryForm'
import AnalyticsCards from '@/components/upload/AnalyticsCards'

export default function UploadDashboardPage() {
  const [activeTab, setActiveTab] = useState('upload')

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Header */}
      <div className="border-b border-white/10 bg-dark-400/50 backdrop-blur-sm sticky top-16 z-10">
        <div className="container-custom py-6">
          <h1 className="text-3xl font-display font-bold">
            Creator <span className="neon-text">Studio</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage your stories and track your growth</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'analytics' && <AnalyticsCards />}
            {activeTab === 'upload' && <UploadStoryForm />}
            {activeTab === 'stories' && (
              <div className="glass-card p-8 text-center">
                <p className="text-gray-400">Your published stories will appear here</p>
              </div>
            )}
            {activeTab === 'drafts' && (
              <div className="glass-card p-8 text-center">
                <p className="text-gray-400">Your draft stories will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}