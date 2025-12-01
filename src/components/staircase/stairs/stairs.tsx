import { type Vector3 } from "@react-three/fiber";
import {
  NUMBER_OF_ROTATIONS,
  STAIRS_PER_ROTATION,
  SPACE_BETWEEN_STAIRS,
} from "../../../utils/constants.ts";
import { Step } from "./step";
import { useMemo } from "react";

type StairsProps = {
  position?: Vector3;
}

export function Stairs({ position = [0, 0, 0] }: StairsProps) {
  const stairs = useMemo(() => {
    const renderedSteps = []

    const count = STAIRS_PER_ROTATION * NUMBER_OF_ROTATIONS;

    for (let i = 0; i < count; i++) {
      const positionY = i * SPACE_BETWEEN_STAIRS;
      const rotationY = i * ((2 * Math.PI) / STAIRS_PER_ROTATION);

      renderedSteps.push(
        <Step
          key={i}
          hasSphere={i % (STAIRS_PER_ROTATION / 2) > STAIRS_PER_ROTATION / 4}
          positionY={positionY}
          rotationY={rotationY}
        />,
      );
    }

    return renderedSteps
  }, [])

  return (
    <group position={position}>{stairs}</group>
  );
}
