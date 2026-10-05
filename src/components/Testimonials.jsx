import { HeaderText } from './ui.jsx'

const PEOPLE = '/img/people'

const TESTIMONIALS = [
  {
    id: 't-1',
    quote:
      'They surveyed the house, explained the difference between the profiles in plain English, and talked us out of the more expensive option because our openings were smaller. That honesty is why we used them.',
    name: 'PLACEHOLDER — homeowner name',
    role: 'Semi-detached house, uPVC windows throughout',
    img: 'p1',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'Fitters turned up on the first morning and were finished by lunch. No mess, no chasing. The difference in noise from the street is genuinely startling.',
    name: 'PLACEHOLDER — homeowner name',
    role: 'Flat, sliding doors to a balcony',
    img: 'p3',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'We specified them for a 42-unit development. Delivery stayed on programme across three phases and the handover documentation was thorough enough for our own compliance file.',
    name: 'PLACEHOLDER — client name',
    role: 'Developer, 42-unit residential scheme',
    img: 'p4',
    rating: 5,
  },
  {
    id: 't-4',
    quote:
      'Our old frames were original to the building and badly leaking. They matched the profile closely enough that the front elevation still looks period-correct, which was the whole point.',
    name: 'PLACEHOLDER — homeowner name',
    role: 'Victorian terrace, sash-style replacement',
    img: 'p5',
    rating: 4,
  },
  {
    id: 't-5',
    quote:
      'We use them for every fit-out we run. They price honestly, flag any specification that will not work, and they turn up when they say they will.',
    name: 'PLACEHOLDER — client name',
    role: 'Main contractor, commercial fit-outs',
    img: 'p2',
    rating: 5,
  },
  {
    id: 't-6',
    quote:
      'One sash needed re-adjusting after the first season. Sorted within a week at no charge, no argument. That is when I knew they were a real company rather than a sales outfit.',
    name: 'PLACEHOLDER — homeowner name',
    role: 'Tilt and turn windows, aftercare',
    img: 'p7',
    rating: 5,
  },
]

function Stars({ n }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= n ? 'fa fa-star on' : 'fa fa-star'} aria-hidden="true" />
      ))}
    </span>
  )
}

function Testimonial({ t }) {
  return (
    <figure className="testimonial">
      <i className="fa fa-quote-left tm-quote" aria-hidden="true" />
      <Stars n={t.rating} />
      <blockquote>
        <p>{t.quote}</p>
      </blockquote>
      <figcaption>
        <img
          src={`${PEOPLE}/${t.img}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          width="64"
          height="64"
        />
        <div className="tm-meta">
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="testimonials"
            title="testimonials"
            subtitle="What customers say after we have installed and serviced their windows and doors."
          />
        </div>
      </div>
      <div className="container">
        {TESTIMONIALS.map((t, n) => (
          <div
            key={t.id}
            className={`one-third column reveal ${n % 3 === 1 ? 'bottom' : n % 3 === 0 ? 'left' : 'right'}`}
          >
            <Testimonial t={t} />
          </div>
        ))}
      </div>
    </div>
  )
}