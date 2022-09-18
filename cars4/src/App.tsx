import {Canvas, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import {initialPosition, World} from "./components/World";
import {AllowedKey, isKeyCode, keyMapping} from "./components/Controls";
import {ControlContext, useControlContext} from "./GlobalContext";


const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 2;
            controls.maxDistance = 30;
            // controls.maxPolarAngle = Math.PI / 4    ;
            // controls.minPolarAngle = Math.PI / 4
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

export function Inner() {

    return (
        <>
            {/*<CameraController/>*/}
            {/*<planeGeometry/>*/}
            <ambientLight intensity={1}/>
            {/*<hemisphereLight intensity={3} args={['red', 'green']}/>*/}
            <spotLight intensity={2} position={[5, 10, 10]}/>
            <spotLight intensity={2} position={[-5, -10, 10]}/>
            <primitive object={new THREE.AxesHelper(4)}/>
            <World/>
        </>
    );
};

export function Controller() {
    const {controlReleased, controlPressed} = useControlContext()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isKeyCode(e.key)) return
            controlPressed(keyMapping[e.key])
        }
        window.addEventListener('keydown', handleKeyDown)
        const handleKeyUp = (e: KeyboardEvent) => {
            if (!isKeyCode(e.key)) return
            controlReleased(keyMapping[e.key])
        }
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])


    const common = "border border-1  shadow-md border-white rounded m-1 font-bold text-6xl px-3 py-2 select-none bg-white/30"

    return (
        <div className="absolute text-white z-20 bottom-10 left-0 p-5">
            <div className="grid grid-cols-3">
                <button className={common + " col-start-2"}
                        onTouchStart={() => controlPressed("up")}
                        onTouchEnd={() => controlReleased("up")}
                >W
                </button>
                <button className={common + " col-start-1"}
                        onTouchStart={() => controlPressed("left")}
                        onTouchEnd={() => controlReleased("left")}
                >A
                </button>
                <button className={common}
                        onTouchStart={() => controlPressed("down")}
                        onTouchEnd={() => controlReleased("down")}
                >S
                </button>
                <button className={common}
                        onTouchStart={() => controlPressed("right")}
                        onTouchEnd={() => controlReleased("right")}
                >D
                </button>
            </div>
        </div>
    );
};


export default function App() {
    const controls = useRef<Record<AllowedKey, boolean>>({
        right: false,
        left: false,
        up: false,
        down: false,
    })

    const controlPressed = (k: AllowedKey) => {
        // console.log("pressed", k)
        controls.current[k] = true
    }

    const controlReleased = (k: AllowedKey) => {
        // console.log("released", k)
        controls.current[k] = false
    }

    const obj = {controls, controlPressed, controlReleased}

    // const {controls, handleButtonDown, handleButtonUp} = useControls()

    return (
        <ControlContext.Provider value={obj}>
            <div className="h-full relative">
                <Controller/>
                <Canvas camera={{position: initialPosition}}>
                    <CameraController/>
                    {/*<PerspectiveCamera makeDefault manual />*/}
                    <ControlContext.Provider value={obj}>
                        <color attach="background" args={["#facaca"]}/>
                        <Inner/>
                    </ControlContext.Provider>
                </Canvas>
            </div>
        </ControlContext.Provider>
    )
}
