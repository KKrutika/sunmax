import { useEffect, useRef } from 'react'

/** Attaches a `visible` class once the element scrolls into view. */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const nodes = ref.current.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return ref
}

/** Smooth in-page scrolling for `.scroll` anchors. */
export function useSmoothScroll() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a.scroll')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || !id.startsWith('#')) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      // Land the target below the fixed header, not behind it.
      const header = document.querySelector('#menu-wrap')
      const offset = header ? header.getBoundingClientRect().height : 0
      const y = el.getBoundingClientRect().top + window.scrollY - offset - 10
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      // Keep the URL shareable without triggering a jump.
      window.history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
