/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF,

} from '@react-three/drei'


export default function Model(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/crossbow/model.gltf')
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0,]} >
                <mesh geometry={nodes.Cube065.geometry} material={materials['Metal.090']} />
                <mesh geometry={nodes.Cube065_1.geometry} material={materials['BrownDark.058']} />
            </group>

        </group>
    )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/crossbow/model.gltf')