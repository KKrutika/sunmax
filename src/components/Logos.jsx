const BASE = '/img/template'

const LOGOS = [1, 2, 3, 4, 5, 2]

export default function Logos() {
  return (
    <div id="logos">
      <div className="container">
        <div className="sixteen columns">
          {/* {LOGOS.map((n, k) => (
            <div key={k} className="logos-wrap">
              <img src={`${BASE}/logo-${n}.png`} alt="" loading="lazy" decoding="async" />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}
