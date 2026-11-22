import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** Canvas texture for the CPU die plate */
export function useCpuCoreTexture() {
  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createLinearGradient(0, 0, 512, 512)
    grad.addColorStop(0, '#0f172a')
    grad.addColorStop(0.5, '#1e293b')
    grad.addColorStop(1, '#091020')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)'
    ctx.lineWidth = 1.5
    for (let i = 32; i < 512; i += 32) {
      ctx.beginPath()
      ctx.moveTo(i, 24)
      ctx.lineTo(i, 488)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(24, i)
      ctx.lineTo(488, i)
      ctx.stroke()
    }

    ctx.strokeStyle = 'rgba(226, 232, 240, 0.85)'
    ctx.lineWidth = 8
    ctx.strokeRect(22, 22, 468, 468)

    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 4
    ctx.strokeRect(52, 52, 408, 408)

    ctx.fillStyle = '#f5c542'
    ctx.beginPath()
    ctx.moveTo(36, 476)
    ctx.lineTo(84, 476)
    ctx.lineTo(36, 428)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.65)'
    ctx.lineWidth = 3
    const offsets = [-90, -45, 0, 45, 90]
    for (const o of offsets) {
      ctx.beginPath()
      ctx.moveTo(256 + o, 54)
      ctx.lineTo(256 + o, 148)
      ctx.moveTo(256 + o, 364)
      ctx.lineTo(256 + o, 458)
      ctx.moveTo(54, 256 + o)
      ctx.lineTo(148, 256 + o)
      ctx.moveTo(364, 256 + o)
      ctx.lineTo(458, 256 + o)
      ctx.stroke()
    }

    const dieGrad = ctx.createRadialGradient(256, 256, 12, 256, 256, 120)
    dieGrad.addColorStop(0, 'rgba(56, 189, 248, 0.42)')
    dieGrad.addColorStop(0.65, 'rgba(14, 165, 233, 0.16)')
    dieGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)')
    ctx.fillStyle = dieGrad
    ctx.fillRect(148, 148, 216, 216)

    ctx.strokeStyle = '#7dd3fc'
    ctx.lineWidth = 4
    ctx.strokeRect(148, 148, 216, 216)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#f8fafc'
    ctx.font = '800 58px "Inter", sans-serif'
    ctx.fillText('AI CPU', 256, 244)

    ctx.fillStyle = '#38bdf8'
    ctx.font = '700 22px "JetBrains Mono", monospace'
    ctx.fillText('MYITSOFT CORE', 256, 304)

    ctx.fillStyle = 'rgba(226, 232, 240, 0.68)'
    ctx.font = '600 16px "JetBrains Mono", monospace'
    ctx.fillText('NEURAL · SECURE · 99.9%', 256, 108)

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
    return tex
  }, [])
  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}
