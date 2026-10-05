import { useState } from 'react'
import { HeaderText, Icon } from './ui.jsx'

const ADDRESS = 'Shop No.01, Plot.216, Indrapuri C sector, Sector C, Indrapuri, Bhopal, Madhya Pradesh 462022'

export default function Contact() {
  const [map, setMap] = useState(true)

  return (
    <div id="contact">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="contact"
            title="contact"
            subtitle="We create best opportunities for your business."
          />
        </div>
      </div>

      <div className="container">
        <div className="columns reveal center visible">
          <div className="contact-wrap">
            <p>
              <Icon name="map-marker" className="icon-contact1" /> <span>Visit Us:</span>{' '}
              {ADDRESS}
            </p>
          </div>
        </div>
        <div className="sixteen columns reveal bottom">
          <a
            className={map ? 'button-map show-map' : 'button-map close-map'}
            onClick={() => setMap((m) => !m)}
          >
            <span>{map ? 'Hide Map' : 'Locate Us on Map'}</span>
          </a>
        </div>
      </div>

      {map && (
        <div id="google_map show">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Shop%20No.01,%20Plot.216,%20Indrapuri%20C%20sector,%20Sector%20C,%20Indrapuri,%20Bhopal,%20Madhya%20Pradesh%20462022&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        </div>
      )}
    </div>
  )
}
