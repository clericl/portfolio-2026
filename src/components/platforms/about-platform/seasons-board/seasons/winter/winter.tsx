import { InstanceCloud } from '../../../../../instance-cloud/instance-cloud';
import { SpinningInstance } from '../../../../../instance-cloud';
import { useGLTF } from '@react-three/drei'
import { Group, type Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { SeasonProps } from '../types';

import snowflake1 from './assets/snowflake1.glb?url'
import snowflake2 from './assets/snowflake2.glb?url'

export function Winter({ count, radius }: SeasonProps) {
  const { materials, nodes } = useGLTF(snowflake1)
  const { materials: materials2, nodes: nodes2 } = useGLTF(snowflake2)
  
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    groupRef.current!.rotation.y += 0.005
  })

  return (
    <group ref={groupRef}>
      <InstanceCloud
        count={Math.floor(count / 2)}
        radius={radius}
        material={materials['Default_OBJ']}
        geometry={(nodes['Object_2'] as Mesh).geometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            scale={0.15}
            castShadow
          />
        )}
      </InstanceCloud>
      <InstanceCloud
        count={Math.floor(count / 2)}
        radius={radius}
        material={materials2['Mat_Snowflake']}
        geometry={(nodes2['Snowflake_Mat_Snowflake_0'] as Mesh).geometry}
      >
        {({ position, rotation }) => (
          <SpinningInstance
            key={JSON.stringify(position)}
            position={position}
            rotation={rotation}
            scale={0.0005}
            castShadow
          />
        )}
      </InstanceCloud>
    </group>
  )
}

useGLTF.preload(snowflake1)
useGLTF.preload(snowflake2)
