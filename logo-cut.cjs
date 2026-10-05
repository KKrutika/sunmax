const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const PUB = path.join(__dirname, 'public')
const OUT = path.join(PUB, 'img')

;(async () => {
  const src = path.join(PUB, 'white_logo.jpg')
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const lum = (x, y) => {
    const i = (y * W + x) * C
    return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
  }

  const counts = new Map()
  for (let y = 2; y < 42; y++)
    for (let x = 2; x < 42; x++) {
      const v = Math.round(lum(x, y))
      counts.set(v, (counts.get(v) || 0) + 1)
    }
  const [g1, g2] = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([v]) => v)
  const TOL = 12
  const isBg = (v) => Math.abs(v - g1) <= TOL || Math.abs(v - g2) <= TOL
  console.log(`checkerboard greys ${g1} / ${g2}`)

  const bg = new Uint8Array(W * H)
  // Key BOTH background forms anywhere in the frame, not just edge-connected
  // pixels. A flood fill from the border alone leaves the counters enclosed by
  // letter strokes (inside u/n/a/o) un-keyed, and those then flood white when
  // the ink is recoloured, filling the letters in.
  for (let i = 0; i < W * H; i++) if (isBg(lum(i % W, (i / W) | 0))) bg[i] = 1

  // drop only small islands. An ABSOLUTE floor keeps the thin sunburst rays,
  // which are individually far smaller than the wordmark but still real.
  const fg = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) if (!bg[i]) fg[i] = 1

  const MIN = 800
  const seen = new Uint8Array(W * H)
  let dropped = 0
  for (let s = 0; s < W * H; s++) {
    if (!fg[s] || seen[s]) continue
    const comp = []
    const st = [s]
    seen[s] = 1
    while (st.length) {
      const p = st.pop()
      comp.push(p)
      const x = p % W, y = (p / W) | 0
      if (x > 0 && fg[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; st.push(p - 1) }
      if (x < W - 1 && fg[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; st.push(p + 1) }
      if (y > 0 && fg[p - W] && !seen[p - W]) { seen[p - W] = 1; st.push(p - W) }
      if (y < H - 1 && fg[p + W] && !seen[p + W]) { seen[p + W] = 1; st.push(p + W) }
    }
    if (comp.length < MIN) { for (const p of comp) { fg[p] = 0; dropped++ } }
  }
  console.log(`dropped ${dropped}px of islands under ${MIN}px`)

  // outlier-resistant crop: ignore rows/cols holding only a trace of ink
  const colInk = new Array(W).fill(0)
  const rowInk = new Array(H).fill(0)
  let total = 0
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (fg[y * W + x]) { colInk[x]++; rowInk[y]++; total++ }
  const CUT = Math.max(2, Math.round(Math.min(Math.max(...colInk), Math.max(...rowInk)) * 0.02))

  let left = -1, right = -1, top = -1, bottom = -1
  for (let x = 0; x < W; x++) if (colInk[x] > CUT) { if (left < 0) left = x; right = x }
  for (let y = 0; y < H; y++) if (rowInk[y] > CUT) { if (top < 0) top = y; bottom = y }

  const pad = 4
  const L = Math.max(0, left - pad), T = Math.max(0, top - pad)
  const CW = Math.min(W - L, right - left + 1 + pad * 2)
  const CH = Math.min(H - T, bottom - top + 1 + pad * 2)
  console.log(`kept ${total}px; crop ${CW}x${CH} aspect ${(CW / CH).toFixed(2)} (cut=${CUT})`)

  const emit = async (name, white) => {
    const out = Buffer.alloc(CW * CH * 4)
    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CW; x++) {
        const o = (y * CW + x) * 4
        const sx = L + x, sy = T + y
        if (!fg[sy * W + sx]) { out[o + 3] = 0; continue }
        const i = (sy * W + sx) * C
        let r = data[i], g = data[i + 1], b = data[i + 2]
        if (white) {
          const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
          const sat = mx === 0 ? 0 : (mx - mn) / mx
          if (!(g > r + 18 && g > b + 18 && sat > 0.18)) { r = g = b = 255 }
        }
        out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255
      }
    const dest = path.join(OUT, name)
    await sharp(out, { raw: { width: CW, height: CH, channels: 4 } })
      .resize({ width: 600 })
      .png({ compressionLevel: 9, palette: true, quality: 92 })
      .toFile(dest)
    const m = await sharp(dest).metadata()
    console.log(`  ${name}  ${m.width}x${m.height}  ${(fs.statSync(dest).size / 1024).toFixed(1)} KB`)
    await sharp({ create: { width: m.width + 40, height: m.height + 40, channels: 3, background: { r: 60, g: 60, b: 60 } } })
      .composite([{ input: dest, left: 20, top: 20 }])
      .png()
      .toFile(path.join(OUT, `check-${name}`))
  }

  await emit('logo-color.png', false)
  await emit('logo-white.png', true)
})()