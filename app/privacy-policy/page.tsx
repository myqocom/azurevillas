import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Azzura Villas Lefkada',
  description: 'Privacy Policy for Azzura Villas. Learn how we collect, use, and protect your personal data in accordance with GDPR.',
  alternates: {
    canonical: 'https://azzuravillas.gr/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Azzura Villas Lefkada',
    description: 'Privacy Policy for Azzura Villas. Learn how we collect, use, and protect your personal data in accordance with GDPR.',
    url: 'https://azzuravillas.gr/privacy-policy',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Azzura Villas Lefkada',
    description: 'Privacy Policy for Azzura Villas. Learn how we collect, use, and protect your personal data in accordance with GDPR.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <div style={heroBanner}>
        <p className="section-label" style={{ color: 'var(--taupe)' }}>Legal</p>
        <h1 style={heroTitle}>Privacy Policy</h1>
      </div>
      <main style={{ minHeight: '60vh', background: 'var(--bg)' }}>
        <div style={pageWrap}>

          <p style={metaStyle}>Last updated: March 2026</p>

          <Section title="1. Who We Are">
            <p>Azzura Villas operates private luxury holiday villas in Vasiliki, Lefkada, Greece. We are the data controller for personal information collected through this website.</p>
            <p>To contact us regarding this policy or any privacy matter, please use our <Link href="/contact" style={linkStyle}>contact form</Link>.</p>
          </Section>

          <Section title="2. What Data We Collect">
            <p>We collect personal data only when you voluntarily provide it. This includes:</p>
            <ul style={listStyle}>
              <li>Name and email address, when you submit an enquiry via our contact form</li>
              <li>Travel dates and number of guests, when included in your enquiry</li>
              <li>Any additional information you choose to include in your message</li>
            </ul>
            <p>We do not collect payment information directly. Booking payments are processed through third-party platforms subject to their own privacy policies.</p>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>We use the information you provide solely to:</p>
            <ul style={listStyle}>
              <li>Respond to your enquiry about availability or bookings</li>
              <li>Communicate with you in connection with a confirmed reservation</li>
              <li>Send occasional updates about the villas, only if you have given explicit consent</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>Under the General Data Protection Regulation (GDPR), we process your personal data on the following legal bases:</p>
            <ul style={listStyle}>
              <li><strong>Legitimate interest</strong> — to respond to enquiries you have initiated</li>
              <li><strong>Contract performance</strong> — to manage a booking you have made</li>
              <li><strong>Consent</strong> — for any marketing communications, which you may withdraw at any time</li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>Enquiry data is retained for up to 24 months from the date of your last communication with us, after which it is securely deleted. Data relating to confirmed bookings may be retained for up to 7 years for legal and tax compliance purposes.</p>
          </Section>

          <Section title="6. Cookies and Analytics">
            <p>This website may use cookies and analytics tools (such as Google Analytics) to understand how visitors use our site. These tools collect anonymised, aggregated data and do not identify you personally.</p>
            <p>You can disable cookies at any time through your browser settings.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under GDPR, you have the right to:</p>
            <ul style={listStyle}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict how we process your data</li>
              <li>Withdraw consent at any time, where processing is based on consent</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p>To exercise any of these rights, please <Link href="/contact" style={linkStyle}>contact us</Link>.</p>
          </Section>

          <Section title="8. Data Security">
            <p>We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. All data transmitted through our contact form is encrypted in transit.</p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>This website contains links to third-party platforms (such as Google Maps and booking sites). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal data.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The most current version will always be available on this page. Continued use of this website following any update constitutes acceptance of the revised policy.</p>
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
  background: 'var(--dark)',
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
