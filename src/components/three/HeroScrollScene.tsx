import { memo, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

const ChoreographedStage = memo(function ChoreographedStage({
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
  const smoothedPRef = useRef(0)
  const smoothMxRef = useRef(0)
  const smoothMyRef = useRef(0)
  const lastSizeRef = useRef({ w: 0, h: 0 })

  useLayoutEffect(() => {
    if (macbookRef.current) macbookRef.current.visible = false
    if (mechanismRef.current) mechanismRef.current.visible = false
  }, [])

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

    const rawP = THREE.MathUtils.clamp(scrollProgressRef.current, 0, 1)
    let p: number
    if (snapImmediate) {
      p = rawP
    } else {
      const pDamp = 1 - Math.exp(-26.0 * dt)
      const nextP = THREE.MathUtils.lerp(smoothedPRef.current, rawP, pDamp)
      p = Math.abs(rawP - nextP) < 0.0001 ? rawP : nextP
    }
    smoothedPRef.current = p

    const t = state.clock.elapsedTime
    const vw = state.viewport.width
    const isSmallMobile = width < 420
    const isTablet = width >= 768 && width < 1024
    const pointerFactor = mobileViewport ? 0 : 1

    const targetMx = state.pointer.x * 0.2 * pointerFactor
    const targetMy = state.pointer.y * 0.14 * pointerFactor
    const pointerDamp = snapImmediate ? 1 : 1 - Math.exp(-12.0 * dt)
    smoothMxRef.current = THREE.MathUtils.lerp(smoothMxRef.current, targetMx, pointerDamp)
    smoothMyRef.current = THREE.MathUtils.lerp(smoothMyRef.current, targetMy, pointerDamp)
    const mx = smoothMxRef.current
    const my = smoothMyRef.current

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
      : Math.min(isTablet ? Math.min(1.2, vw * 0.25) : 1.54, maxStartX)

    const macTargetX = THREE.MathUtils.lerp(startX, 0, centerU)
    const macTargetY = THREE.MathUtils.lerp(startY, 0, centerU)
    const macTargetZ = THREE.MathUtils.lerp(0.1, -1.25, enterU)
    const macTargetScale = THREE.MathUtils.lerp(startScale, mobileViewport ? 4.2 : 5.4, enterU)

    const startRotY = mobileViewport ? -0.14 : -0.38
    const startRotX = mobileViewport ? 0.16 : 0.12
    const macRotY = THREE.MathUtils.lerp(startRotY, 0, centerU)
    const macRotX = THREE.MathUtils.lerp(startRotX, 0, centerU)

    if (macbookRef.current) {
      macbookRef.current.position.set(macTargetX, macTargetY, macTargetZ)
      macbookRef.current.scale.setScalar(macTargetScale)
      macbookRef.current.rotation.set(macRotX, macRotY, 0)
      macbookRef.current.visible = hasMacbook && screenFadeU < 0.98
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

      mechanismRef.current.position.set(mX, mY, mZ)
      mechanismRef.current.scale.setScalar(mScale)
      mechanismRef.current.rotation.set(
        THREE.MathUtils.lerp(macRotX, 0.18, emergeU) + my * 0.16 * emergeU,
        THREE.MathUtils.lerp(macRotY, 0, emergeU) + t * 0.25 + mx * 0.28 * emergeU,
        0,
      )
    }

    if (!readyNotifiedRef.current && hasMacbook) {
      readyFramesRef.current += 1
      if (readyFramesRef.current >= 3) {
        readyNotifiedRef.current = true
        const cb = onReadyRef.current
        if (cb) requestAnimationFrame(cb)
      }
    }
  })

  return (
    <>
      <HeroAppleStudioLighting isMobile={isMobile} />

      <group ref={macbookRef}>
        <Suspense fallback={null}>
          <RealMacBookProModel
            screenMatRef={screenMatRef}
            shadowMatRef={shadowMatRef}
            isMobile={isMobile}
          />
        </Suspense>
      </group>

      <group ref={mechanismRef}>
        <AutomationHubModel color="#38bdf8" isMobile={isMobile} />
      </group>
    </>
  )
})

export const HeroScrollScene = memo(function HeroScrollScene({
  scrollProgressRef,
  onReady,
}: HeroScrollSceneProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && getStableViewportWidth() < 768,
  )
  const { ref, inView } = useInView('150px', true)
  const modalOpen = useUIStore((s) => s.inspectorId !== null)

  const handleSceneReady = useCallback(() => {
    onReady?.()
  }, [onReady])

  useEffect(() => {
    setMounted(true)
    const updateMobile = () => setIsMobile(getStableViewportWidth() < 768)
    updateMobile()
    window.addEventListener('resize', updateMobile, { passive: true })
    return () => window.removeEventListener('resize', updateMobile)
  }, [])

  const active = mounted && inView && !modalOpen

  return (
    <div ref={ref} className="h-full w-full">
      {mounted && (
        <Canvas
          frameloop={active ? 'always' : 'demand'}
          dpr={isMobile ? [1, 1.25] : [1, 2]}
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
