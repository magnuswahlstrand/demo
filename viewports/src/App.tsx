import React, {ReactElement, useRef, useState} from "react";

import {Canvas, ThreeEvent} from "@react-three/fiber";
import {Dodecahedron, OrbitControls, RoundedBox, Torus, View} from "@react-three/drei";

// https://codesandbox.io/s/v5i9wl?file=/src/App.js:1194-1211

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4}/>
            <pointLight position={[20, 30, 10]}/>
            <pointLight position={[-10, -10, -10]} color="hotpink"/>
        </>
    )
}

interface MyViewProps {
    trackingRef: React.MutableRefObject<HTMLElement>
    wireframe: boolean
    children: ReactElement
}

function ShapeView({trackingRef, wireframe, children}: MyViewProps) {
    const [hovered, setHover] = useState(false)

    const shape = React.cloneElement(
        children,
        {
            onPointerOver: (e: ThreeEvent<MouseEvent>) => setHover(true),
            onPointerOut: (e: ThreeEvent<MouseEvent>) => setHover(false),
        },
        <meshPhongMaterial
            color={hovered ? "hotpink" : "#f5efe6"}
            wireframe={wireframe}
        />
    )

    return (<View track={trackingRef}>
        <color attach="background" args={['black']}/>
        <Lights/>
        <mesh>
            {shape}
        </mesh>
    </View>)
}

function App() {
    const container = useRef<HTMLElement>(null)
    const view1 = useRef<HTMLDivElement>(null)
    const view2 = useRef<HTMLDivElement>(null)
    const view3 = useRef<HTMLDivElement>(null)
    const [wireframe, setWireframe] = useState(false);

    console.log(wireframe)

    return (
        <main ref={container} className={"container mx-auto h-full"}>
            <div className="flex flex-row justify-center text-white">

                <div className="grid grid-cols-1 place-items-end sm:grid-cols-2 bg-stone-700  z-0 inline-grid">
                    <div className="h-48 w-48 view1  z-0 place-self-start" ref={view1}/>
                    <div className="h-48 w-48 z-50 place-self-start">Some text here</div>
                    <div className="h-48 w-48 z-50">More text here
                        <button className={"bg-blue-900"} onClick={() => setWireframe((prev) => !prev)}>Show
                            wireframe</button>
                    </div>
                    <div className="h-48 w-48 view2 z-0" ref={view2}/>
                    <div className="h-48 w-48 view1 z-0" ref={view3}/>
                    <div className="h-48 w-48 z-50">Some text here</div>
                </div>
                <Canvas eventSource={container} className={"canvas z-40"}>
                    <OrbitControls/>
                    <ShapeView trackingRef={view1} wireframe={wireframe}>
                        <Dodecahedron args={[2, 0]}/>
                    </ShapeView>
                    <ShapeView trackingRef={view2} wireframe={wireframe}>
                        <RoundedBox args={[3, 3, 3]} radius={0.2}/>
                    </ShapeView>
                    <ShapeView trackingRef={view3} wireframe={wireframe}>
                        <Torus args={[1.8, 0.5, 16, 20]}/>
                    </ShapeView>
                </Canvas>

            </div>
        </main>
    )
}

export default App
