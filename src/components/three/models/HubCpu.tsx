import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useCpuCoreTexture } from './cpuCoreTexture'

const PIN_OFFSETS = [-0.27, -0.18, -0.09, 0, 0.09, 0.18, 0.27]
const LGA_OFFSETS = [-0.18, -0.09, 0, 0.09, 0.18]
const DUMMY_OBJ = new THREE.Object3D()

export function HubCpu({ groupRef, exploded, wire }: { groupRef: React.Ref<THREE.Group>; exploded: number; wire: boolean }) {
  const cpuTexture = useCpuCoreTexture()
  const lgaRef = useRef<THREE.InstancedMesh>(null)
  const pinsRef = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    const lgaMesh = lgaRef.current
    if (lgaMesh) {
      let i = 0
      const z = -0.072 - exploded * 0.14
      DUMMY_OBJ.rotation.set(0, 0, 0)
      DUMMY_OBJ.scale.set(1, 1, 1)
      for (const lx of LGA_OFFSETS) {
        for (const ly of LGA_OFFSETS) {
          DUMMY_OBJ.position.set(lx, ly, z)
          DUMMY_OBJ.updateMatrix()
          lgaMesh.setMatrixAt(i++, DUMMY_OBJ.matrix)
        }
      }
      lgaMesh.instanceMatrix.needsUpdate = true
    }

    const pinsMesh = pinsRef.current
    if (pinsMesh) {
      let i = 0
      const d = 0.425 + exploded * 0.08
      DUMMY_OBJ.scale.set(1, 1, 1)
      for (const o of PIN_OFFSETS) {
        DUMMY_OBJ.rotation.set(0, 0, 0)
        DUMMY_OBJ.position.set(o, d, 0)
        DUMMY_OBJ.updateMatrix()
        pinsMesh.setMatrixAt(i++, DUMMY_OBJ.matrix)

        DUMMY_OBJ.position.set(o, -d, 0)
        DUMMY_OBJ.updateMatrix()
        pinsMesh.setMatrixAt(i++, DUMMY_OBJ.matrix)

        DUMMY_OBJ.rotation.set(0, 0, Math.PI / 2)
        DUMMY_OBJ.position.set(-d, o, 0)
        DUMMY_OBJ.updateMatrix()
        pinsMesh.setMatrixAt(i++, DUMMY_OBJ.matrix)

        DUMMY_OBJ.position.set(d, o, 0)
        DUMMY_OBJ.updateMatrix()
        pinsMesh.setMatrixAt(i++, DUMMY_OBJ.matrix)
      }
      pinsMesh.instanceMatrix.needsUpdate = true
    }
  }, [exploded])

  return (
    <group ref={groupRef} scale={0.82}>
      <mesh>
        <boxGeometry args={[0.74, 0.74, 0.075]} />
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.55}
          roughness={0.28}
          clearcoat={0.5}
          envMapIntensity={1.5}
          wireframe={wire}
        />
      </mesh>

      <mesh>
        <boxGeometry args={[0.765, 0.765, 0.026]} />
        <meshStandardMaterial
          color="#eab308"
          metalness={0.95}
          roughness={0.18}
          envMapIntensity={1.9}
          wireframe={wire}
        />
      </mesh>

      <mesh position={[0, 0, 0.062 + exploded * 0.14]}>
        <boxGeometry args={[0.6, 0.6, 0.056]} />
        <meshPhysicalMaterial
          color="#e2e8f0"
          metalness={0.92}
          roughness={0.18}
          clearcoat={0.6}
          envMapIntensity={2.15}
          wireframe={wire}
        />
      </mesh>

      <mesh position={[0, 0, 0.094 + exploded * 0.18]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial
          map={cpuTexture ?? undefined}
          emissiveMap={cpuTexture ?? undefined}
          color="#ffffff"
          emissive="#38bdf8"
          emissiveIntensity={0.75}
          metalness={0.35}
          roughness={0.18}
          wireframe={wire}
        />
      </mesh>

      <mesh position={[0, 0, 0.06 + exploded * 0.14]}>
        <boxGeometry args={[0.625, 0.625, 0.018]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00e5ff"
          emissiveIntensity={1.85}
          wireframe={wire}
        />
      </mesh>

      <mesh position={[0, 0, -0.052 - exploded * 0.12]}>
        <boxGeometry args={[0.58, 0.58, 0.032]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.9}
          wireframe={wire}
        />
      </mesh>

      <instancedMesh ref={lgaRef} args={[undefined, undefined, 25]}>
        <boxGeometry args={[0.048, 0.048, 0.012]} />
        <meshStandardMaterial color="#f5c542" metalness={0.96} roughness={0.16} wireframe={wire} />
      </instancedMesh>

      <instancedMesh ref={pinsRef} args={[undefined, undefined, 28]}>
        <boxGeometry args={[0.026, 0.11, 0.024]} />
        <meshStandardMaterial color="#f5c542" metalness={0.96} roughness={0.16} wireframe={wire} />
      </instancedMesh>
    </group>
  )
}
