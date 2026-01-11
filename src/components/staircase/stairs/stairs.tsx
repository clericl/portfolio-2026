import {
  NUMBER_OF_HALF_ROTATIONS,
  STAIRS_PER_HALF_ROTATION,
  SPACE_BETWEEN_STAIRS,
} from "../../../utils";
import { Step } from "./step";
import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";

export function Stairs(props: ThreeElements['group']) {
  const stairs = useMemo(() => {
    const renderedSteps = []

    const count = STAIRS_PER_HALF_ROTATION * NUMBER_OF_HALF_ROTATIONS;

    for (let i = 0; i < count; i++) {
      const positionY = i * SPACE_BETWEEN_STAIRS;

      const TOTAL_ROTATION = NUMBER_OF_HALF_ROTATIONS * -Math.PI
      const rotationY = TOTAL_ROTATION * (1 - (i / count))

      renderedSteps.push(
        <Step
          key={i}
          hasSphere={i % (STAIRS_PER_HALF_ROTATION) > (STAIRS_PER_HALF_ROTATION / 2)}
          position-y={positionY}
          rotation-y={rotationY}
          visible={i % STAIRS_PER_HALF_ROTATION !== 0}
        />,
      );
    }

    return renderedSteps
  }, [])

  return (
    <group {...props}>{stairs}</group>
  );
}
