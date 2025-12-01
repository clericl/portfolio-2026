import { Instance as DreiInstance } from "@react-three/drei"
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

export function SpinningInstance({ ...props }: ThreeElements['group']) {
  const ref = useRef<Group>(null!);

  useFrame(() => {
    ref.current.rotation.x += 0.03
    ref.current.rotation.y += 0.01
  });

  return (
    <group ref={ref} {...props}>
      <DreiInstance />
    </group>
  );
}
