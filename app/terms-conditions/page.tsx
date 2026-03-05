import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Azzura Villas Lefkada',
  description: 'Terms and Conditions for staying at Azzura Villas in Vasiliki, Lefkada, Greece. Read our booking, cancellation, and house policies.',
  alternates: {
    canonical: 'https://azzuravillas.gr/terms-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | Azzura Villas Lefkada',
    description: 'Terms and Conditions for staying at Azzura Villas in Vasiliki, Lefkada, Greece. Read our booking, cancellation, and house policies.',
    url: 'https://azzuravillas.gr/terms-conditions',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Azzura Villas Lefkada',
    description: 'Terms and Conditions for staying at Azzura Villas in Vasiliki, Lefkada, Greece. Read our booking, cancellation, and house policies.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

export default function TermsConditionsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '100px', minHeight: '80vh', background: 'var(--bg)' }}>
        <div style={pageWrap}>

          <p className="section-label">Legal</p>
          <h1 style={h1Style}>Terms &amp; Conditions</h1>
          <p style={metaStyle}>Last updated: March 2026</p>

          <Section title="1. Definitions">
            <p>"We", "us", and "our" refer to Azzura Villas. "You" and "your" refer to the guest making or holding a reservation. "Property" refers to the villa or villas rented under a confirmed booking.</p>
          </Section>

          <Section title="2. Reservations and Confirmation">
            <p>A reservation is confirmed only upon receipt of the required deposit and written confirmation from us. Submitting an enquiry or receiving a quote does not constitute a binding booking.</p>
            <p>To make a reservation enquiry, please use our <Link href="/contact" style={linkStyle}>contact form</Link>.</p>
          </Section>

          <Section title="3. Payment">
            <p>A deposit of 30% of the total booking amount is required to confirm your reservation. The remaining balance is due no later than 60 days before your arrival date. For bookings made within 60 days of arrival, full payment is required at the time of booking.</p>
            <p>All payments must be made in Euros. Bank transfer charges are the responsibility of the guest.</p>
          </Section>

          <Section title="4. Cancellation Policy">
            <p>Cancellations must be submitted in writing via our contact form.</p>
            <ul style={listStyle}>
              <li>60 or more days before arrival: full refund of all payments made</li>
              <li>30 to 59 days before arrival: 50% of the total booking amount is retained</li>
              <li>Fewer than 30 days before arrival: the full booking amount is non-refundable</li>
            </ul>
            <p>We strongly recommend taking out comprehensive travel insurance to cover cancellation costs.</p>
          </Section>

          <Section title="5. Occupancy">
            <p>Each villa accommodates a maximum of 8 guests. The number of guests must not exceed the agreed occupancy stated at the time of booking. Additional guests are not permitted without prior written approval.</p>
            <p>Only registered guests may stay overnight at the property. Day visitors must be agreed in advance.</p>
          </Section>

          <Section title="6. Check-in and Check-out">
            <p>Check-in is from 16:00 on the day of arrival. Check-out is by 11:00 on the day of departure. Early check-in or late check-out may be possible subject to availability and must be agreed in advance.</p>
            <p>Guests are responsible for the property from the time of check-in until check-out.</p>
          </Section>

          <Section title="7. Security Deposit">
            <p>A refundable security deposit may be required at check-in to cover any damage, loss, or additional cleaning beyond normal use. The deposit will be returned within 7 days of departure, less any deductions where applicable.</p>
          </Section>

          <Section title="8. Use of the Property">
            <p>The property is for private residential holiday use only. Commercial use, events, or parties are not permitted without prior written agreement.</p>
            <p>Guests are expected to treat the property and its contents with care. Any damage or breakages must be reported promptly.</p>
            <p>Smoking is not permitted inside any area of the villa. Designated outdoor areas may be used for smoking.</p>
            <p>Small, well-behaved pets are welcome with prior written consent obtained at the time of booking.</p>
          </Section>

          <Section title="9. Pool and Safety">
            <p>The private infinity pool is for the exclusive use of registered guests. Children must be supervised at all times. We accept no liability for accidents or injuries resulting from unsupervised use of the pool, hot tub, or any other facilities.</p>
          </Section>

          <Section title="10. Cleaning and Maintenance">
            <p>The villa is provided in a clean and well-maintained condition. Guests are responsible for keeping the property in a reasonable state during their stay.</p>
            <p>A mid-stay clean is included for stays of 7 nights or more. Additional cleaning services can be arranged for an additional fee.</p>
          </Section>

          <Section title="11. Liability">
            <p>We are not liable for any personal injury, loss, or damage to personal belongings during your stay, except where caused by our negligence. We are not responsible for any disruption caused by circumstances outside our control, including but not limited to adverse weather, utility outages, or construction in the surrounding area.</p>
          </Section>

          <Section title="12. Force Majeure">
            <p>We will not be in breach of these terms where failure to perform our obligations is caused by circumstances beyond our reasonable control, including natural disasters, government restrictions, or other events of force majeure. In such cases, we will endeavour to offer alternative dates or a credit for a future stay.</p>
          </Section>

          <Section title="13. Governing Law">
            <p>These Terms and Conditions are governed by the laws of Greece. Any disputes arising from a booking or stay at Azzura Villas shall be subject to the exclusive jurisdiction of the Greek courts.</p>
          </Section>

          <Section title="14. Contact">
            <p>For any questions relating to these terms, please <Link href="/contact" style={linkStyle}>get in touch</Link>.</p>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={sectionStyle}>
      <h2 style={h2Style}>{title}</h2>
      <div style={bodyStyle}>{children}</div>
    </div>
  )
}

const pageWrap: React.CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '60px 32px 80px',
}

const h1Style: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  color: 'var(--dark)',
  margin: '12px 0 4px',
  lineHeight: 1.1,
}

const metaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'var(--muted)',
  marginBottom: '48px',
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '40px',
  paddingBottom: '40px',
  borderBottom: '1px solid rgba(23, 15, 11, 0.08)',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: '1.3rem',
  fontWeight: 400,
  color: 'var(--dark)',
  marginBottom: '16px',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  lineHeight: 1.75,
  color: 'var(--dark)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const linkStyle: React.CSSProperties = {
  color: 'var(--dark)',
  textDecoration: 'underline',
}
