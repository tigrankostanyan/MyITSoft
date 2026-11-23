import * as THREE from 'three'

export function createSurfaceMaterial(
  params: THREE.MeshPhysicalMaterialParameters,
  isMobile: boolean,
): THREE.Material {
  if (!isMobile) return new THREE.MeshPhysicalMaterial(params)
  return new THREE.MeshStandardMaterial({
    color: params.color,
    emissive: params.emissive,
    emissiveIntensity: params.emissiveIntensity,
    metalness: params.metalness,
    roughness: params.roughness,
    envMapIntensity: params.envMapIntensity,
    wireframe: params.wireframe,
  })
}

export interface EmblemProps {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}
