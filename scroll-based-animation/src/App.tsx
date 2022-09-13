import {
    Cone,
    PointMaterial,
    Points,
    Scroll,
    ScrollControls,
    Torus,
    TorusKnot,
    useScroll,
    useTexture
} from "@react-three/drei";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {easings, useSpring} from "@react-spring/core";
import {a} from "@react-spring/three";
import * as THREE from "three";
import {Group, Mesh, Texture} from "three";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import colors from "nice-color-palettes"

const shapeDistance = 4;

// const viewport = {
//     height: 10,
// }

// https://drei.pmnd.rs/?path=/story/performance-points--basic-points-buffer
// @ts-ignore
const makeBuffer = (...args) => Float32Array.from(...args)

const makeParticles = (n: number, pageHeight: number) => {
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 12
        positions[i * 3 + 1] = pageHeight * 0.4 - Math.random() * pageHeight * 3
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return positions
}


interface ShapeProps {
    innerRef: MutableRefObject<Mesh | undefined>
    position: [number, number, number]
}

function useGradientTexture() {
    return useTexture('/textures/gradients/3.jpg', (texture) => {
        if (typeof texture !== 'object') return
        (texture as Texture).magFilter = THREE.NearestFilter;
    });
}

function TorusShape({position, innerRef}: ShapeProps) {
    const gradientTexture = useGradientTexture();


    return (<Torus ref={innerRef} position={position} args={[1, 0.4, 16, 60]} scale={1.5}>
        <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
    </Torus>);
}

function ConeShape({position, innerRef}: ShapeProps) {
    const gradientTexture = useGradientTexture();

    return <Cone ref={innerRef} position={position} args={[1, 2, 32]} scale={1.5}>
        <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
    </Cone>;
}

function TorusKnotShape({position, innerRef}: ShapeProps) {
    const gradientTexture = useGradientTexture();


    return (
        <TorusKnot ref={innerRef} position={position} args={[0.8, 0.35, 100, 16]} scale={1.5}>
            <meshToonMaterial color={"white"} gradientMap={gradientTexture}/>
        </TorusKnot>
    )
}

const target = new THREE.Vector3(0, 0, 0)

function Scene() {
    const [positionA] = useState(() => makeParticles(200, 10))

    const firstUpdate = useRef(true);

    const [page, setPage] = useState(0)
    const ref1 = useRef<Mesh>()
    const ref2 = useRef<Mesh>()
    const ref3 = useRef<Mesh>()
    const refs = [ref1, ref2, ref3]
    const groupRef = useRef<Group>(null)

    const {viewport} = useThree()

    const pos: [number, number, number][] = [
        [4, 0, 0],
        [-4, -viewport.height, 0],
        [4, -viewport.height * 2, 0],
    ]

    // TODO: use useSprings ?
    const springs = [useSpring(() => ({
        rotation: [0, 0, 0],
        config: {easing: easings.easeInOutQuad, duration: 500}
    }), []),useSpring(() => ({
        rotation: [0, 0, 0],
        config: {easing: easings.easeInOutQuad, duration: 500}
    }), []),useSpring(() => ({
        rotation: [0, 0, 0],
        config: {easing: easings.easeInOutQuad, duration: 500}
    }), [])]


    const data = useScroll()
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;

            return
        }

        console.log('page', page)
        if (!refs[page] || !refs[page].current) {
            console.log('skipping')
            return
        }

        const t = springs[page][0].rotation.get()
        springs[page][1].start({rotation: [t[0] + 1, t[1] + 1, 0]})
    }, [page]);


    useFrame(({mouse}) => {
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2


        if (groupRef.current) {
            target.set(x / 10, -y / 10, groupRef.current.position.z)
            groupRef.current.position.lerp(target, 0.01)
        }

        if (ref1.current) {
            ref1.current.rotation.x += 0.01 * 0.1
            ref1.current.rotation.y += 0.012 * 0.1
        }
        if (ref2.current) {
            ref2.current.rotation.x += 0.01 * 0.1
            ref2.current.rotation.y += 0.012 * 0.1
        }
        if (ref3.current) {
            ref3.current.rotation.x += 0.01 * 0.1
            ref3.current.rotation.y += 0.012 * 0.1
        }

        // TODO: Move to event listener onScroll?
        const newPage = Math.floor(3 * data.offset)
        if (newPage !== page) {
            setPage(newPage)
        }
    })

    return <>

        {/* You can have components in here, they are not scrolled, but they can still
      react to scroll by using useScroll! */}
        <Scroll>
            <group ref={groupRef}>
                <a.group {...springs[0][0]} position={pos[0]}>
                    <TorusShape innerRef={ref1} position={[0, 0, 0]}/>
                </a.group>
                <a.group {...springs[1][0]} position={pos[1]}>
                    <ConeShape innerRef={ref2} position={[0, 0, 0]}/>
                </a.group>
                <a.group {...springs[2][0]} position={pos[2]}>
                    <TorusKnotShape innerRef={ref3} position={[0, 0, 0]}/>
                </a.group>

                <Points positions={positionA}>
                    {/*<points>*/}
                    <PointMaterial transparent size={0.03} sizeAttenuation={true} depthWrite={false} color="white"/>
                    {/*</points>*/}
                    {/*
                {/*    <meshStandardMaterial color={"white"}/>*/}
                </Points>
            </group>
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
    </>
        ;
}

function App() {
    return (
        <Canvas className={"canvas"}>
            {/*<directionalLight position={[1, 1, 0]} intensity={1} color={colors[28][3]}/>*/}
            <directionalLight position={[1, 1, 0]} intensity={1} color={colors[3][2]}/>
            <ScrollControls
                pages={3} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={8} // Friction, higher is faster (default: 4)
            >
                <Scene/>
            </ScrollControls>
        </Canvas>

    )
}

export default App
