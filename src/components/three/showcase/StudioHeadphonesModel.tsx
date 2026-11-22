import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/** Rotating 3D metallic studio headphones centerpiece for ShowcaseMini3D. */
export function StudioHeadphonesModel() {
  const groupRef = useRef<THREE.Group>(null)

  const materials = useMemo(
    () => ({
      bandMetal: new THREE.MeshStandardMaterial({
        color: '#cbd5e1',
        metalness: 0.94,
        roughness: 0.18,
        envMapIntensity: 1.8,
      }),
      cushionDark: new THREE.MeshStandardMaterial({
        color: '#111827',
        metalness: 0.08,
        roughness: 0.82,
      }),
      rodSilver: new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        metalness: 0.96,
        roughness: 0.14,
        envMapIntensity: 2.0,
      }),
      sliderGray: new THREE.MeshStandardMaterial({
        color: '#475569',
        metalness: 0.9,
        roughness: 0.22,
      }),
      cupBody: new THREE.MeshPhysicalMaterial({
        color: '#1e293b',
        metalness: 0.88,
        roughness: 0.2,
        clearcoat: 0.75,
        clearcoatRoughness: 0.14,
        envMapIntensity: 1.9,
      }),
      capSilver: new THREE.MeshStandardMaterial({
        color: '#94a3b8',
        metalness: 0.95,
        roughness: 0.16,
        envMapIntensity: 2.1,
      }),
      rimChrome: new THREE.MeshStandardMaterial({
        color: '#f1f5f9',
        metalness: 0.98,
        roughness: 0.1,
        envMapIntensity: 2.2,
      }),
      padSoft: new THREE.MeshStandardMaterial({
        color: '#0f172a',
        metalness: 0.05,
        roughness: 0.88,
      }),
      meshInner: new THREE.MeshStandardMaterial({
        color: '#020617',
        metalness: 0.25,
        roughness: 0.9,
      }),
      ledCyan: new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        emissive: '#38bdf8',
        emissiveIntensity: 2.2,
      }),
    }),
    [],
  )

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose())
    }
  }, [materials])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.52
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.08 + 0.08
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.95} position={[0, -0.04, 0]}>
        <mesh position={[0, 0.08, 0]} material={materials.bandMetal}>
          <torusGeometry args={[0.72, 0.055, 24, 64, Math.PI]} />
        </mesh>

        <mesh position={[0, 0.06, 0]} material={materials.cushionDark}>
          <torusGeometry args={[0.665, 0.042, 20, 56, Math.PI * 0.82]} />
        </mesh>

        {([-1, 1] as const).map((side) => (
          <group key={side}>
            <mesh position={[side * 0.72, -0.05, 0]} material={materials.rodSilver}>
              <cylinderGeometry args={[0.032, 0.032, 0.34, 24]} />
            </mesh>

            <mesh position={[side * 0.72, 0.07, 0]} material={materials.sliderGray}>
              <cylinderGeometry args={[0.052, 0.052, 0.09, 24]} />
            </mesh>

            <mesh
              position={[side * 0.72, -0.24, 0]}
              rotation={[0, 0, side * 0.14]}
              material={materials.bandMetal}
            >
              <cylinderGeometry args={[0.026, 0.026, 0.22, 16]} />
            </mesh>

            <group position={[side * 0.65, -0.44, 0]} rotation={[0, 0, side * -0.14]}>
              <mesh
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.18, 1, 0.94]}
                material={materials.cupBody}
              >
                <cylinderGeometry args={[0.34, 0.31, 0.17, 48]} />
              </mesh>

              <mesh
                position={[side * 0.088, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.12, 1, 0.88]}
                material={materials.capSilver}
              >
                <cylinderGeometry args={[0.27, 0.29, 0.03, 48]} />
              </mesh>

              <mesh
                position={[side * 0.072, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.92, 1.15, 1]}
                material={materials.rimChrome}
              >
                <torusGeometry args={[0.305, 0.014, 16, 48]} />
              </mesh>

              <mesh
                position={[side * -0.1, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.93, 1.16, 1.1]}
                material={materials.padSoft}
              >
                <torusGeometry args={[0.255, 0.095, 24, 48]} />
              </mesh>

              <mesh
                position={[side * -0.07, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.05, 1, 0.82]}
                material={materials.meshInner}
              >
                <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
              </mesh>

              {side === 1 && (
                <>
                  <mesh position={[0.04, 0.34, -0.08]} rotation={[0.4, 0, 0]} material={materials.rodSilver}>
                    <cylinderGeometry args={[0.036, 0.036, 0.045, 20]} />
                  </mesh>
                  <mesh position={[0.09, -0.22, 0.16]} material={materials.ledCyan}>
                    <sphereGeometry args={[0.016, 12, 12]} />
                  </mesh>
                </>
              )}
            </group>
          </group>
        ))}
      </group>
    </Float>
  )
}
