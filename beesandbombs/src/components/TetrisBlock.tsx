import * as THREE from "three";
import {Extrude} from "@react-three/drei";
import React from "react";

const extrudeSettings = {steps: 2, depth: 1, bevelEnabled: false};
const SIDE = 1;

export interface TetrisProps {
    shape: THREE.Shape;
    color?: string;
    position?: [number, number, number];
}

export interface BlockProps extends Omit<TetrisProps, "shape"> {

}

function TetrisBlock({shape, color = 'red', position = [0, 0, 0]}: TetrisProps) {
    return (
        <>
            <Extrude args={[shape, extrudeSettings]} position={position}
                     rotation={[Math.PI / 2, 0, 0]}
            >
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
                <meshStandardMaterial color={color}/>
            </Extrude>
        </>
    );
}

export default TetrisBlock
