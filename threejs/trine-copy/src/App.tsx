import type { Vector3 } from "@react-three/drei";
import { Canvas, mesh, useFrame } from "@react-three/fiber";
import { Debug, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useRef, useState } from "react";
import { PerspectiveCamera, Plane, Vector2, Vector3 as V3 } from "three";

const width = 1;

function MyPlane({ position }: { position?: Vector3, rotation?: Vector3 }) {
  return <RigidBody mass={1} type={"fixed"}>
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[width, width, 0.1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  </RigidBody>;
}

function MyPlane2({ position }: { position?: Vector3, rotation?: Vector3 }) {
  return <RigidBody mass={1}>
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[width, width, 0.1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  </RigidBody>;
}

function updatePlanXZPosition(vec: Vector3, mouse: Vector2, camera: PerspectiveCamera) {
  vec.set(
    mouse.x,
    mouse.y,
    0.0);

  vec.unproject(camera);
  vec.sub(camera.position).normalize();
  const distance = -camera.position.z / vec.z;
  vec.multiplyScalar(distance).add(camera.position);
  vec.setZ(0);
}


const floorPlane = new Plane(new V3(0, 0, 1), 0);

const e2 = new V3();

function MyPlane3({ position }: { position?: Vector3, rotation?: Vector3 }) {
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState([...position]);
  const ref = useRef<RigidBodyApi>(null!);
  // const e = new V3(0, 0, 1);
  // const e2 = new V3(pos[0], pos[1], pos[2]);

  console.log("po", pos);

  useFrame((state) => {
    e2.set(pos[0], pos[1], pos[2]);
    console.log(e2);
    // if (selected) {
      ref.current.setNextKinematicTranslation(e2);
    // }
  });

  const pointerMove = (e: MouseEvent) => {
    if (selected) {
      e.ray.intersectPlane(floorPlane, e2);
      console.log(e2);
      setPos([e2.x, e2.y, e2.z]);
    }
  };

  return <RigidBody mass={1} ref={ref} type={"kinematicPosition"} position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}
          onClick={() => setSelected(!selected)}
          onPointerMove={pointerMove}
    >
      <boxGeometry args={[width, width, 0.1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  </RigidBody>
    ;
}

function Scene() {
  return <>
    <Physics>
      <Debug />
      <MyPlane />
      <MyPlane position={[1.5 * width, 0.2, 0]} />
      <MyPlane2 position={[0.75 * width, 0.5, 0]} />
      <MyPlane3 position={[0.75 * width, 2.5, 0]} />
    </Physics>

  </>;
}

function App() {
  return <Canvas camera={{ position: [0, 1, 5] }}>
    <Scene />
    {/*<OrbitControls />*/}
  </Canvas>;
}

export default App;
