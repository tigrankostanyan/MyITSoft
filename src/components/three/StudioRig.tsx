import { memo } from 'react'
import { Environment, Lightformer, ContactShadows, Sparkles } from '@react-three/drei'

interface StudioRigProps {
  accentColor?: string
  showShadows?: boolean
  showSparkles?: boolean
  sparkleCount?: number
}

export const StudioRig = memo(function StudioRig({
  accentColor = '#38bdf8',
  showShadows = false,
  showSparkles = false,
  sparkleCount = 24,
}: StudioRigProps) {
  return (
    <>
      <ambientLight intensity={0.22} color="#dbeafe" />

      <directionalLight position={[4.5, 7.5, 6.5]} intensity={2.6} color="#f8fafc" />
      <directionalLight position={[-6.5, 3.5, -3.5]} intensity={1.5} color="#93c5fd" />
      <directionalLight position={[0, -4, 4]} intensity={0.45} color={accentColor} />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={4.2}
            position={[0, 7, 2]}
            rotation={[Math.PI / 2.2, 0, 0]}
            scale={[14, 3.2, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[-8, 1.5, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[9, 4.5, 1]}
            color="#e2e8f0"
          />
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[8, 2, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[9, 3.5, 1]}
            color="#bae6fd"
          />
          <Lightformer
            form="ring"
            intensity={1.8}
            position={[0, 1, -8]}
            scale={[7, 7, 1]}
            color="#60a5fa"
          />
          <Lightformer
            form="rect"
            intensity={0.45}
            position={[0, -6, 2]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[14, 14, 1]}
            color="#1e293b"
          />
        </group>
      </Environment>

      {showSparkles && (
        <Sparkles
          count={sparkleCount}
          scale={[7, 5, 4]}
          size={1.2}
          speed={0.22}
          opacity={0.25}
          color="#bae6fd"
        />
      )}

      {showShadows && (
        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={0.55}
          scale={8}
          blur={2.4}
          far={4}
          resolution={256}
          frames={1}
          color="#020617"
        />
      )}
    </>
  )
})
