import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {useEffect, useMemo, useRef} from "react";
import {BufferGeometry, Color, Float32BufferAttribute, InstancedMesh, Mesh} from "three";
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

const sizeX = 15
const sizeY = 15

function H2(): JSX.Element {
    const ref = useRef<BufferGeometry>(null)

    useEffect(() => {
        if (!ref.current) return


        var heights = generateHeights(sizeX, sizeY);

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

function Spheres({ columns, rows, spread }: { columns: number; rows: number; spread: number }): JSX.Element {
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
                <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
            </sphereBufferGeometry>
            <meshPhongMaterial vertexColors />
        </instancedMesh>
    )
}

function MyMesh() {
    const rotation: [number, number, number] = [-Math.PI / 2, 0, 0];
    let position: [number, number, number] = [-7, -3, 7];
    const elementSize = 1

    const [ref] = useHeightfield(
        () => ({
            args: [
                generateHeights(sizeX, sizeY),
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

    const heights = generateHeightmap(15, 15)

    return (
        <Canvas style={{background: '#272730'}} camera={{position: [4, 9, 4], fov: 55}}>
            <Controls/>
            <ambientLight intensity={0.2}/>
            <directionalLight position={[0, 5, 0]} intensity={4}/>
            <axesHelper args={[5]}/>
            {/*<HeightMap/>*/}

            <Physics>
                <Spheres rows={4} columns={4} spread={2} />
                <Debug color="black" scale={1.0}>
                    <MyMesh/>
                </Debug>
            </Physics>
        </Canvas>
    )
}

export default App
