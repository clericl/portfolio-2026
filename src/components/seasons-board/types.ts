import type { ThreeElements } from "@react-three/fiber";
import type { Material } from "three";

export type BulbProps = {
  position: [number, number, number];
  material: Material;
  radius: number;
} & ThreeElements['mesh']

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
