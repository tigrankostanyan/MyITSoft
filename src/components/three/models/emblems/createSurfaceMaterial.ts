import * as THREE from 'three'

export function createSurfaceMaterial(
  params: THREE.MeshPhysicalMaterialParameters,
  _isMobile: boolean,
): THREE.Material {
  const stdParams: THREE.MeshStandardMaterialParameters = {
    color: params.color,
    metalness: params.metalness,
    roughness: params.roughness,
  }
  if (params.emissive !== undefined) stdParams.emissive = params.emissive
  if (params.emissiveIntensity !== undefined) stdParams.emissiveIntensity = params.emissiveIntensity
  if (params.envMapIntensity !== undefined) stdParams.envMapIntensity = params.envMapIntensity
  if (params.wireframe !== undefined) stdParams.wireframe = params.wireframe
  return new THREE.MeshStandardMaterial(stdParams)
}

export interface EmblemProps {
  groupRef: React.Ref<THREE.Group>
  r: number
  wire: boolean
  isMobile?: boolean
}
