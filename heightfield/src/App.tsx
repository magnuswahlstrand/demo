import {Canvas, extend, useFrame, useLoader, useThree} from "@react-three/fiber";
import {useTexture} from "@react-three/drei";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {useEffect, useMemo, useRef} from "react";
import {BufferGeometry, Color, Float32BufferAttribute, ImageBitmapLoader, InstancedMesh, Mesh} from "three";
import niceColors from 'nice-color-palettes'
import {Debug, Physics, useHeightfield, useSphere} from '@react-three/cannon'

extend({OrbitControls})

// https://github.com/schteppe/cannon.js/blob/master/demos/heightfield.html
// https://cannon.pmnd.rs/#/demo/Heightfield
// https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon-examples/src/demos/demo-Heightfield.tsx

function Controls() {
    const controls = useRef<any>()
    const {camera, gl} = useThree()
    useFrame(() => controls.current.update())
    // @ts-ignore
    return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} zoom={0.1}
                          rotateSpeed={0.5}/>
}

function generateHeightmap(sizeX: number, sizeY: number) {
    var matrix: number[][] = [];
    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {

            // var height = Math.cos(i / sizeX * Math.PI * 2) * Math.cos(j / sizeY * Math.PI * 2) + 2;
            // if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
            //     height = 3;
            matrix[i].push(0);
        }
    }
    matrix[0][0] = 1;
    matrix[sizeX - 1][0] = -1;
    matrix[0][sizeY - 1] = -1;
    matrix[sizeX - 1][sizeY - 1] = -2;
    return matrix
}

function HeightmapGeometry({
                               elementSize,
                               heights,
                           }: {
    elementSize: number
    heights: number[][]
}): JSX.Element {
    const ref = useRef<BufferGeometry>(null)

    useEffect(() => {
        if (!ref.current) return
        const dx = elementSize
        const dy = elementSize

        /* Create the vertex data from the heights. */
        const vertices = heights.flatMap((row, i) => row.flatMap((z, j) => [i * dx, j * dy, z]))

        /* Create the faces. */
        const indices = []
        for (let i = 0; i < heights.length - 1; i++) {
            for (let j = 0; j < heights[i].length - 1; j++) {
                const stride = heights[i].length
                const index = i * stride + j
                indices.push(index + 1, index + stride, index + stride + 1)
                indices.push(index + stride, index + 1, index)
            }
        }

        ref.current.setIndex(indices)
        ref.current.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        ref.current.computeVertexNormals()
        ref.current.computeBoundingBox()
        ref.current.computeBoundingSphere()
    }, [heights])

    return <bufferGeometry ref={ref}/>
}

const verticesC = new Float32Array([
    0.0, 0.0, 1.0,
    0.0, 1.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 1.0, 1.0,
]);


function generateHeights(sizeX: number, sizeY: number) {
    var heights: number[][] = [];
    for (var i = 0; i < sizeX; i++) {
        heights.push([]);
        for (var j = 0; j < sizeY; j++) {

            var height = Math.cos(i / sizeX * Math.PI * 2) * Math.cos(j / sizeY * Math.PI * 2) + 2;
            if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
                height = 3;
            heights[i].push(height);
        }
    }
    return heights;
}


const heights2 = [[0.48,0.72,1.23,2.22,2.82,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[0,0,0.03,0.6,2.07,2.85,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[0.45,0.18,0,0.03,0.75,2.37,2.94,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.25,1.53,0.36,0,0.09,1.5,2.82,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.67,1.38,0.09,0,0.84,2.58,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.94,2.22,0.42,0,0.42,2.22,2.94,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.61,0.93,0,0.12,1.59,2.82,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.82,1.59,0.12,0,0.78,2.49,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.94,2.28,0.48,0,0.24,1.8,2.79,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.97,2.7,1.23,0.06,0.03,0.6,1.74,2.43,2.76,2.88,2.94,2.94,2.94,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.97,2.91,2.19,0.54,0,0.03,0.21,0.63,1.32,1.83,2.1,2.19,2.28,2.4,2.61,2.82,2.94,2.97,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.97,2.97,2.79,1.89,0.54,0.06,0,0,0.06,0.18,0.27,0.36,0.39,0.57,0.9,1.47,2.25,2.76,2.97,2.97,2.97,2.97,2.97],[2.97,2.97,2.97,2.97,2.97,2.79,2.19,1.35,0.69,0.18,0.03,0.03,0,0,0,0,0,0.09,0.57,1.71,2.67,2.97,2.97,2.97,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.91,2.76,2.43,1.77,1.26,1.02,0.84,0.78,0.69,0.45,0.18,0,0,0.27,1.56,2.7,2.97,2.97,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.88,2.76,2.67,2.61,2.58,2.49,2.25,1.68,0.72,0.09,0,0.39,1.95,2.88,2.97,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.94,2.82,2.28,0.99,0.06,0.03,0.87,2.49,2.97,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.88,2.22,0.6,0,0.21,1.74,2.82,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.79,1.53,0.15,0,0.87,2.52,2.97],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.94,2.34,0.6,0,0.27,1.83,2.82],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.76,1.41,0.09,0.03,0.84,2.37],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.94,2.28,0.6,0,0.15,1.17],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.76,1.74,0.3,0,0.15],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.64,1.44,0.27,0],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.94,2.64,1.65,0.54],[2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.97,2.76,2.22]]


const sizeX = 50
const sizeY = 50

function H2(): JSX.Element {
    const ref = useRef<BufferGeometry>(null)

    useEffect(() => {
        if (!ref.current) return


        // var heights = generateHeights(sizeX, sizeY);
        const heights = heights2

        const dx = 1
        const dy = 1

        const vertices = heights.flatMap(
            (row, i) =>
                row.flatMap((z, j) => [i * dx, j * dy, z])
        )
        // return heights

        /* Create the faces. */
        const indices = []
        for (let i = 0; i < heights.length - 1; i++) {
            for (let j = 0; j < heights[i].length - 1; j++) {
                const stride = heights[i].length
                const index = i * stride + j
                indices.push(index, index + stride, index + 1)
                indices.push(index + 1, index + stride, index + stride + 1)
            }
        }

        // console.log(indices)
        // console.log(vertices)

        ref.current.setIndex(indices)
        ref.current.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        ref.current.computeVertexNormals()
        // ref.current.computeBoundingBox()
        // ref.current.computeBoundingSphere()
    }, [])

    return <bufferGeometry ref={ref}/>
}

function Spheres({columns, rows, spread}: { columns: number; rows: number; spread: number }): JSX.Element {
    const number = rows * columns
    const [ref] = useSphere(
        (index) => ({
            args: [0.2],
            mass: 1,
            position: [
                ((index % columns) - (columns - 1) / 2) * spread,
                2.0,
                (Math.floor(index / columns) - (rows - 1) / 2) * spread,
            ],
        }),
        useRef<InstancedMesh>(null),
    )
    const colors = useMemo(() => {
        const array = new Float32Array(number * 3)
        const color = new Color()
        for (let i = 0; i < number; i++)
            color
                .set(niceColors[17][Math.floor(Math.random() * 5)])
                .convertSRGBToLinear()
                .toArray(array, i * 3)
        return array
    }, [number])

    return (
        <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
            <sphereBufferGeometry args={[0.2, 16, 16]}>
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]}/>
            </sphereBufferGeometry>
            <meshPhongMaterial vertexColors/>
        </instancedMesh>
    )
}

function MyMesh() {
    const rotation: [number, number, number] = [-Math.PI / 2 - 0.4, 0, 0];
    let position: [number, number, number] = [-7, 0, 7];
    const elementSize = 1

    // const heights = generateHeightmap(15, 15)
    const heights = heights2
    const [ref] = useHeightfield(
        () => ({
            args: [
                heights,
                {
                    elementSize,
                },
            ],
            position,
            rotation,
        }),
        useRef<Mesh>(null),
    )
    return <mesh ref={ref} castShadow receiveShadow rotation={rotation} position={position}>
        <meshPhongMaterial color={niceColors[17][4]} wireframe={false}/>
        <H2/>
        {/*<HeightmapGeometry heights={heights} elementSize={(128) / 128}/>*/}
    </mesh>;
}

function App() {


    //

    return (
        <Canvas style={{background: '#272730'}} camera={{position: [4, 14, 3], fov: 55}}>
            <Controls/>
            <ambientLight intensity={0.2}/>
            <directionalLight position={[0, 5, 0]} intensity={4}/>
            <axesHelper args={[5]}/>
            {/*<HeightMap/>*/}

            <Physics>
                <Spheres rows={4} columns={4} spread={2}/>
                {/*<Debug color="black" scale={1.0}>*/}
                    <MyMesh/>
                {/*</Debug>*/}
            </Physics>
        </Canvas>
    )
}

export default App
