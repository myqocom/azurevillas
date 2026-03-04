"use client"

import { useEffect, useRef, useState } from "react"
import { animate, createTimeline } from "animejs"
import type { JSAnimation, Timeline } from "animejs"
import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['400'], subsets: ['latin'], display: 'swap' })


interface AnimationState {
  hoverTimeline: Timeline | null
  floatAnimation: JSAnimation | null
  gradientAnimation: JSAnimation | null
  animationDone: boolean
  animationInProgress: boolean
  autoAnimationTimer: ReturnType<typeof setTimeout> | null
  gradientTimer: ReturnType<typeof setTimeout> | null
  gradientResetTimer: ReturnType<typeof setTimeout> | null
}

interface SubFooterProps {
  variant?: "columns" | "minimal"
}

export default function SubFooter({ variant = "minimal" }: SubFooterProps) {
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const animatedBorderRef = useRef<SVGPathElement>(null)
  const staticGrayRef = useRef<SVGPathElement>(null)
  const gradientAllRef = useRef<SVGPathElement>(null)
  const blueAllRef = useRef<SVGPathElement>(null)
  const gradientStop1Ref = useRef<SVGStopElement>(null)
  const gradientStop2Ref = useRef<SVGStopElement>(null)
  const gradientStop3Ref = useRef<SVGStopElement>(null)

  const [currentYear] = useState(() => new Date().getFullYear())

  const state = useRef<AnimationState>({
    hoverTimeline: null,
    floatAnimation: null,
    gradientAnimation: null,
    animationDone: false,
    animationInProgress: false,
    autoAnimationTimer: null,
    gradientTimer: null,
    gradientResetTimer: null,
  })

  useEffect(() => {
    const logoWrapper = logoWrapperRef.current
    const animatedBorder = animatedBorderRef.current
    const staticGray = staticGrayRef.current
    const gradientAll = gradientAllRef.current
    const blueAll = blueAllRef.current
    const stop1 = gradientStop1Ref.current
    const stop2 = gradientStop2Ref.current
    const stop3 = gradientStop3Ref.current

    if (!logoWrapper || !animatedBorder || !staticGray || !gradientAll || !blueAll || !stop1 || !stop2 || !stop3) return

    ;[animatedBorder, staticGray, blueAll, gradientAll].forEach((path) => {
      path.style.strokeLinecap = "round"
      path.style.strokeLinejoin = "round"
      path.setAttribute("stroke-width", "8")
    })

    const len = animatedBorder.getTotalLength()
    animatedBorder.setAttribute("stroke-dasharray", String(len))
    animatedBorder.setAttribute("stroke-dashoffset", String(len))

    const isMobile = () => window.innerWidth <= 768

    const clearTimer = (key: "autoAnimationTimer" | "gradientTimer" | "gradientResetTimer") => {
      const t = state.current[key]
      if (t) clearTimeout(t)
      state.current[key] = null
    }

    const stopAllAnimations = () => {
      state.current.gradientAnimation?.revert()
      state.current.hoverTimeline?.revert()
      state.current.floatAnimation?.revert()
      state.current.gradientAnimation = null
      state.current.hoverTimeline = null
      state.current.floatAnimation = null
    }

    const startIdleGradient = () => {
      if (state.current.animationDone || state.current.animationInProgress) return

      gradientAll.style.opacity = "1"
      blueAll.style.opacity = "0"
      animatedBorder.style.opacity = "0"
      staticGray.style.opacity = "1"

      const runCycle = () => {
        if (state.current.animationDone || state.current.animationInProgress) return

        stop1.setAttribute("offset", "-0.5")
        stop2.setAttribute("offset", "0")
        stop3.setAttribute("offset", "0.5")

        state.current.gradientAnimation = animate([stop1, stop2, stop3], {
          offset: (_el: unknown, i: number) => (i === 0 ? "1.5" : i === 1 ? "2" : "2.5"),
          duration: 1200,
          ease: "linear",
          onComplete: () => {
            if (state.current.animationDone || state.current.animationInProgress) return

            stop1.setAttribute("offset", "1")
            stop2.setAttribute("offset", "1")
            stop3.setAttribute("offset", "1")

            state.current.gradientTimer = setTimeout(() => {
              if (state.current.animationDone || state.current.animationInProgress) return

              state.current.gradientAnimation = animate([stop1, stop2, stop3], {
                offset: (_el: unknown, i: number) => (i === 0 ? "-0.5" : i === 1 ? "0" : "0.5"),
                duration: 1200,
                ease: "linear",
                onComplete: () => {
                  if (state.current.animationDone || state.current.animationInProgress) return

                  stop1.setAttribute("offset", "0")
                  stop2.setAttribute("offset", "0")
                  stop3.setAttribute("offset", "0")

                  state.current.gradientResetTimer = setTimeout(() => {
                    if (!state.current.animationDone && !state.current.animationInProgress) runCycle()
                  }, 5000)
                },
              })
            }, 5000)
          },
        })
      }

      runCycle()
    }

    const startHoverSequence = () => {
      if (state.current.animationInProgress || state.current.animationDone) return
      state.current.animationInProgress = true

      state.current.gradientAnimation?.pause()
      state.current.gradientAnimation = null
      clearTimer("gradientTimer")
      clearTimer("gradientResetTimer")

      gradientAll.style.opacity = "0"
      staticGray.style.opacity = "1"

      animatedBorder.setAttribute("stroke-dashoffset", String(len))
      animatedBorder.style.opacity = "0"
      blueAll.style.opacity = "0"

      state.current.hoverTimeline = createTimeline({
        autoplay: true,
        defaults: { ease: "inOutSine" },
        onUpdate: () => {
          animatedBorder.style.transform = "translateZ(0)"
          blueAll.style.transform = "translateZ(0)"
        },
      })

      state.current.hoverTimeline
        .add(animatedBorder, { opacity: 1, duration: 1 })
        .add(animatedBorder, {
          strokeDashoffset: 0,
          duration: 1200,
          ease: "inOutQuad",
          onComplete: () => {
            animate(blueAll, { opacity: [0, 1], duration: 1000, ease: "outQuad" })
            animate(animatedBorder, { opacity: [1, 0], duration: 1000, ease: "linear" })

            state.current.animationDone = true
            state.current.animationInProgress = false

            state.current.floatAnimation = animate(logoWrapper, {
              scale: [1, 1.1],
              duration: 1000,
              alternate: true,
              loop: true,
              ease: "inOutSine",
            })
          },
        })
    }

    const onMouseEnter = () => {
      clearTimer("autoAnimationTimer")
      startHoverSequence()
    }

    logoWrapper.addEventListener("mouseenter", onMouseEnter)

    let observer: IntersectionObserver | null = null

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) return

          if (!isMobile()) {
            clearTimer("autoAnimationTimer")
            return
          }

          if (entry.isIntersecting) {
            if (!state.current.animationDone && !state.current.animationInProgress && !state.current.autoAnimationTimer) {
              state.current.autoAnimationTimer = setTimeout(() => {
                state.current.autoAnimationTimer = null
                if (!state.current.animationDone && !state.current.animationInProgress) startHoverSequence()
              }, 3000)
            }
          } else {
            clearTimer("autoAnimationTimer")
          }
        },
        { threshold: 0.6 }
      )

      observer.observe(logoWrapper)
    }

    startIdleGradient()

    return () => {
      logoWrapper.removeEventListener("mouseenter", onMouseEnter)
      if (observer) observer.disconnect()
      clearTimer("autoAnimationTimer")
      clearTimer("gradientTimer")
      clearTimer("gradientResetTimer")
      stopAllAnimations()
    }
  }, [])

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div
        className="w-full flex items-center"
        style={{
          height: "100px",
          ...(variant === "minimal" && {
            paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
            paddingRight: "max(1.5rem, env(safe-area-inset-right))",
          }),
        }}
      >
        <div
          className={`relative flex items-center w-full ${variant === "columns" ? "justify-start" : "justify-center"}`}
          style={variant === "columns" ? { maxWidth: "1400px", margin: "0 auto" } : undefined}
        >
          <span
            className={`${poppins.className} ${variant === "columns" ? "text-left" : "text-center"}`}
            style={{
              fontSize: "13px",
              lineHeight: 1.5,
              fontWeight: 400,
              color: "rgb(134, 134, 139)",
            }}
          >
            Copyright {currentYear} ©. All Rights Reserved
          </span>

          <div ref={logoWrapperRef} className="logo-wrapper absolute right-0">
            <a href="https://myqo.com" target="_blank" rel="noopener" aria-label="MYQO Digital Marketing Agency">
              <svg
                id="myqoLogo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 131.93 144"
                width="20"
                height="20"
                style={{ overflow: "visible", width: "20px", height: "20px", display: "block" }}
                role="img"
                aria-labelledby="logoTitle logoDesc"
              >
                <title id="logoTitle">MYQO Logo</title>
                <desc id="logoDesc">MYQO Digital marketing agency specializing in SEO services and website design.</desc>

                <defs>
                  <style>{`
                    .cls-1 { fill: none; stroke: #1f1f21; stroke-miterlimit: 10; }
                    .cls-2 { fill: none; stroke: #fff; stroke-miterlimit: 10; opacity: 0; }
                    .cls-3 { fill: none; stroke: #00c9ff; stroke-miterlimit: 10; opacity: 0; }
                  `}</style>
                  <linearGradient id="border-gradient" x1="0%" y1="-100%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1f1f21" ref={gradientStop1Ref} />
                    <stop offset="50%" stopColor="#777777" ref={gradientStop2Ref} />
                    <stop offset="100%" stopColor="#1f1f21" ref={gradientStop3Ref} />
                  </linearGradient>
                </defs>

                <path ref={staticGrayRef} className="cls-1" d="m65.98,140.99c-3.98,0-7.9-1.05-11.32-3.02l-40.23-23.23c-6.98-4.03-11.32-11.54-11.32-19.61v-46.45c0-8.06,4.34-15.58,11.32-19.61L54,6.22c3.62-2.09,7.77-3.2,11.98-3.2s8.36,1.11,11.98,3.2l39.57,22.84c6.98,4.03,11.32,11.54,11.32,19.61v46.45c0,8.06-4.34,15.58-11.32,19.61l-40.23,23.23c-3.42,1.98-7.34,3.02-11.32,3.02Zm.05-112.73l25.04-14.46-13.15-7.59c-3.63-2.1-7.78-3.21-11.99-3.21s-8.36,1.11-11.99,3.21l-13.05,7.53,25.14,14.51Zm.02,29.09l50.22-28.99-25.08-14.48-25.14,14.51-25.28-14.59-25.08,14.48,50.36,29.07ZM28.07,122.64v-52.94c0-3.07-1.65-5.93-4.31-7.46L3.09,50.29v44.83c0,8.07,4.34,15.59,11.33,19.63l13.66,7.88Zm48.57,15.7l1.8-.96v-43.91c0-8.69,4.67-16.78,12.19-21.12l38.25-22.08-.04-2.01c-.14-7.62-4.07-14.62-10.51-18.71l-1.74-1.11-50.53,29.17L15.46,28.4l-1.73,1.09c-6.44,4.04-10.41,10.98-10.62,18.58l-.06,2.03,38.13,22.01c7.62,4.4,12.35,12.59,12.35,21.39v43.91l1.8.96c3.26,1.74,6.94,2.66,10.65,2.66s7.41-.92,10.67-2.66Zm1.9-1.06l21.01-12.13c2.63-1.52,4.27-4.35,4.27-7.39v-53l-13.14,7.59c-7.48,4.32-12.13,12.38-12.13,21.02v43.91Z" />

                <path ref={gradientAllRef} d="m65.98,140.99c-3.98,0-7.9-1.05-11.32-3.02l-40.23-23.23c-6.98-4.03-11.32-11.54-11.32-19.61v-46.45c0-8.06,4.34-15.58,11.32-19.61L54,6.22c3.62-2.09,7.77-3.2,11.98-3.2s8.36,1.11,11.98,3.2l39.57,22.84c6.98,4.03,11.32,11.54,11.32,19.61v46.45c0,8.06-4.34,15.58-11.32,19.61l-40.23,23.23c-3.42,1.98-7.34,3.02-11.32,3.02Zm.05-112.73l25.04-14.46-13.15-7.59c-3.63-2.1-7.78-3.21-11.99-3.21s-8.36,1.11-11.99,3.21l-13.05,7.53,25.14,14.51Zm.02,29.09l50.22-28.99-25.08-14.48-25.14,14.51-25.28-14.59-25.08,14.48,50.36,29.07ZM28.07,122.64v-52.94c0-3.07-1.65-5.93-4.31-7.46L3.09,50.29v44.83c0,8.07,4.34,15.59,11.33,19.63l13.66,7.88Zm48.57,15.7l1.8-.96v-43.91c0-8.69,4.67-16.78,12.19-21.12l38.25-22.08-.04-2.01c-.14-7.62-4.07-14.62-10.51-18.71l-1.74-1.11-50.53,29.17L15.46,28.4l-1.73,1.09c-6.44,4.04-10.41,10.98-10.62,18.58l-.06,2.03,38.13,22.01c7.62,4.4,12.35,12.59,12.35,21.39v43.91l1.8.96c3.26,1.74,6.94,2.66,10.65,2.66s7.41-.92,10.67-2.66Zm1.9-1.06l21.01-12.13c2.63-1.52,4.27-4.35,4.27-7.39v-53l-13.14,7.59c-7.48,4.32-12.13,12.38-12.13,21.02v43.91Z" fill="none" stroke="url(#border-gradient)" strokeMiterlimit="10" style={{ opacity: 1 }} />

                <path ref={animatedBorderRef} className="cls-2 animated-path" d="m65.98,140.99c-3.98,0-7.9-1.05-11.32-3.02l-40.23-23.23c-6.98-4.03-11.32-11.54-11.32-19.61v-46.45c0-8.06,4.34-15.58,11.32-19.61L54,6.22c3.62-2.09,7.77-3.2,11.98-3.2s8.36,1.11,11.98,3.2l39.57,22.84c6.98,4.03,11.32,11.54,11.32,19.61v46.45c0,8.06-4.34,15.58-11.32,19.61l-40.23,23.23c-3.42,1.98-7.34,3.02-11.32,3.02Z" />

                <path ref={blueAllRef} className="cls-3" d="m65.98,140.99c-3.98,0-7.9-1.05-11.32-3.02l-40.23-23.23c-6.98-4.03-11.32-11.54-11.32-19.61v-46.45c0-8.06,4.34-15.58,11.32-19.61L54,6.22c3.62-2.09,7.77-3.2,11.98-3.2s8.36,1.11,11.98,3.2l39.57,22.84c6.98,4.03,11.32,11.54,11.32,19.61v46.45c0,8.06-4.34,15.58-11.32,19.61l-40.23,23.23c-3.42,1.98-7.34,3.02-11.32,3.02Zm.05-112.73l25.04-14.46-13.15-7.59c-3.63-2.1-7.78-3.21-11.99-3.21s-8.36,1.11-11.99,3.21l-13.05,7.53,25.14,14.51Zm.02,29.09l50.22-28.99-25.08-14.48-25.14,14.51-25.28-14.59-25.08,14.48,50.36,29.07ZM28.07,122.64v-52.94c0-3.07-1.65-5.93-4.31-7.46L3.09,50.29v44.83c0,8.07,4.34,15.59,11.33,19.63l13.66,7.88Zm48.57,15.7l1.8-.96v-43.91c0-8.69,4.67-16.78,12.19-21.12l38.25-22.08-.04-2.01c-.14-7.62-4.07-14.62-10.51-18.71l-1.74-1.11-50.53,29.17L15.46,28.4l-1.73,1.09c-6.44,4.04-10.41,10.98-10.62,18.58l-.06,2.03,38.13,22.01c7.62,4.4,12.35,12.59,12.35,21.39v43.91l1.8.96c3.26,1.74,6.94,2.66,10.65,2.66s7.41-.92,10.67-2.66Zm1.9-1.06l21.01-12.13c2.63-1.52,4.27-4.35,4.27-7.39v-53l-13.14,7.59c-7.48,4.32-12.13,12.38-12.13,21.02v43.91Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </>
  )
}
