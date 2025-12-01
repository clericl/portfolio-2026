import { InstanceCloud } from '../../../instance-cloud/instance-cloud';
import { SpinningInstance } from '../../../instance-cloud';
import { useGLTF } from '@react-three/drei'
import { Group, type Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { SeasonProps } from '../types';

import petal1 from '../../../../assets/models/petal1.glb?url'
import petal2 from '../../../../assets/models/petal2.glb?url'

export function Spring({ count, radius }: SeasonProps) {
  const { materials, nodes } = useGLTF(petal1)
  const { materials: materials2, nodes: nodes2 } = useGLTF(petal2)

  const groupRef = useRef<Group>(null)

  useFrame(() => {
    groupRef.current!.rotation.y += 0.005
  })

  return (
    <group ref={groupRef}>
      <InstanceCloud
        count={Math.floor(count / 2)}
        radius={radius}
        material={materials['Material.002']}
        geometry={(nodes['Object_86'] as Mesh).geometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            scale={0.1}
          />
        )}
      </InstanceCloud>
      <InstanceCloud
        count={Math.floor(count / 2)}
        radius={radius}
        material={materials2['petal01']}
        geometry={(nodes2['02011_petal01_0'] as Mesh).geometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            scale={0.2}
          />
        )}
      </InstanceCloud>
    </group>
  )
}

useGLTF.preload(petal1)
useGLTF.preload(petal2)
