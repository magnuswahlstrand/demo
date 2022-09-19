import {Canvas} from '@react-three/fiber';
import {L, P3, P4, T2} from "./components/L";
import {OrbitControls} from "@react-three/drei";
import React from "react";
import {BloomEffect} from "./components/BloomEffect";
import colors from "nice-color-palettes";

export default function Scene() {
    const color = colors[21*4];

    return (
        <Canvas dpr={window.devicePixelRatio} camera={{position: [10,10, 10]}}>
            <color attach="background" args={['#14144c']}/>
            {/*<ambientLight/>*/}
            <pointLight position={[10, 10, 10]}/>
            <pointLight position={[-10, 10, 5]}/>
            <OrbitControls/>
            {/*<gridHelper*/}
            {/*    args={[100, 100, "#a0ffa0", "#a0a0ff"]}*/}
            {/*    position={[0, 0, 0]}*/}
            {/*/>*/}
            {/*<axesHelper args={[4]}/>*/}
            <L position={[1,1,0]} color={color[0]}/>
            <T2 position={[0,1,-1]} color={color[2]}/>
            <P3 position={[0,1,-6]} color={color[3]}/>
            <P4 position={[0,1,0]} color={color[4]}/>
            {/*<BloomEffect/>*/}
        </Canvas>
    );
}
