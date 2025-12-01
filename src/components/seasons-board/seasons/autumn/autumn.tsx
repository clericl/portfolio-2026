import { InstanceCloud } from '../../../instance-cloud/instance-cloud';
import { SpinningInstance } from '../../../instance-cloud';
import { useGLTF } from '@react-three/drei'
import { Group, type Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { SeasonProps } from '../types';

import leaf1 from '../../../../assets/models/leaf1.glb?url'
import leaf2 from '../../../../assets/models/leaf2.glb?url'

export function Autumn({ count, radius }: SeasonProps) {
  const { materials, nodes } = useGLTF(leaf1)
  const { materials: materials2, nodes: nodes2 } = useGLTF(leaf2)

  const groupRef = useRef<Group>(null)

  useFrame(() => {
    groupRef.current!.rotation.y += 0.005
  })

  return (
    <group ref={groupRef}>
      <InstanceCloud
        count={Math.floor(count / 2)}
        radius={radius}
        material={materials['Maple_leaf']}
        geometry={(nodes['Maple_leaf_Maple_leaf_0'] as Mesh).geometry}
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
        material={materials2['QS1330-W27-files1-1']}
        geometry={(nodes2['QS1330-W27-files1-1'] as Mesh).geometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            scale={0.07}
          />
        )}
      </InstanceCloud>
    </group>
  )
}

useGLTF.preload(leaf1)
useGLTF.preload(leaf2)
