import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

export function About() {
  return (
    <section id="about">
      {/* Welcome intro */}
      <div className="welcome-intro">
        <div className="welcome-intro__inner reveal">
          <BlurRevealText text="Welcome" as="h2" className="welcome-intro__heading" />
          <p className="welcome-intro__body">
            Two new villas on a quiet hillside above Vasiliki Bay.
            Olive groves behind you, the Ionian Sea below. This is a place
            built for long mornings and slow afternoons.
          </p>
        </div>
      </div>

      {/* The Setting */}
      <div className="setting">
        <div className="setting__image reveal">
          <Image
            src="/images/azzura-villas-dsc-0039.webp"
            alt="Panoramic view of Vasiliki Bay from Azzura Villas balcony in Lefkada"
            fill
            sizes="(max-width: 809px) 100vw, 50vw"
          />
        </div>
        <div className="setting__text">
          <p className="section-label reveal">The Property</p>
          <BlurRevealText text="Above the Blue" accentWord="Blue" as="h3" className="setting__heading" />
          <p className="setting__body reveal reveal-d2">
            Contemporary lines, natural stone, and views from every angle.
            A private infinity pool that meets the horizon. Two villas,
            each 180 m², set among century-old olive trees where the land
            has been tended for generations.
          </p>
          <p className="setting__body reveal reveal-d3">
            Below, the turquoise waters of the Ionian stretch toward the
            mainland. Vasiliki Beach is a 12-minute walk. The famous
            Agiofili Beach is a short drive south. Everything else can wait.
          </p>
        </div>
      </div>
    </section>
  )
}
