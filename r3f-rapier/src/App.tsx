import React, {Suspense, useRef} from "react";
import {Sphere, Tube} from "@react-three/drei";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import {CatmullRomCurve3, LineCurve3, Mesh, Vector3, CubicBezierCurve3} from "three";
import {Physics, RigidBody} from "@react-three/rapier";
import * as _ from "lodash";

extend({OrbitControls})

// https://github.com/schteppe/cannon.js/blob/master/demos/heightfield.html
// https://cannon.pmnd.rs/#/demo/Heightfield
// https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon-examples/src/demos/demo-Heightfield.tsx

function Controls() {
    const controls = useRef<any>()
    const {camera, gl} = useThree()
    useFrame(() => controls.current.update())
    // @ts-ignore
    return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} zoom={0.1}
                          rotateSpeed={0.5}/>
}


function TubeScene() {
    const radius = 0.5
    const scale = 4

    // Inspired by curve example from https://threejs.org/docs/#api/en/geometries/TubeGeometry
    const path = React.useMemo(() => {

        const f = (x: number) => x ** 2
        let x = _.range(-1, 0.5, 0.1);
        const curve3D = x.map((x) => new Vector3(x, f(x), 0).multiplyScalar(scale))
        return new CatmullRomCurve3(curve3D);
    }, [])

    return (
        <Tube args={[path, 100, radius]} position={[4, -6, 0]}>
            <meshPhongMaterial color="#ffffff"
                               opacity={0.5}
                               transparent={true}
                               refractRatio={0.5}
                               wireframe={false}
            />
        </Tube>
    )
}

function TubeStraightScene() {
    const radius = 0.5
    const scale = 4

    // Inspired by curve example from https://threejs.org/docs/#api/en/geometries/TubeGeometry
    const path = React.useMemo(() => {
        const v1 = new Vector3(1, 0, 0).multiplyScalar(scale)
        const v2 = new Vector3(0, 0.5, 0).multiplyScalar(scale)
        return new LineCurve3(v1, v2);
    }, [])

    return (
        // <Tube args={[path, 100, radius]} position={[4, -6, 0]}>
        <Tube args={[path, 100, radius, 40]} position={[0,-5,0]}>
            <meshPhongMaterial color="#ffffff"
                               opacity={0.5}
                               transparent={true}
                               refractRatio={0.5}
                               wireframe={false}
            />
        </Tube>
    )
}
function TubeBezierScene() {
    const radius = 0.5
    const scale = 4

    // Inspired by curve example from https://threejs.org/docs/#api/en/geometries/TubeGeometry
    const path = React.useMemo(() => {
        const curve = new CubicBezierCurve3(
            new Vector3( 10, 0, 0 ),
            new Vector3( 10, 5, 0 ),
            new Vector3( 0.0, 5, 0 ),
            new Vector3( 0, 10, 0 )
        );



        return curve
    }, [])

    return (
        // <Tube args={[path, 100, radius]} position={[4, -6, 0]}>
        <Tube args={[path, 100, radius, 40]} position={[0,-15,0]}>
            <meshPhongMaterial color="#ffffff"
                               opacity={0.5}
                               transparent={true}
                               refractRatio={0.5}
                               wireframe={false}
            />
        </Tube>
    )
}

export function useTurntable() {
    const ref = React.useRef<Mesh>(null)
    useFrame(() => {
        if (ref.current) {
            // ref.current.rotation.y += 0.001
        }
    })

    return ref
}

function Scene() {
    const ref = useTurntable()

    return <Suspense>
        <Physics gravity={[0, -9.8, 0]}>
            <group ref={ref} position={[0, 5, 0]}>

                <RigidBody colliders={"trimesh"} type={"fixed"}>
                    <TubeBezierScene/>
                </RigidBody>

                <RigidBody colliders={"hull"} linearDamping={0.9}>
                    <Sphere args={[0.3]}>
                        <meshStandardMaterial color="white"/>
                    </Sphere>
                </RigidBody>
            </group>
        </Physics>
    </Suspense>;
}

const App = () => {
    return (
        <Canvas>
            <Controls/>
            <ambientLight intensity={0.2}/>
            <directionalLight position={[0, 5, 0]} intensity={4} color={"green"}/>
            <axesHelper args={[5]}/>

            <Scene/>
        </Canvas>
    );
};

export default App;
