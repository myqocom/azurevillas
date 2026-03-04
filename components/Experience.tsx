import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

export function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <div className="experience__text">
          <p className="section-label reveal">The Experience</p>
          <BlurRevealText text="A Day Here" accentWord="Here" as="h3" className="experience__heading" />
          <p className="experience__body reveal reveal-d2">
            Morning light through floor-to-ceiling glass. Linens you sink
            back into. Eventually, coffee on the terrace, watching fishing
            boats cross the bay. The kitchen is there when hunger finds you.
            The pool sits patient in the sun, glassy and still, until you
            are ready to break it open.
          </p>
          <p className="experience__body reveal reveal-d3">
            By evening, the grill is lit. The sun drops behind Kefalonia.
            The mountains turn gold, then violet, then dark. You will not
            check the time once.
          </p>
        </div>
        <div className="experience__image reveal">
          <Image
            src="/images/azzura-villas-dsc-0192.webp"
            alt="Outdoor terrace and lounge area at Azzura Villas Lefkada"
            fill
            sizes="(max-width: 809px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
