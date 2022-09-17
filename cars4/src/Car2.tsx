import {useControlContext} from "./GlobalContext";
import {useRef, useState} from "react";
import {CapsuleCollider, RigidBody, RigidBodyApi, useRapier} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useControls} from 'leva'

export const Car2 = () => {
    const {velocity, angularVelocity} = useControls(
        {
            velocity: {value: 10, min: 1, max: 20, step: 1},
            angularVelocity: {value: 3, min: 1, max: 10, step: 1},
        })

    const [colliding, setColliding] = useState(new Set());
    const {controls} = useControlContext()
    const ref = useRef<RigidBodyApi>(null);
    // const { world, rigidBodyStates, physicsOptions, rigidBodyEvents } =
    //     useRapier();
    const rapier = useRapier();
    //
    // console.log(world)
    // console.log(physicsOptions)
    // console.log(rigidBodyStates)

    // https://github.com/pmndrs/react-three-rapier/blob/main/demo/src/kinematics/Kinematics.tsx
    useFrame(({clock}) => {
        if (!ref.current || !controls.current) return

        // ref.current.setAngvel(new THREE.Vector3(0, 3, 0))
        // console.log(ref.current.rotation().y*Math.PI/2)
        // console.log(controls.controls.current.down)
        // if(controls.controls.current)
        let dAV = 0
        let dV = 0
        dV += controls.current.up ? velocity : 0
        dV += controls.current.down ? -velocity : 0
        dAV += controls.current.left ? angularVelocity : 0
        dAV += controls.current.right ? -angularVelocity : 0

        // TODO: Reuse vector v
        ref.current.setAngvel(new THREE.Vector3(0, dAV, 0))
        // TODO: refactor?
        if (colliding.size > 0) {
            ref.current.setLinvel(new THREE.Vector3(dV, ref.current.linvel().y, 0).applyQuaternion(ref.current.rotation()))
        }
        // forward velocity
        // ref.current.setLinvel(new THREE.Vector3(3, 0, 0).applyAxisAngle(yAxis, ref.current.rotation().y))
        // if(controls.current.up) {
        //     v += 3
        // }
        // if(controls.current.up) {
        //     v += 3
        // }
        // ref.current.setAngvel(new THREE.Vector3(0, 1, 0))
        // const v = new THREE.Vector3(3, 0, 0);
        // const yAxis = new THREE.Vector3(0, 1, 0)
        // console.log(ref.current.rotation().y)
        // ref.current.setLinvel(v.applyAxisAngle(yAxis, ref.current.rotation().y))
        // TODO: Do this somewwhere else
        ref.current.setEnabledRotations(false, true, false)
    })


    // console.log(rapier)
    // console.log(colliding)
    if (ref.current) console.log(ref.current.collider)
    // console.log(ref.current)

    return <RigidBody
        ref={ref}
        linearDamping={0.5}
        name="playar"
        position={[-3, 2, 0]} colliders={false}
        onCollisionEnter={(payload) => {
            // TODO: Ask community how to check for ground collision. This is ugly hack, and most likely error prone
            // https://stackoverflow.com/questions/58806883/how-to-use-set-with-reacts-usestate
            setColliding(prev => new Set(prev.add(payload.target.handle)))
        }}
        onCollisionExit={(payload) => {
            setColliding(prev => new Set([...prev].filter(x => x !== payload.target.handle)))
            console.log('Collision at exit position 2', payload)
        }}

    >
        <mesh castShadow receiveShadow name="player">
            <capsuleGeometry args={[0.5, 1, 4, 8]}/>
            <meshPhysicalMaterial color="orange"/>
        </mesh>
        <CapsuleCollider
            args={[0.5, 0.5]}
            onCollisionEnter={payload => {
                console.log(payload)
            }}
            onCollisionExit={payload => {
                console.log(payload)
            }}
        />
    </RigidBody>
}
