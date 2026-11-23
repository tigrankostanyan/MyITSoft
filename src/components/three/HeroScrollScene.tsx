import { memo, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useUIStore } from '~/store/ui-store'
import { getStableViewportWidth } from '~/lib/scroll-math'
import { useInView } from '~/lib/useInView'
import { AutomationHubModel } from './models/AutomationHubModel'
import { HeroAppleStudioLighting } from './hero-scroll/HeroAppleStudioLighting'
import { RealMacBookProModel } from './hero-scroll/MacBookModel'

interface HeroScrollSceneProps {
  scrollProgressRef: React.MutableRefObject<number>
  onReady?: () => void
}

function ChoreographedStage({
  scrollProgressRef,
  isMobile,
  onReady,
}: {
  scrollProgressRef: React.MutableRefObject<number>
  isMobile: boolean
  onReady?: () => void
}) {
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const readyFramesRef = useRef(0)
  const readyNotifiedRef = useRef(false)
  const macbookRef = useRef<THREE.Group>(null)
  const screenMatRef = useRef<THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial | null>(null)
  const shadowMatRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const mechanismRef = useRef<THREE.Group>(null)
  const initializedRef = useRef(false)
  const macbookSnappedRef = useRef(false)
  const lastSizeRef = useRef({ w: 0, h: 0 })

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const width = state.size.width
    const height = state.size.height
    const mobileViewport = width < 768
    const sizeChanged =
      Math.abs(lastSizeRef.current.w - width) > 4 || Math.abs(lastSizeRef.current.h - height) > 4
    if (sizeChanged) {
      lastSizeRef.current = { w: width, h: height }
    }
    const hasMacbook = Boolean(macbookRef.current && macbookRef.current.children.length > 0)
    const firstMacbookFrame = hasMacbook && !macbookSnappedRef.current
    if (firstMacbookFrame) {
      macbookSnappedRef.current = true
    }
    const snapImmediate = !initializedRef.current || sizeChanged || firstMacbookFrame
    initializedRef.current = true
    const damp = snapImmediate ? 1 : 1 - Math.exp(-16.0 * dt)

    const p = scrollProgressRef.current
    const t = state.clock.elapsedTime
    const vw = state.viewport.width
    const isSmallMobile = width < 420
    const isTablet = width >= 768 && width < 1024
    const pointerFactor = mobileViewport ? 0 : 1

    const mx = state.pointer.x * 0.2 * pointerFactor
    const my = state.pointer.y * 0.14 * pointerFactor

    const centerU = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(p / 0.26, 0, 1), 0, 1)
    const enterU = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((p - 0.16) / 0.36, 0, 1), 0, 1)
    const screenFadeU = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((p - 0.42) / 0.12, 0, 1), 0, 1)

    const startY = mobileViewport ? (isSmallMobile ? 1.0 : 0.96) : 0.26
    const startScale = mobileViewport
      ? THREE.MathUtils.clamp(vw * 0.28, 0.44, 0.64)
      : isTablet
        ? 0.84
        : 1.08
    const maxStartX = Math.max(0, vw * 0.5 - startScale * 1.35)
    const startX = mobileViewport
      ? 0
      : Math.min(isTablet ? Math.min(1.2, vw * 0.25) : 1.49, maxStartX)

    const macTargetX = THREE.MathUtils.lerp(startX, 0, centerU)
    const macTargetY =
      THREE.MathUtils.lerp(startY, 0, centerU) + Math.sin(centerU * Math.PI) * 0.36
    const macTargetZ = THREE.MathUtils.lerp(0.1, -1.25, enterU)
    const macTargetScale = THREE.MathUtils.lerp(startScale, mobileViewport ? 4.2 : 5.4, enterU)

    const startRotY = mobileViewport ? -0.14 : -0.38
    const startRotX = mobileViewport ? 0.16 : 0.12
    const macRotY = THREE.MathUtils.lerp(startRotY, 0, centerU)
    const macRotX = THREE.MathUtils.lerp(startRotX, 0, centerU)

    if (macbookRef.current) {
      macbookRef.current.position.x = THREE.MathUtils.lerp(macbookRef.current.position.x, macTargetX, damp)
      macbookRef.current.position.y = THREE.MathUtils.lerp(macbookRef.current.position.y, macTargetY, damp)
      macbookRef.current.position.z = THREE.MathUtils.lerp(macbookRef.current.position.z, macTargetZ, damp)
      macbookRef.current.scale.setScalar(
        THREE.MathUtils.lerp(macbookRef.current.scale.x, macTargetScale, damp),
      )
      macbookRef.current.rotation.y = THREE.MathUtils.lerp(macbookRef.current.rotation.y, macRotY, damp)
      macbookRef.current.rotation.x = THREE.MathUtils.lerp(macbookRef.current.rotation.x, macRotX, damp)
      macbookRef.current.rotation.z = THREE.MathUtils.lerp(macbookRef.current.rotation.z, 0, damp)

      macbookRef.current.visible = screenFadeU < 0.98
    }

    if (screenMatRef.current) {
      screenMatRef.current.opacity = 1 - screenFadeU
    }

    if (shadowMatRef.current) {
      shadowMatRef.current.opacity = 0.75 * (1 - centerU)
    }

    if (mechanismRef.current) {
      mechanismRef.current.visible = hasMacbook
      const mechOnScreenX = macTargetX + Math.sin(macRotY) * 0.24 * startScale
      const mechOnScreenY = macTargetY
      const mechOnScreenZ = 0.1 + 0.58 * startScale

      const mechFinalX = mx * 0.22
      const mechFinalY = (mobileViewport ? 0.34 : -0.06) + my * 0.12 + Math.sin(t * 1.1) * 0.04
      const mechFinalZ = 0.65

      const emergeU = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((p - 0.14) / 0.4, 0, 1), 0, 1)

      const mechStartScale = startScale * 0.28
      const mechEndScale = mobileViewport
        ? THREE.MathUtils.clamp(vw * 0.27, 0.44, 0.62)
        : isTablet
          ? 0.92
          : 1.14
      const mScale = THREE.MathUtils.lerp(mechStartScale, mechEndScale, emergeU)

      const mX = THREE.MathUtils.lerp(mechOnScreenX, mechFinalX, emergeU)
      const mY = THREE.MathUtils.lerp(mechOnScreenY, mechFinalY, emergeU)
      const mZ = Math.max(
        THREE.MathUtils.lerp(mechOnScreenZ, mechFinalZ, emergeU),
        macTargetZ + mScale * 1.38,
      )

      mechanismRef.current.position.x = THREE.MathUtils.lerp(mechanismRef.current.position.x, mX, damp)
      mechanismRef.current.position.y = THREE.MathUtils.lerp(mechanismRef.current.position.y, mY, damp)
      mechanismRef.current.position.z = THREE.MathUtils.lerp(mechanismRef.current.position.z, mZ, damp)
      mechanismRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mechanismRef.current.scale.x, mScale, damp),
      )

      mechanismRef.current.rotation.y =
        THREE.MathUtils.lerp(macRotY, 0, emergeU) + t * 0.25 + mx * 0.28 * emergeU
      mechanismRef.current.rotation.x =
        THREE.MathUtils.lerp(macRotX, 0.18, emergeU) + my * 0.16 * emergeU
    }

    if (!readyNotifiedRef.current && hasMacbook) {
      readyFramesRef.current += 1
      if (readyFramesRef.current >= 2) {
        readyNotifiedRef.current = true
        const cb = onReadyRef.current
        if (cb) requestAnimationFrame(cb)
      }
    }
  })

  return (
    <>
      <HeroAppleStudioLighting isMobile={isMobile} />

      <group
        ref={macbookRef}
        position={[1.49, 0.26, 0.1]}
        rotation={[0.12, -0.38, 0]}
        scale={1.08}
      >
        <Suspense fallback={null}>
          <RealMacBookProModel
            screenMatRef={screenMatRef}
            shadowMatRef={shadowMatRef}
            isMobile={isMobile}
          />
        </Suspense>
      </group>

      <group ref={mechanismRef} position={[1.39, 0.26, 0.73]} scale={0.3} visible={false}>
        <AutomationHubModel color="#38bdf8" isMobile={isMobile} />
      </group>
    </>
  )
}

export const HeroScrollScene = memo(function HeroScrollScene({
  scrollProgressRef,
  onReady,
}: HeroScrollSceneProps) {
  const [mounted, setMounted] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && getStableViewportWidth() < 768,
  )
  const { ref, inView } = useInView('150px', true)
  const modalOpen = useUIStore((s) => s.inspectorId !== null)
  const preloaderOpen = useUIStore((s) => s.preloaderOpen)

  const handleSceneReady = useCallback(() => {
    setSceneReady(true)
    onReady?.()
  }, [onReady])

  useEffect(() => {
    setMounted(true)
    const updateMobile = () => setIsMobile(getStableViewportWidth() < 768)
    updateMobile()
    window.addEventListener('resize', updateMobile, { passive: true })
    return () => window.removeEventListener('resize', updateMobile)
  }, [])

  const active = mounted && (!sceneReady || (!preloaderOpen && inView && !modalOpen))

  return (
    <div ref={ref} className="h-full w-full">
      {mounted && (
        <Canvas
          frameloop={active ? 'always' : 'demand'}
          dpr={isMobile ? [1, 1.15] : [1, 1.5]}
          camera={{ position: [0, 0.12, 6.2], fov: 36, near: 0.05, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ChoreographedStage
            scrollProgressRef={scrollProgressRef}
            isMobile={isMobile}
            onReady={handleSceneReady}
          />
        </Canvas>
      )}
    </div>
  )
})
export default HeroScrollScene
