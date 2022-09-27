import {Canvas} from '@react-three/fiber';
import {OrbitControls, ScrollControls} from "@react-three/drei";
import React from "react";
import Bookcase from "./components/Bookcase";
import {assign, createMachine} from "xstate";
import {useMachine} from "@xstate/react";

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
                INC: { actions: assign({ nBooks: ctx => ctx.nBooks + 1 }) }
            }
        },
    }
});

function Scene() {
    const [current, send] = useMachine(playerMachine);
    console.log(current.context.nBooks)
    return <Bookcase onClick={() => send('INC')} />
}

export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio} camera={{position: [1, 2, 4]}}>
            <ScrollControls
                pages={30} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={4} // Friction, higher is faster (default: 4)
            >
                <color attach="background" args={[color]}/>
                <directionalLight position={[0, 0, 10]} intensity={1}/>
                <ambientLight intensity={0.5}/>

                <axesHelper args={[5]}/>
                <Scene/>
                <OrbitControls/>

            </ScrollControls>
        </Canvas>
    );
}
