import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNeonMaterial } from "../../../../hooks";
import { MessageBoard } from "./message-board/message-board";
import { Color, Group } from "three";
import { HEIGHT, MESSAGE, SPHERE_RADIUS, WIDTH } from "./constants";
import { Bulb } from "./bulb";
import { useFrame } from "@react-three/fiber";
import { Spring, Winter } from "./seasons";
import { animated, useSpring } from "@react-spring/three";
import { Summer } from "./seasons";
import { Autumn } from "./seasons";
import { getBulbProps } from "./utils";
import type { Season } from "./types";

type SeasonsBoardProps = {
  open: boolean;
}

export function SeasonsBoard({ open }: SeasonsBoardProps) {
  const neonMaterial = useNeonMaterial('#021040')

  const bulbMat = useMemo(() => {
    const bulb = neonMaterial.clone();
    bulb.color = new Color(1, 1.5, 1.5);

    return bulb
  }, [neonMaterial])

  const boardRef = useRef<Group>(null)
  const seasonRef = useRef<Season | null>('spring')
  const springRef = useRef<Group>(null)
  const summerRef = useRef<Group>(null)
  const autumnRef = useRef<Group>(null)
  const winterRef = useRef<Group>(null)

  const [props, api] = useSpring(() => ({
    scale: 0,
    config: {
      tension: 130,
      friction: 15,
    },
  }))

  const onSeasonChange = useCallback(() => {
    springRef.current!.visible = false
    summerRef.current!.visible = false
    autumnRef.current!.visible = false
    winterRef.current!.visible = false

    switch (seasonRef.current) {
      case 'spring':
        springRef.current!.visible = true
        break;
      case 'summer':
        summerRef.current!.visible = true
        break;
      case 'autumn':
        autumnRef.current!.visible = true
        break;
      case 'winter':
        winterRef.current!.visible = true
        break;
      default:
        break;
    }
  }, [])

  const getHandleClick = useCallback((newSeason: Season) => () => {
    if (seasonRef.current && seasonRef.current === newSeason) {
      seasonRef.current = null

      api.start({
        scale: 0,
        onRest: onSeasonChange,
      })
    } else {
      seasonRef.current = newSeason
  
      api.start({
        to: [
          { scale: 0 },
          { scale: 1, onStart: onSeasonChange },
        ]
      })
    }
  }, [api, onSeasonChange])

  const bulbProps = useMemo(() => (
    getBulbProps(bulbMat, getHandleClick)
  ), [bulbMat, getHandleClick])

  useFrame(({ clock }) => {
    boardRef.current!.position.y = Math.sin(clock.elapsedTime) / 5
  })

  useEffect(() => {
    if (open) {
      api.start({
        scale: 1,
        delay: 1000,
      })
    } else {
      api.start({
        scale: 0,
        delay: 0,
      })
    }
  }, [api, open])

  return (
    <group position={[0, 6.5, 0]}>
      <group ref={boardRef}>
        {bulbProps.map((props) => <Bulb key={JSON.stringify(props.position)} {...props} />)}
        <MessageBoard
          width={WIDTH}
          height={HEIGHT}
          depth={SPHERE_RADIUS}
        >
          {MESSAGE}
        </MessageBoard>
      </group>
      <animated.group scale={props.scale}>
        <group ref={springRef}>
          <Spring count={200} radius={25} />
        </group>
        <group ref={summerRef} visible={false}>
          <Summer count={200} radius={25} />
        </group>
        <group ref={autumnRef} visible={false}>
          <Autumn count={200} radius={25} />
        </group>
        <group ref={winterRef} visible={false}>
          <Winter count={200} radius={25} />
        </group>
      </animated.group>
    </group>
  )
}
