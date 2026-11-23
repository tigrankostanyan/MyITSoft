import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useShieldGeometry } from '../modelGeometry'
import { createSurfaceMaterial, type EmblemProps } from './createSurfaceMaterial'

export function ShieldEmblem({ groupRef, r, wire, isMobile = false }: EmblemProps) {
  const shieldGeo = useShieldGeometry()

  const mats = useMemo(
    () => ({
      silver: createSurfaceMaterial(
        {
          color: '#cbd5e1',
          metalness: 0.96,
          roughness: 0.14,
          clearcoat: 0.9,
          clearcoatRoughness: 0.08,
          envMapIntensity: 2.35,
          wireframe: wire,
        },
        isMobile,
      ),
      emerald: createSurfaceMaterial(
        {
          color: '#10b981',
          emissive: '#047857',
          emissiveIntensity: 0.42,
          metalness: 0.58,
          roughness: 0.11,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2.2,
          wireframe: wire,
        },
        isMobile,
      ),
      gold: createSurfaceMaterial(
        {
          color: '#f5b932',
          metalness: 0.97,
          roughness: 0.14,
          clearcoat: 0.6,
          envMapIntensity: 2.4,
          wireframe: wire,
        },
        isMobile,
      ),
    }),
    [wire, isMobile],
  )

  const geos = useMemo(
    () => ({
      lockBody: new THREE.BoxGeometry(0.072, 0.068, 0.022),
      lockShackle: new THREE.TorusGeometry(0.023, 0.0075, 10, 20, Math.PI),
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
      geos.lockBody.dispose()
      geos.lockShackle.dispose()
    }
  }, [geos])

  return (
    <group position={[r, 0, 0]}>
      <group ref={groupRef}>
        <mesh geometry={shieldGeo} material={mats.silver} />
        <mesh geometry={shieldGeo} scale={[0.72, 0.72, 1.28]} material={mats.emerald} />
        {[0.048, -0.048].map((zOff, idx) => (
          <group key={idx} position={[0, 0, zOff]}>
            <mesh position={[0, -0.014, 0]} geometry={geos.lockBody} material={mats.gold} />
            <mesh position={[0, 0.036, 0]} geometry={geos.lockShackle} material={mats.gold} />
          </group>
        ))}
      </group>
    </group>
  )
}
