'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

const slides = [
  { src: '/images/azzura-villas-dsc-0009.webp', alt: 'Hot tub with panoramic Vasiliki Bay view at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0023.webp', alt: 'Luxury villa exterior at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0027.webp', alt: 'Villa architectural detail at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0039.webp', alt: 'Stylish living area at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0042.webp', alt: 'Interior design detail at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0053.webp', alt: 'Modern kitchen at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0055.webp', alt: 'Dining area at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0061.webp', alt: 'Bedroom with natural light at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0065.webp', alt: 'Bathroom interior at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0076.webp', alt: 'Villa terrace view at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0082.webp', alt: 'Outdoor seating area at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0091.webp', alt: 'Pool area at sunset at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0100.webp', alt: 'Designer bedroom interior at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0106.webp', alt: 'Private balcony with hot tub overlooking the Ionian Sea' },
  { src: '/images/azzura-villas-dsc-0109.webp', alt: 'Villa lounge with sea view at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0118.webp', alt: 'Stone-finished interior at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0130.webp', alt: 'Panoramic bay view from Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0147.webp', alt: 'Evening atmosphere at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0163.webp', alt: 'Garden pathway at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0167.webp', alt: 'Outdoor dining setup at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0180.webp', alt: 'Sun terrace with loungers at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0184.webp', alt: 'Villa facade at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0192.webp', alt: 'Outdoor lounge terrace at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0199.webp', alt: 'Infinity pool with mountain backdrop at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0200.webp', alt: 'Poolside relaxation at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0201.webp', alt: 'Villa exterior at dusk at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0208.webp', alt: 'Living room with panoramic windows at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0214.webp', alt: 'Master bedroom at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0218.webp', alt: 'Bathroom with natural stone at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0220.webp', alt: 'Terrace with Ionian Sea views at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0225.webp', alt: 'Sunset view from Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-0230.webp', alt: 'Outdoor BBQ area at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0247.webp', alt: 'Aerial view of Azzura Villas and surroundings' },
  { src: '/images/azzura-villas-dsc-0268.webp', alt: 'Vasiliki Bay panorama from Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0276.webp', alt: 'Villa garden and landscaping at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-0290.webp', alt: 'Coastal scenery near Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-9950.webp', alt: 'Mountain and sea view from Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9953.webp', alt: 'Villa entrance at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-9956.webp', alt: 'Outdoor shower area at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9959.webp', alt: 'Hillside setting of Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-9962.webp', alt: 'Infinity pool edge with Ionian Sea view at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9980.webp', alt: 'Evening lights at Azzura Villas Lefkada' },
  { src: '/images/azzura-villas-dsc-9988.webp', alt: 'Deck area with sea view at Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9990.webp', alt: 'Coastal landscape near Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9991.webp', alt: 'Sunrise over Vasiliki Bay from Azzura Villas' },
  { src: '/images/azzura-villas-dsc-9999.webp', alt: 'Panoramic villa view at Azzura Villas Lefkada' },
]

const START = 0

export function Gallery() {
  const [current, setCurrent] = useState(START)
  const currentRef = useRef(START)

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const setTransform = useCallback((index: number, drag = 0, animate = true) => {
    const el = trackRef.current
    if (!el) return
    el.style.transition = animate ? '' : 'none'
    el.style.transform = drag !== 0
      ? `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap)) + ${drag}px))`
      : `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap))))`
  }, [])

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index))
    currentRef.current = clamped
    setCurrent(clamped)
    setTransform(clamped, 0, true)
  }, [setTransform])

  // Shared drag logic
  const onDragStart = (x: number) => {
    startX.current = x
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onDragMove = (x: number) => {
    if (startX.current === null) return
    const delta = x - startX.current
    if (Math.abs(delta) > 4) {
      isDragging.current = true
      if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing'
    }
    if (isDragging.current) {
      setTransform(currentRef.current, delta, false)
    }
  }

  const onDragEnd = (x: number) => {
    if (startX.current === null) return
    const delta = startX.current - x
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
    if (Math.abs(delta) > 60) {
      const next = delta > 0 ? currentRef.current + 1 : currentRef.current - 1
      goTo(next)
    } else {
      setTransform(currentRef.current, 0, true)
    }
    startX.current = null
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onDragStart(e.clientX)
  }
  const handleMouseMove = (e: React.MouseEvent) => onDragMove(e.clientX)
  const handleMouseUp = (e: React.MouseEvent) => { onDragEnd(e.clientX); }
  const handleMouseLeave = () => {
    if (startX.current !== null) {
      setTransform(currentRef.current, 0, true)
      startX.current = null
      if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
    }
    isDragging.current = false
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => onDragMove(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientX)

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__header">
        <p className="section-label">Gallery</p>
        <BlurRevealText text="See the Villas" accentWord="Villas" as="h2" className="gallery__heading" />
        <p className="gallery__desc">
          From the infinity pool to the sun terrace, from stone-finished interiors
          to the endless blue beyond the balcony. This is what a stay at Azzura
          Villas in Lefkada looks like.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="gallery__track-wrap"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: 'grab' }}
      >
        <div
          ref={trackRef}
          className="gallery__track"
          style={{
            transform: `translateX(calc(var(--gallery-offset) - ${START} * (var(--gallery-slide) + var(--gallery-gap))))`,
          }}
        >
          {slides.map((slide, i) => {
            const cls = i === current
              ? 'gallery__slide gallery__slide--active'
              : i === current - 1
              ? 'gallery__slide gallery__slide--prev'
              : i === current + 1
              ? 'gallery__slide gallery__slide--next'
              : 'gallery__slide'
            return (
              <div
                key={i}
                className={cls}
                onClick={() => {
                  if (!isDragging.current && i !== current) {
                    goTo(i)
                  }
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 809px) 95vw, 50vw"
                  draggable={false}
                  priority={i < 3}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
