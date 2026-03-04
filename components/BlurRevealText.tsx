'use client'

import React, { useRef, useEffect, useState } from 'react'

interface BlurRevealTextProps {
  text: string
  accentWord?: string
  accentFromIndex?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  stagger?: number
  baseDelay?: number
  lineBreakAfter?: number
}

export default function BlurRevealText({
  text,
  accentWord,
  accentFromIndex,
  as: Tag = 'h2',
  className = '',
  stagger = 0.06,
  baseDelay = 0,
  lineBreakAfter,
}: BlurRevealTextProps) {
  const ref = useRef<any>(null)
  const [visible, setVisible] = useState(false)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const revealParent = el.closest('.reveal')

    if (revealParent) {
      const check = () => {
        if (revealParent.classList.contains('visible')) {
          setVisible(true)
          return true
        }
        return false
      }

      if (check()) return

      const mo = new MutationObserver(() => {
        if (check()) mo.disconnect()
      })
      mo.observe(revealParent, { attributes: true, attributeFilter: ['class'] })

      return () => mo.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px', threshold: 0.01 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const isAccent =
          (accentWord !== undefined && word.toLowerCase() === accentWord.toLowerCase()) ||
          (accentFromIndex !== undefined && i >= accentFromIndex)
        const inner = isAccent ? <em>{word}</em> : word
        const isLast = i === words.length - 1
        const isBreak = lineBreakAfter !== undefined && lineBreakAfter === i
        const delay = `${baseDelay + i * stagger}s`

        return (
          <React.Fragment key={i}>
            <span
              style={{
                display: 'inline-block',
                marginRight: isLast || isBreak ? 0 : '0.3em',
                opacity: visible ? 1 : 0,
                filter: visible ? 'blur(0px)' : 'blur(5px)',
                transform: visible ? 'translateY(0)' : 'translateY(5px)',
                transition: `opacity 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}, filter 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}`,
              }}
            >
              {inner}
            </span>
            {isBreak && <br />}
          </React.Fragment>
        )
      })}
    </Tag>
  )
}
