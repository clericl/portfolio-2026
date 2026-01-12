import { useCallback, useContext, useRef, type MouseEvent } from 'react'
import { BufferGeometry, Color, Mesh, ShaderMaterial } from 'three'
import { ModalContext } from '../../../../modal/utils'
import { GlitchImage } from '../../../../glitch-image'
import type { ThreeElements, ThreeEvent } from '@react-three/fiber'
import type { ModalKey } from '../../../../modal'

const BASE_GLITCH_COLOR = new Color(0.6, 0.6, 0.6)
const TARGET_GLITCH_COLOR = new Color(1.2, 1.2, 1.2)

type FrameProps = {
  name: string;
  url: string;
  selected?: boolean;
} & ThreeElements['group']

export function Frame({ name, url, ...otherProps }: FrameProps) {
  const hoveredRef = useRef(false)
  const { setModal } = useContext(ModalContext)
  const glitchRef = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null!)

  const setHover = useCallback(
    (e: ThreeEvent<PointerEvent>, newState: boolean) => {
      e.stopPropagation()

      if (newState) {
        hoveredRef.current = true
        document.body.classList.add('hovering')
        glitchRef.current.material.uniforms.seed.value = 0
        glitchRef.current.material.uniforms.color.value = TARGET_GLITCH_COLOR
      } else {
        hoveredRef.current = false
        document.body.classList.remove('hovering')
        glitchRef.current.material.uniforms.seed.value = Math.random() * 10 + 7
        glitchRef.current.material.uniforms.color.value = BASE_GLITCH_COLOR
      }
    },
    [],
  )

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setModal(name as ModalKey)
  }, [name, setModal])

  return (
    <group
      onClick={handleClick}
      onPointerOver={(e) => setHover(e, true)}
      onPointerOut={(e) => setHover(e, false)}
      {...otherProps}
    >
      <mesh castShadow>
        <boxGeometry args={[2.4, 2.4, 0.05]} />
        <meshStandardMaterial
          metalness={1}
          roughness={0}
          color={0x5a5f72}
        />
      </mesh>
      <GlitchImage color={BASE_GLITCH_COLOR} url={url} position-z={0.03} ref={glitchRef}>
        <planeGeometry args={[2.2, 2.2]} />
      </GlitchImage>
    </group>
  )
}
