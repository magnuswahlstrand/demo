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
    return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1}
                          rotateSpeed={0.5}/>
}

function generateHeightmap(sizeX: number, sizeY: number) {
    var matrix: number[][] = [];
    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {
            var height = Math.cos(i / sizeX * Math.PI * 2) * Math.cos(j / sizeY * Math.PI * 2) + 2;
            if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
                height = 3;
            matrix[i].push(height);
        }
    }
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

function HeightMap() {
    const sizeX = 15
    const sizeY = 15
    const data = generateHeightmap(sizeX, sizeY)
    console.log(data)
    return <mesh rotation-x={Math.PI * -0.5}>
        <planeGeometry args={[20, 20, 20, 20]}
                       heightSegments={sizeX - 1}
                       widthSegments={sizeY - 1}
                       wireframe={true}
            // heightMap={data}
        />
        <meshStandardMaterial color={"pink"}
                              wireframe={true}
                              displacementScale={0.3}
            // displacementMap={data}

            // displacementMap={matrix}
        />
    </mesh>
}

function App() {

    const heights = generateHeightmap(15, 15)

    return (
        <div className="App">
            <Canvas style={{background: '#272730'}}>
                {/*<OrbitControls />*/}
                <ambientLight intensity={0.2}/>
                <directionalLight color="red" position={[0, 5, 0]} intensity={2}/>
                {/*<mesh>*/}
                {/*    <boxGeometry args={[2, 2, 2]}/>*/}
                {/*    <meshStandardMaterial/>*/}
                {/*</mesh>*/}
                <Controls/>
                <axesHelper args={[5]}/>
                {/*<HeightMap/>*/}
                <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0,-3,0]}>
                    <meshPhongMaterial color={niceColors[17][4]}/>
                    <HeightmapGeometry heights={heights} elementSize={(128) / 128}/>
                </mesh>
            </Canvas>
        </div>
    )
}

export default App
