import world from "./world.json";
import React from "react";
import Wall from "./components/Wall";

const w = 4
const h = 1.3444
const d = 4

function DirectedWall({
                          direction,
                          position: p
                      }: { direction: 'left' | 'bottom' | 'right', position: [number, number, number] }) {

    switch (direction) {
        case 'bottom':
            p = [p[0] + 2, p[1], p[2] + 1.5 + 2]
            break
        // case 'top':
        //     p = [p[0], p[1], p[2] - 1.5]
        //     break
        case 'left':
            p = [4 - 0.5 + p[0], p[1], p[2] + 1.5]
            break
        case 'right':
            p = [p[0], p[1], p[2] + 1.5]
            break
        // <Wall position={[0, 0, 1.5]}/> {/* bottom */}
        //     <Wall position={[0, 0, -1.5]}/> {/* top */}
        //     <Wall position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}/>
        //     <Wall position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}/>
    }

    const rotation = direction === 'left' || direction === 'right' ? [0, Math.PI / 2, 0] : [0, 0, 0]
    return <Wall position={p} rotation={rotation}/>
}

interface Tile {
    x: number
    y: number
    direction: 'left' | 'bottom' | 'right'
}

export function Walls() {
    const width = world.layers[0].width
    const height = world.layers[0].height
    const walls = world.layers[0].data.map((d, i) => {
        if (d === 0) return null
        const x = i % width
        const y = Math.floor(i / width)
        switch (d) {
            case 6:
                return {x, y, direction: 'bottom'}
            case 12:
                return {x, y, direction: 'right'}
            case 11:
                return {x, y, direction: 'left'}
            default:
                throw new Error('Unknown wall type')
        }
    }).filter((d) => d) as Tile[]

    return (<>
        {walls.map(({x, y, direction}) => {
            return <DirectedWall position={[x * 4, 0, y * 4]} direction={direction}/>
        })}
        {/*<Wall position={[0, 0, 1.5]}/> /!* bottom *!/*/}
        {/*<Wall position={[0, 0, -1.5]}/> /!* top *!/*/}
        {/*<Wall position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}/>*/}
        {/*<Wall position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}/>*/}
        {/*    {world.layers.map((layer, i) => {*/}
        {/*    return <Wall key={i} position={[layer.x, layer.y, layer.z]} scale={[layer.width, layer.height, 1]}/>*/}
        {/*}) */}
    </>)
}
