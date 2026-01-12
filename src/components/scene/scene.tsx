'use client'

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "../background";
import { Staircase } from "../staircase";
import { Effects } from "./effects";
import { Loader } from "../loader";

export function Scene() {
  return (
    <div className="w-full h-full bg-white touch-none relative">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [0, 1, 30] }}
      >
        <Background />
        <Suspense fallback={<Loader />}>
          <Staircase />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
