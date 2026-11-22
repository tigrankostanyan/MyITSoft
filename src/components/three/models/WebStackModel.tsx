import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ApiLayer, BaseLayer, UiLayer } from './WebStackLayers'
import type { ModelProps } from './modelTypes'
import { useGearGeometry } from './modelGeometry'

/** Exploding layered web and automation stack */
export function WebStackModel({
  color = '#2563eb',
  exploded = 0,
  hologram = false,
  explodeRef,
}: ModelProps) {
  const baseLayerRef = useRef<THREE.Group>(null)
  const apiLayerRef = useRef<THREE.Group>(null)
  const engineLayerRef = useRef<THREE.Group>(null)
  const uiLayerRef = useRef<THREE.Group>(null)
  const crownLayerRef = useRef<THREE.Group>(null)
  const gearMainRef = useRef<THREE.Mesh>(null)
  const gearSide1Ref = useRef<THREE.Mesh>(null)
  const gearSide2Ref = useRef<THREE.Mesh>(null)
  const crownCrystalRef = useRef<THREE.Mesh>(null)
  const orbitRingRef = useRef<THREE.Mesh>(null)
  const beamsRef = useRef<THREE.Group>(null)

  const mainGearGeo = useGearGeometry(0.42, 12, 0.09)
  const smallGearGeo = useGearGeometry(0.24, 9, 0.08)

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const e = explodeRef ? explodeRef.current : exploded

    if (baseLayerRef.current) baseLayerRef.current.position.y = -0.68 - e * 0.72
    if (apiLayerRef.current) apiLayerRef.current.position.y = -0.32 - e * 0.28
    if (engineLayerRef.current) engineLayerRef.current.position.y = 0.02 + e * 0.08
    if (uiLayerRef.current) uiLayerRef.current.position.y = 0.44 + e * 0.56
    if (crownLayerRef.current) crownLayerRef.current.position.y = 0.94 + e * 1.02

    if (gearMainRef.current) gearMainRef.current.rotation.z += dt * 0.9
    if (gearSide1Ref.current) gearSide1Ref.current.rotation.z -= dt * 1.45
    if (gearSide2Ref.current) gearSide2Ref.current.rotation.z -= dt * 1.45

    if (crownCrystalRef.current) {
      crownCrystalRef.current.rotation.y += dt * 0.85
      crownCrystalRef.current.rotation.x = Math.sin(t * 1.3) * 0.2
      crownCrystalRef.current.position.y = Math.sin(t * 2.2) * 0.05
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z -= dt * 0.75
    }
    if (beamsRef.current) {
      beamsRef.current.scale.y = 1 + e * 1.65
    }
  })

  const wire = hologram

  return (
    <group scale={0.94}>
      <group ref={beamsRef} position={[0, 0.1, 0]}>
        {[
          [-0.64, -0.44],
          [0.64, -0.44],
          [-0.64, 0.44],
          [0.64, 0.44],
        ].map(([x, z], idx) => (
          <mesh key={idx} position={[x, 0, z]}>
            <cylinderGeometry args={[0.012, 0.012, 1.4, 8]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={2.2}
              transparent
              opacity={0.55}
              wireframe={wire}
            />
          </mesh>
        ))}
      </group>
      <BaseLayer groupRef={baseLayerRef} wire={wire} />
      <ApiLayer groupRef={apiLayerRef} wire={wire} color={color} />
      <group ref={engineLayerRef} position={[0, 0.02, 0]}>
        <mesh>
          <boxGeometry args={[1.46, 0.06, 1.06]} />
          <meshPhysicalMaterial
            color="#0f172a"
            roughness={0.18}
            metalness={0.7}
            transparent
            opacity={0.86}
            wireframe={wire}
          />
        </mesh>
        <mesh
          ref={gearMainRef}
          geometry={mainGearGeo}
          position={[0, 0.11, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.45}
            metalness={0.82}
            roughness={0.18}
            clearcoat={0.8}
            wireframe={wire}
          />
        </mesh>
        <mesh
          ref={gearSide1Ref}
          geometry={smallGearGeo}
          position={[-0.54, 0.11, 0.16]}
          rotation={[Math.PI / 2, 0, 0.3]}
        >
          <meshPhysicalMaterial
            color="#60a5fa"
            emissive="#2563eb"
            emissiveIntensity={0.45}
            metalness={0.85}
            roughness={0.2}
            wireframe={wire}
          />
        </mesh>
        <mesh
          ref={gearSide2Ref}
          geometry={smallGearGeo}
          position={[0.54, 0.11, -0.16]}
          rotation={[Math.PI / 2, 0, 0.6]}
        >
          <meshPhysicalMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.2}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.11, 18, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00e5ff"
            emissiveIntensity={3}
            wireframe={wire}
          />
        </mesh>
      </group>
      <UiLayer groupRef={uiLayerRef} wire={wire} />
      <group ref={crownLayerRef} position={[0, 0.94, 0]}>
        <mesh ref={crownCrystalRef}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#00e5ff"
            emissiveIntensity={1.25}
            roughness={0.08}
            metalness={0.4}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
        <mesh ref={orbitRingRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[0.46, 0.016, 10, 48]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#38bdf8"
            emissiveIntensity={2.1}
            wireframe={wire}
          />
        </mesh>
      </group>
    </group>
  )
}
