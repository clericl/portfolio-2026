import { Physics, RigidBody } from "@react-three/rapier";
import { Platform } from "../platform";
import { IconBubbles } from "./icon-bubbles/icon-bubbles";
import { Bubbles } from "./bubbles";

export function ContactPlatform() {
  return (
    <Platform>
      {/* <Physics debug> */}
        <IconBubbles />
        {/* <group position-y={10}>
          <Bubbles count={100} />
        </group> */}
        {/* <PhysicsFloor /> */}
      {/* </Physics> */}
    </Platform>
  )
}

function PhysicsFloor() {
  return (
    <RigidBody
      position={[0, 0.099, 0]}
      type="fixed"
      restitution={0.2}
    >
      <mesh castShadow={false} receiveShadow={false}>
        <boxGeometry args={[22.5, 0, 7.5]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
    </RigidBody>
  )
}
