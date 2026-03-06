'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const DateRangePicker = dynamic(() => import('./DateRangePicker'), { ssr: false })

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', background: '#e8e0d8', borderRadius: '16px' }} />
  ),
})

export function ContactContent() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>()

  return (
    <div className="contact-grid" style={gridLayout}>
      <div>
        <p className="section-label">Enquiry</p>
        <h2 style={sectionTitle}>Send a <em>Message</em></h2>
        <p style={subtextStyle}>
          Enquire about availability, rates, or anything else. We will get back to you within 24 hours.
        </p>

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

          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <input type="hidden" name="checkin" value={dateRange?.from ? dateRange.from.toISOString().split('T')[0] : ''} />
          <input type="hidden" name="checkout" value={dateRange?.to ? dateRange.to.toISOString().split('T')[0] : ''} />

          <div>
            <label style={labelStyle}>Number of Guests</label>
            <select name="guests" style={{ ...inputStyle, height: '48px', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%23170f0b\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
              <option value="">Select guests</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Message</label>
            <textarea name="message" rows={5} placeholder="Any questions or special requests..." style={{ ...inputStyle, height: 'auto', padding: '14px 16px', resize: 'vertical' }} />
          </div>

          <button type="submit" className="hero__cta" style={{ color: 'var(--dark)', borderColor: 'var(--dark)', borderRadius: '100px' }}>
            Send Enquiry
          </button>
        </form>
      </div>

      <div style={mapColumn}>
        <div style={mapWrap}>
          <LeafletMap />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Vasiliki,+Lefkada,+Greece"
            target="_blank"
            rel="noopener"
            style={directionsLink}
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
}

const gridLayout: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '64px',
  alignItems: 'stretch',
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
  color: 'var(--dark)',
  margin: '8px 0 12px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
}

const subtextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans), sans-serif',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.4em',
  color: 'var(--dark)',
  marginBottom: '32px',
}

const mapColumn: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const mapWrap: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  flex: 1,
  borderRadius: '16px',
  overflow: 'hidden',
  minHeight: '300px',
}

const directionsLink: React.CSSProperties = {
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--dark)',
  background: '#fff',
  padding: '8px 16px',
  borderRadius: '8px',
  textDecoration: 'none',
  zIndex: 10,
}


const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans), sans-serif',
  fontSize: '0.65rem',
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--dark)',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '48px',
  padding: '0 16px',
  border: '1px solid #d5cdc5',
  borderRadius: '8px',
  background: '#fff',
  fontFamily: 'var(--font-sans), sans-serif',
  fontSize: '0.95rem',
  fontWeight: 400,
  color: 'var(--dark)',
  outline: 'none',
  boxSizing: 'border-box',
}
