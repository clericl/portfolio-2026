import { Color, type ColorRepresentation, MeshPhysicalMaterial, type MeshStandardMaterialParameters } from "three";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";

import materialProps from "./iridescent.json";
import ormMap from './iridescence_orm.png'
import thicknessMap from './iridescence_thickness_map.jpg'

export function useIridescentMaterial(color: ColorRepresentation) {
  const [iridescenceOrm, iridescenceThickness] = useTexture([
    ormMap,
    thicknessMap,
  ])
  
  const mat = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    
    newMaterial.setValues(materialProps as unknown as MeshStandardMaterialParameters);
    newMaterial.iridescenceThicknessMap = iridescenceThickness;
    newMaterial.aoMap = iridescenceOrm;

    if (color) {
      newMaterial.color = new Color(color)
    }
    
    return newMaterial
  }, [color, iridescenceOrm, iridescenceThickness])

  return mat
}
