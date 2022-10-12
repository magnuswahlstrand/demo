import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useEffect } from "react";
import { Boids, spawnBoid } from "./Boids";
import { MovementSystem } from "./systems/MovementSystem";

function Lights() {
  return <>
    <ambientLight />
    <pointLight position={[-100, 100, -5]} castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
    />
  </>;
}

function spawnBoids() {
  const distance = 2;
  const n = 100;
  for (let x = 0; x < n; x++) {
    // for (let y = 0; y < n; y++) {
      spawnBoid(distance * (x - n/2), 0);
    // }
  }
}

export function Scene() {

  useEffect(() => {
    spawnBoids();
  }, []);

  return <>
    <Boids />
    <MovementSystem />
  </>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [0, 10, 0], zoom: 10 }} orthographic shadows>
      <Lights />
      <Physics>
        <Scene />
      </Physics>
      <axesHelper args={[10]} />
    </Canvas>
  );
}
