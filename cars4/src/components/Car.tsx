import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Suspense, useEffect, useMemo, useRef} from "react";
import {isKeyCode, keyMapping} from "./Controls";
import {useControlContext} from "../GlobalContext";
import {RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";

const parameters = {
    torque: 150,
    force: 6,
}

function useOffsetLoader(x: number, y: number, z: number) {
    const gltf = useLoader(GLTFLoader, '/models/firetruck.glb')
    return useMemo(() => {
        const clone = gltf.scene.clone()

        // Move top child position
        clone.children[0].position.set(x, y, z)
        clone.children[0].rotation.set(0, 0, 0)
        // clone.visible = false
        return clone
    }, [gltf]);
}

type Props2 = {};

export function Car(props: Props2) {
    const {controls, controlPressed, controlReleased} = useControlContext()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isKeyCode(e.key)) return
            controlPressed(keyMapping[e.key])
        }
        window.addEventListener('keydown', handleKeyDown)
        const handleKeyUp = (e: KeyboardEvent) => {
            if (!isKeyCode(e.key)) return
            controlReleased(keyMapping[e.key])
        }
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])



    const {scene} = useGLTF('/models/firetruck.glb')
    // const clone = useOffsetLoader(0, 0, 0);


    const pos = useRef([0, 0, 0])


    console.log(scene)

    return (
        <Suspense fallback={null}>
            {/*<RigidBody>*/}
            <RigidBody colliders="trimesh" position={[0, 1, 0]}>
                <primitive object={scene}/>
                {/*<primitive object={nodes.firetruck} />*/}
            </RigidBody>
        </Suspense>
    );
}


// const [ref, api] = useBox(() => (
//     {
//         mass: 10,
//         position: [0, 0.9, 0],
//         args: [3.3, 1.7, 1.5],
//         linearDamping: 0.9,
//         angularDamping: 0.99
//     }
// ))


// useEffect(() => {
//     return api.position.subscribe(v => pos.current = v)
// }, [])
//
// useEffect(() =>
//         api.position.subscribe(
//             (position: Triplet) => {
//
//                 // camera.position.set(position[0] + 5, position[1] + 10, position[2] + 5)
//                 // camera.lookAt(position[0], position[1], position[2])
//             }
//         )
//     , [])


// https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon-examples/src/demos/RaycastVehicle/Vehicle.tsx
// useFrame(({camera}) => {
//     if (!ref.current) return
//
//     const d = 12
//     console.log(pos.current[0] + d, d, pos.current[2] - d)
//     // camera.position.set(pos.current[0] + d, d, pos.current[2] - d)
//     // camera.lookAt(pos.current[0], pos.current[1], pos.current[2])
//     console.log(pos.current)
//
//     // const a = ref.current.position.clone().add(new THREE.Vector3(6, 6, 6))
//     // console.log(ref.current)
//     // ref.current.position.copy(camera.position)
//
//
//     const local: Triplet = [0, 0, 0]
//
//     if (controls.current['up']) {
//         api.applyLocalImpulse([parameters.force, 0, 0], local)
//     }
//     if (controls.current['down']) {
//         api.applyLocalImpulse([-parameters.force, 0, 0], local)
//     }
//
//     const b = 0.5
//     if (controls.current['left']) {
//         api.applyTorque([0.0, parameters.torque, 0])
//     }
//     if (controls.current['right']) {
//         api.applyTorque([0.0, -parameters.torque, 0])
//     }
// })
