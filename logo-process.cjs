const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const PUB = path.join(__dirname, 'public')
const OUT = path.join(PUB, 'img')
fs.mkdirSync(OUT, { recursive: true })

/**
 * The two supplied files have SWAPPED filenames:
 *   white_logo.jpg -> LIGHT background (215) with DARK ink  = dark logo on light
 *   black_logo.jpg -> DARK background  (62)  with LIGHT ink = white logo on dark
 *
 * Both are flat JPEGs with a baked background and no alpha, so they cannot be
 * dropped into the dark navbar directly. This crops to the ink and converts the
 * background to transparency.
 */
async function process(file, outName) {
  const src = path.join(PUB, file)
  const { data, info } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height
  const at = (x, y) => data[y * W + x]

  // background from the four corners
  const corners = [at(1, 1), at(W - 2, 1), at(1, H - 2), at(W - 2, H - 2)]
  const bg = Math.round(corners.reduce((a, b) => a + b, 0) / 4)
  const bgIsLight = bg > 128

  // ink = clearly different from background
  const DIFF = 55
  const isInk = (v) => Math.abs(v - bg) > DIFF

  // bounding box, ignoring rows/cols with almost no ink (kills stray noise)
  const colInk = new Array(W).fill(0)
  const rowInk = new Array(H).fill(0)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (isInk(at(x, y))) { colInk[x]++; rowInk[y]++ }
    }
  }
  const colMax = Math.max(...colInk)
  const rowMax = Math.max(...rowInk)
  const CUT = Math.max(2, Math.round(Math.max(colMax, rowMax) * 0.02))

  let left = -1, right = -1, top = -1, bottom = -1
  for (let x = 0; x < W; x++) if (colInk[x] > CUT) { if (left < 0) left = x; right = x }
  for (let y = 0; y < H; y++) if (rowInk[y] > CUT) { if (top < 0) top = y; bottom = y }

  const pad = 4
  const cropL = Math.max(0, left - pad)
  const cropT = Math.max(0, top - pad)
  const cropW = Math.min(W - cropL, right - left + 1 + pad * 2)
  const cropH = Math.min(H - cropT, bottom - top + 1 + pad * 2)

  // build an alpha channel: opaque where ink, fading through the antialiased edge
  const alpha = Buffer.alloc(cropW * cropH)
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const v = at(cropL + x, cropT + y)
      const d = Math.abs(v - bg) / DIFF
      alpha[y * cropW + x] = Math.round(Math.min(1, d) * 255)
    }
  }

  // take the ink colour from the darkest/lightest strongly-inked pixels
  const samples = []
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      if (alpha[y * cropW + x] > 200) samples.push(alpha[y * cropW + x])
    }
  }

  const inkHex = bgIsLight ? '#000000' : '#ffffff'

  // composite: keep original RGB, apply our alpha
  const rgb = await sharp(src).extract({ left: cropL, top: cropT, width: cropW, height: cropH }).removeAlpha().raw().toBuffer()
  const rgba = Buffer.alloc(cropW * cropH * 4)
  for (let i = 0, n = cropW * cropH; i < n; i++) {
    rgba[i * 4] = rgb[i * 3]
    rgba[i * 4 + 1] = rgb[i * 3 + 1]
    rgba[i * 4 + 2] = rgb[i * 3 + 2]
    rgba[i * 4 + 3] = alpha[i]
  }

  const dest = path.join(OUT, outName)
  await sharp(rgba, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest)

  const size = fs.statSync(dest).size
  console.log(
    `${file}  bg=${bg} (${bgIsLight ? 'light' : 'dark'})  ->  ${outName}\n` +
    `   cropped ${cropW}x${cropH} from ${W}x${H}, aspect ${(cropW / cropH).toFixed(2)}, ink=${inkHex}, ${(size / 1024).toFixed(1)} KB`
  )
}

; (async () => {
  await process('white_logo.jpg', 'logo-dark-ink.png')   // dark ink, for light backgrounds
  await process('black_logo.jpg', 'logo-white-ink.png')   // white ink, for the dark navbar
})()
