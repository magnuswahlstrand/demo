import {Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import React from "react";

export const initialCamera = new Vector3(10, 10, 10)
const target = new Vector3().copy(initialCamera).multiplyScalar(3)
export const CameraAnimation = () => {
    useFrame(state => {
        // if (state.camera.position.x >= target.x * 0.95) {
        //     state.camera.position.copy(initialCamera)
        // } else {
        //     state.camera.position.lerp(target, .008)
        // }
    })
    return <></>
}
