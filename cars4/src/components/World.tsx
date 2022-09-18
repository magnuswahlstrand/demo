import * as THREE from "three";
// import {Debug, Physics, Triplet, useBox, usePlane} from "@react-three/cannon";
import {Debug, Physics, RigidBody} from "@react-three/rapier";
import {useFBX, useTexture} from "@react-three/drei";
import {Triplet} from "@react-three/cannon";
import {Car2} from "../Car2";
import {Model as CharacterMedium2} from './CharacterMedium2'

export let initialPosition = new THREE.Vector3(12, 12, -12);
// export let initialPosition = new THREE.Vector3(0, 12, 0);
let gravity: Triplet = [0, -9.82 * 1, 0];

function Plane() {
    // TODO: Used any here to get rid of TS error.
    // https://stackoverflow.com/questions/72011613/three-react-fiber-orbitcontrols-ref-object-throws-error-in-typescript-at-build-p
    // const [ref] = usePlane<any>(() => ({rotation: [-Math.PI / 2, 0, 0]}))
    return (
        <RigidBody rotation={[-Math.PI / 2, 0, 0]}>
            <mesh>
                <planeGeometry args={[100, 100]}/>
                <meshStandardMaterial attach="material" color="hotpink"/>
            </mesh>
        </RigidBody>
    )
}

function Ramp({position, rotation}: { position: Triplet, rotation: number }) {
    // const [ref] = useBox<any>(() => ({
    //     mass: 0,
    //     type: "Static",
    //     position: position,
    //     args: [4, 4, 4],
    //     rotation: [0, 0, rotation],
    // }))

    return (
        <RigidBody position={position} rotation={[0, 0, rotation]} type={"fixed"}>
            <mesh>
                <boxGeometry args={[4, 4, 4]}/>
                <meshStandardMaterial attach="material" color="red"/>
            </mesh>
        </RigidBody>
    );
}


function Character() {
    let texture = useTexture('models/animated-characters-2/Skins/skaterMaleA.png')
    let fbx = useFBX('models/animated-characters-2/Model/characterMedium.fbx');

    // let animIdle = useFBX('models/animated-characters-2/Animations/idle.fbx')
    console.log(fbx);
    // console.log(animIdle);
    return <primitive object={fbx} scale={0.01}/>
}


export function World() {
    return <Physics gravity={gravity}>
        <Plane/>
        <Debug color="black" sleepColor="blue"/>
        <Car2/>
        {/*<RigidBody position={[0, 10, 0]} colliders="ball">*/}
        {/*    <Sphere />*/}
        {/*</RigidBody>*/}
        {/*<Car/>*/}
        {/*<Scene/>*/}
        {/*<Character/>*/}
        {/*<CharacterMedium/>*/}
        <CharacterMedium2 rotation={[0, Math.PI, 0]}/>
        <Ramp position={[5, -1, 0]} rotation={-Math.PI / 3}/>
        <Ramp position={[12, -1, 0]} rotation={Math.PI / 3}/>
        {/*</Debug>*/}
    </Physics>;
}
