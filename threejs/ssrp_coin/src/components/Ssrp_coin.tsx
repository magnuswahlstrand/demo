/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Big: THREE.Mesh
    START_STAY_REPORT_PAY: THREE.Mesh
    Creeper: THREE.Mesh
  }
  materials: {
    ["Material.004"]: THREE.MeshPhysicalMaterial
    ["SVGMat.004"]: THREE.MeshStandardMaterial
  }
}

const neonPinkBasic = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const neonPinkEmissive = new THREE.MeshLambertMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: 1.5 });
// const neonPinkMaterial = new THREE.Mesh([neonPinkBasic, neonPinkEmissive]);

type CoinProps = JSX.IntrinsicElements["group"] & { color: string }

export function Model(props: CoinProps) {
  const { nodes, materials } = useGLTF("/ssrp_coin.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Big.geometry}
            material={nodes.Big.material}
            position={[0, 0.5, 0]}
            material-color={props.color} material-metalness={0.9} material-roughness={0.3}
      />
      <mesh castShadow receiveShadow geometry={nodes.START_STAY_REPORT_PAY.geometry}
            material={materials["Material.004"]} position={[0, 1.19, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Creeper.geometry} material={materials["SVGMat.004"]}
            position={[0.29, 0.91, -0.57]} scale={[500, 0.8, 500]} />
    </group>
  );
}

useGLTF.preload("/ssrp_coin.glb");
