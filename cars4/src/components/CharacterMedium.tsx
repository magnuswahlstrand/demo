/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {useLayoutEffect} from 'react'
import {useFBX, useGLTF, useTexture} from '@react-three/drei'
import {GLTF} from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        characterMedium: THREE.Mesh
    }
    materials: {
        skin: THREE.MeshStandardMaterial
    }
}

export function Model(props: JSX.IntrinsicElements['group']) {
    let fbx = useFBX('models/animated-characters-2/Model/characterMedium.fbx');
    console.log(fbx);
    let texture = useTexture('models/animated-characters-2/Skins/skaterMaleA.png')
    // const {nodes, materials} = useGLTF('/models/characterMedium.gltf') as GLTFResult
    useLayoutEffect(() => {
        // console.log(nodes.characterMedium.geometry)
        // materials.skin.map = texture
        // mesh.current.geometry.attributes.uv.setXY(...
    }, [])

    console.log(fbx.children[0]);
    // TODO: How to set this?
    // materials.skin.setValues({map:texture})
    // return <primitive object={fbx} scale={0.01}/>
    return <group {...props} dispose={null} >
        <mesh
            castShadow
            receiveShadow
            geometry={fbx.children[0].geometry}
            // material={materials.skin}
            material-map={texture}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1}/>
    </group>
}
// https://github.com/pmndrs/react-three-fiber/discussions/1494

useGLTF.preload('/models/characterMedium.gltf')