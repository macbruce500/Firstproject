'use client'

import HeroSection from '@/components/home/HeroSection'
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
import TrendingStories from '@/components/home/TrendingStories'
import LatestUploads from '@/components/home/LatestUploads'
import PopularCreators from '@/components/home/PopularCreators'
import CategoriesSection from '@/components/home/CategoriesSection'
import CTASection from '@/components/home/CTASection'
import FloatingNavigation from '@/components/ui/FloatingNavigation'

export default function HomePage() {
  const sections = [
    'hero-section',
    'featured-section', 
    'trending-section',
    'latest-section',
    'creators-section',
    'categories-section',
    'cta-section'
  ]

  return (
    <div className="min-h-screen">
      <FloatingNavigation sections={sections} />
      
      <section id="hero-section" className="min-h-screen">
        <HeroSection />
      </section>
      
      <section id="featured-section" className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920')" }}>
        <div className="w-full h-full bg-black/50 backdrop-blur-sm">
          <FeaturedCarousel />
        </div>
      </section>
      
      <section id="trending-section" className="min-h-screen">
        <TrendingStories />
      </section>
      
      <section id="latest-section" className="min-h-screen">
        <LatestUploads />
      </section>
      
      <section id="creators-section" className="min-h-screen">
        <PopularCreators />
      </section>
      
      <section id="categories-section" className="min-h-screen">
        <CategoriesSection />
      </section>
      
      <section id="cta-section" className="min-h-screen">
        <CTASection />
      </section>
    </div>
  )
}