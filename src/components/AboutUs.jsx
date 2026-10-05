import { HeaderText, ClLink, Icon } from './ui.jsx'
import Stats from './Stats.jsx'

const IMG = '/img/products'

const VALUES = [
  ['leaf', 'End-to-End Execution', 'One coordinated partner across multiple stages of the project.'],
  ['shield', 'Integrated Operations', 'Planning, procurement, production, manpower, dispatch, logistics and installation working together.'],
  ['volume-down', 'Project-Focused Approach', 'Solutions planned according to project requirements, timelines and site conditions.'],
  ['thermometer-half', 'Skilled Workforce', 'Experienced teams for fabrication and site installation.'],
  ['wrench', 'Quality-Focused Production', 'Attention to specifications, fabrication quality and finishing.'],
  ['clock-o', 'Timely Coordination', 'Better coordination between production, dispatch, transportation and site execution.'],
  ['clock-o', 'Custom Solutions', 'Solutions can be adapted according to architectural and project requirements.'],
]

// const MILESTONES = [
//   ['2012', 'Company founded', 'Started as a small fabrication workshop supplying windows to local builders.'],
//   ['2016', 'Full range launched', 'Introduced doors, tilt & turn and sliding systems alongside the original window line.'],
//   ['2019', 'Commercial division', 'Began supplying developers and contractors on multi-unit residential projects.'],
//   ['2023', '10,000 installations', 'A decade of trading and more than ten thousand completed installations.'],
// ]

//const CERTS = ['CE MARKED', 'ISO 9001', 'ENERGYCALC A', 'PAS 0232', 'BS EN 14351-1']

export default function AboutUs() {
  return (
    <div id="about-us">
      {/* ---------- intro ---------- */}
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="about us"
            title="about us"
            subtitle="SunMaX is an architectural solutions and project execution company focused on delivering integrated solutions across aluminium, glass, uPVC, partitions and ACP structural works."
          />
        </div>
      </div>

      <div className="clear" />

      {/* ---------- split: text + image ---------- */}
      <div id="about-story">
        <div className="container">
          <div className="six columns reveal left">
            <h5 className="about-lead">
              Our goal is simple: 
              make complex project execution more organised.
            </h5>
            <p>
              We coordinate the complete project cycle — from planning and procurement to production, 
              manpower deployment, dispatch, logistics and installation.
            </p>
            {/* <div className="about-cta">
              <a className="btn-survey" href="#contact">
                <i className="fa fa-check" aria-hidden="true" />
                <span>Request a Free Survey</span>
              </a>
            </div> */}
          </div>

          <div className="five columns reveal right">
            <div className="about-media">
              <img
                src={`${IMG}/u03.jpg`}
                alt="SunMaX uPVC window installation in a modern home"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </div>
          </div>

          <div className="five columns reveal right">
            <div className="about-media">
              <img
                src={`${IMG}/u07.jpg`}
                alt="Finished uPVC glazing on a contemporary house"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>

      {/* ---------- key figures ---------- */}
      <Stats />

      {/* ---------- values ---------- */}
      <div id="about-values">
        <div className="container">
          <div className="sixteen columns reveal top">
            <HeaderText
              shadow="why sunmax"
              title="why sunmax"
              subtitle="The reasons our customers come back — and recommend us to others."
            />
          </div>
        </div>
        <div className="container">
          {VALUES.map(([icon, title, text], n) => (
            <div
              key={title}
              className={`one-third column reveal ${n % 3 === 1 ? 'bottom' : n % 3 === 0 ? 'left' : 'right'}`}
            >
              <div className="value-card">
                <div className="value-icon">
                  <Icon name={icon} />
                </div>
                <h5>{title}</h5>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- milestones ---------- */}
      {/* <div id="about-history">
        <div className="container">
          <div className="sixteen columns reveal top">
            <HeaderText
              shadow="our history"
              title="our history"
              subtitle="From a single workshop to thousands of completed installations."
            />
          </div>
        </div>
        <div className="container">
          <div className="sixteen columns">
            <ol className="timeline">
              {MILESTONES.map(([year, title, text]) => (
                <li key={year} className="reveal bottom">
                  <span className="tl-year">{year}</span>
                  <div className="tl-body">
                    <h5>{title}</h5>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div> */}

      {/* ---------- certifications ---------- */}
      {/* <div id="about-certs">
        <div className="container">
          <div className="sixteen columns reveal top">
            <h6>every product independently certified</h6>
            <ul className="certs">
              {CERTS.map((c) => (
                <li key={c}>
                  <Icon name="check" /> {c}
                </li>
              ))}
            </ul>
            <div className="cl-effect-5 about-cta">
              <ClLink href="#products" hover="view range">view our products</ClLink>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
