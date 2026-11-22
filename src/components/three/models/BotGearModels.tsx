import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ModelProps } from './modelTypes'
import { useGearGeometry } from './modelGeometry'

/** AI assistant bot */
export function AiBotModel({
  color = '#00e5ff',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  const haloRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (haloRef.current) haloRef.current.rotation.z += Math.min(delta, 0.05) * 0.9
  })

  return (
    <group scale={0.96}>
      <mesh>
        <boxGeometry args={[1.18, 0.92, 0.92]} />
        <meshPhysicalMaterial
          color="#1e293b"
          metalness={0.82}
          roughness={0.18}
          clearcoat={0.9}
          wireframe={wire}
        />
      </mesh>
      <mesh position={[0, 0.02, 0.47 + exploded * 0.25]}>
        <boxGeometry args={[0.96, 0.46, 0.06]} />
        <meshPhysicalMaterial
          color="#020617"
          roughness={0.08}
          metalness={0.4}
          clearcoat={1}
          wireframe={wire}
        />
      </mesh>
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 0.51 + exploded * 0.34]}>
          <capsuleGeometry args={[0.075, 0.1, 8, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={3}
            wireframe={wire}
          />
        </mesh>
      ))}
      <mesh
        ref={haloRef}
        position={[0, 0.76 + exploded * 0.4, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.42, 0.03, 12, 48]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00e5ff"
          emissiveIntensity={2.2}
          wireframe={wire}
        />
      </mesh>
      {[-0.66 - exploded * 0.25, 0.66 + exploded * 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.14, 20]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.8}
            metalness={0.7}
            wireframe={wire}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Interlocking workflow gears */
export function WorkflowGearModel({
  color = '#38bdf8',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  const g1 = useRef<THREE.Mesh>(null)
  const g2 = useRef<THREE.Mesh>(null)
  const bigGear = useGearGeometry(0.68, 14, 0.18)
  const medGear = useGearGeometry(0.42, 10, 0.16)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (g1.current) g1.current.rotation.z += dt * 0.75
    if (g2.current) g2.current.rotation.z -= dt * 1.15
  })

  return (
    <group scale={0.96}>
      <mesh ref={g1} geometry={bigGear} position={[-0.28 - exploded * 0.2, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          emissive="#1d4ed8"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.18}
          clearcoat={0.9}
          wireframe={wire}
        />
      </mesh>
      <mesh ref={g2} geometry={medGear} position={[0.64 + exploded * 0.25, 0.34, 0.08]}>
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#0284c7"
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.18}
          clearcoat={0.9}
          wireframe={wire}
        />
      </mesh>
    </group>
  )
}
