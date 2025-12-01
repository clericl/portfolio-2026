import type { ReactNode } from "react"
import { Floor } from "./floor";

type PlatformProps = {
  children: ReactNode;
  neon?: boolean;
}

export function Platform({ children, neon = false }: PlatformProps) {
  return (
    <group position-x={4}>
      {children}
      <Floor neon={neon} />
    </group>
  )
}
