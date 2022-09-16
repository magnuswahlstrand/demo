import {Box, OrbitControls, Plane, Sphere} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import {Debug, Physics, RigidBody, RigidBodyApi} from "@react-three/rapier";
import React, {Suspense, useRef} from "react";
import {getProject} from '@theatre/core'
import * as THREE from "three";
import {Mesh} from "three";

// studio.initialize()
// studio.extend(extension)

// const EditableBox = e(Box, "mesh")
// const EditableRigidBody = e(RigidBody, "rigidBody")

const Scene = () => {
    const ref = useRef<RigidBodyApi>(null);
    const ref2 = useRef<Mesh>(null);

    // https://github.com/pmndrs/react-three-rapier/blob/main/demo/src/kinematics/Kinematics.tsx
    useFrame(({clock}) => {
        if (!ref.current) return

        ref.current.setLinvel(new THREE.Vector3(-3, 0, 0))
    })

    console.log(ref)
    console.log(ref2)

    return (
        <Physics>
            <Debug/>
            <RigidBody ref={ref} position={[0, 1, 0]} colliders="ball" linearDamping={0.1}>
                <Sphere args={[0.5]}>
                    <meshStandardMaterial color="aqua"/>
                </Sphere>
            </RigidBody>

            <RigidBody position={[0, 0, 0]} type="kinematicPosition">
                <Plane args={[20, 20, 20]} rotation={[-Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="hotpink"/>
                </Plane>
            </RigidBody>

            {/*<RigidBody ref={ref2} theatreKey="Light2" colliders="trimesh" type="kinematicVelocity"*/}
            {/*           position={[5, 1.5, 0]}>*/}
            {/*    <Box args={[0.4, 3, 10]} rotation={[-Math.PI, 0, 0]}>*/}
            {/*        <meshStandardMaterial color="red"/>*/}
            {/*    </Box>*/}
            {/*</RigidBody>*/}

            {/*<RigidBody ref={ref} colliders="trimesh" type="kinematicVelocity" position={[5, 1.5, 0]}>*/}
            {/*    <EditableBox theatreKey="Light2" args={[0.4, 3, 10]} rotation={[-Math.PI, 0, 0]}>*/}
            {/*        <meshStandardMaterial color="red"/>*/}
            {/*    </EditableBox>*/}
            {/*</RigidBody>*/}
        </Physics>

    )
}

const App = () => {
    const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

    return (
        <Canvas camera={{position: [10, 10, 10]}}>
            <OrbitControls/>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            {/*<SheetProvider sheet={demoSheet}>*/}
            <axesHelper args={[5]}/>
            <pointLight position={[10, 10, 10]}/>
            <Suspense>
                <Scene/>
            </Suspense>
            {/*</SheetProvider>*/}
        </Canvas>
    );
};

export default App;
