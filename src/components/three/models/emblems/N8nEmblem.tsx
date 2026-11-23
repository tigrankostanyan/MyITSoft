import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { createSurfaceMaterial, type EmblemProps } from './createSurfaceMaterial'

const N8N_NODES: readonly [number, number][] = [
  [-0.145, 0],
  [-0.015, 0],
  [0.125, 0.082],
  [0.125, -0.082],
]

export function N8nEmblem({ groupRef, r, wire, isMobile = false }: EmblemProps) {
  const mats = useMemo(
    () => ({
      link: createSurfaceMaterial(
        {
          color: '#ea4b71',
          emissive: '#be123c',
          emissiveIntensity: 0.35,
          metalness: 0.55,
          roughness: 0.14,
          clearcoat: 1,
          envMapIntensity: 2.2,
          wireframe: wire,
        },
        isMobile,
      ),
      ring: createSurfaceMaterial(
        {
          color: '#ea4b71',
          emissive: '#be123c',
          emissiveIntensity: 0.4,
          metalness: 0.58,
          roughness: 0.13,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2.35,
          wireframe: wire,
        },
        isMobile,
      ),
      hub: createSurfaceMaterial(
        {
          color: '#0f172a',
          metalness: 0.8,
          roughness: 0.18,
          clearcoat: 0.9,
          wireframe: wire,
        },
        isMobile,
      ),
    }),
    [wire, isMobile],
  )

  const geos = useMemo(
    () => ({
      torus: new THREE.TorusGeometry(0.044, 0.016, 16, 32),
      hub: new THREE.CylinderGeometry(0.028, 0.028, 0.024, 20),
      diagArm: new THREE.CylinderGeometry(0.015, 0.015, 0.135, 14),
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
      Object.values(geos).forEach((g) => g.dispose())
    }
  }, [geos])

  return (
    <group position={[-r, 0, 0]}>
      <group ref={groupRef}>
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.link}>
          <cylinderGeometry args={[0.016, 0.016, 0.11, 14]} />
        </mesh>
        <mesh
          position={[0.06, 0.045, 0]}
          rotation={[0, 0, -0.96]}
          geometry={geos.diagArm}
          material={mats.link}
        />
        <mesh
          position={[0.06, -0.045, 0]}
          rotation={[0, 0, 0.96]}
          geometry={geos.diagArm}
          material={mats.link}
        />
        {N8N_NODES.map(([nx, ny], idx) => (
          <group key={idx} position={[nx, ny, 0]}>
            <mesh geometry={geos.torus} material={mats.ring} />
            <mesh rotation={[Math.PI / 2, 0, 0]} geometry={geos.hub} material={mats.hub} />
          </group>
        ))}
      </group>
    </group>
  )
}
