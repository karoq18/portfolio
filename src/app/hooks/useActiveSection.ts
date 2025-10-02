'use client'
import { useEffect, useState } from 'react'

/**
 * Zwraca ID sekcji najbliższej środka ekranu (z uwzględnieniem headera).
 * items – lista identyfikatorów sekcji w kolejności występowania w DOM.
 */
export function useActiveSection(items: string[]) {
  const [activeId, setActiveId] = useState(items[0] ?? '')

  useEffect(() => {
    if (!items.length) return

    const headerH = (() => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')
        .trim()
      const n = parseInt(v || '60', 10)
      return Number.isFinite(n) ? n : 60
    })()

    const getSections = () =>
      items
        .map(id => {
          const el = document.getElementById(id)
          return el ? { id, el } : null
        })
        .filter((x): x is { id: string; el: HTMLElement } => !!x)

    let sections = getSections()

    const onScroll = () => {
      const scrollMid =
        window.scrollY + headerH + (window.innerHeight - headerH) * 0.1

      let current = items[0]
      let minDist = Infinity

      sections.forEach(({ id, el }) => {
        const rect = el.getBoundingClientRect()
        const elMid = window.scrollY + rect.top + rect.height / 2
        const dist = Math.abs(scrollMid - elMid)
        if (dist < minDist) {
          minDist = dist
          current = id
        }
      })

      setActiveId(current)
    }

    const onResize = () => {
      sections = getSections()
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    setTimeout(onResize, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [items])

  return activeId
}
