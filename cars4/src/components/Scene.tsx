import {useBox} from "@react-three/cannon";
import {Mesh} from "three";
import {useFBX, useGLTF} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";

type Props = {
    model: Mesh
};

function Box({model}: Props) {
    const [ref, api] = useBox(() => (

        {
            mass: 1,
            position: model.position.toArray(),
            // args: [2,3,3]
            args: model.geometry.boundingBox?.max.sub(model.geometry.boundingBox?.min).toArray(),
        }
    ))

    return <primitive object={model} ref={ref}/>
}
export default function Scene() {
    // const { nodes } = useGLTF('/models/world.glb')
    const gltf = useGLTF('/models/world.glb')
    // const gltf = useLoader(GLTFLoader, '/models/world.glb')
    // const clone = useMemo(() => {
    //     const clone = gltf.scene.clone()
    //     // console.log(clone.children[0])
    //     // console.log((clone.children[0] as Mesh).geometry.boundingBox?.max)
    //     // console.log((clone.children[0] as Mesh).position)
    //     // clone.visible = false
    //     return clone
    // }, [gltf]);

    return (
        <>
            <RigidBody colliders="trimesh" type="fixed">
                <mesh geometry={gltf.nodes.Cube.geometry} dispose={null}>
                    {/*<meshPhysicalMaterial color="lightblue" transmission={1} thickness={1} roughness={0} />*/}
                    <meshPhysicalMaterial color="lightblue"/>
                </mesh>
                {/*{gltf.children.map((child, i) => (*/}
                {/*    <mesh geometry={child} dispose={null}>*/}
                {/*        <meshPhysicalMaterial color="lightblue" transmission={1} thickness={1} roughness={0} />*/}
                {/*    </mesh>*/}
                {/*    // <Box key={i} model={child as Mesh}/>*/}
                {/*    // <primitive key={i} object={child}/>*/}
                {/*))}*/}
                {/*<mesh geometry={gltf} dispose={null}>*/}
                {/*    <meshPhysicalMaterial color="lightblue" transmission={1} thickness={1} roughness={0} />*/}
                {/*</mesh>*/}
            </RigidBody>
            {/*{clone.children.map((child, i) => (*/}
            {/*    <Box key={i} model={child as Mesh}/>*/}
            {/*    // <primitive key={i} object={child}/>*/}
            {/*))}*/}
        </>
    );
}
