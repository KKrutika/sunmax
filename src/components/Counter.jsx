import { useEffect, useRef, useState } from 'react'

/** Counts a number up when it scrolls into view. */
export default function Counter({ to, format }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  const target = Number.parseFloat(String(to).replace(/[^0-9.\-]/g, ''))
  const safeTarget = Number.isFinite(target) ? target : 0

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1600
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1)
          setN(Math.round(safeTarget * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [safeTarget])

  return <span ref={ref}>{format ? format(n) : n}</span>
}
