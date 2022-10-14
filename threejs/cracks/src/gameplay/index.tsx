import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Box, OrbitControls } from "@react-three/drei";
import { MovementSystem } from "./systems/MovementSystem";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontJsonRaw from "./Roboto_Black_Regular.json?raw";
import { Brush, Intersection, Subtraction } from "@react-three/csg";
import { useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, Vector3 } from "three";

function Lights() {
  return <>
    <ambientLight />
    <pointLight position={[-100, 100, -5]} castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
    />
  </>;
}

const fontLoader = new FontLoader();
const fontUrl = "./Roboto_Black_Regular.json";
// const font = fontLoader.load(fontUrl);

const fontJson = JSON.parse(fontJsonRaw);
const font2 = fontLoader.parse(fontJson);


// const MyText = ({ text }: { text: string }) => (
//   <group rotation={[-Math.PI / 2, 0, 0]}>
//     <Text3D font={fontUrl}>
//       {text}
//       <meshStandardMaterial color={"red"} />
//     </Text3D>
//   </group>);


const MyText2 = ({
                   text,
                   position,
                   wireframe = false
                 }: { text: string, wireframe?: boolean, position: [number, number, number] }) => {
  return <mesh geometry={geometry} position={position}>
    <meshNormalMaterial wireframe={wireframe} />
  </mesh>;
};

const textGeometryParams = {
  font: font2,
  size: 1,
  height: 0.4
};

const dispWord = "Click me!";

const geometry = new TextGeometry(dispWord, textGeometryParams);


interface CharProps {
  geometry: BufferGeometry,
  offset: number
  width: number
  height: number
}

type CharProps2 = Omit<CharProps, "offset"> & { position: [number, number, number], color: string };

function SplitCharacter(props: { position: [number, number, number], geometry: BufferGeometry, width: number, height: number, color: string }) {
  const cutOffset: [number, number, number] = [0, (props.height) / 2, 0];
  const cutArgs: [number, number, number] = [(props.width), props.height + 0.2, 1];

  const instancedApi1 = useRef<RigidBodyApi>(null!);
  const instancedApi2 = useRef<RigidBodyApi>(null!);

  useEffect(() => {
    instancedApi1.current.setLinvel(new Vector3(-0.2, 0, 0));
    instancedApi2.current.setLinvel(new Vector3(0.2, 0, 0));
  }, []);

  return <group position={props.position}>
    <RigidBody ref={instancedApi1}>
      <mesh>
        <Intersection>
          <Brush a geometry={props.geometry} />
          <Brush b position={cutOffset}>
            <boxGeometry args={cutArgs} />
          </Brush>
        </Intersection>
        <meshStandardMaterial color={props.color} />
      </mesh>
    </RigidBody>
    <RigidBody ref={instancedApi2}>
      <mesh>
        <Subtraction>
          <Brush a geometry={props.geometry} />
          <Brush b position={cutOffset}>
            <boxGeometry args={cutArgs} />
          </Brush>
        </Subtraction>
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </RigidBody>
    {/*<mesh position={cutOffset}>*/}
    {/*  <boxGeometry args={cutArgs} />*/}
    {/*  <meshStandardMaterial color={"yellow"} />*/}
    {/*</mesh>*/}
  </group>;
}

function Character({ geometry, position, color, width, height }: CharProps2) {
  const [clicked, setClicked] = useState(false);

  return (
    !clicked ? <mesh position={position} onClick={() => setClicked(true)} geometry={geometry}>
        <meshNormalMaterial />
      </mesh> :
      <SplitCharacter position={position}
                      geometry={geometry}
                      width={width}
                      height={height}
                      color={color} />
  );
}

const calculateTextGeometryOffset = () => {
  const text = dispWord;
  const offset: CharProps[] = [];
  for (let i = text.length; i >= 0; i--) {
    const char = text.at(i);
    if (!char || char == " ") continue;

    const fullGeo = new TextGeometry(text.slice(0, i + 1), textGeometryParams);
    const charGeo = new TextGeometry(char, textGeometryParams);
    fullGeo.computeBoundingBox();
    charGeo.computeBoundingBox();
    if (!fullGeo.boundingBox || !charGeo.boundingBox) continue;

    const w = charGeo.boundingBox.max.x;
    const x = fullGeo.boundingBox.max.x;
    offset.push(
      {
        offset: x - w,
        width: w,
        height: charGeo.boundingBox.max.y,
        geometry: charGeo
      }
    );
  }
  return offset;
};

const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan", "magenta", "brown", "black", "white"];

export function Scene() {
  const offset = useMemo(calculateTextGeometryOffset, []);

  return <>
    {offset.map((c, i) =>
      <Character
        key={i}
        geometry={c.geometry}
        position={[c.offset, 0, 0]}
        color={colors[i]}
        width={c.width}
        height={c.height} />)
    }

    <RigidBody type={"fixed"} >
      <Box args={[5, 5, 5]}>
        <meshPhysicalMaterial color="lightblue" transmission={1} thickness={1} roughness={0} />
      </Box>

    </RigidBody>
    <MovementSystem />;
  </>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [0, 0, 5], zoom: 100 }} orthographic shadows>
      <Lights />
      <Physics>
        <Scene />
      </Physics>
      <axesHelper args={[1]} />
      <OrbitControls />
    </Canvas>
  );
}
