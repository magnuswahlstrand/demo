/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Belt: THREE.SkinnedMesh
    Body: THREE.SkinnedMesh
    Helmet: THREE.SkinnedMesh
    Helmet001: THREE.SkinnedMesh
    Shoulder_pads: THREE.SkinnedMesh
    Sword: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    Caballero: THREE.MeshStandardMaterial
    Caballero: THREE.MeshStandardMaterial
    Espada: THREE.MeshStandardMaterial
  }
}

type ActionName = 'pose'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/the-cartoon-knight.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Knight_rig">
          <primitive object={nodes.root} />
          <group name="Cuerpo_low001" position={[0.1, 0.22, 0.05]} rotation={[Math.PI, 0, 0]} scale={0.03} />
          <group name="Cuerpo_low002" position={[-0.1, 0.22, 0.05]} rotation={[Math.PI, 0, 0]} scale={0.03} />
          <group name="Cuerpo_low003" position={[0.11, 0.22, -0.14]} rotation={[0, 0, Math.PI / 2]} scale={0.03} />
          <group name="Cuerpo_low004" position={[-0.11, 0.22, -0.14]} rotation={[0, 0, -Math.PI / 2]} scale={0.03} />
          <group name="Hombreras_low001" position={[-0.22, 0.58, -0.04]} rotation={[Math.PI / 2, 0, -1.33]} scale={0.12} />
          <group name="Hombreras_low002" position={[0.43, 0.52, -0.06]} rotation={[0, 0, -1.77]} scale={0.09} />
          <group name="Hombreras_low003" position={[0.22, 0.58, -0.04]} rotation={[Math.PI / 2, 0, 1.33]} scale={0.12} />
          <group name="Hombreras_low004" position={[-0.43, 0.52, -0.06]} rotation={[0, 0, 1.77]} scale={0.09} />
          <skinnedMesh name="Belt" geometry={nodes.Belt.geometry} material={materials.Caballero} skeleton={nodes.Belt.skeleton} />
          <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials.Caballero} skeleton={nodes.Body.skeleton} />
          <skinnedMesh name="Helmet" geometry={nodes.Helmet.geometry} material={materials.Caballero} skeleton={nodes.Helmet.skeleton} />
          <skinnedMesh name="Helmet001" geometry={nodes.Helmet001.geometry} material={materials.Caballero} skeleton={nodes.Helmet001.skeleton} />
          <skinnedMesh name="Shoulder_pads" geometry={nodes.Shoulder_pads.geometry} material={materials.Caballero} skeleton={nodes.Shoulder_pads.skeleton} />
          <skinnedMesh name="Sword" geometry={nodes.Sword.geometry} material={materials.Espada} skeleton={nodes.Sword.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/the-cartoon-knight.glb')