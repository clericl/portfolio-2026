import { Color, type MeshPhysicalMaterial } from "three";
import { HEIGHT, SPHERE_RADIUS, WIDTH } from "./constants";
import type { BulbProps, Season } from "./types";

export const getBulbProps = (
  material: MeshPhysicalMaterial,
  getHandleClick: (season: Season) => () => void
): BulbProps[] => {
  const calculatedWidth = (WIDTH - SPHERE_RADIUS) / 2
  const calculatedHeight = (HEIGHT - SPHERE_RADIUS) / 2

  const spring = material.clone();
  const summer = material.clone();
  const autumn = material.clone();
  const winter = material.clone();
  spring.emissive = new Color(1.5, 1.5, 0);
  summer.emissive = new Color(0, 2, 0);
  autumn.emissive = new Color(2, 0.5, 0.5);
  winter.emissive = new Color(0, 0, 2);

  return [
    {
      position: [-calculatedWidth, -calculatedHeight, 0],
      material: winter,
      radius: SPHERE_RADIUS,
      onClick: getHandleClick('winter'),
    },
    {
      position: [calculatedWidth, -calculatedHeight, 0],
      material: autumn,
      radius: SPHERE_RADIUS,
      onClick: getHandleClick('autumn'),
    },
    {
      position: [calculatedWidth, calculatedHeight, 0],
      material: summer,
      radius: SPHERE_RADIUS,
      onClick: getHandleClick('summer'),
    },
    {
      position: [-calculatedWidth, calculatedHeight, 0],
      material: spring,
      radius: SPHERE_RADIUS,
      onClick: getHandleClick('spring'),
    },
  ]
}
