import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

const rooms = [
  {
    count: '3',
    name: 'Bedrooms per Villa',
    desc: 'Each villa has three spacious bedrooms with double beds, designer lighting, air-conditioning, and views of the Ionian Sea or Lefkada mountains.',
  },
  {
    count: '3',
    name: 'Bathrooms per Villa',
    desc: 'Full-size marble bathrooms with rain showers, backlit mirrors, and premium toiletries. Three in every villa.',
  },
  {
    count: '1',
    name: 'Living & Dining',
    desc: 'Open-plan living area with a full kitchen, flat-screen TV, and two sofa beds. Each villa sleeps up to 8 guests comfortably.',
  },
  {
    count: '180',
    name: 'm² per Villa',
    desc: 'Two identical private villas, each 180 m². Your own infinity pool, hot tub, sun terrace, outdoor dining area, and free parking.',
  },
]

export function Rooms() {
  return (
    <section className="rooms" id="rooms">
      <div className="rooms__inner">
        <div className="rooms__header">
          <div className="reveal">
            <p className="section-label">2 Villas · 3 Bedrooms Each · Sleeps 8 per Villa</p>
            <BlurRevealText text="The Villas" as="h2" className="rooms__heading" />
          </div>
          <p className="rooms__desc reveal reveal-d1">
            Two identical 180 m² private villas in Vasiliki, Lefkada. Each one
            is entirely yours: private pool, hot tub, and uninterrupted views
            of the Ionian Sea from every room.
          </p>
        </div>

        <div className="rooms__image-wrap reveal">
          <Image
            src="/images/azzura-villas-dsc-0023.webp"
            alt="Azzura Villas bedroom with Ionian Sea view in Lefkada"
            fill
            sizes="(max-width: 809px) 100vw, 100vw"
          />
        </div>

        <div className="rooms__grid">
          {rooms.map((room, i) => (
            <div
              key={room.name}
              className={`room-card reveal reveal-d${i + 1}`}
            >
              <div className="room-card__count">{room.count}</div>
              <h3 className="room-card__name">{room.name}</h3>
              <p className="room-card__desc">{room.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
