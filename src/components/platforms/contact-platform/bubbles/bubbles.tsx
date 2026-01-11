import { useIridescentMaterial, useLocation } from "../../../../hooks";
import { useEffect, useMemo, useRef } from "react";
import { InstancedRigidBodies, RapierRigidBody, type InstancedRigidBodyProps } from "@react-three/rapier";
import { Group, SphereGeometry, Vector3 } from "three";

type BubblesProps = {
  count: number;
}

function getRandom(ceil: number = 1, abs: boolean = false) {
  if (abs) {
    return Math.random() * ceil
  }

  return ceil * (Math.random() - 0.5)
}

export function Bubbles({ count = 20 }: BubblesProps) {
  const rigidBodies = useRef<RapierRigidBody[]>(null);
  const groupRef = useRef<Group>(null!)
  const mat = useIridescentMaterial('white')
  const calcVec = useRef(new Vector3())

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < count; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        rotation: [Math.random(), Math.random(), Math.random()],
        restitution: 0.8,
        mass: 0.1 + getRandom(0.1),
      });
    }

    return instances;
  }, [count]);

  const geometry = useMemo(() => new SphereGeometry(0.1, 16, 16), [])

  const location = useLocation()

  useEffect(() => {
    groupRef.current.getWorldPosition(calcVec.current)
    console.log(calcVec.current)

    rigidBodies.current?.forEach((body) => {
      body.setTranslation({
        x: calcVec.current.x + getRandom(2),
        y: calcVec.current.y + getRandom(2),
        z: calcVec.current.z + getRandom(2)
      }, false)
      body.sleep()
    })

    if (location.pathname === '/contact') {
      setTimeout(() => {
        rigidBodies.current?.forEach((body) => body.applyImpulse({ x: getRandom(0.05), y: getRandom(-0.05, true), z: getRandom(0.05) }, true))
      }, 1000)
    }
  }, [location.pathname])

  return (
    <group ref={groupRef}>
      <InstancedRigidBodies
        ref={rigidBodies}
        instances={instances}
        colliders="ball"
      >
        <instancedMesh
          args={[geometry, mat, count]}
          count={count}
          material-transparent={true}
          material-opacity={0.4}
          castShadow
        />
      </InstancedRigidBodies>
    </group>
  )
}
