export { clamp01, lerp, smoothstep } from '~/lib/scroll-math'

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load VFX asset: ${src}`))
    img.src = src
  })
}
