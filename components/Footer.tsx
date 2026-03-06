import Link from 'next/link'
import SubFooter from '@/components/SubFooter'

const exploreLinks = [
  { name: 'Above the Blue', href: '#about' },
  { name: 'A Day Here', href: '#experience' },
  { name: 'The Villas', href: '#rooms' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Every Detail', href: '#amenities' },
  { name: 'Their Words', href: '#testimonials' },
  { name: 'Questions', href: '#faq' },
]

const contactLinks = [
  { name: 'Send us a Message', href: '/contact' },
  { name: 'Give us a Call', href: 'tel:+306985870395' },
  { name: 'Message us on WhatsApp', href: 'https://wa.me/306985870395?text=Hi%2C%20I%20am%20interested%20in%20Azzura%20Villas%20and%20would%20like%20to%20enquire%20about%20availability.' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link href="/" className="footer__logo">Azzura Villas</Link>
          <p className="footer__tagline">
            Private luxury villas in Vasiliki,<br />Lefkada, Greece
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__col-label">Explore</p>
          <nav className="footer__links">
            {exploreLinks.map((l) => (
              <a key={l.name} href={l.href}>{l.name}</a>
            ))}
          </nav>
        </div>

        <div className="footer__col">
          <p className="footer__col-label">Get in Touch</p>
          <nav className="footer__links">
            {contactLinks.map((l) => (
              <a key={l.name} href={l.href}>{l.name}</a>
            ))}
          </nav>
          <p className="footer__col-label" style={{ marginTop: '28px' }}>Information</p>
          <nav className="footer__links">
            <Link href="/blog">Blog</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
        </div>

        <div className="footer__col">
          <p className="footer__col-label">Location</p>
          <p className="footer__address">
            Vasilikis, Porto Katsiki<br />
            Vasiliki, 310 82<br />
            Lefkada, Greece
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Vasiliki,+Lefkada,+Greece"
            target="_blank"
            rel="noopener"
            className="footer__directions"
          >
            Get Directions &rarr;
          </a>
        </div>
      </div>

      <SubFooter variant="columns" />
    </footer>
  )
}
