import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/** Layered glass design monolith */
export function SpatialDesignMonolith() {
  const groupRef = useRef<THREE.Group>(null)
  const midLayerRef = useRef<THREE.Group>(null)
  const topLayerRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.55) * 0.45 - 0.32
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.08 + 0.26
    }
    if (midLayerRef.current) {
      midLayerRef.current.position.z = 0.24 + Math.sin(t * 1.4) * 0.03
    }
    if (topLayerRef.current) {
      topLayerRef.current.position.z = 0.48 + Math.sin(t * 1.4 + 0.8) * 0.04
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.16}>
      <group ref={groupRef} scale={0.92}>
        <RoundedBox args={[1.42, 0.96, 0.09]} radius={0.08} smoothness={6}>
          <meshPhysicalMaterial
            color="#0f172a"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.6}
            envMapIntensity={1.8}
          />
        </RoundedBox>

        <RoundedBox args={[1.45, 0.99, 0.04]} radius={0.085} smoothness={6} position={[0, 0, -0.01]}>
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.96}
            roughness={0.15}
            envMapIntensity={2.0}
          />
        </RoundedBox>

        <group ref={midLayerRef} position={[0.04, 0.02, 0.24]}>
          <RoundedBox args={[1.24, 0.78, 0.035]} radius={0.06} smoothness={5}>
            <meshPhysicalMaterial
              color="#e0f2fe"
              metalness={0.12}
              roughness={0.08}
              transmission={0.72}
              thickness={0.4}
              ior={1.45}
              clearcoat={1}
              envMapIntensity={2.2}
            />
          </RoundedBox>

          <RoundedBox args={[0.98, 0.09, 0.02]} radius={0.02} position={[0, 0.25, 0.03]}>
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.22} />
          </RoundedBox>

          <RoundedBox args={[0.45, 0.34, 0.02]} radius={0.03} position={[-0.26, -0.05, 0.03]}>
            <meshPhysicalMaterial
              color="#38bdf8"
              metalness={0.35}
              roughness={0.15}
              clearcoat={0.9}
              emissive="#0284c7"
              emissiveIntensity={0.35}
            />
          </RoundedBox>
          <RoundedBox args={[0.45, 0.34, 0.02]} radius={0.03} position={[0.26, -0.05, 0.03]}>
            <meshStandardMaterial color="#334155" metalness={0.75} roughness={0.24} />
          </RoundedBox>
        </group>

        <group ref={topLayerRef} position={[-0.14, -0.1, 0.48]}>
          <RoundedBox args={[0.68, 0.32, 0.03]} radius={0.05} smoothness={5}>
            <meshPhysicalMaterial
              color="#f8fafc"
              metalness={0.18}
              roughness={0.1}
              clearcoat={1}
              envMapIntensity={1.9}
            />
          </RoundedBox>
          {[
            { x: -0.2, color: '#0f172a' },
            { x: -0.07, color: '#38bdf8' },
            { x: 0.06, color: '#818cf8' },
            { x: 0.19, color: '#c084fc' },
          ].map((tok) => (
            <mesh key={tok.color} position={[tok.x, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.025, 24]} />
              <meshPhysicalMaterial
                color={tok.color}
                metalness={0.55}
                roughness={0.16}
                clearcoat={0.9}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
}
