import {Canvas, useFrame} from '@react-three/fiber';
import {Line, OrbitControls} from "@react-three/drei";
import React from "react";
import {Color} from "three";
import {LineGeometry} from "three/examples/jsm/lines/LineGeometry";


// Line
const nPoints = 200;
const line = new Float32Array(nPoints * 3)
const points = new Array(nPoints * 3).fill(0)

// Colors
const startColor = new Color("rgb(250,187,0)")
const endColor = new Color("rgb(255,0,17)")
const colors = new Array(nPoints).fill(0).map(
    (v, i) => new Color(startColor).lerp(endColor, 1 - i / nPoints)
)

const Ay = 1.5
const Az = 3
const Fy = 2.5
const Fz = 1 / 4
const LineWidth = 50

function Scene() {
    const ref = React.useRef<any>(null);

    useFrame(({clock}) => {
        if (!ref.current) return
        const t = clock.getElapsedTime()


        for (let i = 0; i < nPoints; i++) {
            const o = -i / nPoints
            line[3 * i] = -o
            line[3 * i + 1] = Ay * Math.sin(Math.PI * o) * Math.sin(Math.PI * Fy * t - 8 * Math.PI * o)
            line[3 * i + 2] = Az * Math.sin(Math.PI * (Fz * t - o - Math.PI / 2))
        }

        (ref.current.geometry as LineGeometry).setPositions(line)
    })


    return (
        <Line
            ref={ref}
            points={points}
            vertexColors={colors}
            color={"white"}
            linewidth={LineWidth}
        />
    );
}

export default function App() {
    const debug = false
    return (
        <Canvas dpr={window.devicePixelRatio} camera={{position: [10, 0, 0], zoom: 50}} orthographic>
            <color attach="background" args={['black']}/>
            <OrbitControls/>
            <Scene/>
            {debug && (
                <>
                    <gridHelper args={[100, 100, "#a0ffa0", "#a0a0ff"]} position={[0, 0, 0]}/>
                    <axesHelper args={[4]}/>
                </>
            )}
        </Canvas>
    );
}
