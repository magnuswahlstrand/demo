import {Canvas} from '@react-three/fiber';
import {L, P3, P4, T2} from "./components/L";
import {OrbitControls} from "@react-three/drei";
import React from "react";
import colors from "nice-color-palettes";
import {CameraAnimation, initialCamera} from "./components/CameraAnimation";
import {useAnimationState} from "./hooks/useAnimationState";
import {a, useSpring} from '@react-spring/three';

const color = colors[21 * 4];

const t = 20;

const delayColor = (key: string) => (key === 'color' ? 700 : 0)
const tensionScale = (key: string) => (key === 'scale' ? (170 / 4) : 170)

const p0 = [0, 0, 0];
const RED = color[0];
const YELLOW = color[1];
const GREEN = color[3];


const step1 = {scale: [1, 1, 1], immediate: true}
const step2 = {scale: [1, 1, 1.5], config: {tension: 170 / 4}}
const step3 = {position: p0, color: GREEN, scale: [1, 1, 2], config: {tension: 170 / 4}}
const step4 = {position: p0, color: RED, scale: [1, 1, 3], config: {tension: 170 / 4}}

const STATES = [
    {
        L1: {...step1, position: p0, color: RED,},
        T2: {...step1, position: [0, t, 0], color: YELLOW},
        P3: {...step1, position: [0, t, 0], color: GREEN},
        P4: {...step1, position: [0, t, 0], color: color[4]},

        camera: {scale: 1, immediate: true},
    },
    {
        L1: {position: p0, color: YELLOW, step2, delay: delayColor},
        T2: {position: p0, color: YELLOW, step2},
        P3: {scale: [1, 1, 1.5]},
        P4: {scale: [1, 1, 1.5]},

        camera: {scale: 1 / 3, config: {duration: 3000}},
    },
    {
        L1: {...step3, delay: delayColor},
        T2: {...step3, delay: delayColor},
        P3: {...step3},
        P4: {...step3, delay: 500},

        camera: {},
    },
    {
        L1: {...step4},
        T2: {...step4},
        P3: {...step4},
        P4: {...step4},

        camera: {},
    },
];


function Scene() {
    const state = useAnimationState()
    console.log(STATES[state]['L1'])
    // const {position} = useSpring({
    //     from: {position: [8, 8, 8]},
    //     to: {position: [0, 0, 0]},
    // });
    const camera = useSpring(STATES[state]['camera']);
    const springI = useSpring(STATES[state]['L1']);
    const springT2 = useSpring(STATES[state]['T2']);
    const springP3 = useSpring(STATES[state]['P3']);
    const springP4 = useSpring(STATES[state]['P4']);

    return <a.group {...camera}>
        <group position={[1, 1, 0]}>
            <L {...springI}/>
        </group>
        <group position={[0, 1, -1]}>
            <T2 {...springT2} />
        </group>
        <group position={[0, 1, -6]}>
            {/*color={color[3]}/>*/}
            <P3 {...springP3} />
        </group>
        <group position={[0, 1, 0]}>
            {/*color={color[3]}/>*/}
            <P4 {...springP4} />
        </group>
        {/*<T2 position={} color={color[2]}/>*/}

        {/*<P4 position={[0, 1, 0]} color={color[4]}/>*/}
    </a.group>;
}

export default function App() {
    return (
        <Canvas dpr={window.devicePixelRatio} camera={{position: initialCamera}}>
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
            <Scene/>
            {/*<BloomEffect/>*/}
            <CameraAnimation/>
        </Canvas>
    );
}
