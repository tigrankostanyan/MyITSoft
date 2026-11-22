import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useLightningBoltGeometry, useShieldGeometry } from './modelGeometry'

function createSurfaceMaterial(
  params: THREE.MeshPhysicalMaterialParameters,
  isMobile: boolean,
): THREE.Material {
  if (!isMobile) return new THREE.MeshPhysicalMaterial(params)
  return new THREE.MeshStandardMaterial({
    color: params.color,
    emissive: params.emissive,
    emissiveIntensity: params.emissiveIntensity,
    metalness: params.metalness,
    roughness: params.roughness,
    envMapIntensity: params.envMapIntensity,
    wireframe: params.wireframe,
  })
}

const N8N_NODES: readonly [number, number][] = [
  [-0.145, 0],
  [-0.015, 0],
  [0.125, 0.082],
  [0.125, -0.082],
]

export function ShieldEmblem({
  groupRef,
  r,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}) {
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

export function N8nEmblem({
  groupRef,
  r,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}) {
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

export function SpeedEmblem({
  groupRef,
  r,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}) {
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

export function PremiumEmblem({
  groupRef,
  r,
  wire,
  isMobile = false,
}: {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}) {
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
