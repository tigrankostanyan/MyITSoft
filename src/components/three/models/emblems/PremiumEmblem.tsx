import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { createSurfaceMaterial, type EmblemProps } from './createSurfaceMaterial'

export function PremiumEmblem({ groupRef, r, wire, isMobile = false }: EmblemProps) {
  const mats = useMemo(
    () => ({
      gem: createSurfaceMaterial(
        {
          color: '#2563eb',
          emissive: '#1d4ed8',
          emissiveIntensity: 0.42,
          metalness: 0.78,
          roughness: 0.07,
          clearcoat: 1,
          clearcoatRoughness: 0.03,
          envMapIntensity: 2.6,
          wireframe: wire,
        },
        isMobile,
      ),
      goldRing: createSurfaceMaterial(
        {
          color: '#f5b932',
          metalness: 0.96,
          roughness: 0.14,
          clearcoat: 0.8,
          envMapIntensity: 2.45,
          wireframe: wire,
        },
        isMobile,
      ),
      skyRing: createSurfaceMaterial(
        {
          color: '#38bdf8',
          emissive: '#0284c7',
          emissiveIntensity: 0.35,
          metalness: 0.9,
          roughness: 0.12,
          clearcoat: 0.9,
          envMapIntensity: 2.4,
          wireframe: wire,
        },
        isMobile,
      ),
    }),
    [wire, isMobile],
  )

  const ringGeo = useMemo(() => new THREE.TorusGeometry(0.175, 0.013, 14, 40), [])

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose())
    }
  }, [mats])

  useEffect(() => () => ringGeo.dispose(), [ringGeo])

  return (
    <group position={[0, 0, -r]}>
      <group ref={groupRef}>
        <mesh material={mats.gem}>
          <octahedronGeometry args={[0.135, 0]} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.35, 0]} geometry={ringGeo} material={mats.goldRing} />
        <mesh rotation={[-Math.PI / 3, -0.35, 0]} geometry={ringGeo} material={mats.skyRing} />
      </group>
    </group>
  )
}
