import {MutableRefObject, useEffect, useRef} from "react";

// const mp = new Record<KeyCode, boolean>();

export const keyMapping = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'a': 'left',
    'd': 'right',
    'w': 'up',
    's': 'down',
}

const keys = Object.keys(keyMapping)
type eventKey = keyof typeof keyMapping
export type AllowedKey = typeof keyMapping[eventKey]
export const isKeyCode = (v: unknown): v is eventKey => keys.includes(v as eventKey)


// function addKeyEventListener(controls: MutableRefObject<Record<AllowedKey, boolean>>) {
//     const handleKeyDown = (e: KeyboardEvent) => {
//         if (!isKeyCode(e.key)) return
//         controls.current[keyMapping[e.key]] = true
//     }
//     window.addEventListener('keydown', handleKeyDown)
//     const handleKeyUp = (e: KeyboardEvent) => {
//         if (!isKeyCode(e.key)) return
//         controls.current[keyMapping[e.key]] = false
//     }
//     window.addEventListener('keyup', handleKeyUp)
//     return () => {
//         window.removeEventListener('keydown', handleKeyDown)
//         window.removeEventListener('keyup', handleKeyUp)
//     }
// }
//
//
// export function useControls() {
//
//     const controls = useRef<Record<AllowedKey, boolean>>({
//         right: false,
//         left: false,
//         up: false,
//         down: false,
//     })
//
//     const handleButtonDown = (k: AllowedKey) => {
//         controls.current[k] = true
//         console.log(controls.current)
//     }
//     const handleButtonUp = (k: AllowedKey) => {
//         controls.current[k] = false
//     }
//
//     useEffect(() => {
//         return addKeyEventListener(controls);
//     }, [])
//
//     return {controls}
// }
