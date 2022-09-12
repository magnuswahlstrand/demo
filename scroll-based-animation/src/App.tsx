import {Cone, PointMaterial, Points, Scroll, ScrollControls, Torus, TorusKnot, useTexture} from "@react-three/drei";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {MathUtils, Mesh, Texture} from "three";
import {useRef, useState} from "react";

const shapeDistance = 4;

// const viewport = {
//     height: 10,
// }

// https://drei.pmnd.rs/?path=/story/performance-points--basic-points-buffer
// @ts-ignore
const makeBuffer = (...args) => Float32Array.from(...args)

const makeParticles = (n: number, pageHeight: number) => {
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = pageHeight * 0.4 - Math.random() * pageHeight * 3
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
}

function Scene() {
    const gradientTexture = useTexture('/textures/gradients/3.jpg', (texture) => {
        if (typeof texture !== 'object') return

        (texture as Texture).magFilter = THREE.NearestFilter;
    })


    const n = 200
    const [positionA] = useState(() => makeParticles(200, 10))

    const ref1 = useRef<Mesh>()
    const ref2 = useRef<Mesh>()
    const ref3 = useRef<Mesh>()

    const {viewport} = useThree()

    const pos: [number, number, number][] = [
        [2, 0, 0],
        [-2, -viewport.height, 0],
        [2, -viewport.height * 2, 0],
    ]

    useFrame(() => {
        if (ref1.current) {
            ref1.current.rotation.x += 0.01 * 0.5
            ref1.current.rotation.y += 0.012 * 0.5
        }
        if (ref2.current) {
            ref2.current.rotation.x += 0.01 * 0.5
            ref2.current.rotation.y += 0.012 * 0.5
        }
        if (ref3.current) {
            ref3.current.rotation.x += 0.01 * 0.5
            ref3.current.rotation.y += 0.012 * 0.5
        }

    })

    return <>
        <ScrollControls
            pages={3} // Each page takes 100% of the height of the canvas
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={8} // Friction, higher is faster (default: 4)
            horizontal={false} // Can also scroll horizontally (default: false)
            infinite={false} // Can also scroll infinitely (default: false)
        >
            {/* You can have components in here, they are not scrolled, but they can still
      react to scroll by using useScroll! */}
            <Scroll>
                <Torus ref={ref1} position={pos[0]} args={[1, 0.4, 16, 60]} scale={1.5}>
                    <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
                </Torus>
                <Cone ref={ref2} position={pos[1]} args={[1, 2, 32]} scale={1.5}>
                    <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
                </Cone>
                <TorusKnot ref={ref3} position={pos[2]} args={[0.8, 0.35, 100, 16]} scale={1.5}>
                    <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
                </TorusKnot>
                <Points positions={positionA}>
                    {/*<points>*/}
                    <PointMaterial transparent size={0.03} sizeAttenuation={true} depthWrite={false} color="white"/>
                    {/*</points>*/}
                    {/*
                {/*    <meshStandardMaterial color={"white"}/>*/}
                </Points>
            </Scroll>
            <Scroll html style={{width: '100%'}}>
                <div>
                    <section className="section">
                        <h1>My Portfolio</h1>
                    </section>
                    <section className="section">
                        <h2>My projects</h2>
                    </section>
                    <section className="section">
                        <h2>Contact me</h2>
                    </section>
                </div>
            </Scroll>
        </ScrollControls>
    </>;
}

function App() {


    return (
        <Canvas className={"canvas"}>
            <directionalLight position={[1, 1, 0]} intensity={1}/>
            <Scene/>
        </Canvas>

    )
}

export default App
