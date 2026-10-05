import { useEffect, useState } from 'react'

export default function Footer() {
  return (
    <div id="footer">
      <a className="scroll" href="#home">
        <div className="back-top"><i className="fa fa-angle-up" /></div>
      </a>
      <div className="container">
        <div className="sixteen columns">
          <img
            className="footer-logo"
            src="/logo.png"
            alt="SunMaX logo"
            width="237"
            height="120"
            loading="lazy"
          />
          <p>
            SunMaX<i className="fa fa-home icon-footer" />
            uPVC windows &amp; doors
          </p>
        </div>
      </div>
    </div>
  )
}

export function Preloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let v = 0
    let hide
    const t = setInterval(() => {
      // steady ramp to 100 in ~900ms, no random stalling
      v = Math.min(100, v + 12.5)
      setPct(Math.round(v))
      if (v >= 100) {
        clearInterval(t)
        hide = setTimeout(() => setDone(true), 150)
      }
    }, 90)
    return () => {
      clearInterval(t)
      clearTimeout(hide)
    }
  }, [])

  // once faded out, take it out of the tree entirely so it can never
  // paint over the hero again
  if (done) return null

  return (
    <div id="royal_preloader" className="fading">
      <div className="loader">
        SunMaX
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
