import { useCallback, type ReactNode } from "react";
import { randomEuler, randomVector } from "./utils";
import { Instance, Instances } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { BufferGeometry, Material } from "three";

type InstanceCloudProps = {
  children?: (props: ThreeElements['group']) => ReactNode;
  count: number;
  radius: number;
  material: Material;
  geometry: BufferGeometry;
}

export function InstanceCloud({ children, count, radius, material, geometry }: InstanceCloudProps) {
  const generateInstances = useCallback(() => (
    Array.from(
      { length: count },
      () => {
        const position = randomVector(radius)
        const rotation = randomEuler()
  
        return children ? children({ position, rotation }) : (
          <Instance
            position={position}
            rotation={rotation}
            key={JSON.stringify(position)}
          />
        )
      }
    )
  ), [children, count, radius])

  return (
    <group>
      <Instances
        limit={count}
        material={material}
        geometry={geometry}
        key={geometry.id}
      >
        {generateInstances()}
      </Instances>
    </group>
  )
}
