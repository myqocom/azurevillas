import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ContactContent } from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact Azzura Villas | Enquire About Availability in Lefkada',
  description: 'Get in touch with Azzura Villas in Vasiliki, Lefkada, Greece. Enquire about availability, rates, and bookings for our private pool villas.',
  alternates: {
    canonical: 'https://azzuravillas.gr/contact',
  },
  openGraph: {
    title: 'Contact Azzura Villas | Enquire About Availability in Lefkada',
    description: 'Get in touch with Azzura Villas in Vasiliki, Lefkada, Greece. Enquire about availability, rates, and bookings for our private pool villas.',
    url: 'https://azzuravillas.gr/contact',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Azzura Villas | Enquire About Availability in Lefkada',
    description: 'Get in touch with Azzura Villas in Vasiliki, Lefkada, Greece. Enquire about availability, rates, and bookings for our private pool villas.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div style={heroBanner}>
        <p className="section-label" style={{ color: 'var(--taupe)' }}>Vasiliki, Lefkada, Greece</p>
        <h1 style={heroTitle}>Get in <em>Touch</em></h1>
      </div>
      <main style={{ minHeight: '60vh', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 32px 80px' }}>
          <ContactContent />
        </div>
      </main>
      <Footer />
    </>
  )
}

const heroBanner: React.CSSProperties = {
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  padding: '120px 32px 80px',
  textAlign: 'center',
}

const heroTitle: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
  color: 'var(--cream)',
  margin: '16px 0 0',
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
}
