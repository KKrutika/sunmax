import { HeaderText, Icon } from './ui.jsx'

const PILLARS = [
  {
    icon: 'minus-square',
    title: 'PLAN & PREPARE.',
    text: 'We understand your requirements, plan resources and coordinate procurement and timelines to create a strong foundation for every project.'
  },
  {
    icon: 'industry',
    title: 'PRODUCE & COORDINATE.',
    text: 'From fabrication to quality control, we keep production, materials and manpower aligned to deliver precise, project-ready solutions.'
  },
  {
    icon: 'wrench',
    title: 'DELIVER & EXECUTE.',
    text: 'We manage dispatch, logistics and installation to ensure every solution reaches the site and is executed with precision.'
  }
];

const BLOCKS = [
  [
    'PLAN & PREPARE.',
    'We understand your requirements, assess the project and coordinate materials, specifications and timelines to ensure everything is planned before fabrication begins.'
  ],
  [
    'PRODUCE & COORDINATE.',
    'We manage fabrication, glazing and quality checks in-house, keeping materials, workmanship and production aligned to deliver precise, project-ready frames.'
  ],
  [
    'DELIVER & EXECUTE.',
    'We coordinate delivery, installation and finishing to ensure every frame reaches site on schedule and is installed with care, precision and attention to detail.'
  ],
];

const BASE = '/img/template'

export default function About() {
  return (
    <>
      <div id="about">
        <div className="container">
          <div className="sixteen columns reveal top">
            <HeaderText
              shadow="our approach"
              title="our approach"
              subtitle="We measure every opening ourselves, fabricate in our own workshop, and install with our own fitters. One team, start to finish."
            />
          </div>
        </div>

        <div className="clear" />

        <div id="about-what-we-do">
          <div className="container">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={`one-third column reveal ${i === 1 ? 'bottom' : i === 0 ? 'left' : 'right'
                  }`}
              >
                <div className="icon-left1"><Icon name={p.icon} /></div>
                <h5>{p.title}</h5>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="video-sections">
          <div className="video-section-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={`${BASE}/about-poster.jpg`}
            >
              <source src={`${BASE}/video.mp4`} type="video/mp4" />
            </video>
            <div className="just_pattern" />
            <div className="text-over-video">A Day at the Office</div>
          </div>
          <div className="video-section-2">
            <div className="container">
              {BLOCKS.map(([h, p], i) => (
                <div key={h} className={i === 0 ? 'nine columns padding-top-video-sec2 reveal right' : 'nine columns reveal right'}>
                  <h5>{h}</h5>
                  <p>{p}</p>
                  {i < BLOCKS.length - 1 && <div className="clear" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
