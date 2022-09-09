import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {useEffect, useRef} from "react";
import {BufferGeometry, Float32BufferAttribute} from "three";
import niceColors from 'nice-color-palettes'

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


function H2(): JSX.Element {
    const ref = useRef<BufferGeometry>(null)

    useEffect(() => {
        if (!ref.current) return

        var heights: number[][] = [];

        const dx = 1
        const dy = 1
        const sizeX = 15
        const sizeY = 15

        for (var i = 0; i < sizeX; i++) {
            heights.push([]);
            for (var j = 0; j < sizeY; j++) {

                var height = Math.cos(i / sizeX * Math.PI * 2) * Math.cos(j / sizeY * Math.PI * 2) + 2;
                if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
                    height = 3;
                heights[i].push(height);
            }
        }

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
                indices.push(index + 1, index + stride, index + stride + 1 )
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

function App() {

    const heights = generateHeightmap(15, 15)

    return (
        <Canvas style={{background: '#272730'}} camera={{position: [4, 9, 4], fov: 55}}>
            <Controls/>
            <ambientLight intensity={0.2}/>
            <directionalLight position={[0, 5, 0]} intensity={4}/>
            <axesHelper args={[5]}/>
            {/*<HeightMap/>*/}
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <meshPhongMaterial color={niceColors[17][4]} wireframe={false}/>
                <H2/>
                {/*<HeightmapGeometry heights={heights} elementSize={(128) / 128}/>*/}
            </mesh>
        </Canvas>
    )
}

export default App
