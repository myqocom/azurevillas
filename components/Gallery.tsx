'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

const slides = [
  {
    src: '/images/azzura-villas-dsc-0009.webp',
    alt: 'Hot tub with panoramic Vasiliki Bay view at Azzura Villas',
  },
  {
    src: '/images/azzura-villas-dsc-0192.webp',
    alt: 'Outdoor lounge terrace at Azzura Villas Lefkada',
  },
  {
    src: '/images/azzura-villas-dsc-0106.webp',
    alt: 'Private balcony with hot tub overlooking the Ionian Sea',
  },
  {
    src: '/images/azzura-villas-dsc-0100.webp',
    alt: 'Designer bedroom interior at Azzura Villas',
  },
  {
    src: '/images/azzura-villas-dsc-9962.webp',
    alt: 'Infinity pool edge with Ionian Sea view at Azzura Villas',
  },
]

const extended = [slides[slides.length - 1], ...slides, slides[0]]
const START = 2

// Indices within this range of current will have their image rendered
const LOAD_RADIUS = 1

export function Gallery() {
  const [current, setCurrent] = useState(START)
  const currentRef = useRef(START)

  // Track which slide indices have ever been near the viewport — once loaded, stay loaded
  const [unlocked, setUnlocked] = useState<Set<number>>(
    () => new Set([START - LOAD_RADIUS, START, START + LOAD_RADIUS])
  )

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const isAnimating = useRef(false)

  // Apply transform directly to DOM — no re-render
  const setTransform = useCallback((index: number, drag = 0, animate = true) => {
    const el = trackRef.current
    if (!el) return
    el.style.transition = animate ? '' : 'none'
    el.style.transform = drag !== 0
      ? `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap)) + ${drag}px))`
      : `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap))))`
  }, [])

  // Unlock images adjacent to the new current index
  useEffect(() => {
    setUnlocked(prev => {
      const next = new Set(prev)
      for (let d = -LOAD_RADIUS; d <= LOAD_RADIUS; d++) next.add(current + d)
      return next
    })
  }, [current])

  const goTo = useCallback((index: number) => {
    currentRef.current = index
    setCurrent(index)
    setTransform(index, 0, true)
  }, [setTransform])

  const handleTransitionEnd = () => {
    const c = currentRef.current
    if (c === 0) {
      const next = slides.length
      currentRef.current = next
      setCurrent(next)
      setTransform(next, 0, false)
    } else if (c === extended.length - 1) {
      const next = 1
      currentRef.current = next
      setCurrent(next)
      setTransform(next, 0, false)
    }
    isAnimating.current = false
  }

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
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((slide, i) => {
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
                {unlocked.has(i) && (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 809px) 95vw, 50vw"
                    draggable={false}
                    priority={i === current}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
