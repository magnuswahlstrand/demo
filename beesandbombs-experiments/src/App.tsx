import {Canvas} from '@react-three/fiber';
import {Line, OrbitControls} from "@react-three/drei";
import {animated, useSpring, useTrail} from '@react-spring/three';
import React, {useState} from "react";

const squarePoints: [number, number, number][] = [
    [0, -0.5, -0.5],
    [0, -0.5, 0.5],
    [0, 0.5, 0.5],
    [0, 0.5, -0.5],
    [0, -0.5, -0.5],
]

const twistedSquarePoints: [number, number, number][] = [
    [0, -0.5, 0.5],
    [0, 0.5, 0.5],
    [0, 0.5, -0.5],
    [0, -1.5, -0.5],
    [0, -1.5, -1.5],
    [0, -0.5, -1.5],
    [0, -0.5, 0.5],
].map(([x, y, z]) => [x, y + 0.5, z + 0.5])

const AnimatedLine = animated(Line);

const offset = 0.202
const n = 12
const n2 = n / 2

const baseSquares = [...Array(n)].map((v, i) => ({
    posX: offset * (i - (n - 1) / 2)
}))

const twistedSquares = [...Array(n2)].map((v, i) => ({
    posX: offset * (i - (n2 - 1) / 2),
}))

interface StepProps {
    onComplete: () => void
}

// Rotate each individual square 90 degrees
function RotatingSquares({onComplete}: StepProps) {
    const offsets = baseSquares
    const trail = useTrail(offsets.length, {
        to: {"rotation-x": -Math.PI / 2},
        from: {"rotation-x": 0},
        config: {precision: 0.001, duration: 400},
        // config: {...config.stiff, precision: 0.01},
        onRest: (_, w) => {
            if (w.springs["rotation-x"]._priority === offsets.length - 1) onComplete()
        },
    })

    return <>
        {trail.map((props, i) => (
            // @ts-ignore - type instantiation is excessively deep
            <AnimatedLine
                key={i}
                rotation={[0, 0, 0]}
                {...props}
                position={[offsets[i].posX, 0, 0]}
                points={squarePoints}
                lineWidth={1.5}
            />
        ))}
    </>
}

// Rotate all squares 180 degrees as a group
function RotatingGroup({onComplete}: StepProps) {
    const offsets = baseSquares
    const {rotY} = useSpring({
        "rotY": -Math.PI,
        from: {"rotY": 0},
        config: {mass: 1, tension: 50, precision: 0.001},
        onRest: () => onComplete(),
    })
    return (<animated.group
        rotation-y={rotY}
    >
        {offsets.map((props, i) => (
            <AnimatedLine
                key={i}
                rotation={[0, 0, 0]}
                position={[offsets[i].posX, 0, 0]}
                points={squarePoints}
                lineWidth={1.5}
            />
        ))}
    </animated.group>)
}


// Rotate each combined square 90 degrees
function RotatingTwistedSquares({onComplete, rotFromX}: StepProps & { rotFromX: number }) {
    const offsets = twistedSquares
    const trail = useTrail(offsets.length, {
        to: {"rotation-x": -rotFromX - Math.PI / 2},
        from: {"rotation-x": -rotFromX},
        config: {mass: 1, tension: 100, precision: 0.001, duration: 600},
        onRest: (_, w) => {
            if (w.springs["rotation-x"]._priority === offsets.length - 1) onComplete()
        },
    })

    return <>
        {trail.map((props, i) => (
            <AnimatedLine
                key={i}
                rotation={[0, 0, 0]}
                {...props}
                position={[offsets[i].posX, 0, 0]}
                points={twistedSquarePoints}
                color={"black"}
                lineWidth={1.5}
            />
        ))}
    </>
}

function Scene() {
    const [step, setStep] = useState(0);

    const nSteps = 3

    const stepForward = () => {
        setStep((step) => (step + 1) % nSteps)
    }

    switch (step) {
        case 0:
            return <RotatingSquares onComplete={stepForward}/>
        case 1:
            return <RotatingTwistedSquares onComplete={stepForward} rotFromX={0}/>
        case 2:
            return <RotatingTwistedSquares onComplete={stepForward} rotFromX={Math.PI / 2}/>
        default:
            throw new Error("Unknown step")

    }
}

export default function App() {
    return (
        <Canvas dpr={window.devicePixelRatio} orthographic
            // Position found using orbitControls :-)
                camera={{zoom: 100, position: [10, 8.27, 8.27]}}>
            <color attach="background" args={['white']}/>
            <pointLight position={[10, 10, 10]}/>
            <pointLight position={[-10, 10, 5]}/>
            <OrbitControls/>
            <Scene/>
        </Canvas>
    );
}
