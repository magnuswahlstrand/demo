/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import {useGLTF, useTexture} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    characterMedium: THREE.SkinnedMesh
    LeftFootCtrl: THREE.Bone
    RightFootCtrl: THREE.Bone
    HipsCtrl: THREE.Bone
  }
  materials: {
    skin: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/characterMedium.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <primitive object={nodes.LeftFootCtrl} />
        <primitive object={nodes.RightFootCtrl} />
        <primitive object={nodes.HipsCtrl} />
      </group>
      <skinnedMesh geometry={nodes.characterMedium.geometry} material={materials.skin} skeleton={nodes.characterMedium.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
    </group>
  )
}

useGLTF.preload('/models/characterMedium.gltf')
