import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://azzuravillas.gr'),
  title: 'Azzura Villas | Luxury Private Villas in Lefkada, Greece',
  description: 'Two private 180 m² villas in Vasiliki, Lefkada with infinity pools, hot tubs, and panoramic Ionian Sea views. 3 bedrooms, sleeps 8 per villa. Book direct.',
  alternates: {
    canonical: 'https://azzuravillas.gr',
  },
  openGraph: {
    title: 'Azzura Villas | Luxury Private Villas in Lefkada, Greece',
    description: 'Two private 180 m² villas in Vasiliki, Lefkada with infinity pools, hot tubs, and panoramic Ionian Sea views. 3 bedrooms, sleeps 8 per villa. Book direct.',
    url: 'https://azzuravillas.gr',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azzura Villas | Luxury Private Villas in Lefkada, Greece',
    description: 'Two private 180 m² villas in Vasiliki, Lefkada with infinity pools, hot tubs, and panoramic Ionian Sea views. 3 bedrooms, sleeps 8 per villa. Book direct.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
