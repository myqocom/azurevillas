import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

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
      <main style={{ paddingTop: '100px', minHeight: '80vh', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 32px' }}>

          <p className="section-label">Vasiliki, Lefkada, Greece</p>
          <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark)', margin: '12px 0 8px', lineHeight: 1.1 }}>
            Get in <em>Touch</em>
          </h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: '1rem', marginBottom: '48px', maxWidth: '480px' }}>
            Enquire about availability, rates, or anything else — we'll get back to you within 24 hours.
          </p>

          {/* TODO: Replace with a server action (see myqo-contact-form skill).
              Never expose a real email address in form action — use a server action instead. */}
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            action="/api/contact"
            method="POST"
          >

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input name="name" type="text" required placeholder="Your name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Check-in</label>
                <input name="checkin" type="date" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Check-out</label>
                <input name="checkout" type="date" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Number of Guests</label>
              <select name="guests" style={inputStyle}>
                <option value="">Select guests</option>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea name="message" rows={5} placeholder="Any questions or special requests..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <button type="submit" className="hero__cta" style={{ alignSelf: 'flex-start', color: 'var(--dark)', borderColor: 'var(--dark)' }}>
              Send Enquiry
            </button>
          </form>

          <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid #e0d8d0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={detailLabelStyle}>Address</p>
              <p style={detailTextStyle}>Vasilikis – Porto Katsiki<br />Vasiliki, 310 82<br />Lefkada, Greece</p>
            </div>
            <div>
              <p style={detailLabelStyle}>Check-in / Check-out</p>
              <p style={detailTextStyle}>Check-in: 16:00 – 00:00<br />Check-out: by 11:00</p>
            </div>
            <div>
              <p style={detailLabelStyle}>Nearby</p>
              <p style={detailTextStyle}>Vasiliki Beach — 1 km<br />Vasiliki Port — 4.2 km<br />Aktion Airport — 56 km</p>
            </div>
            <div>
              <p style={detailLabelStyle}>Rating</p>
              <p style={detailTextStyle}>9.0 Superb on Booking.com<br />Staff · Facilities · Cleanliness: 10/10</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #d5cdc5',
  background: '#fff',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  color: 'var(--dark)',
  outline: 'none',
  boxSizing: 'border-box',
}

const detailLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '6px',
}

const detailTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  color: 'var(--dark)',
  lineHeight: 1.7,
}
