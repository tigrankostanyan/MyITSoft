import { memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { SpatialDesignMonolith } from './showcase/SpatialDesignMonolith'
import { StudioHeadphonesModel } from './showcase/StudioHeadphonesModel'

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
export default ShowcaseMini3D
