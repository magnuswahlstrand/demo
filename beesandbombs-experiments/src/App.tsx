import {Canvas, useFrame} from '@react-three/fiber';
import {Box, Line, OrbitControls} from "@react-three/drei";
import {animated, config, useChain, useSpring, useSpringRef, useTrail} from '@react-spring/three';
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

const points2: [number, number, number][] = [
    [0, -0.5, 0.5],
    [0, 0.5, 0.5],
    [0, 0.5, -0.5],
    [0, -1.5, -0.5],
    [0, -1.5, -1.5],
    [0, -0.5, -1.5],
    [0, -0.5, 0.5],
].map(([x, y, z]) => [x, y+0.5, z+0.5])

const AnimatedLine = animated(Line);
const AnimatedBox = animated(Box);

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


const offset = 0.202

function Scene() {
    const n = 12
    const n2 = 6

    const groupRef = useSpringRef();
    const {rotY} = useSpring({
        ref: groupRef,
        "rotY": Math.PI,
        from: {"rotY": 0},
    })

    const items = [...Array(n)].map((v, i) => ({
        posX: offset * i - offset * n / 2,
    }))
    const items2 = [...Array(6)].map((v, i) => ({
        posX: offset * i - offset * n2 / 2,
    }))

    const trailRef = useSpringRef();
    const trail = useTrail(items.length, {
        ref: trailRef,
        to: {"rotation-x": -Math.PI / 2},
        from: {"rotation-x": 0},
        config: config.stiff,
        pause:  true,
    })
    const trail2Ref = useSpringRef();
    const trail2 = useTrail(items2.length, {
        ref: trail2Ref,
        to: {"rotation-x": -Math.PI/2},
        from: {"rotation-x": 0},
        config: config.slow,
        onRest: () => {
            console.log("rest")
            trail2Ref.start({"rotation-x": -Math.PI, delay: 1000})
        }
    })


    useChain([])

    return <>
        <animated.group
            rotation-y={rotY}
        >
            {/*{trail.map((props, i) => (*/}
            {/*    <AnimatedLine*/}
            {/*        key={i}*/}
            {/*        rotation={[0, 0, 0]}*/}
            {/*        {...props}*/}
            {/*        position={[items[i].posX, 0, 0]}*/}
            {/*        points={points}*/}
            {/*        lineWidth={1.5}*/}
            {/*    />*/}
            {/*))}*/}
        </animated.group>
        {trail2.map((props, i) => (
            <AnimatedLine
                key={i}
                rotation={[0, 0, 0]}
                {...props}
                position={[items2[i].posX, 0, 0]}
                points={points2}
                color={"blue"}
                lineWidth={2}
            />
        ))}
        {/*{items2.map((v, i) => (<AnimatedLine*/}
        {/*    position={[items[i].posX, 0, 0]}*/}
        {/*    points={points2}*/}
        {/*    color={"red"}*/}
        {/*    lineWidth={4}*/}
        {/*/>))}*/}
    </>
}

export default function App() {
    return (
        <Canvas dpr={window.devicePixelRatio} orthographic
                // Calculated by fair dice roll.
                camera={{zoom: 100, position: [10, 8.27, 8.27]}}>
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
