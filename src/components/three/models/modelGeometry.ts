import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** Procedural extruded gear geometry */
export function useGearGeometry(radius: number, teeth: number, depth: number) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const innerR = radius * 0.78
    const outerR = radius
    const step = (Math.PI * 2) / teeth

    for (let i = 0; i < teeth; i++) {
      const a0 = i * step
      const a1 = a0 + step * 0.22
      const a2 = a0 + step * 0.42
      const a3 = a0 + step * 0.68
      const a4 = a0 + step * 0.88

      if (i === 0) shape.moveTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR)
      else shape.lineTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR)

      shape.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR)
      shape.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR)
      shape.lineTo(Math.cos(a3) * innerR, Math.sin(a3) * innerR)
      shape.lineTo(Math.cos(a4) * innerR, Math.sin(a4) * innerR)
    }
    shape.closePath()

    const hole = new THREE.Path()
    hole.absarc(0, 0, radius * 0.34, 0, Math.PI * 2, true)
    shape.holes.push(hole)

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.012,
      bevelSegments: 2,
    })
    extrude.center()
    return extrude
  }, [radius, teeth, depth])

  useEffect(() => () => geo.dispose(), [geo])
  return geo
}

/** Extruded shield emblem geometry */
export function useShieldGeometry() {
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0.2)
    s.lineTo(0.155, 0.135)
    s.lineTo(0.145, -0.02)
    s.quadraticCurveTo(0.125, -0.14, 0, -0.21)
    s.quadraticCurveTo(-0.125, -0.14, -0.145, -0.02)
    s.lineTo(-0.155, 0.135)
    s.closePath()

    const extrude = new THREE.ExtrudeGeometry(s, {
      depth: 0.042,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.012,
      bevelSegments: 3,
    })
    extrude.center()
    return extrude
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return geo
}

/** Extruded lightning bolt geometry */
export function useLightningBoltGeometry() {
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.025, 0.145)
    s.lineTo(-0.088, -0.008)
    s.lineTo(-0.006, -0.008)
    s.lineTo(-0.035, -0.145)
    s.lineTo(0.088, 0.012)
    s.lineTo(0.006, 0.012)
    s.closePath()
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.044,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.008,
      bevelSegments: 2,
    })
    g.center()
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return geo
}
