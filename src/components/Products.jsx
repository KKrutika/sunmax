import { HeaderText } from './ui.jsx'

const IMG = '/img/products'

const PRODUCTS = [
  ['p-upvc-windows', 'uPVC Windows', 'u23', 'energy-efficient windows with excellent thermal performance and sound insulation.'],
  ['p-upvc-doors', 'uPVC Doors', 'u22', 'secure, weather-resistant entrance and internal doors built to last.'],
  ['p-sliding-windows', 'Sliding Windows', 'u01', 'smooth-gliding sashes that maximise natural light and airflow.'],
  ['p-casement-windows', 'Casement Windows', 'u02', 'classic outward-opening design with a tight, dependable seal.'],
  ['p-tilt-turn-windows', 'Tilt & Turn Windows', 'u03', 'two versatile opening modes in one practical, space-saving unit.'],
  ['p-fixed-windows', 'Fixed Windows', 'u20', 'non-opening picture windows for clean lines and maximum light.'],
  ['p-french-doors', 'French Doors', 'u07', 'wide-opening double doors that connect rooms to outdoor spaces.'],
  ['p-sliding-doors', 'Sliding Doors', 'u21', 'effortless large-glazed access for terraces and balconies.'],
]

export default function Products() {
  return (
    <div id="products">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="our products"
            title="our products"
            subtitle="A complete range of uPVC windows and doors, engineered for comfort, security and long service life."
          />
        </div>
      </div>
      <div className="container">
        {PRODUCTS.map(([id, name, img, text]) => (
          <div key={id} id={id} className="one-third column reveal bottom scroll-target">
            <div className="offer-card">
              <div className="offer-media">
                <img
                  src={`${IMG}/${img}.jpg`}
                  alt={`${name} installed in a modern building`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
              </div>
              <div className="offer-body">
                <h5>{name}</h5>
                <p>{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
