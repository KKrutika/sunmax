import { HeaderText, ClLink } from './ui.jsx'

const IMG = '/img/products'

const APPLICATIONS = [
  ['a-residential', 'Residential', 'u04', 'Comfortable, quiet, well-insulated homes in any climate.'],
  ['a-apartments-villas', 'Apartments & Villas', 'u17', 'Stylish profiles that suit both high-rise and luxury projects.'],
  ['a-commercial-buildings', 'Commercial Buildings', 'u16', 'Durable systems for high-traffic, high-visibility facades.'],
  ['a-offices', 'Offices', 'u08', 'A quiet, well-lit workplace with low operating costs.'],
  ['a-hotels-hospitality', 'Hotels & Hospitality', 'u11', 'Guest comfort, appearance and long-term reliability.'],
  ['a-schools-institutions', 'Schools & Institutions', 'u13', 'Safe, robust and maintenance-light fenestration.'],
  ['a-renovation-replacement', 'Renovation & Replacement', 'u05', 'Fast, clean upgrades to existing openings.'],
]

export default function Applications() {
  return (
    <div id="applications">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="applications"
            title="applications"
            subtitle="From single homes to large commercial developments, we deliver fenestration suited to how the space is actually used."
          />
        </div>
      </div>
      <div className="container">
        {APPLICATIONS.map(([id, name, img, text]) => (
          <div key={id} id={id} className="one-third column reveal bottom scroll-target">
            <div className="offer-card">
              <div className="offer-media">
                <img
                  src={`${IMG}/${img}.jpg`}
                  alt={`${name} project with SunMaX uPVC windows and doors`}
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
      <div className="clear" />
      <div id="link-apply">
        <div className="container">
          <div className="sixteen columns reveal top">
            <h6>need advice on your project?</h6>
            <ClLink href="#contact" hover="contact us">talk to us</ClLink>
          </div>
        </div>
      </div>
    </div>
  )
}
