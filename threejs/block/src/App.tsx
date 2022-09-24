import {Canvas} from '@react-three/fiber';
import {Box, OrbitControls, RoundedBox, Stage, useGLTF, useTexture} from "@react-three/drei";
import React from "react";
import {useControls} from "leva";
import {LinearFilter, RGBFormat} from "three";

const params = {
    aoIntensity: 1.0,
    dBias: 0.0,
    dScale: 0.0,
}

function Block() {
    const [color, ao, normal, displacement, roughness] = useTexture(['./rock/Color.jpg', './rock/AmbientOcclusion.jpg', './rock/NormalDX.jpg', "./rock/Displacement.jpg", './rock/Roughness.jpg'])


    const {aoIntensity, dBias, dScale} = useControls({
        aoIntensity: {
            value: params.aoIntensity,
            min: 0.1,
            max: 3.0,
        }, dBias: {
            value: params.dBias,
            min: -3.0,
            max: 3.0,
            step: 0.05
        }, dScale: {
            value: params.dScale,
            min: 0.1,
            max: 3.0,
            step: 0.05
        },
    })

    console.log(params.aoIntensity)

    return <RoundedBox args={[1, 1, 1]} radius={0.03} smoothness={10}>
        <meshStandardMaterial
            map={color}
            aoMap={ao}
            aoMapIntensity={aoIntensity}
            normalMap={normal}
            metalness={0.0}
            bumpMap={displacement}
            roughnessMap={roughness}
        />
    </RoundedBox>
}

// https://sketchfab.com/3d-models/face-ffde29cb64584cf1a939ac2b58d0a931#download
function Face() {
    const [color, ao, normal, displacement, roughness] = useTexture(['./rock/Color.jpg', './rock/AmbientOcclusion.jpg', './rock/NormalDX.jpg', "./rock/Displacement.jpg", './rock/Roughness.jpg'])


    const {aoIntensity, dBias, dScale} = useControls({
        aoIntensity: {
            value: params.aoIntensity,
            min: 0.1,
            max: 3.0,
        }, dBias: {
            value: params.dBias,
            min: -3.0,
            max: 3.0,
            step: 0.05
        }, dScale: {
            value: params.dScale,
            min: 0.1,
            max: 3.0,
            step: 0.05
        },
    })

    console.log(params.aoIntensity)

    return <RoundedBox args={[1, 1, 1]} radius={0.03} smoothness={10}>
        <meshStandardMaterial
            map={color}
            aoMap={ao}
            aoMapIntensity={aoIntensity}
            normalMap={normal}
            metalness={0.0}
            bumpMap={displacement}
            roughnessMap={roughness}
        />
    </RoundedBox>
}

function Scene() {
    return (
        <>
            <OrbitControls/>
            <Stage intensity={0.2}>
                {/*<Block/>*/}
                <Face/>
            </Stage>
        </>)
}


export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio}>
            <color attach="background" args={['black']}/>
            <directionalLight position={[0, 0, 10]} intensity={1}/>
            <ambientLight intensity={0.5}/>
            <Scene/>
        </Canvas>
    );
}
