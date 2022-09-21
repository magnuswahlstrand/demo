import {Canvas} from '@react-three/fiber';
import {Line, OrbitControls} from "@react-three/drei";
import {animated, config, useSpring, useSpringRef} from '@react-spring/three';
import React from "react";
import {Vector3} from "three";

export const initialCamera = new Vector3(4, 0, 0)

const points: [number, number, number][] = [
    [0, -0.5, -0.5],
    [0, -0.5, 0.5],
    [0, 0.5, 0.5],
    [0, 0.5, -0.5],
    [0, -0.5, -0.5],
]

const AnimatedLine = animated(Line);

function SquareLine({posX, delay}: { posX: number, delay: number }) {
    const s = useSpring({
        to: {"rotation-x": -Math.PI / 2},
        from: {"rotation-x": 0},
        loop: {reverse: false, delay: 1000, reset: true},
        delay: delay,
        config: config.slow,
    })

    return <AnimatedLine
        rotation={[0, 0, 0]}
        {...s}
        position={[posX, 0, 0]}
        points={points}
        color={"black"}
        lineWidth={1.5}

    />;
}

function Scene() {
    const n = 12
    // const n = 1
    const offset = 0.202
    return <>
        {[...Array(n)].map((i, v) =>
            <SquareLine key={v}
                        posX={offset * v - offset * n / 2}
                        delay={15 * v}
            />)
        }
    </>
}

export default function App() {
    return (
        <Canvas dpr={window.devicePixelRatio} orthographic
                camera={{zoom: 200, position: [10, 10 / Math.sqrt(2), 10 / Math.sqrt(2)]}}>
            <color attach="background" args={['white']}/>
            <pointLight position={[10, 10, 10]}/>
            <pointLight position={[-10, 10, 5]}/>
            <OrbitControls/>
            {/*<gridHelper*/}
            {/*    args={[100, 100, "#a0ffa0", "#a0a0ff"]}*/}
            {/*    position={[0, 0, 0]}*/}
            {/*/>*/}
            {/*<axesHelper args={[4]}/>*/}
            <Scene/>
        </Canvas>
    );
}
