import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'
import { StudioRig } from './StudioRig'
import { Product3DModel } from './ProductModels'
import type { ModelKind } from '~/data/types'

interface InspectorCanvasProps {
  kind: ModelKind
  color: string
  exploded: number
  hologram: boolean
}

function TurntableModel({ kind, color, exploded, hologram }: InspectorCanvasProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += Math.min(delta, 0.05) * 0.25
      const responsiveScale = THREE.MathUtils.clamp(state.viewport.width * 0.34, 0.72, 1.18)
      ref.current.scale.setScalar(responsiveScale)
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={ref} scale={1.0}>
        <Product3DModel kind={kind} color={color} exploded={exploded} hologram={hologram} />
      </group>
    </Float>
  )
}

export function ProductInspectorCanvas(props: InspectorCanvasProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <StudioRig accentColor={props.hologram ? '#00e5ff' : '#2563eb'} showShadows sparkleCount={28} />
      <TurntableModel {...props} />
      <OrbitControls
        enablePan={false}
        minDistance={2.8}
        maxDistance={8.5}
        enableDamping
        dampingFactor={0.07}
      />
    </Canvas>
  )
}
