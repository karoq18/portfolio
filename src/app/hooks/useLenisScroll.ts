'use client'
import { useCallback } from 'react'

type LenisLike = {
  scrollTo: (
    target: Element | number,
    options?: {
      offset?: number
      duration?: number
      easing?: (t: number) => number
    }
  ) => void
}

export function useLenisScroll() {
  return useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const h = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')
    ) || 60

    const lenis = (window as Window & { __lenis?: LenisLike }).__lenis

    if (lenis?.scrollTo) {
      lenis.scrollTo(el, {
        offset: -h,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4), 
      })
    } else {
      
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - h,
        behavior: 'smooth',
      })
    }

    history.pushState(null, '', `#${id}`)
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }, [])
}