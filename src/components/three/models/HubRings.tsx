import * as THREE from 'three'

export function OuterGimbal({ groupRef, exploded, color, wire }: { groupRef: React.Ref<THREE.Group>; exploded: number; color: string; wire: boolean }) {
  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.04 + exploded * 0.24, 0.048, 24, 80]} />
        <meshPhysicalMaterial
          color="#e2e8f0"
          metalness={0.92}
          roughness={0.16}
          clearcoat={0.75}
          clearcoatRoughness={0.1}
          envMapIntensity={2.2}
          wireframe={wire}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[0.985 + exploded * 0.24, 0.015, 14, 80]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.96}
          roughness={0.09}
          envMapIntensity={2.35}
          wireframe={wire}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.09 + exploded * 0.24, 0.006, 10, 80]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive={color}
          emissiveIntensity={1.5}
          wireframe={wire}
        />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * Math.PI) / 4
        const r = 1.04 + exploded * 0.24
        return (
          <group key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]} rotation={[0, 0, a]}>
            <mesh>
              <cylinderGeometry args={[0.028, 0.028, 0.125, 14]} />
              <meshStandardMaterial
                color="#f1f5f9"
                metalness={0.94}
                roughness={0.14}
                envMapIntensity={2.15}
                wireframe={wire}
              />
            </mesh>
            <mesh position={[0, 0.065, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.014, 10]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#00e5ff"
                emissiveIntensity={1.9}
                wireframe={wire}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export function MidGimbal({ groupRef, exploded, wire }: { groupRef: React.Ref<THREE.Group>; exploded: number; wire: boolean }) {
  return (
    <group ref={groupRef} rotation={[Math.PI / 3.1, 0.42, 0]}>
      <mesh>
        <torusGeometry args={[0.82 + exploded * 0.18, 0.032, 20, 72]} />
        <meshPhysicalMaterial
          color="#cbd5e1"
          metalness={0.92}
          roughness={0.15}
          clearcoat={0.7}
          envMapIntensity={2.15}
          wireframe={wire}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[0.785 + exploded * 0.18, 0.008, 10, 72]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00e5ff"
          emissiveIntensity={1.65}
          wireframe={wire}
        />
      </mesh>
    </group>
  )
}
