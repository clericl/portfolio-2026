import { MeshTransmissionMaterial, type MeshTransmissionMaterialProps } from "@react-three/drei"
import type { SphereGeometry } from "three"

type BubbleProps = {
  geometryProps?: Partial<SphereGeometry>;
  materialProps?: Partial<MeshTransmissionMaterialProps>;
  radius?: number;
  segments?: number;
}

export function Bubble({ radius = 1, segments = 16, materialProps }: BubbleProps) {
  return (
    <mesh>
      <sphereGeometry args={[radius, segments]} />
      <MeshTransmissionMaterial
        distortionScale={0}
        temporalDistortion={0}
        resolution={1024}
        thickness={0.1}
        anisotropy={6}
        chromaticAberration={0.9}
        transparent
        opacity={0.2}
        roughness={0.5}
        toneMapped={false}
        {...materialProps}
      />
    </mesh>
  )
}
