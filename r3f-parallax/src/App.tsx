import {useRef} from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {MeshDistortMaterial, Shadow, Sphere} from "@react-three/drei";
import {Group, MathUtils, Mesh} from "three";


function Scene() {
    const group = useRef<Group>()
    const outerGroup = useRef<Group>()
    const shadow = useRef<Mesh>()
    useFrame(({clock, mouse}) => {
        if (!group.current || !outerGroup.current || !shadow.current) return
        const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
        group.current.position.y = t / 3
        shadow.current.scale.y = shadow.current.scale.z = 1 + t
        shadow.current.scale.x = (1 + t) * 1.25
        group.current.rotation.x = group.current.rotation.z += 0.001
        outerGroup.current.position.x = MathUtils.lerp(outerGroup.current.position.x, mouse.x * 2, 0.02)
        outerGroup.current.position.z = MathUtils.lerp(outerGroup.current.position.z, -mouse.y * 1, 0.01)
    })


    return <group ref={outerGroup}>
        <group ref={group}>
            <Sphere args={[1, 32, 32]}>
                <MeshDistortMaterial color="#ffffff" flatShading roughness={1} metalness={0.5} factor={5} speed={5}/>
            </Sphere>
        </group>

        <Shadow ref={shadow} opacity={0.3} rotation-x={-Math.PI / 2} position={[0, -1.51, 0]}/>
    </group>;
}

// Inspired by https://codesandbox.io/embed/7psew
function App() {
    return (
        <Canvas>
            <ambientLight intensity={0.1}/>
            <directionalLight position={[2, 2, 0]} intensity={1}/>
            <Scene/>
        </Canvas>
    )
}

export default App;
