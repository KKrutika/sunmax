import { useState } from 'react'
import { HeaderText } from './ui.jsx'

const FAQS = [
  [
    'Are your windows energy efficient?',
    'Yes. Multi-chambered uPVC profiles combined with argon-filled double or triple glazing deliver excellent U-values, cutting heat loss in winter and solar gain in summer.',
  ],
  [
    'How long does installation take?',
    'A typical residential home is completed in one to two days, including removal of the old units, installation, sealing and tidying. Larger commercial projects are scheduled to suit your programme.',
  ],
  [
    'Do you offer free site surveys?',
    'Yes. We carry out a free, no-obligation site visit to measure your openings, assess structural conditions and provide a detailed written quotation.',
  ],
  [
    'What warranty is included?',
    'Our profiles carry a manufacturer-backed profile warranty and our hardware and sealed units are covered alongside it. Exact terms are stated in writing with every quotation.',
  ],
  [
    'Can you match a specific colour?',
    'We offer a wide range of RAL and standard colour options, including woodgrain foils, so the frames can suit both modern and period properties.',
  ],
  [
    'Do you supply to commercial developers?',
    'Yes. We work with developers, architects and contractors on both new-build and replacement projects, and can supply to a staged programme.',
  ],
]

function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        aria-controls={`faq-a-${i}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <i className="fa fa-plus" aria-hidden="true" />
      </button>
      <div className="faq-a" id={`faq-a-${i}`} role="region">
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faqs() {
  return (
    <div id="faqs">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="faqs"
            title="faqs"
            subtitle="Straight answers to the questions we are asked most often."
          />
        </div>
      </div>
      <div className="container">
        <div className="fourteen columns offset-by-one">
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
