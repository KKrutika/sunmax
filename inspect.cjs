const { readFileSync } = require('node:fs')
const s = readFileSync('src/styles/index.css', 'latin1')

const noComments = s.replace(/\/\*[\s\S]*?\*\//g, '')
const open = (noComments.match(/{/g) || []).length
const close = (noComments.match(/}/g) || []).length
console.log('braces: open =', open, 'close =', close, open === close ? 'BALANCED' : 'MISMATCH')

const check = [
    ['font Sifonn', "font-family: 'Sifonn-Basic'"],
    ['accent var', '--accent: #2ecc71'],
    ['grid four', '.four.columns {'],
    ['header', '#menu-wrap {'],
    ['hero', '#home {'],
    ['about-us', '#about-us {'],
    ['sep2', '#sep2 {'],
    ['products', '#products,'],
    ['faq', '.faq-q {'],
    ['contact', '#ajax-form {'],
    ['footer', '#footer {'],
    ['media959', '@media (max-width: 959px) {'],
    ['media540', '@media (max-width: 540px) {'],
]
for (const [name, needle] of check) {
    console.log((s.includes(needle) ? 'OK       ' : 'MISSING  ') + name)
}

const leftovers = ['sep1', 'tiltview', 'slideshow', 'anim-in', 'anim-out', 'e-moveUp', 'portfolio-box', 'moveUpOut']
const found = leftovers.filter((g) => s.includes(g))
console.log('sep1 leftovers:', found.length ? found.join(', ') : 'none')
