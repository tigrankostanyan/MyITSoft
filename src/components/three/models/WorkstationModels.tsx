import type { ModelProps } from './modelTypes'

/** Workstation laptop with floating UI cards */
export function LaptopUIModel({
  color = '#2563eb',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  return (
    <group scale={0.95} position={[0, -0.15, 0]}>
      <mesh position={[0, -0.35, 0.22]}>
        <boxGeometry args={[1.82, 0.08, 1.24]} />
        <meshPhysicalMaterial
          color="#1e293b"
          metalness={0.88}
          roughness={0.22}
          clearcoat={0.5}
          wireframe={wire}
        />
      </mesh>
      <mesh position={[0, -0.305, 0.14]}>
        <boxGeometry args={[1.56, 0.012, 0.68]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1d4ed8"
          emissiveIntensity={0.4}
          roughness={0.4}
          wireframe={wire}
        />
      </mesh>
      <group position={[0, 0.26, -0.38]} rotation={[-0.14, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.82, 1.18, 0.06]} />
          <meshPhysicalMaterial
            color="#0f172a"
            metalness={0.85}
            roughness={0.2}
            clearcoat={0.8}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0, 0, 0.036]}>
          <boxGeometry args={[1.68, 1.04, 0.01]} />
          <meshStandardMaterial
            color="#0b1530"
            emissive="#1e3a8a"
            emissiveIntensity={0.45}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[-0.36, 0.12, 0.12 + exploded * 0.45]}>
          <boxGeometry args={[0.76, 0.56, 0.04]} />
          <meshPhysicalMaterial
            color={color}
            emissive="#2563eb"
            emissiveIntensity={0.75}
            roughness={0.14}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
        <mesh position={[0.42, -0.06, 0.18 + exploded * 0.65]}>
          <boxGeometry args={[0.62, 0.46, 0.04]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#0284c7"
            emissiveIntensity={0.85}
            roughness={0.12}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
      </group>
    </group>
  )
}

/** Cloud server rack */
export function CloudServerModel({
  color = '#0284c7',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  return (
    <group scale={0.95}>
      {[-0.65, -0.22, 0.22, 0.65].map((y, idx) => (
        <group key={idx} position={[0, y * (1 + exploded * 0.55), 0]}>
          <mesh>
            <boxGeometry args={[1.45, 0.3, 1.1]} />
            <meshPhysicalMaterial
              color="#0f172a"
              metalness={0.85}
              roughness={0.22}
              clearcoat={0.6}
              wireframe={wire}
            />
          </mesh>
          <mesh position={[0, 0, 0.556]}>
            <boxGeometry args={[1.28, 0.04, 0.015]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#00e5ff' : color}
              emissive={idx % 2 === 0 ? '#00e5ff' : color}
              emissiveIntensity={2.2}
              wireframe={wire}
            />
          </mesh>
          <mesh position={[-0.55, 0.07, 0.556]}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={2.5}
              wireframe={wire}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** CRM dashboard panel */
export function CrmDashboardModel({
  color = '#3b82f6',
  exploded = 0,
  hologram = false,
}: ModelProps) {
  const wire = hologram
  const bars = [
    { x: -0.52, h: 0.42, c: '#38bdf8' },
    { x: -0.26, h: 0.72, c: color },
    { x: 0, h: 0.58, c: '#60a5fa' },
    { x: 0.26, h: 0.96, c: '#00e5ff' },
    { x: 0.52, h: 0.82, c: '#22c55e' },
  ]
  return (
    <group scale={0.98}>
      <mesh position={[0, -0.52 - exploded * 0.28, 0]}>
        <boxGeometry args={[1.65, 0.12, 1.1]} />
        <meshPhysicalMaterial color="#111827" metalness={0.82} roughness={0.2} wireframe={wire} />
      </mesh>
      {bars.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, -0.46 + b.h / 2 + exploded * (0.12 + i * 0.06), 0]}
        >
          <boxGeometry args={[0.18, b.h, 0.24]} />
          <meshPhysicalMaterial
            color={b.c}
            emissive={b.c}
            emissiveIntensity={0.7}
            roughness={0.14}
            metalness={0.3}
            clearcoat={1}
            wireframe={wire}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.65 + exploded * 0.45, 0]} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[0.58, 0.025, 10, 48]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          wireframe={wire}
        />
      </mesh>
    </group>
  )
}
