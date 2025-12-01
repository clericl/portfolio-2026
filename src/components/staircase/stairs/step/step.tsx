import { useIridescentMaterial } from "../../../../hooks/use-iridescent-material/index.ts";
import { STAIR_HEIGHT } from "../../../../utils/constants.ts";

type StepProps = {
  hasSphere: boolean;
  positionY: number;
  rotationY: number;
}

export function Step({ hasSphere, rotationY, positionY }: StepProps) {
  const material = useIridescentMaterial('#a0c6db')

  return (
    <group position-y={positionY} rotation-y={rotationY}>
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
