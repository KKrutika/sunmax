import { HeaderText, ClLink } from './ui.jsx'

const PLANS = [
  { price: '$9.99', name: 'Standard', projects: 15, storage: '5GB', gold: false },
  { price: '$17.99', name: 'Gold', projects: 25, storage: '15GB', gold: true },
  { price: '$34.99', name: 'Premium', projects: 100, storage: '50GB', gold: false },
]

/*
  Currently hidden via `#plans { display: none; }` in src/styles/index.css.
  The markup and styles are kept intact so the pricing table can be
  re-enabled by deleting that one rule.
*/
export default function Plans() {
  return (
    <div id="plans">
      <div className="container">
        <div className="sixteen columns reveal top">
          <HeaderText
            shadow="our plans"
            title="our plans"
            subtitle="You can configure your pricing table using the grid system in order to make it responsive for small devices."
          />
        </div>
      </div>
      <div className="container">
        {PLANS.map((p) => (
          <div key={p.name} className="one-third column reveal left">
            <div className={p.gold ? 'plans-offer-gold' : 'plans-offer'}>
              <h3>
                {p.price}
                <span> – month</span>
              </h3>
              <h6>{p.name}</h6>
              <p>
                <strong>24/7</strong> TECH SUPPORT
              </p>
              <p>
                <strong>{p.projects}</strong> PROJECTS
              </p>
              <p>
                <strong>{p.storage}</strong> STORAGE
              </p>
              <p>UNLIMITED USERS</p>
              <ClLink hover="sign up">sign up</ClLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
