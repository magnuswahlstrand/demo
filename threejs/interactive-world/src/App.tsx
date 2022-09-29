import {Canvas, useFrame} from '@react-three/fiber';
import {Html, KeyboardControls, OrbitControls, PointerLockControls, useKeyboardControls} from "@react-three/drei";
import React, {useContext, useRef, useState} from "react";
import {assign, createMachine} from "xstate";
import {useActor, useMachine} from "@xstate/react";
import {GlobalStateContext, GlobalStateProvider} from "./common/globalContext";
import Bookcase from "./components/Bookcase";
import Crossbow from "./components/Crossbow";
import Arrow from "./components/Arrow";
import {Vector3} from "three";

const color = 'rgb(250,246,200)'

interface PlayerContext {
    nBooks: number
}

const playerMachine = createMachine<PlayerContext>({
    id: "book",
    initial: "idle",
    context: {
        nBooks: 1,
    },
    states: {
        "idle": {
            on: {
                INC: {actions: assign({nBooks: ctx => ctx.nBooks + 1})}
            }
        },
    }
});

function Scene() {
    const [current, send] = useMachine(playerMachine);
    console.log(current.context.nBooks)
    const [broken, setBroken] = useState(false);


    return (<>
        {/*{broken ? <WallBroken/> : <Wall onClick={() => setBroken(true)}/>}*/}
        <Bookcase onClick={() => send('INC')}/>
    </>)
}

function Display() {
    const {authService} = useContext(GlobalStateContext);
    const [{context}] = useActor(authService);

    console.log(context)
    // const {context} = authService.authService;

    return <Html>
        Books
        {context.nBooks}
    </Html>;
}



const PlayerCrossBow = () => {
    const ref = useRef(null!);
    useFrame(({camera, clock}) => {
        if (!ref.current) return
        ref.current.rotation.copy(camera.rotation)
        ref.current.position.set(camera.position.x, camera.position.y, camera.position.z)

        console.log(ref.current.children[0].position.set(0, -0.2 + 0.02 * Math.sin(4 * clock.elapsedTime), -0.1))
        // console.log(ref.current.children[1].position.set(0, -0.2 + 0.02 * Math.sin(4 * clock.elapsedTime), -0.1))
    })

    return <group ref={ref}>
        <group>
            <Arrow scale={0.2} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, -0.2]}/>
            <Crossbow rotation={[0, Math.PI, 0]} scale={0.5}/>
        </group>
    </group>
}


const yAxis= new Vector3(0, 1, 0)
var vector = new Vector3();
var turnVector = new Vector3();
function CameraController() {
    const [sub, get] = useKeyboardControls()

    useFrame(({camera, clock}) => {
        const {forward, backward, left, right, jump} = get()

        camera.getWorldDirection(vector)
        camera.getWorldDirection(turnVector)
        vector.setY(0).normalize()
        turnVector.setY(0).normalize()
        if (forward) {
            camera.position.addScaledVector(vector, 0.1)
        }
        if (backward) {
            camera.position.addScaledVector(vector, -0.1)
        }
        if(left) {
            turnVector.applyAxisAngle(yAxis, 0.02)
        }
        console.log()
    })

    return null;
}

export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio} camera={{position: [0, 1, 10]}}>
            <KeyboardControls
                map={[
                    {name: 'forward', keys: ['ArrowUp', 'w', 'W']},
                    {name: 'backward', keys: ['ArrowDown', 's', 'S']},
                    {name: 'left', keys: ['ArrowLeft', 'a', 'A']},
                    {name: 'right', keys: ['ArrowRight', 'd', 'D']},
                    {name: 'fire', keys: ['Space']},
                ]}>
                <GlobalStateProvider>
                    <color attach="background" args={[color]}/>
                    <directionalLight position={[0, 0, 10]} intensity={1}/>
                    <ambientLight intensity={0.5}/>
                    <gridHelper args={[40, 10]}/>

                    <axesHelper args={[5]}/>
                    <Scene/>
                    {/*<Walls/>*/}
                    {/*<OrbitControls/>*/}
                    <CameraController/>
                    <PointerLockControls/>

                    <Display/>
                    <PlayerCrossBow/>


                </GlobalStateProvider>
            </KeyboardControls>
        </Canvas>
    );
}
