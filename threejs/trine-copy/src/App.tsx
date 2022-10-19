import type { Vector3 } from "@react-three/drei";
import { Canvas, mesh, useFrame } from "@react-three/fiber";
import { Debug, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Plane, Vector3 as V3 } from "three";
import { useDrag } from "@use-gesture/react";
import { damp3 } from "maath/easing";

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

const floorPlane = new Plane(new V3(0, 0, 1), 0);

const mouse = new V3();
const target = new V3();

interface SceneProps {
  position: Vector3,
  target?: Vector3
  mouse: Vector3
}

function MyPlane3({
                    position,
                    mouse,
                    target = new V3()
                  }: SceneProps) {
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState([...position]);
  const ref = useRef<RigidBodyApi>(null!);

  const someV = new V3();
  const bind = useDrag(({ first, last, movement: [mx, my], event }) => {
    if (first) {
      ref.current.setEnabledTranslations(false, false, false);
      console.log("start");
    }
    if (last) {
      // ref.current.setEnabledTranslations(true, true, true);
      console.log("stop");
    }
    event.ray.intersectPlane(floorPlane, mouse);
  });

  useFrame((state, dt) => {
    damp3(target, mouse, 0.05, dt, 10);
    someV.copy(target).sub(ref.current.translation());
    console.log(someV.multiplyScalar(5));//.multiplyScalar(0.1));
    ref.current.setLinvel(someV, true);

    // ref.current.applyImpulse(someV, true);
    // ref.current.setNextKinematicTranslation(target);
    // ref.current.
    // ref.current.setTranslation(target);
  });

  return <RigidBody mass={1} ref={ref} type={"dynamic"} position={position}
    // enabledTranslations={[false, false, false]}
                    enabledRotations={[false, false, true]}
                    angularDamping={2}
  >
    <mesh rotation={[-Math.PI / 2, 0, 0]}
          {...bind()}
    >
      <boxGeometry args={[width, width, 0.1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  </RigidBody>
    ;
}

function Scene() {
  return <>
    <Physics gravity={[0, 0, 0]}>
      <Debug />
      <MyPlane />
      <MyPlane position={[1.5 * width, 0.2, 0]} />
      <MyPlane2 position={[0.75 * width, 0.5, 0]} />
      <MyPlane3 position={[0.75 * width, 1.5, 0]}
                mouse={new V3(0.75 * width, 1.5, 0)}
                target={new V3(0.75 * width, 1.5, 0)}
      />
    </Physics>

  </>;
}

function App() {
  return <Canvas camera={{ position: [0, 1, 3] }}>
    <Scene />
    {/*<OrbitControls />*/}
  </Canvas>;
}

export default App;
