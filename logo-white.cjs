const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, 'public', 'img')
const SRC = path.join(OUT, 'logo-dark-ink.png') // clean full-colour lockup, real alpha

/**
 * White-ink variant.
 *
 * The wordmark is dark grey/black with lighter grey bevel and drop-shadow
 * strokes, so a simple luminance threshold leaves dark fringes and an
 * unconverted letter. Instead: keep the saturated brand green (the sunburst)
 * and make every non-green pixel white.
 *
 * Green test: green channel clearly dominant AND reasonably saturated.
 */
function toWhite(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max === 0 ? 0 : (max - min) / max
  const isGreen = g > r + 18 && g > b + 18 && sat > 0.18
  return isGreen ? [r, g, b] : [255, 255, 255]
}

; (async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height

  const out = Buffer.alloc(W * H * 4)
  let greenPx = 0, whitePx = 0
  for (let i = 0; i < W * H; i++) {
    const a = data[i * 4 + 3]
    if (a === 0) { out[i * 4 + 3] = 0; continue }
    const [nr, ng, nb] = toWhite(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])
    if (nr === 255 && ng === 255 && nb === 255) whitePx++
    else greenPx++
    out[i * 4] = nr
    out[i * 4 + 1] = ng
    out[i * 4 + 2] = nb
    out[i * 4 + 3] = a
  }
  console.log(`recoloured: ${greenPx} green px, ${whitePx} white px`)

  for (const [name, w] of [['logo-full-white.png', 600], ['logo-white-ink.png', 600]]) {
    const dest = path.join(OUT, name)
    await sharp(out, { raw: { width: W, height: H, channels: 4 } })
      .resize({ width: w })
      .png({ compressionLevel: 9, palette: true, quality: 92 })
      .toFile(dest)
    const m = await sharp(dest).metadata()
    console.log(`  ${name}  ${m.width}x${m.height}  ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`)
  }
})()