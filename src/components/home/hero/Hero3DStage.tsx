import { memo, useCallback, useState } from 'react'
import { HeroScrollScene } from '~/components/three/HeroScrollScene'

interface Hero3DStageProps {
  scrollProgressRef: React.MutableRefObject<number>
  onReady?: () => void
}

/**
 * Mounts and warms the 3D MacBook + AutomationHub WebGL stage immediately on client
 * hydration so shaders, textures, and GLTF geometry are 100% ready behind the Preloader.
 */
export const Hero3DStage = memo(function Hero3DStage({
  scrollProgressRef,
  onReady,
}: Hero3DStageProps) {
  const [canvasReady, setCanvasReady] = useState(false)

  const handleReady = useCallback(() => {
    setCanvasReady(true)
    onReady?.()
  }, [onReady])

  return (
    <div className="relative h-full w-full">
      <div
        className={`h-full w-full transition-opacity duration-150 ease-out ${
          canvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroScrollScene
          scrollProgressRef={scrollProgressRef}
          onReady={handleReady}
        />
      </div>
    </div>
  )
})
