import { animated, config, useSpring } from "@react-spring/three";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { Color, DoubleSide, type Group, type Mesh } from "three";
import { ICON_CIRCLE_RADIUS } from "../../../../../utils";

const BLACK = new Color("black");
const BASE_COLOR = new Color("#b9afd4");
const BASE_EMISSIVE = new Color(0, 0, 0)
const TARGET_COLOR = new Color('white')
const TARGET_EMISSIVE = new Color(0.25, 0.25, 0.25)

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
      Math.sin(clock.elapsedTime + (rand.current)) / 2;
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
        material-color={springs.color}
        material-emissive={springs.emissive}
      >
        <sphereGeometry args={[ICON_CIRCLE_RADIUS, 64, 64]} />
        <MeshTransmissionMaterial
          distortionScale={0}
          temporalDistortion={0}
          resolution={1024}
          thickness={0.1}
          anisotropy={4}
          chromaticAberration={0.3}
          transparent
          opacity={0.9}
          roughness={0.6}
          color={BASE_COLOR.clone()}
          emissive={BLACK.clone()}
          toneMapped={false}
        />
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
