import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MidGimbal, OuterGimbal } from './HubRings'
import { HubCpu } from './HubCpu'
import { N8nEmblem, PremiumEmblem, ShieldEmblem, SpeedEmblem } from './HubEmblems'
import type { ModelProps } from './modelTypes'

/** Silver gyroscope with CPU core and orbiting emblems */
export function AutomationHubModel({
  color = '#38bdf8',
  exploded = 0,
  hologram = false,
  isMobile = false,
}: ModelProps) {
  const wire = hologram
  const outerGimbalRef = useRef<THREE.Group>(null)
  const midGimbalRef = useRef<THREE.Group>(null)
  const orbitGroupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Group>(null)
  const shieldRef = useRef<THREE.Group>(null)
  const n8nRef = useRef<THREE.Group>(null)
  const speedRef = useRef<THREE.Group>(null)
  const premiumRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    if (outerGimbalRef.current) {
      outerGimbalRef.current.rotation.y += dt * 0.24
      outerGimbalRef.current.rotation.x += dt * 0.11
    }
    if (midGimbalRef.current) {
      midGimbalRef.current.rotation.z -= dt * 0.34
      midGimbalRef.current.rotation.x -= dt * 0.15
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += dt * 0.48
      orbitGroupRef.current.rotation.z = Math.sin(t * 0.65) * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = Math.sin(t * 0.6) * 0.28
      coreRef.current.rotation.x = Math.cos(t * 0.5) * 0.12
    }
    if (shieldRef.current) {
      shieldRef.current.rotation.y -= dt * 0.85
      shieldRef.current.position.y = Math.sin(t * 2.0) * 0.045
    }
    if (n8nRef.current) {
      n8nRef.current.rotation.y += dt * 0.9
      n8nRef.current.position.y = Math.sin(t * 2.0 + Math.PI * 0.5) * 0.045
    }
    if (speedRef.current) {
      speedRef.current.rotation.y -= dt * 0.95
      speedRef.current.position.y = Math.sin(t * 2.0 + Math.PI) * 0.045
    }
    if (premiumRef.current) {
      premiumRef.current.rotation.y += dt * 0.88
      premiumRef.current.position.y = Math.sin(t * 2.0 + Math.PI * 1.5) * 0.045
    }
  })

  const orbitR = 1.38 + exploded * 0.28

  return (
    <group scale={0.9}>
      <OuterGimbal groupRef={outerGimbalRef} exploded={exploded} color={color} wire={wire} isMobile={isMobile} />
      <MidGimbal groupRef={midGimbalRef} exploded={exploded} wire={wire} isMobile={isMobile} />
      <HubCpu groupRef={coreRef} exploded={exploded} wire={wire} isMobile={isMobile} />
      <group ref={orbitGroupRef} rotation={[0.16, 0, -0.1]}>
        <ShieldEmblem groupRef={shieldRef} r={orbitR} wire={wire} isMobile={isMobile} />
        <N8nEmblem groupRef={n8nRef} r={orbitR} wire={wire} isMobile={isMobile} />
        <SpeedEmblem groupRef={speedRef} r={orbitR} wire={wire} isMobile={isMobile} />
        <PremiumEmblem groupRef={premiumRef} r={orbitR} wire={wire} isMobile={isMobile} />
      </group>
    </group>
  )
}
