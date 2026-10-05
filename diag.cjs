const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, 'public')

  ; (async () => {
    const { data, info } = await sharp(path.join(PUB, 'logo.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const W = info.width, H = info.height
    console.log(`${W}x${H}`)

    let opaque = 0, clear = 0, nearWhiteOpaque = 0
    for (let i = 0; i < W * H; i++) {
      const a = data[i * 4 + 3]
      if (a < 16) { clear++; continue }
      opaque++
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]
      if (r > 235 && g > 235 && b > 235) nearWhiteOpaque++
    }
    console.log(`clear ${(clear / (W * H) * 100).toFixed(1)}%  opaque ${(opaque / (W * H) * 100).toFixed(1)}%  of which near-white ${(nearWhiteOpaque / opaque * 100).toFixed(1)}%`)

    // corners - must be fully transparent
    const corners = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1], [W >> 1, 0], [W >> 1, H - 1], [0, H >> 1], [W - 1, H >> 1]]
    console.log('edge/corner alpha:', corners.map(([x, y]) => data[((y * W + x) * 4) + 3]).join(', '))

    // any remaining fully-opaque near-white RUNS? count per row
    let badRows = 0
    for (let y = 0; y < H; y++) {
      let n = 0
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4
        if (data[i + 3] > 200 && data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) n++
      }
      if (n > W * 0.5) badRows++
    }
    console.log(`rows still >50% near-white: ${badRows}`)
  })()