import {Canvas, useLoader} from '@react-three/fiber';
import {PresentationControls, Stage, useTexture} from "@react-three/drei";
import React, {useRef} from "react";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

function Bread() {
    const obj = useLoader(OBJLoader, "/3DBread009_SQ.obj")

    const ref = useRef(null);
    const [ao, color, normal] = useTexture([
        './3DBread009_LQ-1K_AmbientOcclusion.jpg', './3DBread009_LQ-1K_Color.jpg', './3DBread009_LQ-1K_NormalDX.jpg'])

    console.log(ref)

    // Notes on setting the material of primitive objects
    // https://github.com/pmndrs/react-three-fiber/issues/112
    return <primitive object={obj} ref={ref}
                      children-0-material-aoMap={ao}
                      children-0-material-map={color}
                      children-0-material-normalMap={normal}
                      children-0-material-metalness={0.0}
                      rotation={[-Math.PI / 4, 0, 0]}

    >
    </primitive>
}

function Scene() {
    return (
        <>
            <color attach="background" args={['black']}/>
            <directionalLight position={[0, 0, 10]} intensity={1}/>
            <PresentationControls
                global
                config={{mass: 1, tension: 100}}
                snap={{mass: 1, tension: 2}}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Stage intensity={0.2}>
                    <Bread/>
                </Stage>
            </PresentationControls>
        </>)
}


export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio}>
            <Scene/>
        </Canvas>
    );
}
