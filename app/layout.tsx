import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Providers } from './providers'
import CustomCursor from '@/components/ui/CustomCursor'
import MouseTrail from '@/components/ui/MouseTrail'
import ParticleBurst from '@/components/ui/ParticleBurst'
import NavigationLoader from '@/components/ui/NavigationLoader'
import ScrollFade from '@/components/ui/ScrollFade'

export const metadata: Metadata = {
  title: 'GoodLantey | Create, Share, Discover Stories',
  description: 'The ultimate platform for comics, manga, novels, and visual storytelling.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload featured images for faster loading */}
        <link rel="preload" as="image" href="/1.jpg" />
        <link rel="preload" as="image" href="/4.jpg" />
        <link rel="preload" as="image" href="/2.jpg" />
      </head>
      <body className="bg-white">
        <Providers>
          <ScrollFade />
          <NavigationLoader />
          <MouseTrail />
          <ParticleBurst />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen pt-20 relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}