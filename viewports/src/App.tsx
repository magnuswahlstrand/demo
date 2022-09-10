import React, {useRef, useState} from "react";

import {Canvas, ThreeEvent} from "@react-three/fiber";
import {Dodecahedron, OrbitControls, RoundedBox, View} from "@react-three/drei";

// https://codesandbox.io/s/v5i9wl?file=/src/App.js:1194-1211

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4}/>
            <pointLight position={[20, 30, 10]}/>
            <pointLight position={[-10, -10, -10]} color="blue"/>
        </>
    )
}

interface MyViewProps {
    trackingRef: React.MutableRefObject<HTMLElement>
}

function useHoveredMesh() {
    const [hovered, setHover] = useState(false)
    const shapeProps = {
        onPointerOver: (e: ThreeEvent<MouseEvent>) => setHover(true),
        onPointerOut: (e: ThreeEvent<MouseEvent>) => setHover(false),
    }
    const materialProps = {
        color: hovered ? "hotpink" : "#f5efe6",
        wireframe: false,
    }
    return {shapeProps, materialProps};
}

function MyView({trackingRef}: MyViewProps) {
    const {shapeProps, materialProps} = useHoveredMesh();

    return (<View track={trackingRef}>
        <Lights/>
        {/*<color attach="background" args={['black']}/>*/}
        <mesh>
            {/*{childStart}*/}
            <Dodecahedron args={[2, 0]} {...shapeProps}>
                <meshPhongMaterial {...materialProps}/>
            </Dodecahedron>
            {/*{childStop}*/}
        </mesh>
        <mesh/>
    </View>)
}

function App() {
    const container = useRef<HTMLElement>(null)
    const tracking = useRef<HTMLDivElement>(null)
    const tracking2 = useRef<HTMLDivElement>(null)

    return (
        <main ref={container} className={"container mx-auto"}>
            <Canvas eventSource={container.current} className={"canvas"}>


                <OrbitControls/>
                <MyView trackingRef={tracking}/>
                <View track={tracking2}>
                    <Lights/>
                    <color attach="background" args={['black']}/>
                    {/*<color attach="background" args={"black"} />*/}
                    <mesh>
                        <RoundedBox args={[2, 2, 2]} radius={0.2}
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                    onPointerEnter={() => console.log('yeah')}
                                    onPointerLeave={() => console.log('yeah')}
                                    onPointerOver={() => console.log('yeah')}
                                    onPointerOut={() => console.log('yeah')}
                        >
                            <meshPhongMaterial color="#ffffff"/>
                        </RoundedBox>
                    </mesh>
                    <mesh/>
                </View>
            </Canvas>
            <div className="grid grid-cols-2 bg-amber-600 w-96 mx-auto ">
                <div className="border-2 border-black h-48 w-48 view1" ref={tracking}
                     onClick={() => console.log('yea2')}/>
                <div className="border-2 border-black h-48 w-48">Some text here</div>
                <div className="border-2 border-black h-48 w-48">More text here</div>
                <div className="border-2 border-black h-48 w-48 view2" ref={tracking2}
                     onClick={() => console.log('yea3')}/>
            </div>
        </main>
    )
}

export default App
