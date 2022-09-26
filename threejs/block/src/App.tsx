import {Canvas, ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import {damp, damp3, dampAngle} from 'maath/easing';
import {Box, OrbitControls, OrbitControlsProps, Plane} from "@react-three/drei";
import React, {useRef, useState} from "react";
import {Spherical, Vector3} from "three";

let a: boolean, b: boolean, c: boolean, d: boolean;
const sphered = /*@__PURE__*/ new Spherical();

export function dampS(
    current: Spherical,
    target: [x: number, y: number, z: number] | Spherical,
    smoothTime: number,
    delta: number,
    maxSpeed: number,
    easing?: (t: number) => number,
    eps?: number
) {
    if (Array.isArray(target)) sphered.set(target[0], target[1], target[2]);
    else sphered.copy(target);
    a = damp(current, "radius", sphered.radius, smoothTime, delta, maxSpeed, easing, eps);
    b = dampAngle(current, "phi", sphered.phi, smoothTime, delta, maxSpeed, easing, eps);
    c = dampAngle(current, "theta", sphered.theta, smoothTime, delta, maxSpeed, easing, eps);
    return a || b || c;
}

function useTarget() {
    const [animating, setAnimating] = useState(false);
    const ref = useRef({
        animating: false,
        target: new Spherical(),
        currentFocus: new Vector3(),
        goalFocus: new Vector3(),
    });

    useFrame(({camera, controls}, delta) => {
        if (!ref.current.animating) return

        // TODO: Create once
        const from = new Spherical()
        // Get current camera position
        from.setFromVector3(camera.position);

        const t = dampS(from, ref.current.target, 0.01, delta, 10)
        const f = damp3(ref.current.currentFocus, ref.current.goalFocus, 1, delta, 10)


        // Set camera position
        camera.position.setFromSpherical(from)

        // Lerp focus
        camera.lookAt(ref.current.currentFocus.lerp(ref.current.goalFocus, 0.1))

        if (controls) {
            controls.target.copy(ref.current.currentFocus)
            // controls.update()
        } else {
            camera.lookAt(ref.current.currentFocus)
        }

        if (f || t) return
        ref.current.animating = false
        console.log("done")
    })

    const {controls} = useThree()

    return {
        setTarget: (target: Vector3, focus: Vector3) => {

            if (!controls || !controls.target) {
                throw new Error('Controls not found, not supported')
            }

            console.log('CLICK', controls.target)
            console.log('CLICK', target)
            // TODO: handle no controls
            // if (controls) current.focus.copy(target)
            ref.current = {
                animating: true,
                target: new Spherical().setFromVector3(target),

                currentFocus: new Vector3().copy(controls.target),
                goalFocus: new Vector3().copy(focus)
            }

            setAnimating(true)
        },
        controlsEnabled: ref.current.animating
    }
}

function Zoom() {
    const {setTarget, controlsEnabled} = useTarget()
    console.log(controlsEnabled)

    const {camera, controls} = useThree()

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (!e.eventObject.userData.cameraOffset) return
        const focus = e.eventObject.position

        const target = new Vector3().copy(focus).add(e.eventObject.userData.cameraOffset)
        setTarget(target, focus)
        e.stopPropagation()
        const ctrl = controls as OrbitControlsProps
        if (ctrl == null) return
        ctrl?.saveState()
    }

    return (
        <>
            <OrbitControls makeDefault enabled={controlsEnabled}/>
            <group onPointerMissed={() => controls?.reset()}>
                <Box args={[3, 3, 3]} position={[0, 0, 0]} onClick={handleClick} material-color={"blue"}/>
                <Box args={[1, 1, 1]} position={[2, 0, 0]} onClick={handleClick} material-color={"red"}
                     userData={{cameraOffset: new Vector3(2, 0, 0)}}/>

                <Box args={[1, 1, 1]} position={[-2, 0, 0]} onClick={handleClick} material-color={"red"}
                     userData={{cameraOffset: new Vector3(-2, 0, 0)}}/>

                <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}
                       onClick={handleClick}
                />
            </group>
        </>
    )
}

export default function App() {
    console.time("render")
    return (
        <Canvas dpr={window.devicePixelRatio}>
            <color attach="background" args={['black']}/>
            <directionalLight position={[0, 0, 10]} intensity={1}/>
            <ambientLight intensity={0.5}/>

            <axesHelper args={[5]}/>
            {/*<Bounds fit clip observe damping={6} margin={2} onFit={(e) => console.log("fit", e)}>*/}
            <Zoom/>
            {/*</Bounds>*/}
        </Canvas>
    );
}
