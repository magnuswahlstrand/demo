/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


// @ts-ignore
export default function Model(props) {
  const group = useRef();
  const {
    nodes,
    materials
  } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      {/*@ts-ignore*/}
      <mesh geometry={nodes["tree-spruce"].geometry} material={materials.color_main} castShadow receiveShadow />
    </group>
  );
}

useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf");