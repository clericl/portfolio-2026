import { Center, Text3D, type FontData } from "@react-three/drei";
import { Platform } from "../platform";
import { Frames } from "./frames";

import hubballi from '../../../assets/hubballi.json'

export function WorkPlatform() {
  return (
    <Platform>
      <Center disableY disableZ position-y={0.1}>
        <Text3D
          font={hubballi as unknown as FontData}
          size={1.25}
          scale={[1, 1, 1]}
          castShadow
        >
          SELECTED WORK
          <meshStandardMaterial
            metalness={1}
            roughness={0}
            color={0x7b8199}
          />
        </Text3D>
      </Center>
      <Center disableY disableZ position={[0, 8.2, 0]} scale={2.5}>
        <Frames />
      </Center>
    </Platform>
  )
}
