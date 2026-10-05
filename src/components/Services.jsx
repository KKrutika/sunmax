import { HeaderText } from './ui.jsx'

const circle = (
  <path
    className="circle"
    d="M50,2.125c26.441,0,47.875,21.434,47.875,47.875S76.441,97.875,50,97.875C17.857,97.875,2.125,76.441,2.125,50S23.559,2.125,50,2.125z"
  />
)

const SERVICES = [
  {
    title: 'Project Planning & Coordination',
    description:
      'From requirements and BOQs to scheduling and site coordination, we structure every project for smooth execution.',
    paths: [
      'M74.264,24.224c0.863-0.864,2.264-0.864,3.128,0l1.042,1.042c0.863,0.864,0.863,2.265,0,3.129L56.055,57.027L45.628,46.602L74.264,24.224z',
      'M45.662,46.434l10.427,10.425c0.863,0.864,0.863,2.265,0,3.129l-3.128,3.128c-0.863,0.863-2.265,0.863-3.129,0L39.406,52.69c-0.863-0.864-0.863-2.265,0-3.129l3.128-3.127C43.399,45.571,44.799,45.571,45.662,46.434z',
      'M39.677,53.031l10.229,10.228c-8.683,20.973-28.987,10.601-28.987,10.601s10.482,0.427,10.021-9.586C30.561,56.009,37.24,53.623,39.677,53.031z',
    ],
    includes: [
      'Requirement Assessment',
      'BOQ Planning',
      'Production Scheduling',
      'Resource Planning',
      'Site Coordination',
      'Installation Planning',
      'Timeline Management',
    ],
  },

  {
    title: 'Procurement & Material Management',
    description:
      'We coordinate quality materials and vendors to keep every project supplied and on track.',
    paths: [
      'M37.381,21.793h25.237c2.46,0,4.454,1.994,4.454,4.454v47.506c0,2.46-1.994,4.454-4.454,4.454H37.381c-2.46,0-4.454-1.994-4.454-4.454V26.247C32.928,23.787,34.921,21.793,37.381,21.793z',
      'M35.896,30.701h28.208v38.598H35.896V30.701z',
    ],
    includes: [
      'Aluminium Profiles',
      'Glass',
      'Hardware & Fittings',
      'ACP Materials',
      'uPVC Materials',
      'Structural Components',
      'Sealants & Consumables',
      'Vendor Coordination',
      'Material Quality Checks',
    ],
  },

  {
    title: 'Production & Fabrication',
    description:
      'We transform project specifications into precise, ready-to-install architectural components.',
    paths: [
      'M63.571,35.8H24.862c-2.789,0-5.05,2.262-5.05,5.049v25.247c0,2.788,2.261,5.049,5.05,5.049h3.806l8.125,8.125c0.382,0.381,1,0.383,1.381,0l8.125-8.125h17.275c2.788,0,5.05-2.261,5.05-5.049V40.85C68.62,38.062,66.361,35.8,63.571,35.8z',
      'M34.743,50.108c-1.858,0-3.365,1.507-3.365,3.366c0,1.86,1.506,3.367,3.365,3.367c1.86,0,3.367-1.507,3.367-3.367C38.109,51.615,36.603,50.108,34.743,50.108z M44.842,50.108c-1.858,0-3.367,1.507-3.367,3.366c0,1.86,1.507,3.367,3.367,3.367c1.859,0,3.366-1.507,3.366-3.367C48.208,51.615,46.701,50.108,44.842,50.108z M54.94,50.108c-1.857,0-3.365,1.507-3.365,3.366c0,1.86,1.506,3.367,3.365,3.367c1.86,0,3.367-1.507,3.367-3.367C58.307,51.615,56.8,50.108,54.94,50.108z',
    ],
    includes: [
      'Aluminium Doors & Windows',
      'Thermal-Break Systems',
      'Slim-Line Systems',
      'Aluminium Partitions',
      'uPVC Systems',
      'Glass-Related Fabrication',
      'ACP Structural Works',
      'Custom Fabrication',
    ],
  },

  {
    title: 'Manpower & Labour Management',
    description:
      'We deploy and coordinate skilled teams across fabrication, installation and site execution.',
    paths: [
      'M50,16.25c18.641,0,33.75,15.109,33.75,33.75S68.641,83.75,50,83.75c-18.64,0-33.75-15.109-33.75-33.75S31.36,16.25,50,16.25z',
      'M50,22.635c15.113,0,27.365,12.252,27.365,27.365c0,15.113-12.252,27.365-27.365,27.365c-15.113,0-27.365-12.252-27.365-27.365C22.635,34.887,34.887,22.635,50,22.635z',
      'M50,28.108c0.504,0,0.912,0.408,0.912,0.913v20.067C50.912,49.592,50.504,50,50,50c-0.504,0-0.912-0.408-0.912-0.912V29.021C49.088,28.516,49.496,28.108,50,28.108z',
    ],
    includes: [
      'Skilled Workforce',
      'Installation Teams',
      'Site Supervisors',
      'Labour Planning',
      'Workforce Scheduling',
      'Site Coordination',
      'Productivity Management',
    ],
  },

  {
    title: 'Dispatch & Logistics',
    description:
      'We manage packing, loading and transportation to ensure materials reach the right site safely and on schedule.',
    paths: [
      'M23.003,36.404L50,54.165l26.997-17.761c0,0,0.006-0.667,0.006,1.688v27.002c0,2.354-1.91,4.264-4.264,4.264H27.262c-2.354,0-4.264-1.91-4.264-4.264V38.092C23,35.738,23.003,36.404,23.003,36.404z',
      'M30.105,32.763h39.791v28.421H30.105V32.763z',
      'M76.162,35.079c1.113,0.731,1.113,1.917,0,2.647L52.013,53.615c-1.11,0.731-2.915,0.731-4.024,0l-24.15-15.889c-1.111-0.73-1.111-1.916,0-2.647l24.15-15.889c1.11-0.729,2.914-0.729,4.024,0L76.162,35.079z',
    ],
    includes: [
      'Project-Wise Segregation',
      'Quality Checks',
      'Packing',
      'Labelling',
      'Loading',
      'Dispatch Scheduling',
      'Material Coordination',
      'Site Delivery',
    ],
  },

  {
    title: 'Installation & Site Execution',
    description:
      'Our teams handle installation, alignment and finishing with a focus on quality and precision.',
    paths: [
      'M50,79.036c-5.322-0.002-30.415-18.54-30.415-37.078c0-5.324,0.566-16.994,15.969-16.994c6.321,0,11.918,4.825,14.446,10.042c2.53-5.217,8.127-10.042,14.448-10.042c15.402,0,15.967,11.67,15.967,16.994C80.415,60.496,55.323,79.034,50,79.036z',
    ],
    includes: [
      'Aluminium Doors & Windows',
      'Thermal-Break Systems',
      'Slim-Line Systems',
      'Glass Partitions',
      'Aluminium Partitions',
      'Toughened Glass',
      'Structural Glazing',
      'ACP Structures',
      'uPVC Doors & Windows',
      'Finishing & Inspection',
    ],
  },
];

export default function Services() {
  return (
    <div id="services">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="services"
            title="services"
            subtitle="We coordinate requirements, quantities, schedules, production and site execution to create a structured workflow from start to finish."
          />
        </div>
      </div>
      <div className="container">
        {SERVICES.map((s, n) => (
          <div
            key={s.title}
            className={`one-third column reveal ${
              n % 3 === 1 ? 'bottom' : n % 3 === 0 ? 'left' : 'right'
            }`}
          >
            <div className="services-offer">
              <span className="svg-icon flat-filled">
                <svg className="flat_icon" width="100" height="100" viewBox="0 0 100 100">
                  {circle}
                  <g className="icon">
                    {s.paths.map((d, k) => (
                      <path key={k} d={d} />
                    ))}
                  </g>
                </svg>
              </span>
              <h5>{s.title}</h5>
              <p className="svc-desc">{s.description}</p>
              <p className="svc-includes">
                <span className="svc-includes-label">Includes:</span>
                <span className="svc-includes-items">
                  {s.includes.map((item) => (
                    <span key={item} className="svc-include">{item}</span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
