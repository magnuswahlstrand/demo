import {Box, Flex} from '@react-three/flex'
import {Canvas, useFrame} from "@react-three/fiber";
import {Group, Vector3} from "three";
import React, {useEffect, useRef} from "react";
import {Sphere, Text3D, TorusKnot} from "@react-three/drei";


const Layout = () => {
    const group = useRef<Group>()

    const torai = [1, 2, 3].map((item, index) => (<Box centerAnchor margin={0.5} key={index}>
        <TorusKnot>
            <meshStandardMaterial color="white"/>
        </TorusKnot>
    </Box>))

    const spheres = [1, 2, 3].map((item, index) => (<Box centerAnchor margin={0.5} key={index}>
        <Sphere>
            <meshStandardMaterial color="white"/>
        </Sphere>
    </Box>))

    const vec = new Vector3()
    useFrame(() => {
        console.log(state.top)
        group.current.position.lerp(vec.set(0, state.top, 0), 0.1)
    })


    return (

        <group ref={group}>
            <Flex flexDirection={"column"} justifyContent="center" alignItems="center">
                <Box flexDirection="row" flexWrap="no-wrap">
                    {spheres}
                </Box>
                <Box flexDirection="row" flexWrap="no-wrap">
                    {torai}
                    <Box>
                        <Text3D bevelEnabled bevelSize={0.05} font={"./fonts/helvetiker_regular.typeface.json"}>
                            Text 3D
                            <meshStandardMaterial/>
                        </Text3D>
                    </Box>
                </Box>

            </Flex>
        </group>
    )
}

const state = {
    top: 0,
    pages: 2
}

function App() {
    const scrollArea = useRef()
    const onScroll = (e) => {
        state.top = e.target.scrollTop
        console.log()
    }
    console.log(state.top)
    useEffect(() => void onScroll({target: scrollArea.current}), [])

    return (
        <>
            <Canvas onPointerMove={null}>
                <ambientLight intensity={0.2}/>
                <directionalLight position={[2, 2, 0]} intensity={1}/>
                {/*<OrbitControls/>*/}
                <group scale={1}>
                    <Layout/>
                </group>
            </Canvas>
            <div className={"debug"}>{state.top}</div>
            <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
                <div style={{height: `${state.pages * 100}vh`}} />
            </div>

        </>
    )
}

export default App
