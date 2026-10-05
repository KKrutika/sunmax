const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, 'public', 'img')
const SRC = path.join(OUT, 'logo-dark-ink.png') // clean crop, real alpha

  /**
   * logo-dark-ink.png is the clean full-colour lockup with a correct alpha channel.
   * From it we build:
   *   logo-mark.png / logo-mark-white.png   sunburst + wordmark  (navbar)
   *   logo-full.png / logo-full-white.png   + tagline            (footer)
   *
   * The white variant keeps the brand green sunburst and only turns the DARK ink
   * white, so the wordmark stays legible on the dark navbar.
   */
  ; (async () => {
    const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const W = info.width, H = info.height
    const px = (x, y) => {
      const i = (y * W + x) * 4
      return [data[i], data[i + 1], data[i + 2], data[i + 3]]
    }

    // vertical ink profile -> split the lockup into wordmark cluster / tagline cluster
    const rowInk = []
    for (let y = 0; y < H; y++) {
      let c = 0
      for (let x = 0; x < W; x++) if (px(x, y)[3] > 40) c++
      rowInk.push(c)
    }

    const clusters = []
    let start = -1
    for (let y = 0; y < H; y++) {
      const has = rowInk[y] > W * 0.005
      if (has && start < 0) start = y
      if (!has && start >= 0) { clusters.push([start, y - 1]); start = -1 }
    }
    if (start >= 0) clusters.push([start, H - 1])

    // merge clusters separated by a small gap (parts of one line of text)
    const merged = []
    for (const c of clusters) {
      const last = merged[merged.length - 1]
      if (last && c[0] - last[1] <= 10) last[1] = c[1]
      else merged.push([...c])
    }
    console.log('vertical clusters:', JSON.stringify(merged))

    const hasTagline = merged.length > 1
    const markBottom = hasTagline ? merged[0][1] : H - 1

    // horizontal bounds of the wordmark cluster
    let left = W, right = -1
    for (let y = merged[0][0]; y <= markBottom; y++) {
      for (let x = 0; x < W; x++) {
        if (px(x, y)[3] > 40) { if (x < left) left = x; if (x > right) right = x }
      }
    }
    const pad = 3
    const markBox = {
      left: Math.max(0, left - pad),
      top: Math.max(0, merged[0][0] - pad),
      width: Math.min(W - left + pad, right - left + 1 + pad * 2),
      height: Math.min(H - merged[0][0] + pad, markBottom - merged[0][0] + 1 + pad * 2),
    }
    console.log('wordmark box:', JSON.stringify(markBox))

    // recolour helper: dark ink -> white, keep brand green
    async function emit(name, box, white, targetW) {
      const w = box.width, h = box.height
      const out = Buffer.alloc(w * h * 4)
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const [r, g, b, a] = px(box.left + x, box.top + y)
          const i = (y * w + x) * 4
          if (white) {
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if (lum < 110) { out[i] = 255; out[i + 1] = 255; out[i + 2] = 255 }
            else { out[i] = r; out[i + 1] = g; out[i + 2] = b }
          } else {
            out[i] = r; out[i + 1] = g; out[i + 2] = b
          }
          out[i + 3] = a
        }
      }
      let img = sharp(out, { raw: { width: w, height: h, channels: 4 } })
      if (targetW && targetW < w) img = img.resize({ width: targetW })
      const dest = path.join(OUT, name)
      await img.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(dest)
      const m = await sharp(dest).metadata()
      console.log(`  ${name}  ${m.width}x${m.height}  aspect ${(m.width / m.height).toFixed(2)}  ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`)
    }

    await emit('logo-mark.png', markBox, false, 600)
    await emit('logo-mark-white.png', markBox, true, 600)
    await emit('logo-full.png', { left: 0, top: 0, width: W, height: H }, false, 600)
    await emit('logo-full-white.png', { left: 0, top: 0, width: W, height: H }, true, 600)
  })()