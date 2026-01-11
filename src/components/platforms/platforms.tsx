import { HALF_ROTATION_HEIGHT, STAIRCASE_HEIGHT } from "../../utils/constants";
import { type ReactNode } from "react"

type PlatformsProps = {
  platforms: {
    title: string;
    content: ReactNode;
  }[];
}

export function Platforms({ platforms }: PlatformsProps) {
  return platforms.map(({ title, content }, index) => (
    <group
      name={title}
      key={title}
      position={[
        4 * (index % 2 === 0 ? -1 : 1),
        STAIRCASE_HEIGHT - (HALF_ROTATION_HEIGHT * index),
        0,
      ]}
      rotation-y={index % 2 === 0 ? 0 : Math.PI}
    >
      {content}
    </group>
  ))
}
