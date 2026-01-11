import { InstanceCloud } from '../../../../../instance-cloud/instance-cloud';
import { SpinningInstance } from '../../../../../instance-cloud';
import { Color, CylinderGeometry, Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { SeasonProps } from "../types";
import { useNeonMaterial } from '../../../../../../hooks';

export function Summer({ count, radius }: SeasonProps) {
  const neonMaterial = useNeonMaterial()

  const [matRed, matWhite, matBlue] = useMemo(() => {
    neonMaterial.metalness = 0;
    neonMaterial.roughness = 1;

    const matRed = neonMaterial.clone();
    const matWhite = neonMaterial.clone();
    const matBlue = neonMaterial.clone();

    matRed.color = new Color("red");
    matRed.emissive = new Color(2, 0, 0);
    matWhite.color = new Color("white");
    matWhite.emissive = new Color(2, 2, 2);
    matBlue.color = new Color("#03adfc");
    matBlue.emissive = new Color(0, 0, 2);

    return [matRed, matWhite, matBlue];
  }, [neonMaterial]);

  const lightGeometry = useMemo(() => {
    return new CylinderGeometry(0.03, 0.03, 0.15);
  }, []);

  const groupRef = useRef<Group>(null)

  useFrame(() => {
    groupRef.current!.rotation.y += 0.005
  })

  return (
    <group ref={groupRef}>
      <InstanceCloud
        count={Math.floor(count / 3)}
        radius={radius}
        material={matRed}
        geometry={lightGeometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            castShadow
          />
        )}
      </InstanceCloud>
      <InstanceCloud
        count={Math.floor(count / 3)}
        radius={radius}
        material={matWhite}
        geometry={lightGeometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            castShadow
          />
        )}
      </InstanceCloud>
      <InstanceCloud
        count={Math.floor(count / 3)}
        radius={radius}
        material={matBlue}
        geometry={lightGeometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            castShadow
          />
        )}
      </InstanceCloud>
    </group>
  )
}
