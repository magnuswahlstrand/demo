import {MeshProps, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {Mesh} from "three";


export function Box(props: MeshProps & { color?: string }) {
    const mesh = useRef<Mesh>();
    // rotate the box
    useFrame((state, delta) => {
        if (!mesh.current) return;
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    });
    // draw the box
    return (
        // @ts-ignore
        <mesh {...props} ref={mesh}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={props.color ?? "#FFAE00"}/>
        </mesh>
    );
}
