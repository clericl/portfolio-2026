import { Box, Center, Text3D, type FontData } from "@react-three/drei";
import { Platform } from "..";
import { useIridescentMaterial } from "../../../hooks";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import hubballiUrl from '../../../assets/hubballi.json'

export function HomePlatform() {
  const iridescentMaterial = useIridescentMaterial("#a0c6db")
  const boxRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 3;
      boxRef.current.rotation.y += delta * 3;
      boxRef.current.rotation.z += delta * 3;
    }
  });

  return (
    <Platform neon>
      <Center disableY disableZ>
        <Text3D
          font={hubballiUrl as unknown as FontData}
          position={[0, 7, -1]}
          scale={[1, 1, 2]}
          size={4}
          material={iridescentMaterial}
          castShadow
        >
          ERIC LIANG
        </Text3D>
      </Center>
      <Box
        args={[0.5, 0.5, 0.5]}
        position={[-1.8, 8.5, -1]}
        ref={boxRef}
        material={iridescentMaterial}
      />
      <Center disableY disableZ>
        <Text3D
          font={hubballiUrl as unknown as FontData}
          position={[0, 4.5, -1]}
          scale={[1, 1, 2]}
          size={1.8}
          letterSpacing={-0.1}
          material={iridescentMaterial}
          castShadow
        >
          WEB DEVELOPER
        </Text3D>
      </Center>
    </Platform>
  )
}
