'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function LenisRoot() {
  const lockRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })

    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const SNAP_IDS = ['#about', '#skills', '#projects'] as const
    const DEADZONE = 12
    const LOCK_MS = 500

    const onScroll = () => {
      if (lockRef.current) return

      const headerH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 0

      for (const id of SNAP_IDS) {
        const el = document.querySelector<HTMLElement>(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - headerH
        if (Math.abs(top) <= DEADZONE) {
          lockRef.current = true
          lenis.scrollTo(id, {
            offset: -headerH,
            duration: 0.5,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
          })
          window.setTimeout(() => {
            lockRef.current = false
          }, LOCK_MS)
          break
        }
      }
    }

    if (!isMobile) {
      lenis.on('scroll', onScroll)
    }

    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (!isMobile) {
        lenis.off('scroll', onScroll)
      }
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
    }
  }, [])

  return null
}
