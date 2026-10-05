export const Icon = ({ name, className = '' }) => (
  <i className={`fa fa-${name} ${className}`} aria-hidden="true" />
)

export const SOCIALS = [
  { name: 'whatsapp', label: 'whatsapp', href: 'https://wa.me/919301956677' },
  { name: 'envelope', label: 'email', href: 'mailto:sunmax.trade08@gmail.com' },
]

export const SocialList = ({ className = 'list-social' }) => (
  <ul className={className}>
    {SOCIALS.map((s) => (
      <li key={s.name} title={s.label}>
        <a href={s.href} aria-label={s.label} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noreferrer' : undefined}>
          <Icon name={s.name} />
        </a>
      </li>
    ))}
  </ul>
)

export const HeaderText = ({ shadow, title, subtitle }) => (
  <div className="header-text">
    <div className="header-title">
      <div className="header-shadow-text" aria-hidden="true">{shadow}</div>
      <h1>{title}</h1>
    </div>
    <p>{subtitle}</p>
  </div>
)

export const ClLink = ({ children, hover, href = '#' }) => (
  <div className="cl-effect-5">
    <a href={href}>
      <span data-hover={hover}>{children}</span>
    </a>
  </div>
)
