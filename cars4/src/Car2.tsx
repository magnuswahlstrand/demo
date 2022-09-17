import {useControlContext} from "./GlobalContext";
import {useRef, useState} from "react";
import {CapsuleCollider, CoefficientCombineRule, RigidBody, RigidBodyApi} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {folder, useControls} from 'leva'

export const Car2 = () => {
    const ref = useRef<RigidBodyApi>(null);

    const {
        vAcceleration: acc,
        vMax,
        aVelocity: angularVelocity,
        friction,
    } = useControls(
        {
            velocity: folder({
                vAcceleration: {value: 5, min: 1, max: 20, step: 0.5},
                vMax: {value: 10, min: 1, max: 15, step: 1},
                vDampening: {
                    value: 1.0, min: 0.5, max: 10, step: 0.5,
                    onChange: (value) => {
                        ref.current?.setLinearDamping(value)
                    }
                }
            }),
            angular: folder({
                aVelocity: {value: 2, min: 1, max: 5, step: 0.1},
                aDampening: {
                    value: 0, min: 0.0, max: 5, step: 0.1, onChange: (value) => {
                        ref.current?.setAngularDamping(value)
                    }
                },
            }),
            friction: {value: 0.5, min: 0.0, max: 10, step: 0.5}
        })
    const [colliding, setColliding] = useState(new Set());
    const {controls} = useControlContext()
    // const { world, rigidBodyStates, physicsOptions, rigidBodyEvents } =
    //     useRapier();
    //
    // console.log(world)
    // console.log(physicsOptions)
    // console.log(rigidBodyStates)

    // https://github.com/pmndrs/react-three-rapier/blob/main/demo/src/kinematics/Kinematics.tsx
    useFrame(({clock}) => {
        if (!ref.current || !controls.current) return

        let dAV = 0
        let dV = 0
        dV += controls.current.up ? acc : 0
        dV += controls.current.down ? -acc : 0
        dAV += controls.current.left ? angularVelocity : 0
        dAV += controls.current.right ? -angularVelocity : 0

        // TODO: Reuse vector v
        const dAVV = new THREE.Vector3(0, dAV, 0)

        ref.current.setAngvel(dAVV)
        // TODO: refactor?
        if (colliding.size > 0) {
            const v = ref.current.linvel()
            const vy = v.y
            v.y = 0

            // Add dV
            const dVV = new THREE.Vector3(dV, 0, 0).applyQuaternion(ref.current.rotation())
            v.add(dVV)
            v.clampLength(0, vMax)

            // Return vy
            v.y = vy
            ref.current.setLinvel(v)
        }
    })


    // console.log(rapier)
    // console.log(colliding)
    if (ref.current) console.log(ref.current.raw().collider(0).friction())
    // console.log(ref.current)

    return <RigidBody
        enabledRotations={[false, true, false]}
        userData={{id: "car2"}}
        ref={ref}
        // linearDamping={linearDampening}
        // angularDamping={angularDampening}
        position={[-3, 4, 0]} colliders={false}
        onCollisionEnter={(payload) => {
            setColliding(prev => new Set(prev.add(payload.target.handle)))
        }}
        onCollisionExit={(payload) => {
            setColliding(prev => new Set([...prev].filter(x => x !== payload.target.handle)))
        }}

    >
        <mesh castShadow receiveShadow name="player">
            <capsuleGeometry args={[0.5, 1, 4, 8]}/>
            <meshPhysicalMaterial color="orange"/>
        </mesh>
        <CapsuleCollider
            restitutionCombineRule={CoefficientCombineRule.Min}
            friction={friction}
            args={[0.5, 0.5]}
        />
    </RigidBody>
}
