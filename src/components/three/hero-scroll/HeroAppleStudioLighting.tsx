import { Environment, Lightformer } from '@react-three/drei'

export function HeroAppleStudioLighting({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.14} color="#e2e8f0" />

      <directionalLight position={[3.5, 6.5, 5.5]} intensity={1.9} color="#ffffff" />
      <directionalLight position={[-5.5, 4.5, 2.5]} intensity={1.6} color="#e2ecff" />
      <directionalLight position={[0, 2.5, -6]} intensity={1.2} color="#93c5fd" />

      <Environment resolution={isMobile ? 128 : 256} frames={1}>
        <group rotation={[-Math.PI / 5, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={5.0}
            position={[0, 7.5, 2.5]}
            rotation={[Math.PI / 2.15, 0, 0]}
            scale={[16, 2.8, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.6}
            position={[-8.5, 1.8, 3.5]}
            rotation={[0, Math.PI / 2.2, 0]}
            scale={[10, 4.2, 1]}
            color="#f1f5f9"
          />
          <Lightformer
            form="rect"
            intensity={3.4}
            position={[8.5, 2.2, 2.5]}
            rotation={[0, -Math.PI / 2.2, 0]}
            scale={[10, 3.2, 1]}
            color="#dbeafe"
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[2.5, 3.5, 9]}
            rotation={[0, Math.PI, 0]}
            scale={[7, 1.4, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={0.25}
            position={[0, -6.5, 1]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[16, 16, 1]}
            color="#0f172a"
          />
        </group>
      </Environment>
    </>
  )
}
