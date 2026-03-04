import Link from 'next/link'
import SubFooter from '@/components/SubFooter'

const exploreLinks = [
  { name: 'Above the Blue', href: '#about' },
  { name: 'A Day Here', href: '#experience' },
  { name: 'The Villas', href: '#rooms' },
  { name: 'Every Detail', href: '#amenities' },
  { name: 'Their Words', href: '#testimonials' },
  { name: 'Questions', href: '#faq' },
]

const contactLinks = [
  { name: 'Send us a Message', href: '/contact' },
  { name: 'Instagram', href: '#' },
  { name: 'WhatsApp', href: '#' },
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
          <nav className="footer__legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>

      <SubFooter variant="columns" />
    </footer>
  )
}
