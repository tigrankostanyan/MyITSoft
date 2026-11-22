import * as THREE from 'three'

export function BaseLayer({ groupRef, wire }: { groupRef: React.Ref<THREE.Group>; wire: boolean }) {
  return (
    <group ref={groupRef} position={[0, -0.68, 0]}>
      <mesh>
        <boxGeometry args={[1.68, 0.24, 1.24]} />
        <meshPhysicalMaterial
          color="#111827"
          roughness={0.22}
          metalness={0.82}
          clearcoat={0.6}
          wireframe={wire}
        />
      </mesh>
      <mesh position={[0, 0.02, 0.625]}>
        <boxGeometry args={[1.56, 0.04, 0.02]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00e5ff"
          emissiveIntensity={2.4}
          wireframe={wire}
        />
      </mesh>
      {[-0.55, -0.35, -0.15, 0.05].map((x, i) => (
        <mesh key={i} position={[x, -0.05, 0.628]}>
          <boxGeometry args={[0.1, 0.032, 0.015]} />
          <meshStandardMaterial
            color={i === 0 ? '#22c55e' : '#38bdf8'}
            emissive={i === 0 ? '#22c55e' : '#38bdf8'}
            emissiveIntensity={2.5}
            wireframe={wire}
          />
        </mesh>
      ))}
      {[-0.38, 0.38].map((x, i) => (
        <group key={i} position={[x, 0.16, 0]}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
            <meshStandardMaterial
              color="#1e3a8a"
              metalness={0.65}
              roughness={0.22}
              wireframe={wire}
            />
          </mesh>
          <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.21, 0.016, 8, 24]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={2.2}
              wireframe={wire}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function ApiLayer({ groupRef, wire, color }: { groupRef: React.Ref<THREE.Group>; wire: boolean; color: string }) {
  return (
    <group ref={groupRef} position={[0, -0.32, 0]}>
      <mesh>
        <boxGeometry args={[1.54, 0.08, 1.12]} />
        <meshPhysicalMaterial
          color={color}
          emissive="#1d4ed8"
          emissiveIntensity={0.38}
          roughness={0.14}
          metalness={0.55}
          clearcoat={1}
          wireframe={wire}
        />
      </mesh>
      {[-0.34, 0, 0.34].map((z, i) => (
        <mesh key={i} position={[0, 0.048, z]}>
          <boxGeometry args={[1.32, 0.012, 0.028]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#38bdf8"
            emissiveIntensity={2.0}
            wireframe={wire}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.075, 0]}>
        <boxGeometry args={[0.42, 0.055, 0.42]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} wireframe={wire} />
      </mesh>
      <mesh position={[0, 0.106, 0]}>
        <boxGeometry args={[0.24, 0.012, 0.24]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2.4}
          wireframe={wire}
        />
      </mesh>
    </group>
  )
}

export function UiLayer({ groupRef, wire }: { groupRef: React.Ref<THREE.Group>; wire: boolean }) {
  return (
    <group ref={groupRef} position={[0, 0.44, 0]}>
      <mesh>
        <boxGeometry args={[1.6, 0.08, 1.14]} />
        <meshPhysicalMaterial
          color="#172554"
          roughness={0.12}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.05}
          wireframe={wire}
        />
      </mesh>
      <mesh position={[0, 0.048, -0.45]}>
        <boxGeometry args={[1.48, 0.018, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} wireframe={wire} />
      </mesh>
      {[
        [-0.64, '#ef4444'],
        [-0.55, '#facc15'],
        [-0.46, '#22c55e'],
      ].map(([x, c], idx) => (
        <mesh key={idx} position={[x as number, 0.064, -0.45]}>
          <cylinderGeometry args={[0.024, 0.024, 0.015, 12]} />
          <meshStandardMaterial
            color={c as string}
            emissive={c as string}
            emissiveIntensity={1.6}
            wireframe={wire}
          />
        </mesh>
      ))}

      <mesh position={[-0.36, 0.08, 0.08]}>
        <boxGeometry args={[0.68, 0.06, 0.72]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#1d4ed8"
          emissiveIntensity={0.45}
          roughness={0.22}
          metalness={0.35}
          wireframe={wire}
        />
      </mesh>
      {[0.24, 0.1, -0.04].map((z, i) => (
        <mesh key={i} position={[-0.36, 0.118, z]}>
          <boxGeometry args={[0.5 - i * 0.08, 0.016, 0.06]} />
          <meshStandardMaterial
            color="#e0f2fe"
            emissive="#7dd3fc"
            emissiveIntensity={1.2}
            wireframe={wire}
          />
        </mesh>
      ))}

      {[
        { x: 0.14, h: 0.16, c: '#38bdf8' },
        { x: 0.3, h: 0.28, c: '#2563eb' },
        { x: 0.46, h: 0.4, c: '#00e5ff' },
        { x: 0.62, h: 0.32, c: '#22c55e' },
      ].map((bar, i) => (
        <mesh key={i} position={[bar.x, 0.04 + bar.h / 2, 0.08]}>
          <boxGeometry args={[0.1, bar.h, 0.14]} />
          <meshPhysicalMaterial
            color={bar.c}
            emissive={bar.c}
            emissiveIntensity={0.75}
            roughness={0.15}
            metalness={0.25}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
      ))}
    </group>
  )
}
