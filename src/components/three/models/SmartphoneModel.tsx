import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ModelProps } from './modelTypes'

/** Titanium smartphone with floating UI layers */
export function SmartphoneModel({
  color = '#2563eb',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  const screenRef = useRef<THREE.Group>(null)
  const badgeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (screenRef.current) screenRef.current.position.z = 0.052 + exploded * 0.28
    if (badgeRef.current) {
      badgeRef.current.position.z = 0.12 + exploded * 0.52
      badgeRef.current.position.y = 0.22 + Math.sin(t * 2.4) * 0.035
    }
  })

  return (
    <group scale={0.96}>
      <mesh>
        <boxGeometry args={[0.78, 1.56, 0.095]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.18}
          metalness={0.88}
          clearcoat={0.9}
          wireframe={wire}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[0.8, 1.58, 0.06]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive={color}
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.2}
          wireframe={wire}
        />
      </mesh>

      <group ref={screenRef} position={[0, 0, 0.052]}>
        <mesh>
          <boxGeometry args={[0.7, 1.46, 0.012]} />
          <meshStandardMaterial
            color="#0b1530"
            emissive="#1e3a8a"
            emissiveIntensity={0.45}
            roughness={0.1}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0, 0.65, 0.01]}>
          <boxGeometry args={[0.2, 0.045, 0.01]} />
          <meshStandardMaterial color="#020617" roughness={0.2} wireframe={wire} />
        </mesh>
        <mesh position={[0, 0.52, 0.01]}>
          <boxGeometry args={[0.58, 0.08, 0.01]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.9}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[-0.08, -0.06, 0.012]}>
          <boxGeometry args={[0.42, 0.14, 0.012]} />
          <meshStandardMaterial
            color="#1e40af"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0.08, -0.26, 0.012]}>
          <boxGeometry args={[0.42, 0.14, 0.012]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00e5ff"
            emissiveIntensity={0.65}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0, -0.54, 0.014]}>
          <boxGeometry args={[0.52, 0.11, 0.014]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1.6}
            wireframe={wire}
          />
        </mesh>
      </group>

      <group ref={badgeRef} position={[0, 0.22, 0.12]}>
        <mesh>
          <boxGeometry args={[0.56, 0.22, 0.032]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.85}
            roughness={0.12}
            metalness={0.3}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[-0.2, 0, 0.022]}>
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={2.5}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0.04, 0.03, 0.02]}>
          <boxGeometry args={[0.3, 0.03, 0.01]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} wireframe={wire} />
        </mesh>
        <mesh position={[-0.02, -0.04, 0.02]}>
          <boxGeometry args={[0.18, 0.024, 0.01]} />
          <meshStandardMaterial color="#bae6fd" emissive="#7dd3fc" emissiveIntensity={0.9} wireframe={wire} />
        </mesh>
      </group>
    </group>
  )
}
