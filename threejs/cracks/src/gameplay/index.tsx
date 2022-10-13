import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import { MovementSystem } from "./systems/MovementSystem";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontJsonRaw from "./Roboto_Black_Regular.json?raw";
import { Brush, Intersection, Subtraction } from "@react-three/csg";
import { useMemo, useState } from "react";
import { BufferGeometry } from "three";

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

const dispWord = "Hello World";

const geometry = new TextGeometry(dispWord, textGeometryParams);


interface CharProps {
  geometry: BufferGeometry,
  offset: number
  width: number
  height: number
}

type CharProps2 = Omit<CharProps, "offset"> & { position: [number, number, number], color: string };

function Character({ geometry, position, color, width, height }: CharProps2) {
  const cutOffset: [number, number, number] = [(width + 0.1) / 4, (height + 0.1) / 2, 0];
  const cutPosition: [number, number, number] = [position[0] + (width + 0.1) / 4, position[1] + (height + 0.1) / 2, position[2]];

  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);

  console.log(p1,p2);
  return <>
    <mesh position={position} onClick={() => setP1(true)}>
      <Intersection>
        <Brush a geometry={geometry} />
        <Brush b position={cutOffset}>
          <boxGeometry args={[(width + 0.1) / 2, height + 0.1, 1]} />
        </Brush>
      </Intersection>
      <meshStandardMaterial color={p1 ? "hotpink" : color} />
    </mesh>
    <mesh position={position} onClick={() => setP2(true)} >
      <Subtraction>
        <Brush a geometry={geometry} />
        <Brush b position={cutOffset}>
          <boxGeometry args={[(width + 0.1) / 2, height + 0.1, 1]} />
        </Brush>
      </Subtraction>
      <meshStandardMaterial color={p2 ?  "hotpink": "gray"} />
    </mesh>
    {/*<mesh position={cutPosition}>*/}
    {/*  <boxGeometry args={[(width + 0.1) / 2, height + 0.1, 1]} />*/}
    {/*  <meshStandardMaterial color={color} />*/}
    {/*</mesh>*/}
  </>;
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
    {/*<MyText2 text={"Hello"} wireframe position={[0, 0, 1]} />*/}
    {offset.map((c, i) =>
      <Character geometry={c.geometry}
                 position={[c.offset, 0, 0]}
                 color={colors[i]}
                 width={c.width}
                 height={c.height} />)
    }
    <MovementSystem />;
  </>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [5, 10, 5], zoom: 100 }} orthographic shadows>
      <Lights />
      <Physics>
        <Scene />
      </Physics>
      <axesHelper args={[1]} />
      <OrbitControls />
    </Canvas>
  );
}
