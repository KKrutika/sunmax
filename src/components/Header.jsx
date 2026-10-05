import { useEffect, useState } from 'react'
import { SocialList, ClLink } from './ui.jsx'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about-us' },
  {
    label: 'Products',
    href: '#products',
    children: [
      { label: 'uPVC Windows', href: '#p-upvc-windows' },
      { label: 'uPVC Doors', href: '#p-upvc-doors' },
      { label: 'Sliding Windows', href: '#p-sliding-windows' },
      { label: 'Casement Windows', href: '#p-casement-windows' },
      { label: 'Tilt & Turn Windows', href: '#p-tilt-turn-windows' },
      { label: 'Fixed Windows', href: '#p-fixed-windows' },
      { label: 'French Doors', href: '#p-french-doors' },
      { label: 'Sliding Doors', href: '#p-sliding-doors' },
    ],
  },
  {
    label: 'Applications',
    href: '#applications',
    children: [
      { label: 'Residential', href: '#a-residential' },
      { label: 'Apartments & Villas', href: '#a-apartments-villas' },
      { label: 'Commercial Buildings', href: '#a-commercial-buildings' },
      { label: 'Offices', href: '#a-offices' },
      { label: 'Hotels & Hospitality', href: '#a-hotels-hospitality' },
      { label: 'Schools & Institutions', href: '#a-schools-institutions' },
      { label: 'Renovation & Replacement', href: '#a-renovation-replacement' },
    ],
  },
  { label: 'Why SunMaX', href: '#about-values' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Enquiry', href: '#contact' },
]

const WHATSAPP_NUMBER = '919301956677'
const EMAIL_TO = 'sunmax.trade08@gmail.com'

export default function Header() {
  const [shrink, setShrink] = useState(false)
  const [open, setOpen] = useState(false)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [enquirySent, setEnquirySent] = useState(false)
  const [enquiry, setEnquiry] = useState({ name: '', phone: '', siteDetails: '', address: '', measurements: '' })
  // which dropdown is expanded (mobile / click); null = all closed
  const [drop, setDrop] = useState(null)

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeAll = () => {
    setOpen(false)
    setDrop(null)
  }

  const openEnquiry = (event) => {
    if (event) event.preventDefault()
    setEnquirySent(false)
    setEnquiryOpen(true)
  }

  const closeEnquiry = () => {
    setEnquiryOpen(false)
    setEnquirySent(false)
  }

  const handleEnquiryChange = (field) => (event) => {
    setEnquiry((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submitEnquiry = (event) => {
    event.preventDefault()

    const text = [
      `Name: ${enquiry.name}`,
      `Phone No.: ${enquiry.phone}`,
      `Site Details: ${enquiry.siteDetails}`,
      `Address: ${enquiry.address}`,
      `Measurements: ${enquiry.measurements}`,
    ].join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    const mailBody = encodeURIComponent(`Name: ${enquiry.name}\nPhone No.: ${enquiry.phone}\nSite Details: ${enquiry.siteDetails}\nAddress: ${enquiry.address}\nMeasurements: ${enquiry.measurements}`)
    const mailtoUrl = `mailto:${EMAIL_TO}?subject=${encodeURIComponent('New Enquiry from Website')}&body=${mailBody}`

    window.open(whatsappUrl, '_blank')
    window.location.href = mailtoUrl

    setEnquirySent(true)
    setEnquiry({ name: '', phone: '', siteDetails: '', address: '', measurements: '' })
  }

  return (
    <>
      <div className="top-info-bar">
        <div className="container top-info-inner">
          <a href="tel:+919301956677" aria-label="Call SunMaX">
            <i className="fa fa-phone" aria-hidden="true" /> +91-9301956677
          </a>
          <a href="mailto:sunmax.trade08@gmail.com" aria-label="Email SunMaX">
            <i className="fa fa-envelope-o" aria-hidden="true" /> sunmax.trade08@gmail.com
          </a>
        </div>
      </div>

      <div id="menu-wrap" className={shrink ? 'shrink' : ''}>
        <div className="container">
          <div className="sixteen columns">
            <a className="logo" href="#home" aria-label="SunMaX — home">
              {/*
                public/logo.png is your original logo, unaltered: the sunburst,
                the "SunMaX" wordmark and the italic "Optimising Resources"
                tagline in their original colours. Only the background was keyed
                out (the JPEG had a transparency checkerboard burned into the
                pixels), giving a true alpha channel. Nothing is cropped,
                recoloured or retouched.
              */}
              <img src="/logo.png" alt="SunMaX — Optimising Resources" width="172" height="80" />
            </a>
            <div className="menu-collapser">
              <div
                className="collapse-button"
                role="button"
                tabIndex={0}
                aria-label="Toggle navigation"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </div>
            </div>
            <ul className={open ? 'slimmenu open' : 'slimmenu'}>
              {NAV.map((item) => (
                <li
                  key={item.label}
                  className={item.children ? `has-sub${drop === item.label ? ' expanded' : ''}` : ''}
                  onMouseEnter={() => item.children && setDrop(item.label)}
                  onMouseLeave={() => item.children && setDrop(null)}
                >
                  {item.children ? (
                    <>
                      {/* Desktop: hover/focus opens the panel.
                          Mobile: the button toggles it. */}
                      <a
                        href={item.href}
                        className="scroll"
                        aria-haspopup="true"
                        aria-expanded={drop === item.label}
                        onClick={item.label === 'Enquiry' ? openEnquiry : closeAll}
                      >
                        {item.label}
                        <i className="fa fa-angle-down nav-caret" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="sub-toggle"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={drop === item.label}
                        onClick={(e) => {
                          e.preventDefault()
                          setDrop((d) => (d === item.label ? null : item.label))
                        }}
                      >
                        <i className="fa fa-angle-down" aria-hidden="true" />
                      </button>
                      <ul className="sub-menu">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <a className="scroll" href={c.href} onClick={closeAll}>
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      className="scroll"
                      href={item.href}
                      onClick={item.label === 'Enquiry' ? openEnquiry : closeAll}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="home">
        {/* Single static hero — no slider. */}
        <div
          className="banner"
          style={{ backgroundImage: "url('/hero.jpg')" }}
          role="img"
          aria-label="Modern house with large glazed sliding doors and floor-to-ceiling windows"
        />
        <div className="just_pattern" />

        <div className="big-text enter">
          <span>uPVC windows &amp; doors</span>
        </div>

        <div className="small-text">
          {/* <ClLink href="#products" hover="products">products</ClLink>{' '} */}
          <button type="button" className="inline-enquiry-btn" onClick={openEnquiry}>Enquire Now</button>
        </div>

        <div className="social-top">
          <SocialList className="list-social" />
        </div>

        <a className="scroll" href="#about">
          <div className="scroll-btn" />
        </a>
      </div>

      {enquiryOpen && (
        <div className="enquiry-modal-backdrop" onClick={closeEnquiry}>
          <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="enquiry-close" aria-label="Close enquiry form" onClick={closeEnquiry}>
              ×
            </button>
            <div className="enquiry-head">
              <h3 id="enquiry-title">Enquire Now</h3>
            </div>

            {enquirySent ? (
              <div className="enquiry-success">
                <p>Thank you. Your enquiry has been noted and our team will contact you soon.</p>
                <button type="button" className="enquiry-submit" onClick={closeEnquiry}>Close</button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={submitEnquiry}>
                <div className="field-row">
                  <label>
                    Name
                    <input type="text" value={enquiry.name} onChange={handleEnquiryChange('name')} required />
                  </label>
                </div>
                <div className="field-row two-up">
                  <label>
                    Phone No.
                    <input type="tel" value={enquiry.phone} onChange={handleEnquiryChange('phone')} required />
                  </label>
                </div>
                <div className="field-row">
                  <label>
                    Site Details
                    <textarea rows="3" value={enquiry.siteDetails} onChange={handleEnquiryChange('siteDetails')} required />
                  </label>
                </div>
                <div className="field-row">
                  <label>
                    Address
                    <textarea rows="3" value={enquiry.address} onChange={handleEnquiryChange('address')} required />
                  </label>
                </div>
                <div className="field-row">
                  <label>
                    Measurements
                    <textarea rows="3" value={enquiry.measurements} onChange={handleEnquiryChange('measurements')} required />
                  </label>
                </div>
                <button type="submit" className="enquiry-submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
