const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, 'public')

  ; (async () => {
    const { data, info } = await sharp(path.join(PUB, 'logo.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const W = info.width, H = info.height
    console.log(`${W}x${H}`)

    // row ink profile
    const row = []
    for (let y = 0; y < H; y++) {
      let c = 0
      for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 40) c++
      row.push(c)
    }
    const max = Math.max(...row)
    console.log('max row ink:', max)
    const step = Math.ceil(H / 36)
    const prof = []
    for (let y = 0; y < H; y += step) {
      const m = Math.max(...row.slice(y, y + step))
      prof.push(`${y}:${m > 0 ? '#'.repeat(Math.max(1, Math.round(m / max * 40))) : '.'}`)
    }
    console.log(prof.join('\n'))

    // find the widest empty band in the lower 45% => wordmark / tagline split
    let best = { y: -1, width: -1, run: -1 }
    let runStart = -1
    for (let y = Math.floor(H * 0.5); y < H; y++) {
      if (row[y] <= max * 0.01) {
        if (runStart < 0) runStart = y
      } else {
        if (runStart >= 0) {
          const w = y - runStart
          if (w > best.width) best = { y: runStart + Math.floor(w / 2), width: w, run: runStart }
        }
        runStart = -1
      }
    }
    console.log('\nwidest empty band in lower half:', best)
  })()