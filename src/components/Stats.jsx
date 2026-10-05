import Counter from './Counter.jsx'

const IMG = '/img/products'

const FACTS = [
  { value: 100, suffix: '+', label: 'Installations' },
  { value: 10, suffix: '+', label: 'Years experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
]

export default function Stats() {
  return (
    <div id="sep2">
      <div className="just_pattern" />
      <div
        className="parallax2"
        style={{
          backgroundImage: `url(${IMG}/u05.jpg)`,
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="container z-index">
        {FACTS.map(({ value, suffix, label }) => (
          <div key={label} className="four columns">
            <div className="facts-wrap">
              <div
                className="facts-wrap-num"
                data-digits={String(value).length}
              >
                <Counter to={value} format={(n) => `${n.toLocaleString('en-GB')}${suffix}`} />
              </div>
              <h5>{label}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
