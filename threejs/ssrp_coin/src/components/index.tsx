import { Canvas, useFrame } from "@react-three/fiber";
import { Shadow, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Back, Front } from "./CoinMerged";

function Lights() {
  return <>
    <ambientLight intensity={5} />
    <pointLight position={[5, 5, 5]}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
    />
  </>;
}


export function Scene() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.z += 0.02;
  });

  // const color = "#FF57BC"
  const color = "#EAFF22";

  return <group ref={ref} position={[-10, 1, 1]} rotation={[Math.PI / 2, -0, 0]}>
    <Front color={color} />
    <Back color={color} rotation={[Math.PI, Math.PI, 0]} />
  </group>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [5, 0, 0], zoom: 20 }} orthographic shadows>
      <Lights />
      <Scene />
      {/*<OrbitControls />*/}
    </Canvas>
  );
}
