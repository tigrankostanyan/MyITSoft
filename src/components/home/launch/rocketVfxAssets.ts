import type { VfxAssets } from './rocketVfxTypes'
import { loadImage, smoothstep } from './rocketVfxMath'
import { processFlameJet, processSmokePlate } from './rocketVfxProcess'

function buildGroundSplash(flameJet: HTMLCanvasElement): HTMLCanvasElement {
  const outW = 384
  const outH = 160
  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, outW, outH)

  ctx.save()
  ctx.globalCompositeOperation = 'lighter'

  const sx = 24
  const sy = 40
  const sw = flameJet.width - 48
  const sh = flameJet.height - 60

  ctx.save()
  ctx.translate(outW * 0.48, outH * 0.54)
  ctx.rotate(-Math.PI * 0.5)
  ctx.globalAlpha = 0.92
  ctx.drawImage(flameJet, sx, sy, sw, sh, -outH * 0.44, 0, outH * 0.88, outW * 0.5)
  ctx.restore()

  ctx.save()
  ctx.translate(outW * 0.52, outH * 0.54)
  ctx.rotate(Math.PI * 0.5)
  ctx.scale(-1, 1)
  ctx.globalAlpha = 0.92
  ctx.drawImage(flameJet, sx, sy, sw, sh, -outH * 0.44, 0, outH * 0.88, outW * 0.5)
  ctx.restore()

  ctx.save()
  ctx.translate(outW * 0.5, outH * 0.55)
  ctx.scale(1.8, 0.72)
  const core = ctx.createRadialGradient(0, 0, 4, 0, 0, 72)
  core.addColorStop(0, 'rgba(255, 252, 232, 0.92)')
  core.addColorStop(0.35, 'rgba(255, 198, 92, 0.62)')
  core.addColorStop(0.7, 'rgba(249, 108, 22, 0.2)')
  core.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = core
  ctx.beginPath()
  ctx.arc(0, 0, 72, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  ctx.restore()

  const imgData = ctx.getImageData(0, 0, outW, outH)
  const data = imgData.data
  const cx = outW * 0.5
  const cy = outH * 0.52
  for (let y = 0; y < outH; y++) {
    const ny = (y - cy) / (outH * 0.48)
    for (let x = 0; x < outW; x++) {
      const nx = (x - cx) / (outW * 0.49)
      const er = Math.hypot(nx, ny)
      const mask = smoothstep(0.99, 0.64, er)
      const i = (y * outW + x) * 4
      const r = data[i] * mask
      const g = data[i + 1] * mask
      const b = data[i + 2] * mask
      const maxC = Math.max(r, g, b)
      const alpha = Math.min(255, Math.round(maxC * smoothstep(0, 12, maxC)))
      if (alpha <= 0) {
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        data[i + 3] = 0
        continue
      }
      const invA = 255 / alpha
      data[i] = Math.min(255, Math.round(r * invA))
      data[i + 1] = Math.min(255, Math.round(g * invA))
      data[i + 2] = Math.min(255, Math.round(b * invA))
      data[i + 3] = alpha
    }
  }
  ctx.putImageData(imgData, 0, 0)

  return canvas
}

let cachedAssetsPromise: Promise<VfxAssets> | null = null

/** Loads and processes VFX plates once; the result is cached. */
export function loadVfxAssets(): Promise<VfxAssets> {
  if (cachedAssetsPromise) return cachedAssetsPromise

  const promise: Promise<VfxAssets> = Promise.all([
    loadImage('/images/vfx/smoke-cumulus-1.jpg'),
    loadImage('/images/vfx/smoke-cumulus-2.jpg'),
    loadImage('/images/vfx/rocket-flame-jet.jpg'),
  ])
    .then(([smoke1Img, smoke2Img, flameImg]): VfxAssets => {
      const pair1 = processSmokePlate(smoke1Img, 384, 0)
      const pair2 = processSmokePlate(smoke2Img, 384, 0)
      const pair3 = processSmokePlate(smoke2Img, 384, 4.5)
      const flameJet = processFlameJet(flameImg)
      const groundSplash = buildGroundSplash(flameJet)
      return {
        smokePlates: [pair1, pair2, pair3],
        flameJet,
        groundSplash,
      }
    })
    .catch((err) => {
      cachedAssetsPromise = null
      throw err
    })

  cachedAssetsPromise = promise
  return promise
}
