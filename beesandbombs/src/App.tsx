import {Canvas} from '@react-three/fiber';
import {L, P3, P4, T2} from "./components/L";
import {OrbitControls} from "@react-three/drei";
import React from "react";
import colors from "nice-color-palettes";
import {CameraAnimation, initialCamera} from "./components/CameraAnimation";
import {useAnimationState} from "./hooks/useAnimationState";
import {useSpring} from '@react-spring/three';

const color = colors[21 * 4];

const top = 20;

const delayColor = (key: string) => (key === 'color' ? 700 : 0)

const STATES = [
    {
        L: {position: [0, 0, 0], color: color[0]},
        T2: {position: [0, top, 0], color: color[1]},
        P3: {position: [0, top, 0], color: color[3]},
        P4: {position: [0, top, 0], color: color[4]},
    },
    {
        L: {position: [0, 0, 0], color:color[1], delay: delayColor},
        T2: {position: [0, 0, 0], color: color[1]},
        P3: {position: [0, top, 0], color: color[3]},
        P4: {position: [0, top, 0], color: color[4]},
    },
    {
        L: {position: [0, 0, 0], color: color[3], delay: delayColor},
        T2: {position: [0, 0, 0], color: color[3], delay: delayColor},
        P3: {position: [0, 0, 0], color: color[3]},
        P4: {position: [0, top, 0], color: color[4]},
    },
    {
        L: {position: [0, 0, 0], color: color[4]},
        T2: {position: [0, 0, 0], color: color[4]},
        P3: {position: [0, 0, 0], color: color[4]},
        P4: {position: [0, 0, 0], color: color[4]},
    },
    // {
    //     I: {
    //         delay: (key) => (key === 'color' ? 500 : 0),
    //         position: [0, 0, 10 * SIDE],
    //         color: colors.purple,
    //     }
    // },
    // {
    //     I: {
    //         delay: (key) => (key === 'color' ? 500 : 100),
    //         position: [0, 0, 0],
    //         color: colors.purple,
    //     }
    // },
    // {
    //     I: {
    //         delay: (key) => (key === 'color' ? 500 : 0),
    //         position: [0, 0, SIDE],
    //         color: colors.purple,
    //     },
    // },
];

function Scene() {
    const state = useAnimationState()
    const springI = useSpring(STATES[state]['L']);
    const springT2 = useSpring(STATES[state]['T2']);
    const springP3 = useSpring(STATES[state]['P3']);
    const springP4 = useSpring(STATES[state]['P4']);
    console.log(state)

    return <group>
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
    </group>;
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
