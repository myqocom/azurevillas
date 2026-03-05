import Image from 'next/image'
import Link from 'next/link'
import BlurRevealText from '@/components/BlurRevealText'

export function CTA() {
  return (
    <section className="cta-section">
      <Image
        src="/night-2.webp"
        alt="Hot tub at night with starry sky and Vasiliki Bay views at Azzura Villas"
        fill
        sizes="100vw"
        quality={90}
        className="cta-section__bg"
      />
      <div className="cta-section__overlay" />
      <div className="cta-section__content reveal">
        <p className="section-label section-label--light">Azzura Villas</p>
        <BlurRevealText
          text="Your stay begins here"
          accentWord="here"
          as="h2"
          className="cta-section__heading"
        />
        <Link href="/book" className="cta-section__btn">
          Book Your Villa
        </Link>
      </div>
    </section>
  )
}
