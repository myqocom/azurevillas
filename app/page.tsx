import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Rooms } from '@/components/Rooms'
import { Amenities } from '@/components/Amenities'
import { Gallery } from '@/components/Gallery'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Azzura Villas Vasiliki | Private Pool Villas in Lefkada, Greece',
  description:
    'Two luxury 180 m² villas in Vasiliki, Lefkada. Private infinity pools, hot tubs, sea views, 3 bedrooms each. The best villa rental on the Ionian coast.',
  alternates: {
    canonical: 'https://azzuravillas.gr',
  },
  openGraph: {
    title: 'Azzura Villas Vasiliki | Private Pool Villas in Lefkada, Greece',
    description:
      'Two luxury 180 m² villas in Vasiliki, Lefkada. Private infinity pools, hot tubs, sea views, 3 bedrooms each. The best villa rental on the Ionian coast.',
    url: 'https://azzuravillas.gr',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azzura Villas Vasiliki | Private Pool Villas in Lefkada, Greece',
    description:
      'Two luxury 180 m² villas in Vasiliki, Lefkada. Private infinity pools, hot tubs, sea views, 3 bedrooms each. The best villa rental on the Ionian coast.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

export default function AzzuraVillas() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Rooms />
        <Gallery />
        <Amenities />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
