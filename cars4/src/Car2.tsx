import {useControlContext} from "./GlobalContext";
import {useRef, useState} from "react";
import {CapsuleCollider, CoefficientCombineRule, ColliderApi, RigidBody, RigidBodyApi} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {folder, useControls} from 'leva'
import {Model as CharacterMedium2} from "./components/CharacterMedium2";

const defaultVals = {
    vAcc: 2,
    vMax: 10,
    vDampening: 1.0,
    friction: 1.0,
}

export const Car2 = () => {
    const ref = useRef<RigidBodyApi>(null);
    const ref2 = useRef<ColliderApi>(null);

    const {
        vAcceleration: acc,
        vMax,
        aVelocity: angularVelocity,
    } = useControls(
        {
            velocity: folder({
                vAcceleration: {value: defaultVals.vAcc, min: 1, max: 20, step: 0.5},
                vMax: {value: defaultVals.vMax, min: 1, max: 15, step: 1},
                vDampening: {
                    value: defaultVals.vDampening, min: 0.5, max: 10, step: 0.5,
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
            friction: {
                value: defaultVals.friction, min: 0.0, max: 10, step: 0.5, onChange: (value) => {
                    ref.current?.raw().collider(0).setFriction(value);
                }
            }
        })
    const [colliding, setColliding] = useState(new Set());
    const {controls} = useControlContext()

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
        console.log(ref.current.linvel().length())
    })

    const isGrounded = colliding.size > 0
    return <RigidBody
        enabledRotations={[false, true, false]}
        position={[-3, 4, 0]} colliders={false}
        ref={ref}
        onCollisionEnter={(payload) => {
            setColliding(prev => new Set(prev.add(payload.target.handle)))
        }}
        onCollisionExit={(payload) => {
            setColliding(prev => new Set([...prev].filter(x => x !== payload.target.handle)))
        }}

    >
        <CharacterMedium2 rotation={[0, Math.PI / 2, 0]}
                          action={!isGrounded && (ref.current?.linvel().length() ?? 0 < 0.3) ? "running" : "idle"}
        />
        {/*<mesh castShadow={true} receiveShadow={true} name="player">*/}
        {/*    <capsuleGeometry args={[0.5, 1, 4, 8]}/>*/}
        {/*    <meshPhysicalMaterial color="orange"/>*/}
        {/*</mesh>*/}
        <CapsuleCollider
            restitutionCombineRule={CoefficientCombineRule.Min}
            args={[0.5, 0.5]}
        />
    </RigidBody>
}
