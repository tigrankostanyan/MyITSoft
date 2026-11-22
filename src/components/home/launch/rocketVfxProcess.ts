import type { SmokePlatePair } from './rocketVfxTypes'
import { clamp01, lerp, smoothstep } from './rocketVfxMath'

function measureBorderLum(data: Uint8ClampedArray, w: number, h: number): number {
  let sum = 0
  let count = 0
  const border = 4
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < border || x >= w - border || y < border || y >= h - border) {
        const i = (y * w + x) * 4
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
        sum += lum
        count++
      }
    }
  }
  return count > 0 ? sum / count : 0
}

/** Builds cool and warm transparent smoke sprites from a black-background plate. */
export function processSmokePlate(
  img: HTMLImageElement,
  size = 384,
  blurPx = 0,
): SmokePlatePair {
  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = size
  srcCanvas.height = size
  const sctx = srcCanvas.getContext('2d')
  if (!sctx) {
    return { cool: srcCanvas, warm: srcCanvas }
  }

  sctx.drawImage(img, 0, 0, size, size)
  const srcImg = sctx.getImageData(0, 0, size, size)
  const srcData = srcImg.data

  const borderLum = measureBorderLum(srcData, size, size)
  const blackFloor = Math.max(0.02, borderLum + 0.018)
  const invRange = 1 / Math.max(0.01, 1 - blackFloor)
  const half = size * 0.5

  const coolCanvas = document.createElement('canvas')
  coolCanvas.width = size
  coolCanvas.height = size
  const coolCtx = coolCanvas.getContext('2d')

  const warmCanvas = document.createElement('canvas')
  warmCanvas.width = size
  warmCanvas.height = size
  const warmCtx = warmCanvas.getContext('2d')

  if (!coolCtx || !warmCtx) {
    return { cool: srcCanvas, warm: srcCanvas }
  }

  const coolImg = coolCtx.createImageData(size, size)
  const warmImg = warmCtx.createImageData(size, size)
  const cData = coolImg.data
  const wData = warmImg.data

  for (let y = 0; y < size; y++) {
    const ny = (y - half) / half
    for (let x = 0; x < size; x++) {
      const nx = (x - half) / half
      const idx = (y * size + x) * 4

      const lum =
        (0.299 * srcData[idx] + 0.587 * srcData[idx + 1] + 0.114 * srcData[idx + 2]) / 255
      const normL = clamp01((lum - blackFloor) * invRange)
      if (normL <= 0.002) continue

      const er = Math.hypot(nx, ny)
      const edgeSafe = smoothstep(0.99, 0.8, er)
      if (edgeSafe <= 0.002) continue

      const alpha = Math.pow(smoothstep(0.0, 0.36, normL), 0.72) * edgeSafe
      const aByte = Math.round(clamp01(alpha) * 255)
      if (aByte === 0) continue

      const ct = Math.pow(normL, 0.92)
      cData[idx] = Math.round(lerp(28, 236, ct))
      cData[idx + 1] = Math.round(lerp(34, 241, ct))
      cData[idx + 2] = Math.round(lerp(48, 250, ct))
      cData[idx + 3] = aByte

      const wt = Math.pow(normL, 0.85)
      if (wt < 0.45) {
        const u = wt / 0.45
        wData[idx] = Math.round(lerp(48, 225, u))
        wData[idx + 1] = Math.round(lerp(24, 118, u))
        wData[idx + 2] = Math.round(lerp(18, 46, u))
      } else {
        const u = (wt - 0.45) / 0.55
        wData[idx] = Math.round(lerp(225, 255, u))
        wData[idx + 1] = Math.round(lerp(118, 234, u))
        wData[idx + 2] = Math.round(lerp(46, 178, u))
      }
      wData[idx + 3] = aByte
    }
  }

  coolCtx.putImageData(coolImg, 0, 0)
  warmCtx.putImageData(warmImg, 0, 0)

  if (blurPx <= 0) {
    return { cool: coolCanvas, warm: warmCanvas }
  }

  const applyBlur = (source: HTMLCanvasElement) => {
    const out = document.createElement('canvas')
    out.width = size
    out.height = size
    const octx = out.getContext('2d')
    if (!octx) return source
    octx.filter = `blur(${blurPx}px)`
    octx.drawImage(source, 0, 0)
    octx.filter = 'none'
    return out
  }

  return {
    cool: applyBlur(coolCanvas),
    warm: applyBlur(warmCanvas),
  }
}

/** Extracts a feathered, black-floor-subtracted flame jet plate for additive blending. */
export function processFlameJet(img: HTMLImageElement): HTMLCanvasElement {
  const outW = 256
  const outH = 384
  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const srcX = Math.round(img.width * 0.14)
  const srcY = Math.round(img.height * 0.03)
  const srcW = Math.round(img.width * 0.72)
  const srcH = Math.round(img.height * 0.77)

  ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH)
  const imgData = ctx.getImageData(0, 0, outW, outH)
  const data = imgData.data

  let sideSum = 0
  let sideCount = 0
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      if (x < 6 || x >= outW - 6) {
        const i = (y * outW + x) * 4
        sideSum += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
        sideCount++
      }
    }
  }
  const sideBorderLum = sideCount > 0 ? sideSum / sideCount : 0
  const floorVal = Math.max(14, (sideBorderLum + 0.045) * 255)
  const invScale = 255 / Math.max(1, 255 - floorVal)

  for (let y = 0; y < outH; y++) {
    const v = y / (outH - 1)
    const vFeather = smoothstep(0.0, 0.08, v) * (1 - smoothstep(0.86, 1.0, v))
    for (let x = 0; x < outW; x++) {
      const u = (x / (outW - 1)) * 2 - 1
      const hFeather = 1 - smoothstep(0.72, 1.0, Math.abs(u))
      const mask = vFeather * hFeather
      const i = (y * outW + x) * 4

      if (mask <= 0.002) {
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        data[i + 3] = 0
        continue
      }

      const r = Math.max(0, (data[i] - floorVal) * invScale) * mask
      const g = Math.max(0, (data[i + 1] - floorVal) * invScale) * mask
      const b = Math.max(0, (data[i + 2] - floorVal) * invScale) * mask
      const maxC = Math.max(r, g, b)
      const alpha = Math.min(255, Math.round(maxC * smoothstep(0, 14, maxC)))
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
