import type { ThreeElements } from "@react-three/fiber";
import { useIridescentMaterial } from "../../../../hooks/use-iridescent-material/index.ts";
import { STAIR_HEIGHT } from "../../../../utils";

type StepProps = {
  hasSphere: boolean;
} & ThreeElements['group'];

export function Step({ hasSphere, ...otherProps }: StepProps) {
  const material = useIridescentMaterial('#a0c6db')

  return (
    <group {...otherProps}>
      <mesh
        position-x={12}
        rotation-x={Math.PI / 2}
        material={material}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[6, 1.5, STAIR_HEIGHT]} />
      </mesh>
      {hasSphere && (
        <mesh material={material}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
      )}
    </group>
  );
}
