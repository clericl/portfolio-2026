import { animated, useSpring } from "@react-spring/three";
import { useCallback } from "react";
import type { BulbProps } from "../types";

export function Bulb({ position, material, radius, ...otherProps }: BulbProps) {
  const [props, api] = useSpring(() => ({ scale: 1 }))

  const setHover = useCallback((newState: boolean) => {
    if (newState) {
      document.body.classList.add("hovering");
    } else {
      document.body.classList.remove("hovering");
    }
  }, []);

  const onPointerEnter = useCallback(() => {
    api.start({ scale: 2 })

    setHover(true)
  }, [api, setHover])
  
  const onPointerLeave = useCallback(() => {
    api.start({ scale: 1 })

    setHover(false)
  }, [api, setHover])

  return (
    <animated.mesh
      castShadow
      position={position}
      material={material}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      scale={props.scale}
      {...otherProps}
    >
      <sphereGeometry args={[radius, 16, 16]} />
    </animated.mesh>
  )
}
