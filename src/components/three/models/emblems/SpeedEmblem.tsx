import { useEffect, useMemo } from 'react'
import { useLightningBoltGeometry } from '../modelGeometry'
import { createSurfaceMaterial, type EmblemProps } from './createSurfaceMaterial'

export function SpeedEmblem({ groupRef, r, wire, isMobile = false }: EmblemProps) {
  const boltGeo = useLightningBoltGeometry()

  const mats = useMemo(
    () => ({
      ring: createSurfaceMaterial(
        {
          color: '#cbd5e1',
          metalness: 0.96,
          roughness: 0.13,
          clearcoat: 0.9,
          clearcoatRoughness: 0.06,
          envMapIntensity: 2.35,
          wireframe: wire,
        },
        isMobile,
      ),
      bolt: createSurfaceMaterial(
        {
          color: '#f59e0b',
          emissive: '#d97706',
          emissiveIntensity: 0.48,
          metalness: 0.88,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          envMapIntensity: 2.5,
          wireframe: wire,
        },
        isMobile,
      ),
    }),
    [wire, isMobile],
  )

  useEffect(() => {
    return () => {
      mats.ring.dispose()
      mats.bolt.dispose()
    }
  }, [mats])

  return (
    <group position={[0, 0, r]}>
      <group ref={groupRef}>
        <mesh material={mats.ring}>
          <torusGeometry args={[0.172, 0.018, 16, 40]} />
        </mesh>
        <mesh geometry={boltGeo} material={mats.bolt} />
      </group>
    </group>
  )
}
