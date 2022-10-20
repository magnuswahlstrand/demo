import type { Vector3 } from "@react-three/drei";
import { Canvas, mesh, useFrame } from "@react-three/fiber";
import { Debug, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useRef } from "react";
import { Plane, Vector3 as V3 } from "three";
import { useDrag } from "@use-gesture/react";
import { damp3 } from "maath/easing";

const width = 1;
const gravity = -9.81;

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
  const ref = useRef<RigidBodyApi>(null!);

  const someV = new V3();
  const bind = useDrag(({ first, last, event }) => {
    event.stopPropagation();
    if (first) {
      console.log("start");
      ref.current.raw().userData = { selected: true };
    }
    if (last) {
      console.log("stop");
      ref.current.raw().userData = { selected: false };
    }
    event.ray.intersectPlane(floorPlane, mouse);
  });

  useFrame((state, dt) => {
    damp3(target, mouse, 0.05, dt, 10);
    someV.copy(target).sub(ref.current.translation());
    const userData = ref.current.raw().userData as { selected?: boolean };
    if (userData && userData.selected) {
      ref.current.setLinvel(someV.multiplyScalar(5), true);
      ref.current.setAngvel(new V3(0, 0, 1));
    }
  });

  return <RigidBody mass={1} ref={ref} type={"dynamic"} position={position}
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
    <Physics>
      <Debug />
      <MyPlane />
      <MyPlane position={[1.5 * width, 0.2, 0]} />
      <MyPlane2 position={[0.75 * width, 0.5, 0]} />
      <MyPlane3 position={[0.75 * width, 1.5, 0]}
                mouse={new V3(0.75 * width, 1.5, 0)}
                target={new V3(0.75 * width, 1.5, 0)}
      />
      <MyPlane3 position={[0.75 * width, 2.5, 0]}
                mouse={new V3(0.75 * width, 2.5, 0)}
                target={new V3(0.75 * width, 2.5, 0)}
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
