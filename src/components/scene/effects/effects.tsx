import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Bloom } from './bloom'
import { BloomEffect } from "postprocessing";

export function Effects() {
  const bloomRef = useRef<BloomEffect>(null);

  useFrame(({ clock }) => {
    if (bloomRef.current) {
      bloomRef.current.intensity = (Math.sin(clock.elapsedTime * 2) + 1.5) / 4;
    }
  });

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} luminanceThreshold={1} mipmapBlur intensity={0.3} />
    </EffectComposer>
  );
}
