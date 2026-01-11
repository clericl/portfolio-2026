import { useMemo, type ReactNode } from "react";
import { useNeonMaterial } from "../../../../../hooks";
import { Color } from "three";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import fontFile from '../../../../../assets/SourceCodePro-Regular.ttf'
import type { ThreeElements } from "@react-three/fiber";

type MessageBoardProps = {
  children?: ReactNode;
  width: number;
  height: number;
  depth: number;
} & ThreeElements['group']

export function MessageBoard({
  width,
  height,
  depth,
  children,
  ...otherProps
}: MessageBoardProps) {
  const neonMaterial = useNeonMaterial('#021040')

  const textMat = useMemo(() => {
    const text = neonMaterial.clone();
    text.emissive = new Color(0.5, 0.5, 0.5);
    text.color = new Color(1, 1.25, 1.25);

    return text;
  }, [neonMaterial])

  return (
    <group {...otherProps}>
      <mesh castShadow>
        <boxGeometry
          args={[
            width - depth,
            height - depth,
            depth,
          ]}
        />
        <MeshTransmissionMaterial
          samples={16}
          resolution={1028}
          anisotropy={1}
          thickness={0.8}
          roughness={0.6}
          toneMapped={true}
          color="#96b5b4"
        />
      </mesh>
      <group position-z={0.5}>
        <Text
          anchorX="center"
          anchorY="middle"
          color="#0d196b"
          font={fontFile}
          maxWidth={width - 2}
          textAlign="center"
          material={textMat}
          fontSize={width / 18}
        >
          {children}
        </Text>
      </group>
    </group>
  )
}
