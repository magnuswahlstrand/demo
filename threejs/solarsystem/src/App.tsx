import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from "@react-three/drei";
import React, {useRef} from "react";
import {Model} from "./Scene";

const nPoints = 200;
const loops = 3;
const Ax = 2;
const Az = 15;

const color = 'rgb(250,246,200)'

function Scene() {
    const ref = useRef();
    useFrame(({controls}) => {
        ref.current?.update()
    })

    return <>
        <Model scale={50}/>
        <OrbitControls
            ref={ref}
            dampingFactor={0.1} // Damping factor
            enableDamping={true}
            makeDefault
        />
    </>;
}

export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio} camera={[300, 500, 300]}>
            <color attach="background" args={["#aaa"]}/>
            <directionalLight position={[0, 0, 100]} intensity={1}/>
            <ambientLight intensity={0.5}/>

            {/*<axesHelper args={[5]}/>*/}
            <Scene/>
        </Canvas>
    );
}
