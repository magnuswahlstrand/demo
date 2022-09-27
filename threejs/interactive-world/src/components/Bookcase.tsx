/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, {useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import Book from "./Book";
import {Color} from "three";

const shelvDistance = 0.55
const shelfHeight = [
    0.45,
    0.98,
    1.58
]
const bookWidth = 0.14
const bookOffset = -0.70

export default function Model(props) {

    const group = useRef()
    const {
        nodes,
        materials
    } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bookcase-wide/model.gltf')

    const books = [
        {color: new Color("black"), shelf: 2, flip: false, binder: false, pos: 0},
        {color: new Color("teal"), shelf: 2, flip: false, binder: true, pos: 1},
        {color: new Color("black"), shelf: 2, flip: true, binder: false, pos: 2},

        {color: new Color("crimson"), shelf: 1, flip: false, binder: true, pos: 0},

    ]

    return (
        <group ref={group} {...props} dispose={null}>

            {books.map((book, index) => {
                return <Book key={index}
                             position={[book.pos * bookWidth + bookOffset, shelfHeight[book.shelf], 0]}
                             flip={book.flip}
                             color={book.color}
                             binder={book.binder}
                             onComplete={() => {
                                    console.log("book complete")
                             }}
                />
            })}
            <mesh geometry={nodes.Cube033.geometry} material={materials['BrownDark.049']}
                  rotation={[Math.PI / 2, 0, 0,]}/>
        </group>
    )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bookcase-wide/model.gltf')
