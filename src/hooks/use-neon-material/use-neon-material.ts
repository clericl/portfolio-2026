import { useMemo } from "react";
import { Color, type ColorRepresentation, MeshPhysicalMaterial, type MeshStandardMaterialParameters } from "three";

import materialProps from "./neon.json";

export function useNeonMaterial(
  color?: ColorRepresentation,
  emissive?: ColorRepresentation,
) {
  const neonMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial();
    newMaterial.setValues(materialProps as unknown as MeshStandardMaterialParameters);

    if (color) {
      newMaterial.color = new Color(color);
    }

    if (emissive) {
      newMaterial.emissive = new Color(emissive);
    }

    return newMaterial;
  }, [color, emissive]);

  return neonMaterial;
}
