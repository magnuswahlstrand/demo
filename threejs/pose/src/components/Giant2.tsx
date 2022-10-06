/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Twin Dragon Studios (https://sketchfab.com/RHALL)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/golem-t-pose-55583851dfea4665a0c287c69a588be7
title: Golem T-Pose
*/

import * as THREE from "three";
import { Bone, SkeletonHelper, SkinnedMesh } from "three";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Sphere, TransformControls, useAnimations, useGLTF, useHelper } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { CCDIKSolver } from "three/examples/jsm/animation/CCDIKSolver";

type GLTFResult = GLTF & {
  nodes: {
    Object_6: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial
  }
}

type ActionName = "mixamo.com"
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements["group"] & {angle: number}) {
  const group = useRef<THREE.Group>();
  const modelRef = useRef<SkinnedMesh>(null!);
  const skeletonRef = useRef<SkinnedMesh>(null!);
  // @ts-ignore
  const { nodes, materials, animations } = useGLTF("/golem/scene.gltf") as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  console.log(actions);
  useEffect(() => {
    console.log(props.angle)

    // @ts-ignore
    modelRef.current?.skeleton.getBoneByName("mixamorigRightArm_017").rotation.set( props.angle + Math.PI - 0.23, _y, _z);
  }, [props.angle]);

  // mixamorigLeftShoulder_08
  // mixamorigLeftArm_09
  // mixamorigLeftForeArm_010
  // mixamorigLeftHand_011

  // mixamorigRightShoulder_016
  // mixamorigRightArm_017
  // mixamorigRightForeArm_018
  // mixamorigRightHand_019

  // const { x, y, z, _x, _y, _z } = useControls({
  //   "x": {value: 0.6150955557823181,step:0.1},
  //   "y": {value: 0.49068889021873474,step:0.1}, // 0.7
  //   "z": {value: -0.011247376911342144,step:0.1},
  //   "_x": {value: 1.5939140462847805,step:0.1},
  //   "_y": {value: -0.2114004971369395,step:0.1}, // 1.2
  //   "_z": {value: -1.5939140462847805,step:0.1},
  // });

  // const { x, y, z, _x, _y, _z } = useControls({
  //   "x": -1.0877464484693178e-9,
  //   "y": 1.0137163400650024,
  //   "z": 2.833450807315785e-9,
  //   "_x": {value: 1.1297591592242358,step:0.1}, //-0.3, 1.3, -1.6
  //   "_y": {value: -0.0362304818749353,step:0.1},
  //   "_z": {value: 0.0765847855141215,step:0.1},
  // });

  const { x, y, z, _x, _y, _z } = useControls({
    "x": 0,
    "y": 1.0137163400650024,
    "z": 0,
    "_x": {value: -0.2,step:0.1}, //1.2 -0.2, -1.8
    "_y": {value: -0.0625,step:0.1},
    "_z": {value: -0.013,step:0.1},
  });


  useFrame(({ mouse }) => {

    let bones = []
    bones.push(modelRef.current.skeleton.getBoneByName("mixamorigLeftShoulder_08"))
    bones.push(modelRef.current.skeleton.getBoneByName("mixamorigLeftArm_09"))
    bones.push(modelRef.current.skeleton.getBoneByName("mixamorigLeftForeArm_010"))
    bones.push(modelRef.current.skeleton.getBoneByName("mixamorigLeftHand_011"))

    // // modelRef.current.skeleton.getBoneByName("mixamorigLeftArm_09").rotation.set(_x, _y, _z);
    // // modelRef.current.skeleton.getBoneByName("mixamorigLeftArm_09")?.position.set(x, y, z);
    // modelRef.current.skeleton.getBoneByName("mixamorigRightArm_017").rotation.set(_x, _y, _z);
    // modelRef.current.skeleton.getBoneByName("mixamorigRightArm_017")?.position.set(x, y, z);
    // modelRef.current.skeleton.getBoneByName("mixamorigLeftArm_09").rotation.y = Math.PI/2
    const bone2 = modelRef.current.skeleton.getBoneByName("mixamorigLeftShoulder_08");
    const bone = modelRef.current.skeleton.getBoneByName("mixamorigLeftArm_09");
    const bone3 = modelRef.current.skeleton.getBoneByName("mixamorigRightArm_017");
  });

  useHelper(skeletonRef, SkeletonHelper)

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.26}>
          <group name="Golemfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} ref={skeletonRef}/>
                  <group name="Golem_Cube003" />
                  <skinnedMesh
                    visible={true}
                    ref={modelRef}
                    name="Object_6" geometry={nodes.Object_6.geometry} material={materials["Scene_-_Root"]}
                    skeleton={nodes.Object_6.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/golem/scene.gltf");

export default Model;