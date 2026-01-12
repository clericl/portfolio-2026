import { animated, config, useSpring } from "@react-spring/three";
import { useTexture } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { Color, DoubleSide, type Group, type Mesh } from "three";
import { ICON_CIRCLE_RADIUS } from "../../../../../utils";
import { useIridescentMaterial } from "../../../../../hooks";

const BASE_COLOR = new Color("#a0c6db");
const BASE_EMISSIVE = new Color(0, 0, 0)
const TARGET_COLOR = new Color('#beb6d3')
const TARGET_EMISSIVE = new Color(0.15, 0.15, 0.15)

type IconBubbleProps = {
  icon: string;
} & ThreeElements['group']

export function IconBubble({ icon, ...otherProps }: IconBubbleProps) {
  const groupRef = useRef<Group>(null!);
  const innerRef = useRef<Mesh>(null!);
  const tex = useTexture(icon);
  const rand = useRef<number>(Math.random() * 10);
  const [springs, api] = useSpring(() => ({
    color: [BASE_COLOR.r, BASE_COLOR.g, BASE_COLOR.b],
    emissive: [BASE_EMISSIVE.r, BASE_EMISSIVE.g, BASE_EMISSIVE.b],
  }));
  const mat = useIridescentMaterial('#a0c6db')

  const setHover = useCallback(
    (newState: boolean) => {
      if (newState) {
        document.body.classList.add("hovering");

        api.start({
          color: [TARGET_COLOR.r, TARGET_COLOR.g, TARGET_COLOR.b],
          emissive: [TARGET_EMISSIVE.r, TARGET_EMISSIVE.g, TARGET_EMISSIVE.b],
          config: config.molasses,
        });
      } else {
        document.body.classList.remove("hovering");

        api.start({
          color: [BASE_COLOR.r, BASE_COLOR.g, BASE_COLOR.b],
          emissive: [BASE_EMISSIVE.r, BASE_EMISSIVE.g, BASE_EMISSIVE.b],
          config: config.default,
        });
      }
    },
    [api],
  );

  useFrame(({ clock }) => {
    innerRef.current.position.y =
      Math.sin(clock.elapsedTime + (rand.current)) / 4;
  });

  return (
    <group
      ref={groupRef}
      {...otherProps}
    >
      <animated.mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        ref={innerRef}
        material={mat}
        material-color={springs.color}
        material-emissive={springs.emissive}
        material-opacity={0.2}
      >
        <sphereGeometry args={[ICON_CIRCLE_RADIUS, 64, 64]} />
        <mesh>
          <planeGeometry args={[ICON_CIRCLE_RADIUS, ICON_CIRCLE_RADIUS, 32]} />
          <meshPhysicalMaterial
            color="white"
            map={tex}
            alphaTest={0.1}
            side={DoubleSide}
          />
        </mesh>
      </animated.mesh>
    </group>
  );
}
