import React, {ReactElement, useRef, useState} from "react";

import {Canvas, ThreeEvent, useFrame} from "@react-three/fiber";
import {Dodecahedron, RoundedBox, Torus, View} from "@react-three/drei";

// @ts-ignore
import colors from "nice-color-palettes/200"

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
    trackingRef: React.RefObject<HTMLElement>
    wireframe: boolean
    children: ReactElement
    highlightColor: string
}

function ShapeView({trackingRef, wireframe, children, highlightColor}: ShapeView): JSX.Element {
    const groupRef = useRef<any>();
    const [hovered, setHover] = useState(false)

    const shape = React.cloneElement(
        children,
        {
            onPointerOver: (e: ThreeEvent<MouseEvent>) => setHover(true),
            onPointerOut: (e: ThreeEvent<MouseEvent>) => setHover(false),
        },
        <meshPhongMaterial
            color={hovered ? highlightColor : "#f5efe6"}
            wireframe={wireframe}
        />
    )

    useFrame(() => {
        if (!groupRef.current) return

        groupRef.current.rotation.x += 0.001
        groupRef.current.rotation.y += 0.001
        groupRef.current.rotation.z += 0.001
    })

    // @ts-ignore
    return (<View track={trackingRef as React.MutableRefObject<HTMLElement>}>
        {/*<OrbitControls enableZoom={false}/>*/}
        <group ref={groupRef}>
            <color attach="background" args={['black']}/>
            <Lights/>
            <mesh onClick={() => console.log('clicked')}>
                {shape}
            </mesh>
        </group>
    </View>)
}

interface ContentDivProps {
    children: React.ReactNode
    classes?: string
}

function Content({children, classes = ""}: ContentDivProps) {
    return (<div className={`h-72 w-72 z-50 p-5 text-lg ${classes}`}>
        {children}
    </div>)
}


function App() {
    const [wireframe, setWireframe] = useState(false);

    const toggleWireframe = () => setWireframe((prev) => !prev)

    const container = useRef<HTMLElement>(null)
    const view1 = useRef<HTMLElement>(null)
    const view2 = useRef<HTMLElement>(null)
    const view3 = useRef<HTMLElement>(null)

    const sharedContent = <> All three shapes are drawn onto the same canvas, but are tied to separate div elements.
        Very performant!<br/><br/>You can hover the shapes to change their <span
            style={{color: colors[9 * 16][4]}}>color</span>.
    </>

    return (
        <main ref={container} className={"container mx-auto h-full"}>
            <div className="flex flex-row justify-center text-white">


                {/* Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-stone-700  z-0 inline-grid">
                    <div className="w-full p-6 text-3xl sm:text-5xl sm:col-span-2 font-bold text-center">Reactive Demo
                    </div>

                    {/*@ts-ignore*/}
                    <div className="h-72 w-72 bg-black" ref={view1}/>
                    <Content>
                        Welcome! This is a small demo using <a href="https://threejs.org/">ThreeJS</a> with <a
                        href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</a> + <a
                        href="https://github.com/pmndrs/drei">drei</a>. What an awesome set of libraries!
                        <br/>
                        We showcase the <a href="https://github.com/pmndrs/drei#view">View</a> component that lets us
                        split the viewport into multiple segments.
                    </Content>

                    <Content classes="hidden sm:block">
                        {sharedContent}
                    </Content>
                    {/*@ts-ignore*/}
                    <div className="h-72 w-72 bg-black" ref={view2}/>
                    <Content classes="block sm:hidden">{sharedContent}</Content>

                    {/*@ts-ignore*/}
                    <div className="h-72 w-72 bg-black" ref={view3}/>
                    <Content>
                        This page is responsive. Try resizing the window to see how the layout.
                        <br/><br/>

                        The DOM elements can interact with the 3D objects. Toggle the wireframe mode:
                        <div className={"flex justify-center"}>

                        <button
                            className={"bg-stone-200 p-2 border border-white rounded-md text-black font-semibold mt-3"}
                            onClick={toggleWireframe}>
                            {wireframe ? "Hide" : "Show"} wireframe
                        </button>
                        </div>
                    </Content>
                </div>

                {/* WebGL */}
                {/*@ts-ignore*/}
                <Canvas eventSource={container} className={"canvas z-40 pointer-events-none"}>
                    <ShapeView trackingRef={view1} wireframe={wireframe} highlightColor={colors[9 * 16][4]}>
                        <Dodecahedron args={[2, 0]}/>
                    </ShapeView>
                    <ShapeView trackingRef={view2} wireframe={wireframe} highlightColor={colors[9 * 16][2]}>
                        <RoundedBox args={[3, 3, 3]} radius={0.2}/>
                    </ShapeView>
                    <ShapeView trackingRef={view3} wireframe={wireframe} highlightColor={colors[9 * 16][0]}>
                        <Torus args={[1.8, 0.5, 16, 20]}/>
                    </ShapeView>
                </Canvas>
            </div>
        </main>
    )
}

export default App
