import { memo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { SpatialDesignMonolith } from './showcase/SpatialDesignMonolith'

function StudioHeadphonesModel() {
  const groupRef = useRef<THREE.Group>(null)

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
        <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.72, 0.055, 24, 64, Math.PI]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.94}
            roughness={0.18}
            envMapIntensity={1.8}
          />
        </mesh>

        <mesh position={[0, 0.06, 0]}>
          <torusGeometry args={[0.665, 0.042, 20, 56, Math.PI * 0.82]} />
          <meshStandardMaterial
            color="#111827"
            metalness={0.08}
            roughness={0.82}
          />
        </mesh>

        {([-1, 1] as const).map((side) => (
          <group key={side}>
            <mesh position={[side * 0.72, -0.05, 0]}>
              <cylinderGeometry args={[0.032, 0.032, 0.34, 24]} />
              <meshStandardMaterial
                color="#e2e8f0"
                metalness={0.96}
                roughness={0.14}
                envMapIntensity={2.0}
              />
            </mesh>

            <mesh position={[side * 0.72, 0.07, 0]}>
              <cylinderGeometry args={[0.052, 0.052, 0.09, 24]} />
              <meshStandardMaterial
                color="#475569"
                metalness={0.9}
                roughness={0.22}
              />
            </mesh>

            <mesh position={[side * 0.72, -0.24, 0]} rotation={[0, 0, side * 0.14]}>
              <cylinderGeometry args={[0.026, 0.026, 0.22, 16]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.95}
                roughness={0.16}
              />
            </mesh>

            <group position={[side * 0.65, -0.44, 0]} rotation={[0, 0, side * -0.14]}>
              <mesh rotation={[0, 0, Math.PI / 2]} scale={[1.18, 1, 0.94]}>
                <cylinderGeometry args={[0.34, 0.31, 0.17, 48]} />
                <meshPhysicalMaterial
                  color="#1e293b"
                  metalness={0.88}
                  roughness={0.2}
                  clearcoat={0.75}
                  clearcoatRoughness={0.14}
                  envMapIntensity={1.9}
                />
              </mesh>

              <mesh position={[side * 0.088, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1.12, 1, 0.88]}>
                <cylinderGeometry args={[0.27, 0.29, 0.03, 48]} />
                <meshStandardMaterial
                  color="#94a3b8"
                  metalness={0.95}
                  roughness={0.16}
                  envMapIntensity={2.1}
                />
              </mesh>

              <mesh
                position={[side * 0.072, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.92, 1.15, 1]}
              >
                <torusGeometry args={[0.305, 0.014, 16, 48]} />
                <meshStandardMaterial
                  color="#f1f5f9"
                  metalness={0.98}
                  roughness={0.1}
                  envMapIntensity={2.2}
                />
              </mesh>

              <mesh
                position={[side * -0.1, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.93, 1.16, 1.1]}
              >
                <torusGeometry args={[0.255, 0.095, 24, 48]} />
                <meshStandardMaterial
                  color="#0f172a"
                  metalness={0.05}
                  roughness={0.88}
                />
              </mesh>

              <mesh
                position={[side * -0.07, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[1.05, 1, 0.82]}
              >
                <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
                <meshStandardMaterial
                  color="#020617"
                  metalness={0.25}
                  roughness={0.9}
                />
              </mesh>

              {side === 1 && (
                <>
                  <mesh position={[0.04, 0.34, -0.08]} rotation={[0.4, 0, 0]}>
                    <cylinderGeometry args={[0.036, 0.036, 0.045, 20]} />
                    <meshStandardMaterial
                      color="#e2e8f0"
                      metalness={0.96}
                      roughness={0.14}
                    />
                  </mesh>
                  <mesh position={[0.09, -0.22, 0.16]}>
                    <sphereGeometry args={[0.016, 12, 12]} />
                    <meshStandardMaterial
                      color="#38bdf8"
                      emissive="#38bdf8"
                      emissiveIntensity={2.2}
                    />
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

export const ShowcaseMini3D = memo(function ShowcaseMini3D({
  variant = 'ecommerce',
}: {
  variant?: 'ecommerce' | 'design'
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 2.75], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} color="#dbeafe" />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#7dd3fc" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#818cf8" />

      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={3.8}
          position={[0, 5, 3]}
          rotation={[Math.PI / 2.4, 0, 0]}
          scale={[10, 3, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[-6, 1.5, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[6, 4, 1]}
          color="#e0f2fe"
        />
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[6, 1.5, 2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[6, 4, 1]}
          color="#c7d2fe"
        />
        <Lightformer
          form="ring"
          intensity={1.4}
          position={[0, -4, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[5, 5, 1]}
          color="#38bdf8"
        />
      </Environment>

      {variant === 'ecommerce' ? <StudioHeadphonesModel /> : <SpatialDesignMonolith />}

      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.45}
        scale={3.2}
        blur={2.4}
        far={2}
      />
    </Canvas>
  )
})
