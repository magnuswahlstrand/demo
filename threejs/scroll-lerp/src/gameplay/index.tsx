import { Canvas } from "@react-three/fiber";
import { Bar3 } from "./CrateExample";
import { Bar2 } from "./Tracker";
import { Bar } from "./ScrollExampleOne";


function Lights() {

  return <>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, -10]} angle={0.15} penumbra={1} />
  </>;
}

export function ThreeApp() {
  return (
    <Canvas camera={{ position: [0, 0, 5], zoom: 100 }} orthographic shadows>
      <Lights />
      <Bar/>
    </Canvas>
  );
}
