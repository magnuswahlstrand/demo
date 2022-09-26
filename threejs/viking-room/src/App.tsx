import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, ScrollControls} from "@react-three/drei";
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
            minAzimuthAngle={-Math.PI / 2 + 0.3}
            maxAzimuthAngle={Math.PI / 2 - 0.3}
            maxPolarAngle={Math.PI / 2 - 0.1}
            maxZoom={4}
            minZoom={10}
            minDistance={4}
            maxDistance={10}
            dampingFactor={1} // Damping factor
            enableDamping={true}
            makeDefault
        />
    </>;
}

export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio}>
            <ScrollControls
                pages={30} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={4} // Friction, higher is faster (default: 4)
            >
                <color attach="background" args={[color]}/>
                <directionalLight position={[0, 0, 10]} intensity={1}/>
                <ambientLight intensity={0.5}/>

                {/*<axesHelper args={[5]}/>*/}
                <Scene/>

            </ScrollControls>
        </Canvas>
    );
}
