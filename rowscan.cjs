const sharp = require('sharp')
const path = require('path')
const OUT = path.join(__dirname, 'public', 'img')
const SRC = path.join(OUT, 'logo-dark-ink.png')

  ; (async () => {
    const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const W = info.width, H = info.height
    const rowInk = []
    for (let y = 0; y < H; y++) {
      let c = 0
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4
        if (data[i + 3] > 40) c++
      }
      rowInk.push(c)
    }

    // print a coarse profile so the gap is visible
    const step = Math.ceil(H / 40)
    const profile = []
    for (let y = 0; y < H; y += step) {
      const band = rowInk.slice(y, y + step)
      const max = Math.max(...band)
      profile.push({ y, max })
    }
    console.log('W x H =', W, 'x', H)
    console.log('row profile (y: maxInkInBand):')
    console.log(profile.map((p) => `${p.y}:${p.max}`).join('  '))

    // best split: minimise ink in the band between the wordmark and the tagline
    let best = { y: -1, min: Infinity }
    const lo = Math.floor(H * 0.45)
    const hi = Math.floor(H * 0.92)
    for (let y = lo; y <= hi; y++) {
      let c = 0
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4
        if (data[i + 3] > 40) c++
      }
      if (c < best.min) best = { y, min: c }
    }
    console.log('\nemptiest row band:', best)
  })()