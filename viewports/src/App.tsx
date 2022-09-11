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

interface ShapeView {
    trackingRef: React.MutableRefObject<HTMLElement>
    wireframe: boolean
    children: ReactElement
}

function ShapeView({trackingRef, wireframe, children}: ShapeView) {
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

interface ContentDivProps {
    children: ReactElement | string
    classes?: string
}

function Content({children, classes}: ContentDivProps) {
    return (<div className={`h-72 w-72 z-50 p-5 text-xl ${classes}`}>
        {children}
    </div>)
}


function App() {
    const [wireframe, setWireframe] = useState(false);

    const toggleWireframe = () => setWireframe((prev) => !prev)

    const container = useRef<HTMLElement>(null)
    const view1 = useRef<HTMLDivElement>(null)
    const view2 = useRef<HTMLDivElement>(null)
    const view3 = useRef<HTMLDivElement>(null)

    return (
        <main ref={container} className={"container mx-auto h-full"}>
            <div className="flex flex-row justify-center text-white">

                {/* Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-stone-700  z-0 inline-grid">
                    <div className="w-full p-6 text-3xl sm:text-5xl sm:col-span-2 font-bold text-center">R3F + Drei demo</div>
                    <div className="h-72 w-72 bg-black" ref={view1}/>
                    <Content>
                        Welcome to this small demo of react-three-fiber and react-three-drei!

                        <button
                            className={"bg-stone-200 p-2 border border-white rounded-md text-black font-bold"}
                            onClick={toggleWireframe}>
                            {wireframe ? "Hide" : "Show"} wireframe
                        </button>
                    </Content>

                    <Content classes="hidden sm:block">2</Content>
                    <div className="h-72 w-72 bg-black" ref={view2}/>
                    <Content classes="block sm:hidden">2</Content>

                    <div className="h-72 w-72 bg-black" ref={view3}/>
                    <Content>3</Content>
                </div>

                {/* WebGL */}
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
