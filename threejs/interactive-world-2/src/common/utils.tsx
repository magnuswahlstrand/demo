import {Spherical} from "three";
import {damp, dampAngle} from "maath/easing";

export const highlightModel = (e) => {
    e.eventObject.traverse((child) => {
        if (child.isMesh) {
            child.material.emissive.set('white')
            child.material.emissiveIntensity = 0.3
        }
    })
    e.stopPropagation();
}

export const unHighlightModel = (e) => {
    e.eventObject.traverse((child) => {
        if (child.isMesh) {
            child.material.emissive.set('black')
        }
    })
}


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
