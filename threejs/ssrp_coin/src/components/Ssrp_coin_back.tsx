/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Big003: THREE.Mesh
    START_STAY_REPORT_PAY003: THREE.Mesh
    Heart: THREE.Mesh
  }
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial
    ["SVGMat.007"]: THREE.MeshStandardMaterial
  }
}

type CoinProps = JSX.IntrinsicElements["group"] & { color: string }

export function Model(props: CoinProps) {
  const { nodes, materials } = useGLTF("/ssrp_coin_back.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Big003.geometry} material={nodes.Big003.material}
            position={[-0.08, 0.5, 0]} material-color={props.color} material-metalness={0.95} material-roughness={0.3} />
      <mesh castShadow receiveShadow geometry={nodes.START_STAY_REPORT_PAY003.geometry}
            material={materials["Material.003"]} position={[-0.08, 1.19, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Heart.geometry} material={materials["SVGMat.007"]}
            position={[-4.89, 0.9, 5.34]} scale={[290, 0.67, 290]} />
    </group>
  );
}

useGLTF.preload("/ssrp_coin_back.glb");