'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

const navLinks = [
  { name: 'Above the Blue', href: '#about' },
  { name: 'A Day Here', href: '#experience' },
  { name: 'The Villas', href: '#rooms' },
  { name: 'Every Detail', href: '#amenities' },
  { name: 'Their Words', href: '#testimonials' },
  { name: 'The Island', href: '#location' },
]

const whatsappPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav__logo">Azzura Villas</Link>
        <button
          className="nav__hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <div className="hamburger-icon">
            <svg
              preserveAspectRatio="xMidYMid meet"
              viewBox="20 76.4 160 47.2"
              height="28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path className="hamburger-line hamburger-line-1" d="M132 76.4v2.7H20v-2.7h112z" fill="var(--cream)" />
                <path className="hamburger-line" d="M180 98.7v2.7H20v-2.7h160z" fill="var(--cream)" />
                <path className="hamburger-line hamburger-line-3" d="M180 120.9v2.7H68v-2.7h112z" fill="var(--cream)" />
              </g>
            </svg>
          </div>
        </button>
      </nav>

      {mounted && createPortal(
        <>
          {/* Overlay */}
          <div
            className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <div className={`nav__panel${menuOpen ? ' nav__panel--open' : ''}`}>
            {/* Close */}
            <button
              className="nav__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="var(--dark)">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="nav__panel-inner">
              {/* Nav links — vertically centered in remaining space */}
              <div className="nav__panel-links-wrap">
                <nav className="nav__panel-links">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Actions pinned to bottom */}
              <div className="nav__panel-bottom">
                <Link
                  href="/book"
                  onClick={() => setMenuOpen(false)}
                  className="nav__panel-book"
                >
                  Book Now
                </Link>
                <a
                  href="https://wa.me/30"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="nav__panel-icon-btn"
                  aria-label="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={whatsappPath}/>
                  </svg>
                </a>
                <a
                  href="tel:+30"
                  onClick={() => setMenuOpen(false)}
                  className="nav__panel-icon-btn"
                  aria-label="Call us"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.5 19.79 19.79 0 0 1 1.04 2.82 2 2 0 0 1 3 .64h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
                <a
                  href="https://maps.app.goo.gl/bXW6bzNBixbTrNTG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="nav__panel-icon-btn"
                  aria-label="Get directions"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
