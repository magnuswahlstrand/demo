import {Canvas, useFrame} from '@react-three/fiber';
import {Box, Line, ScrollControls, useScroll} from "@react-three/drei";
import React from "react";
import {damp3} from "maath/easing";

const nPoints = 200;
const loops = 3;
const Ax = 2;
const Az = 15;

function cameraPath() {
    const points = new Array(nPoints * 3)
    for (let i = 0; i < nPoints; i++) {
        const x = Ax * Math.sin(loops * Math.PI * i / nPoints)
        const z = Az * -i / nPoints
        points[3 * i + 0] = x
        points[3 * i + 1] = 0
        points[3 * i + 2] = z
    }
    return {
        points,
        getClosestPoint(t: number) {
            const i = Math.min(Math.floor(t * nPoints), nPoints - 1)
            return points.slice(3 * i, 3 * i + 3) as [number, number, number]
        }
    }
}

const path = cameraPath()

function Scene() {
    const ref = React.useRef(null);
    console.log(ref.current)


    const data = useScroll()


    useFrame(({camera, clock}, delta) => {
        // const t = clock.getElapsedTime()
        const t = data.range(0, 1)

        const [x, y, z] = path.getClosestPoint(t)
        // console.log(x,y,z)
        damp3(camera.position, [x, 1, z], 0.1, delta, 5)
        const [x2, y2, z2] = path.getClosestPoint(t+0.01)
        camera.lookAt(x2, y2, z2-10)
    })


    return (
        <>
            <group>
                <Box args={[1, 1, 1]} position={[2, 0, 0]} material-color={"red"}/>
                <Box args={[1, 1, 1]} position={[-1, 0, -3]} material-color={"red"}/>
                <Box args={[1, 1, 1]} position={[2, 0, -7]} material-color={"red"}/>
                <Box args={[1, 1, 1]} position={[-1, 0, -12]} material-color={"red"}/>
                <Box args={[1, 1, 1]} position={[0, 0, -20]} material-color={"red"}/>
                <Line
                    ref={ref}
                    points={path.points}
                    color={"white"}
                    linewidth={2}
                />
            </group>
        </>
    )
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
                <color attach="background" args={['black']}/>
                <directionalLight position={[0, 0, 10]} intensity={1}/>
                <ambientLight intensity={0.5}/>

                <axesHelper args={[5]}/>
                <Scene/>
                {/*<OrbitControls/>*/}

            </ScrollControls>
        </Canvas>
    );
}
