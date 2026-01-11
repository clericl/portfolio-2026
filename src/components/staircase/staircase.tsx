import { useSpring, animated, config } from "@react-spring/three";
import { HALF_ROTATION_HEIGHT, PLATFORMS, STAIRCASE_HEIGHT } from "../../utils";
import { useCallback, useEffect } from "react";
import { Stairs } from "./stairs";
import { Platforms } from "../platforms";
import { useLocation } from "../../hooks";

export function Staircase() {
  const location = useLocation()

  const [springs, api] = useSpring(() => ({
    rotationY: 0,
    positionY: 0,
  }));

  const climbStairs = useCallback((pathname: string) => {
    const platformIndex = PLATFORMS.findIndex(
      ({ title }) => title === pathname,
    );

    if (typeof platformIndex === "number") {
      api.start({
        positionY: HALF_ROTATION_HEIGHT * platformIndex,
        rotationY: Math.PI * platformIndex,
        config: config.molasses,
      });
    }
  }, [api])

  useEffect(() => {
    climbStairs(location.pathname)
  }, [climbStairs, location.pathname]);

  return (
    <animated.group
      position-y={springs.positionY}
      rotation-y={springs.rotationY}
    >
      <group position={[0, -(STAIRCASE_HEIGHT + 5), 0]}>
        <Stairs />
        <Platforms platforms={PLATFORMS} />
      </group>
    </animated.group>
  );
}
