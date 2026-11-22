import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { drawMacBookScreen } from './drawMacBookScreen'

/** Screen texture mapped onto the MacBook GLB display. */
export function useMacBookCleanScreenTexture(isMobile = false) {
  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const width = isMobile ? 512 : 1024
    const height = isMobile ? 320 : 640
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.scale(width / 1600, height / 1000)
    drawMacBookScreen(ctx)

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.flipY = true
    tex.anisotropy = isMobile ? 1 : 4
    tex.needsUpdate = true
    return tex
  }, [isMobile])

  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

/** Soft ground shadow texture under the MacBook base. */
export function useStudioShadowTexture() {
  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createRadialGradient(256, 64, 18, 256, 64, 240)
    grad.addColorStop(0, 'rgba(2, 6, 23, 0.72)')
    grad.addColorStop(0.5, 'rgba(2, 6, 23, 0.34)')
    grad.addColorStop(1, 'rgba(2, 6, 23, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 128)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}
