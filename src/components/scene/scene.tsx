'use client'

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "../background";
import { Staircase } from "../staircase";
import { Effects } from "./effects";

export function Scene() {
  return (
    <div className="w-full h-full bg-white touch-none">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [0, 1, 30] }}
      >
        <Background />
        <Suspense fallback={null}>
          <Staircase />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
