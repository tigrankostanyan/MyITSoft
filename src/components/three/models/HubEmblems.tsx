import * as THREE from 'three'
import { useLightningBoltGeometry, useShieldGeometry } from './modelGeometry'

export function ShieldEmblem({ groupRef, r, wire }: { groupRef: React.Ref<THREE.Group>; r: number; wire: boolean }) {
  const shieldGeo = useShieldGeometry()
  return (
    <group position={[r, 0, 0]}>
      <group ref={groupRef}>
        <mesh geometry={shieldGeo}>
          <meshPhysicalMaterial
            color="#cbd5e1"
            metalness={0.96}
            roughness={0.14}
            clearcoat={0.9}
            clearcoatRoughness={0.08}
            envMapIntensity={2.35}
            wireframe={wire}
          />
        </mesh>
        <mesh geometry={shieldGeo} scale={[0.72, 0.72, 1.28]}>
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#047857"
            emissiveIntensity={0.42}
            metalness={0.58}
            roughness={0.11}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={2.2}
            wireframe={wire}
          />
        </mesh>
        {[0.048, -0.048].map((zOff, idx) => (
          <group key={idx} position={[0, 0, zOff]}>
            <mesh position={[0, -0.014, 0]}>
              <boxGeometry args={[0.072, 0.068, 0.022]} />
              <meshPhysicalMaterial
                color="#f5b932"
                metalness={0.97}
                roughness={0.14}
                clearcoat={0.6}
                envMapIntensity={2.4}
                wireframe={wire}
              />
            </mesh>
            <mesh position={[0, 0.036, 0]}>
              <torusGeometry args={[0.023, 0.0075, 10, 20, Math.PI]} />
              <meshPhysicalMaterial
                color="#f5b932"
                metalness={0.97}
                roughness={0.14}
                clearcoat={0.6}
                envMapIntensity={2.4}
                wireframe={wire}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export function N8nEmblem({ groupRef, r, wire }: { groupRef: React.Ref<THREE.Group>; r: number; wire: boolean }) {
  return (
    <group position={[-r, 0, 0]}>
      <group ref={groupRef}>
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, 0.11, 14]} />
          <meshPhysicalMaterial
            color="#ea4b71"
            emissive="#be123c"
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.14}
            clearcoat={1}
            envMapIntensity={2.2}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0.06, 0.045, 0]} rotation={[0, 0, -0.96]}>
          <cylinderGeometry args={[0.015, 0.015, 0.135, 14]} />
          <meshPhysicalMaterial
            color="#ea4b71"
            emissive="#be123c"
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.14}
            clearcoat={1}
            envMapIntensity={2.2}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0.06, -0.045, 0]} rotation={[0, 0, 0.96]}>
          <cylinderGeometry args={[0.015, 0.015, 0.135, 14]} />
          <meshPhysicalMaterial
            color="#ea4b71"
            emissive="#be123c"
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.14}
            clearcoat={1}
            envMapIntensity={2.2}
            wireframe={wire}
          />
        </mesh>
        {[
          [-0.145, 0],
          [-0.015, 0],
          [0.125, 0.082],
          [0.125, -0.082],
        ].map(([nx, ny], idx) => (
          <group key={idx} position={[nx, ny, 0]}>
            <mesh>
              <torusGeometry args={[0.044, 0.016, 16, 32]} />
              <meshPhysicalMaterial
                color="#ea4b71"
                emissive="#be123c"
                emissiveIntensity={0.4}
                metalness={0.58}
                roughness={0.13}
                clearcoat={1}
                clearcoatRoughness={0.05}
                envMapIntensity={2.35}
                wireframe={wire}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 0.024, 20]} />
              <meshPhysicalMaterial
                color="#0f172a"
                metalness={0.8}
                roughness={0.18}
                clearcoat={0.9}
                wireframe={wire}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export function SpeedEmblem({ groupRef, r, wire }: { groupRef: React.Ref<THREE.Group>; r: number; wire: boolean }) {
  const boltGeo = useLightningBoltGeometry()
  return (
    <group position={[0, 0, r]}>
      <group ref={groupRef}>
        <mesh>
          <torusGeometry args={[0.172, 0.018, 16, 40]} />
          <meshPhysicalMaterial
            color="#cbd5e1"
            metalness={0.96}
            roughness={0.13}
            clearcoat={0.9}
            clearcoatRoughness={0.06}
            envMapIntensity={2.35}
            wireframe={wire}
          />
        </mesh>
        <mesh geometry={boltGeo}>
          <meshPhysicalMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.48}
            metalness={0.88}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={2.5}
            wireframe={wire}
          />
        </mesh>
      </group>
    </group>
  )
}

export function PremiumEmblem({ groupRef, r, wire }: { groupRef: React.Ref<THREE.Group>; r: number; wire: boolean }) {
  return (
    <group position={[0, 0, -r]}>
      <group ref={groupRef}>
        <mesh>
          <octahedronGeometry args={[0.135, 0]} />
          <meshPhysicalMaterial
            color="#2563eb"
            emissive="#1d4ed8"
            emissiveIntensity={0.42}
            metalness={0.78}
            roughness={0.07}
            clearcoat={1}
            clearcoatRoughness={0.03}
            envMapIntensity={2.6}
            wireframe={wire}
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.35, 0]}>
          <torusGeometry args={[0.175, 0.013, 14, 40]} />
          <meshPhysicalMaterial
            color="#f5b932"
            metalness={0.96}
            roughness={0.14}
            clearcoat={0.8}
            envMapIntensity={2.45}
            wireframe={wire}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 3, -0.35, 0]}>
          <torusGeometry args={[0.175, 0.013, 14, 40]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.12}
            clearcoat={0.9}
            envMapIntensity={2.4}
            wireframe={wire}
          />
        </mesh>
      </group>
    </group>
  )
}
