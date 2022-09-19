import * as THREE from "three";
import {Extrude, OrbitControls} from "@react-three/drei";
import React from "react";

const extrudeSettings = {steps: 2, depth: 1, bevelEnabled: false};
const SIDE = 1;

function TetrisBlock(shape: THREE.Shape) {
    return (
        <>
            <OrbitControls/>
            <gridHelper
                args={[100, 20, "#a0ffa0", "#a0a0ff"]}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
            />
            <axesHelper args={[4]} />
            <Extrude args={[shape, extrudeSettings]} {...props} position={[0, 0    , 0]}>
                {/*<meshPhysicalMaterial*/}
                {/*    color="#3E64FF"*/}
                {/*    thickness={SIDE}*/}
                {/*    roughness={0.4}*/}
                {/*    clearcoat={1}*/}
                {/*    clearcoatRoughness={1}*/}
                {/*    transmission={0.8}*/}
                {/*    ior={1.25}*/}
                {/*    attenuationDistance={0}*/}
                {/*/>*/}
                <meshStandardMaterial/>
            </Extrude>
        </>
    );
}

export default TetrisBlock
