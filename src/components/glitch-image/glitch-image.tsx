import { shaderMaterial, useTexture } from "@react-three/drei"
import { Color, Mesh, PlaneGeometry, ShaderMaterial, Vector2, type Side, type Texture } from "three"
import { extend, useFrame, useThree, type ThreeElements } from "@react-three/fiber"
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ForwardedRef } from "react"
import type { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils"

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export type GlitchImageProps = Omit<ThreeElements['mesh'], 'scale'> & {
  segments?: number
  scale?: number | [number, number]
  color?: Color
  zoom?: number
  radius?: number
  grayscale?: number
  toneMapped?: boolean
  transparent?: boolean
  opacity?: number
  side?: Side
  seed?: number;
} & ({ texture: Texture; url?: never } | { texture?: never; url: string }) // {texture: THREE.Texture} XOR {url: string}

type GlitchImageMaterialType = ThreeElements['shaderMaterial'] & {
  scale?: number[]
  imageBounds?: number[]
  radius?: number
  resolution?: number
  color?: Color
  map: Texture
  zoom?: number
  grayscale?: number
  seed?: number
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    glitchImageMaterial: GlitchImageMaterialType
  }
}

const GlitchImageMaterialImpl = shaderMaterial(
  {
    color: new Color('white'),
    scale: new Vector2(1, 1),
    imageBounds: new Vector2(1, 1),
    resolution: 1024,
    map: null,
    zoom: 1,
    radius: 0,
    grayscale: 0,
    opacity: 1,
    uTime: 0,
    seed: 0,
  },
  vertex,
  fragment,
)

const GlitchImageBase: ForwardRefComponent<Omit<GlitchImageProps, 'url'>, Mesh> = forwardRef(
  ({
    children,
    color,
    segments = 1,
    scale = 1,
    zoom = 1,
    grayscale = 0,
    opacity = 1,
    radius = 0,
    texture,
    toneMapped,
    transparent,
    side,
    seed = Math.random() * 10 + 7,
    ...props
  }, fref) => {
    extend({ GlitchImageMaterial: GlitchImageMaterialImpl })

    const ref = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null!)
    const size = useThree((state) => state.size)
    const planeBounds = Array.isArray(scale) ? [scale[0], scale[1]] : [scale, scale]
    const imageBounds = [texture!.image.width, texture!.image.height]
    const resolution = Math.max(size.width, size.height)

    useImperativeHandle(fref, () => ref.current, [])

    useLayoutEffect(() => {
      if (ref.current.geometry.parameters) {
        ref.current.material.scale.set(
          planeBounds[0] * ref.current.geometry.parameters.width,
          planeBounds[1] * ref.current.geometry.parameters.height
        )
      }
    }, [planeBounds[0], planeBounds[1]])

    useFrame(({ clock }) => {
      ref.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
      <mesh ref={ref} scale={Array.isArray(scale) ? [...scale, 1] : scale} {...props}>
        <planeGeometry args={[1, 1, segments, segments]} />
        <glitchImageMaterial
          color={color}
          map={texture!}
          zoom={zoom}
          grayscale={grayscale}
          opacity={opacity}
          scale={planeBounds}
          imageBounds={imageBounds}
          resolution={resolution}
          radius={radius}
          toneMapped={toneMapped}
          transparent={transparent}
          side={side}
          seed={seed}
          key={GlitchImageMaterialImpl.key}
        />
        {children}
      </mesh>
    )
  }
)

const GlitchImageWithUrl: ForwardRefComponent<GlitchImageProps, Mesh> = forwardRef(
  ({ url, ...props }: GlitchImageProps, ref: ForwardedRef<Mesh>) => {
    const texture = useTexture(url!)
    return <GlitchImageBase {...props} texture={texture} ref={ref} />
  }
)

const GlitchImageWithTexture: ForwardRefComponent<GlitchImageProps, Mesh> = forwardRef(
  ({ url: _url, ...props }: GlitchImageProps, ref: ForwardedRef<Mesh>) => {
    return <GlitchImageBase {...props} ref={ref} />
  }
)

export const GlitchImage: ForwardRefComponent<GlitchImageProps, Mesh> = forwardRef<
  Mesh,
  GlitchImageProps
>((props, ref) => {
  if (props.url) return <GlitchImageWithUrl {...props} ref={ref} />
  else if (props.texture) return <GlitchImageWithTexture {...props} ref={ref} />
  else throw new Error('<Image /> requires a url or texture')
})
