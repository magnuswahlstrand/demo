import type { Vector3 as R3FVector3 } from "@react-three/fiber";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Scroll, ScrollControls, Sphere, useScroll } from "@react-three/drei";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontJsonRaw from "./Roboto_Black_Regular.json?raw";
import { Brush, Intersection, Subtraction } from "@react-three/csg";
import { useEffect, useRef } from "react";
import { BufferGeometry, Color, Group, Vector3 } from "three";
import { damp } from "maath/easing";


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


const red = new Color("red");
const purple = new Color("purple");
const clr = new Color();

function ScrollColor() {

  const scroll = useScroll();

  useFrame(all => {
    const r = scroll.range(0, 1 / 3);
    const g = scroll.range(0, 2 / 3);
    const b = scroll.range(0, 3 / 3);
    // console.log(scroll.offset);
    clr.setRGB(r, g, b);
    all.gl.setClearColor(clr);
  });

  return null;
}

function SpecialSphere({ y, scrollY, flip: shouldFlip }: { y: number, scrollY: number, flip?: boolean }) {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();

  const flip = shouldFlip ? -1 : 1;

  const { width } = useThree(state => state.viewport);

  // We need to move the spheres 3/4 of the viewport width, in total
  const fixedOffset = width / 8;
  const variableOffset = 3 * width / 4 - fixedOffset;
  console.log(fixedOffset, variableOffset)

  useFrame((_, dt) => {
    const b = 1 - scroll.curve(scrollY - 1 / 2, 2 * (1 / 2));
    const target = flip * b * variableOffset;
    damp(ref.current.position, "x", target, 0.25, dt);
  });


  return <group ref={ref}>
    <Sphere position={[flip * fixedOffset, y, 0]}>
      <meshNormalMaterial />
    </Sphere>
  </group>;
}

function DemoSphere(props: { position: R3FVector3 }) {
  return <Sphere position={props.position}>
    <meshNormalMaterial />
  </Sphere>;
}

function Bar(props: { position: number[] }) {
  const { viewport } = useThree();

  const p1: R3FVector3 = [viewport.width / 4, 0, 0];
  const p2: R3FVector3 = [0, -viewport.height, 0];
  const p3: R3FVector3 = [0, -viewport.height * 2, 0];
  return <ScrollControls pages={3}>
    <Scroll>
      <ScrollColor />
      <SpecialSphere y={0} scrollY={0} />
      <SpecialSphere y={-viewport.height} scrollY={1 / 2} flip />
      <SpecialSphere y={-viewport.height * 2} scrollY={3 / 3} />
      {/*<DemoSphere position={p2} />*/}
    </Scroll>
  </ScrollControls>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [0, 0, 5], zoom: 100 }} orthographic shadows>
      <Bar />
    </Canvas>
  );
}
