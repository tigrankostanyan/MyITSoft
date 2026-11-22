import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const SPOKE_ANGLES = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (i * Math.PI) / 4)

export function OuterGimbal({
  groupRef,
  exploded,
  color,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  exploded: number
  color: string
  wire: boolean
  isMobile?: boolean
}) {
  const mats = useMemo(() => {
    const outerRim = isMobile
      ? new THREE.MeshStandardMaterial({
          color: '#e2e8f0',
          metalness: 0.92,
          roughness: 0.16,
          envMapIntensity: 2.2,
          wireframe: wire,
        })
      : new THREE.MeshPhysicalMaterial({
          color: '#e2e8f0',
          metalness: 0.92,
          roughness: 0.16,
          clearcoat: 0.75,
          clearcoatRoughness: 0.1,
          envMapIntensity: 2.2,
          wireframe: wire,
        })

    const innerRail = new THREE.MeshStandardMaterial({
      color: '#f8fafc',
      metalness: 0.96,
      roughness: 0.09,
      envMapIntensity: 2.35,
      wireframe: wire,
    })

    const glowRing = new THREE.MeshStandardMaterial({
      color: '#7dd3fc',
      emissive: color,
      emissiveIntensity: 1.5,
      wireframe: wire,
    })

    const spokeMetal = new THREE.MeshStandardMaterial({
      color: '#f1f5f9',
      metalness: 0.94,
      roughness: 0.14,
      envMapIntensity: 2.15,
      wireframe: wire,
    })

    const spokeTip = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#00e5ff',
      emissiveIntensity: 1.9,
      wireframe: wire,
    })

    return { outerRim, innerRail, glowRing, spokeMetal, spokeTip }
  }, [color, wire, isMobile])

  const spokeGeos = useMemo(
    () => ({
      rod: new THREE.CylinderGeometry(0.028, 0.028, 0.125, 14),
      tip: new THREE.CylinderGeometry(0.012, 0.012, 0.014, 10),
    }),
    [],
  )

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose())
    }
  }, [mats])

  useEffect(() => {
    return () => {
      spokeGeos.rod.dispose()
      spokeGeos.tip.dispose()
    }
  }, [spokeGeos])

  const r = 1.04 + exploded * 0.24

  return (
    <group ref={groupRef}>
      <mesh material={mats.outerRim}>
        <torusGeometry args={[r, 0.048, 24, 80]} />
      </mesh>
      <mesh material={mats.innerRail}>
        <torusGeometry args={[0.985 + exploded * 0.24, 0.015, 14, 80]} />
      </mesh>
      <mesh material={mats.glowRing}>
        <torusGeometry args={[1.09 + exploded * 0.24, 0.006, 10, 80]} />
      </mesh>
      {SPOKE_ANGLES.map((a, i) => (
        <group key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]} rotation={[0, 0, a]}>
          <mesh geometry={spokeGeos.rod} material={mats.spokeMetal} />
          <mesh position={[0, 0.065, 0]} geometry={spokeGeos.tip} material={mats.spokeTip} />
        </group>
      ))}
    </group>
  )
}

export function MidGimbal({
  groupRef,
  exploded,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  exploded: number
  wire: boolean
  isMobile?: boolean
}) {
  const mats = useMemo(() => {
    const rim = isMobile
      ? new THREE.MeshStandardMaterial({
          color: '#cbd5e1',
          metalness: 0.92,
          roughness: 0.15,
          envMapIntensity: 2.15,
          wireframe: wire,
        })
      : new THREE.MeshPhysicalMaterial({
          color: '#cbd5e1',
          metalness: 0.92,
          roughness: 0.15,
          clearcoat: 0.7,
          envMapIntensity: 2.15,
          wireframe: wire,
        })

    const glow = new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      emissive: '#00e5ff',
      emissiveIntensity: 1.65,
      wireframe: wire,
    })

    return { rim, glow }
  }, [wire, isMobile])

  useEffect(() => {
    return () => {
      mats.rim.dispose()
      mats.glow.dispose()
    }
  }, [mats])

  return (
    <group ref={groupRef} rotation={[Math.PI / 3.1, 0.42, 0]}>
      <mesh material={mats.rim}>
        <torusGeometry args={[0.82 + exploded * 0.18, 0.032, 20, 72]} />
      </mesh>
      <mesh material={mats.glow}>
        <torusGeometry args={[0.785 + exploded * 0.18, 0.008, 10, 72]} />
      </mesh>
    </group>
  )
}
