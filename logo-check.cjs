const sharp = require('sharp')
const path = require('path')

const OUT = path.join(__dirname, 'public', 'img')
const NAVBAR = { r: 60, g: 60, b: 60 } // rgba(60,60,60,.9) composited on dark page

  ; (async () => {
    for (const name of ['logo-full-white.png', 'logo-mark-white.png']) {
      const p = path.join(OUT, name)
      const m = await sharp(p).metadata()
      const canvas = await sharp({
        create: {
          width: m.width + 40,
          height: m.height + 40,
          channels: 3,
          background: NAVBAR,
        },
      })
        .composite([{ input: p, left: 20, top: 20 }])
        .png()
        .toBuffer()

      await sharp(canvas).toFile(path.join(OUT, `check-${name}`))
      console.log(`check-${name}  ${m.width + 40}x${m.height + 40}`)
    }
  })()