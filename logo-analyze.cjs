const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, 'public')

// The two source files have swapped names:
//   white_logo.jpg  -> light/white wordmark on a LIGHT grey background
//   black_logo.jpg  -> dark/black wordmark on a DARK background
// Sample corners to classify reliably rather than trusting the filename.
async function classify(file) {
  const { data, info } = await sharp(path.join(PUB, file))
    .raw()
    .toBuffer({ resolveWithObject: true })
  const at = (x, y) => {
    const i = (y * info.width + x) * info.channels
    return data[i]
  }
  const corners = [
    at(2, 2),
    at(info.width - 3, 2),
    at(2, info.height - 3),
    at(info.width - 3, info.height - 3),
  ]
  const mean = corners.reduce((a, b) => a + b, 0) / corners.length
  return { channels: info.channels, mean, light: mean > 128 }
}

/** Find the bounding box of pixels that differ from the corner background. */
async function contentBox(file, light) {
  const { data, info } = await sharp(path.join(PUB, file))
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const bg = await backgroundLevel(file)
  // distance from background
  const thr = 26
  let top = -1, bottom = -1, left = -1, right = -1

  for (let y = 0; y < info.height; y++) {
    let rowHas = false
    for (let x = 0; x < info.width; x++) {
      if (Math.abs(data[y * info.width + x] - bg) > thr) {
        rowHas = true
        if (left < 0 || x < left) left = x
        if (x > right) right = x
      }
    }
    if (rowHas) {
      if (top < 0) top = y
      bottom = y
    }
  }
  return { top, bottom, left, right, w: right - left + 1, h: bottom - top + 1, width: info.width, height: info.height }
}

async function backgroundLevel(file) {
  const { data, info } = await sharp(path.join(PUB, file)).greyscale().raw().toBuffer({ resolveWithObject: true })
  const at = (x, y) => data[y * info.width + x]
  const corners = [at(2, 2), at(info.width - 3, 2), at(2, info.height - 3), at(info.width - 3, info.height - 3)]
  return Math.round(corners.reduce((a, b) => a + b, 0) / corners.length)
}

; (async () => {
  for (const f of ['white_logo.jpg', 'black_logo.jpg']) {
    const c = await classify(f)
    const box = await contentBox(f, c.light)
    console.log(
      `${f}\n  ${box.width}x${box.height}  channels=${c.channels}  bgLevel=${await backgroundLevel(f)} (${c.light ? 'LIGHT' : 'DARK'} bg)\n  content box: x ${box.left}-${box.right}, y ${box.top}-${box.bottom}  => ${box.w}x${box.h}  aspect ${(box.w / box.h).toFixed(2)}`
    )
  }
})()
