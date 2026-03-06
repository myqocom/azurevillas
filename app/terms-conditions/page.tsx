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
      <div style={heroBanner}>
        <p className="section-label" style={{ color: 'var(--taupe)' }}>Legal</p>
        <h1 style={heroTitle}>Terms &amp; Conditions</h1>
      </div>
      <main style={{ minHeight: '60vh', background: 'var(--cream)' }}>
        <div style={pageWrap}>

          <p style={metaStyle}>Last updated: March 2026</p>

          <Section title="1. Check-in">
            <p>Check-in is available from 16:00 to 00:00. You must let us know your expected arrival time in advance.</p>
          </Section>

          <Section title="2. Check-out">
            <p>Check-out is between 08:00 and 11:00.</p>
          </Section>

          <Section title="3. Cancellation and Prepayment">
            <p>Cancellation and prepayment policies vary according to accommodation type. Please enter the dates of your stay and check the conditions of your selected option when booking.</p>
          </Section>

          <Section title="4. Children and Beds">
            <p>Children of any age are welcome.</p>
            <p>To see correct prices and occupancy information, please add the number of children in your group and their ages to your search.</p>
            <p><strong>Cot and extra bed policies:</strong></p>
            <ul style={listStyle}>
              <li>Children aged 0 to 3 years: cot available upon request, free of charge</li>
              <li>The number of cots allowed depends on the option you choose. Please check your selected option for details.</li>
              <li>All cots are subject to availability</li>
              <li>There are no extra beds available at this property</li>
            </ul>
          </Section>

          <Section title="5. Age Restriction">
            <p>There is no age requirement for check-in.</p>
          </Section>

          <Section title="6. Smoking">
            <p>Smoking is not allowed.</p>
          </Section>

          <Section title="7. Parties">
            <p>Parties and events are not allowed. This property will not accommodate hen, stag, or similar parties.</p>
          </Section>

          <Section title="8. Pets">
            <p>Pets are not allowed.</p>
          </Section>

          <Section title="9. Liability">
            <p>We are not liable for any personal injury, loss, or damage to personal belongings during your stay, except where caused by our negligence. We are not responsible for any disruption caused by circumstances outside our control, including adverse weather, utility outages, or construction in the surrounding area.</p>
          </Section>

          <Section title="10. Governing Law">
            <p>These Terms and Conditions are governed by the laws of Greece. Any disputes arising from a booking or stay at Azzura Villas shall be subject to the exclusive jurisdiction of the Greek courts.</p>
          </Section>

          <Section title="11. License">
            <p>License number: 0831K91000172100</p>
          </Section>

          <Section title="12. Contact">
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

const pageWrap: React.CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '60px 32px 80px',
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
