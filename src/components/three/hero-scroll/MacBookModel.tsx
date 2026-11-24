import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMacBookCleanScreenTexture, useStudioShadowTexture } from './macbookTextures'

export const MACBOOK_MODEL_URL = '/models/macbook.glb'

if (typeof window !== 'undefined') {
  useGLTF.preload(MACBOOK_MODEL_URL, false, true)
}

export function RealMacBookProModel({
  screenMatRef,
  shadowMatRef,
  isMobile = false,
}: {
  screenMatRef: React.MutableRefObject<THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial | null>
  shadowMatRef: React.MutableRefObject<THREE.MeshBasicMaterial | null>
  isMobile?: boolean
}) {
  const gltf = useGLTF(MACBOOK_MODEL_URL, false, true)
  const screenTexture = useMacBookCleanScreenTexture(isMobile)
  const shadowTexture = useStudioShadowTexture()

  const { clonedScene, normScale, offset, baseBottomY } = useMemo(() => {
    const clone = gltf.scene.clone(true)
    clone.updateMatrixWorld(true)

    const fullBox = new THREE.Box3().setFromObject(clone)
    const fullSize = new THREE.Vector3()
    fullBox.getSize(fullSize)
    const targetWidth = 2.34
    const s = fullSize.x > 0 ? targetWidth / fullSize.x : 0.068

    const screenObj = clone.getObjectByName('Screen')
    const centerBox = screenObj
      ? new THREE.Box3().setFromObject(screenObj)
      : fullBox
    const center = new THREE.Vector3()
    centerBox.getCenter(center)

    const off = new THREE.Vector3(-center.x * s, -center.y * s, -center.z * s)
    const bottomY = fullBox.min.y * s + off.y

    return {
      clonedScene: clone,
      normScale: s,
      offset: off,
      baseBottomY: bottomY,
    }
  }, [gltf.scene])

  useEffect(() => {
    const screenMat = isMobile
      ? new THREE.MeshStandardMaterial({
          map: screenTexture ?? undefined,
          emissiveMap: screenTexture ?? undefined,
          color: new THREE.Color('#ffffff'),
          emissive: new THREE.Color('#ffffff'),
          emissiveIntensity: 1.0,
          roughness: 0.08,
          metalness: 0.05,
          envMapIntensity: 0.55,
          transparent: true,
          opacity: 1,
        })
      : new THREE.MeshPhysicalMaterial({
          map: screenTexture ?? undefined,
          emissiveMap: screenTexture ?? undefined,
          color: new THREE.Color('#ffffff'),
          emissive: new THREE.Color('#ffffff'),
          emissiveIntensity: 1.0,
          roughness: 0.08,
          metalness: 0.05,
          clearcoat: 0.9,
          clearcoatRoughness: 0.06,
          reflectivity: 0.95,
          envMapIntensity: 0.55,
          transparent: true,
          opacity: 1,
        })

    const keyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0d14'),
      metalness: 0.14,
      roughness: 0.72,
      envMapIntensity: 0.65,
    })

    const bezelMat = isMobile
      ? new THREE.MeshStandardMaterial({
          color: new THREE.Color('#04060a'),
          metalness: 0.1,
          roughness: 0.06,
          envMapIntensity: 1.95,
        })
      : new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#04060a'),
          metalness: 0.1,
          roughness: 0.06,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          reflectivity: 1.0,
          envMapIntensity: 1.95,
        })

    const metalMat = isMobile
      ? new THREE.MeshStandardMaterial({
          color: new THREE.Color('#c9d1de'),
          metalness: 0.94,
          roughness: 0.19,
          envMapIntensity: 2.25,
        })
      : new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#c9d1de'),
          metalness: 0.94,
          roughness: 0.19,
          clearcoat: 0.35,
          clearcoatRoughness: 0.16,
          reflectivity: 0.95,
          envMapIntensity: 2.25,
        })

    clonedScene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const mat = obj.material
      const currentMatName = mat && !Array.isArray(mat) ? mat.name : ''
      if (typeof obj.userData.origMatName !== 'string') {
        obj.userData.origMatName = currentMatName
        obj.userData.wasStandardMat = mat instanceof THREE.MeshStandardMaterial
      }
      const matName = obj.userData.origMatName as string

      if (obj.name === 'Screen' || matName === 'sfCQkHOWyrsLmor') {
        obj.material = screenMat
        screenMatRef.current = screenMat
      } else if (matName === 'eJObPwhgFzvfaoZ') {
        obj.material = keyMat
      } else if (
        matName === 'WnHKXHhScfUbJQi' ||
        matName === 'fNHiBfcxHUJCahl' ||
        matName === 'LtEafgAVRolQqRw'
      ) {
        obj.material = bezelMat
      } else if (obj.userData.wasStandardMat) {
        obj.material = metalMat
      }
    })

    return () => {
      screenMat.dispose()
      keyMat.dispose()
      bezelMat.dispose()
      metalMat.dispose()
    }
  }, [clonedScene, screenTexture, screenMatRef, isMobile])

  return (
    <group>
      <group position={offset} scale={normScale}>
        <primitive object={clonedScene} />
      </group>
      {shadowTexture && (
        <mesh
          position={[0, baseBottomY - 0.03, 0.06]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.75, 0.72]} />
          <meshBasicMaterial
            ref={shadowMatRef}
            map={shadowTexture}
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
