import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Box, Environment, OrbitControls } from "@react-three/drei";
import { MovementSystem } from "./systems/MovementSystem";
import { Brush, Subtraction } from "@react-three/csg";
import { useRef } from "react";

function Lights() {
  return <>
    <ambientLight />
    <pointLight position={[-100, 100, -5]} castShadow
                color={"hotpink"}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
    />
  </>;
}

function Shape() {
  const brush = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    brush.current.position.x = 2 * Math.sin(t) + 2;
    brush.current.position.y = 2 * Math.cos(t);
    brush.current.needsUpdate = true;
  });
  return (
    <mesh>
      <Subtraction castShadow receiveShadow>
        <Brush a rotation={[0, Math.PI / 2, 0]} position={[-0.35, 0.4, 0.4]}>
          <boxGeometry />
        </Brush>
        <Brush b ref={brush}>
          <sphereGeometry args={[1, 32, 32]} />
        </Brush>
      </Subtraction>

      <meshStandardMaterial color={"red"} />
      {/*<meshPhysicalMaterial color="lightblue" transmission={0.8} thickness={1} roughness={0.2} />*/}
    </mesh>
  );
}

export function Scene() {

  return <>
    <Shape />
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
      <Environment preset={"city"} background={true} />
      <axesHelper args={[1]} />
      <OrbitControls />
    </Canvas>
  );
}
