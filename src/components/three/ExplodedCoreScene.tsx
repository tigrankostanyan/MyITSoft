import { memo, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { useUIStore } from '~/store/ui-store'
import { useInView } from '~/lib/useInView'
import { StudioRig } from './StudioRig'
import { NovaCoreCapsule } from './ProductModels'

export const ExplodedCoreScene = memo(function ExplodedCoreScene({
  explode,
}: {
  explode: number
}) {
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView('200px')
  const modalOpen = useUIStore((s) => s.inspectorId !== null)

  useEffect(() => setMounted(true), [])

  const active = inView && !modalOpen

  return (
    <div ref={ref} className="h-full w-full">
      {mounted && (
        <Canvas
          frameloop={active ? 'always' : 'demand'}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.3, 5.4], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
        >
          <StudioRig accentColor="#00e5ff" sparkleCount={32} showShadows />
          <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.3}>
            <NovaCoreCapsule explode={explode} />
          </Float>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.06}
            autoRotate
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      )}
    </div>
  )
})
