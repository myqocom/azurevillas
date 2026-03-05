import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

const villaAmenities = [
  {
    title: 'Private Infinity Pool & Hot Tub',
    description: 'Your own pool and heated hot tub perched above Vasiliki Bay, with uninterrupted views across the Ionian Sea.',
  },
  {
    title: 'Fully Equipped Kitchen',
    description: 'Premium appliances, cookware, and everything you need to prepare meals or entertain at home.',
  },
  {
    title: 'Flat-Screen TV, WiFi & Entertainment',
    description: 'Relax indoors with a large flat-screen TV, streaming services, and fast WiFi throughout the villa.',
  },
  {
    title: 'Washer, Dryer & Free Parking',
    description: 'Practical comforts included: laundry facilities and free private parking on the property.',
  },
]

const surroundingAmenities = [
  {
    title: 'Vasiliki Beach, 1 km Away',
    description: 'Walk to the beach in 12 minutes. Vasiliki is one of the top windsurfing destinations in Europe.',
  },
  {
    title: 'Windsurfing & Water Sports',
    description: 'Windsurf, canoe, and paddleboard rentals available directly at Vasiliki Beach, steps from the villa.',
  },
  {
    title: 'Boat Trips to Hidden Beaches',
    description: 'Day trips to Porto Katsiki, Agiofili, and the island of Meganisi, arranged on request.',
  },
  {
    title: 'Cycling & Airport Transfers',
    description: 'Explore the Lefkada countryside by bike or book an airport shuttle for a seamless arrival.',
  },
]

export function Amenities() {
  return (
    <>
      {/* ── Inside Each Villa ── */}
      <section className="amen" id="amenities">
        <div className="amen__grid">
          <div className="amen__photo reveal">
            <Image
              src="/images/azzura-villas-dsc-0009.webp"
              alt="Private infinity pool and hot tub with Vasiliki Bay views at Azzura Villas"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
              priority={false}
            />
          </div>
          <div className="amen__content reveal reveal-d1">
            <p className="section-label">Inside the Villas</p>
            <BlurRevealText
              text="Everything You Need. Nothing You Don't."
              accentFromIndex={3}
              lineBreakAfter={2}
              as="h2"
              className="amen__heading"
            />
            <ul className="amen__list">
              {villaAmenities.map((item) => (
                <li key={item.title} className="amen__entry">
                  <h3 className="amen__entry-title">{item.title}</h3>
                  <p className="amen__entry-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Activities & Surroundings ── */}
      <section className="amen amen--light" id="activities">
        <div className="amen__grid">
          <div className="amen__content reveal">
            <p className="section-label">Activities & Surroundings</p>
            <BlurRevealText
              text="Beyond the Villa Gates."
              accentFromIndex={2}
              lineBreakAfter={1}
              as="h2"
              className="amen__heading amen__heading--dark"
            />
            <ul className="amen__list">
              {surroundingAmenities.map((item) => (
                <li key={item.title} className="amen__entry amen__entry--dark">
                  <h3 className="amen__entry-title amen__entry-title--dark">{item.title}</h3>
                  <p className="amen__entry-desc amen__entry-desc--dark">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="amen__photo amen__photo--right reveal reveal-d1">
            <Image
              src="/images/azzura-villas-dsc-0192.webp"
              alt="Sun terrace and outdoor lounge with Ionian Sea views at Azzura Villas"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
