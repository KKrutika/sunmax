const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, 'public')
const file = path.join(PUB, 'white_logo.jpg')

  ; (async () => {
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const { width: W, height: H, channels: C } = info

    const rgb = (x, y) => {
      const i = (y * W + x) * C
      return [data[i], data[i + 1], data[i + 2]]
    }
    const lum = (x, y) => {
      const [r, g, b] = rgb(x, y)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    // ---- sample the background tones from the top strip (checkerboard + white) ----
    const hist = new Map()
    for (let y = 4; y < 30; y++)
      for (let x = 4; x < 60; x++) {
        const v = Math.round(lum(x, y) / 4) * 4
        hist.set(v, (hist.get(v) || 0) + 1)
      }
    const peaks = [...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4)
    console.log('background tone peaks (lum, count):', peaks.map((p) => p.join(':')).join('  '))

    const tones = peaks.map((p) => p[0])
    const TOL = 9
    const nearTone = (v) => tones.some((t) => Math.abs(v - t) <= TOL)
    console.log('using tones', tones.join(', '), 'tol', TOL)

    // ---- classify EVERY pixel (no flood fill: that is what filled the counters) ----
    const isBg = new Uint8Array(W * H)
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) if (nearTone(lum(x, y))) isBg[y * W + x] = 1

    let bgCount = 0
    for (let i = 0; i < isBg.length; i++) bgCount += isBg[i]
    console.log(`background classified: ${((bgCount / (W * H)) * 100).toFixed(1)}%`)

    // ---- drop tiny islands (absolute floor so thin sunburst rays survive) ----
    const keep = new Uint8Array(W * H)
    for (let i = 0; i < W * H; i++) if (!isBg[i]) keep[i] = 1
    const MIN = 600
    const seen = new Uint8Array(W * H)
    for (let s = 0; s < W * H; s++) {
      if (!keep[s] || seen[s]) continue
      const comp = []
      const st = [s]
      seen[s] = 1
      while (st.length) {
        const p = st.pop()
        comp.push(p)
        const x = p % W, y = (p / W) | 0
        if (x > 0 && keep[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; st.push(p - 1) }
        if (x < W - 1 && keep[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; st.push(p + 1) }
        if (y > 0 && keep[p - W] && !seen[p - W]) { seen[p - W] = 1; st.push(p - W) }
        if (y < H - 1 && keep[p + W] && !seen[p + W]) { seen[p + W] = 1; st.push(p + W) }
      }
      if (comp.length < MIN) for (const p of comp) keep[p] = 0
    }

    // ---- tight crop, ignoring rows/cols with only trace ink ----
    const colInk = new Array(W).fill(0)
    const rowInk = new Array(H).fill(0)
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) if (keep[y * W + x]) { colInk[x]++; rowInk[y]++ }
    const CUT = Math.max(2, Math.round(Math.min(Math.max(...colInk), Math.max(...rowInk)) * 0.02))
    let left = -1, right = -1, top = -1, bottom = -1
    for (let x = 0; x < W; x++) if (colInk[x] > CUT) { if (left < 0) left = x; right = x }
    for (let y = 0; y < H; y++) if (rowInk[y] > CUT) { if (top < 0) top = y; bottom = y }
    const pad = 3
    const L = Math.max(0, left - pad), T = Math.max(0, top - pad)
    const CW = Math.min(W - L, right - left + 1 + pad * 2)
    const CH = Math.min(H - T, bottom - top + 1 + pad * 2)
    console.log(`crop ${CW}x${CH} aspect ${(CW / CH).toFixed(2)}`)

    const out = Buffer.alloc(CW * CH * 4)
    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CW; x++) {
        const o = (y * CW + x) * 4
        const sx = L + x, sy = T + y
        if (!keep[sy * W + sx]) { out[o + 3] = 0; continue }
        const i = (sy * W + sx) * C
        out[o] = data[i]; out[o + 1] = data[i + 1]; out[o + 2] = data[i + 2]; out[o + 3] = 255
      }

    const dest = path.join(PUB, 'logo.png')
    await sharp(out, { raw: { width: CW, height: CH, channels: 4 } })
      .png({ compressionLevel: 9, palette: true, quality: 95 })
      .toFile(dest)

    const m = await sharp(dest).metadata()
    console.log(`logo.png ${m.width}x${m.height}`)

    // preview on the dark navbar colour
    const check = path.join(PUB, 'logo-preview.png')
    await sharp({ create: { width: m.width + 40, height: m.height + 40, channels: 3, background: { r: 60, g: 60, b: 60 } } })
      .composite([{ input: dest, left: 20, top: 20 }])
      .png()
      .toFile(check)
    console.log('preview written:', check)
  })()