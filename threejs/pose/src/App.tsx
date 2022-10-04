import { OrbitControls, Plane, Sphere } from "@react-three/drei";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Debug, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Group, Vector2 } from "three";
import { useControls } from "leva";
import Giant2 from "./components/Giant2";
// import { ColliderBones } from "./components/ColliderBones1";
import { ColliderBones } from "./components/ColliderBoneV2";
import InfiniteSphere from "./components/InfiniteSphere";

function MyPlane() {
  const ref = useRef<RigidBodyApi>(null!);
  const groupRef = useRef<Group>(null!);


  useFrame(({ clock }) => {
    console.log(ref.current);
    // ref.currentscale.setX(Math.sin(clock.elapsedTime))
  });

  return (
    <>
      <group scale={1.2} ref={groupRef}>
        <RigidBody ref={ref} scale={1.2}>
          <Plane rotation={[-Math.PI / 2 + 0.3, 0, 0]}>
            <meshBasicMaterial attach="material" color="red" />
          </Plane>
        </RigidBody>
      </group>
      {/*<RigidBody colliders={"ball"} position={[0, 1, 0]} angularDamping={0.65} linearDamping={0.1}>*/}
      {/*  <Sphere args={[0.1, 32, 32]} />*/}
      {/*</RigidBody>*/}
    </>
  );
}

function Shoulder({ x, y }: { x: number; y: number }) {
  const radius = 0.1;
  return (<RigidBody colliders={"ball"} type="fixed">
      <Sphere position={[x, y, 0]} args={[radius, 32, 32]} />
    </RigidBody>
  );
}

const Scene = () => {
  const {
    RightX, RightY, RightLength, RightAngle, LeftX, LeftY, LeftLength, LeftAngle
  } = useControls({
    RightX: { value: -0.4, step: 0.02 },
    RightY: { value: 1.16, step: 0.02 },
    RightLength: { value: 0.95, step: 0.1 },
    // RightAngle: { value: 4.42, step: 0.02 },
    RightAngle: { value: Math.PI, step: 0.02 },

    LeftX: { value: 0.4, step: 0.02 },
    LeftY: { value: 0.95, step: 0.02 },
    LeftLength: { value: 0.85, step: 0.02 },
    LeftAngle: { value: 5, step: 0.02 }
  });

  return (<>
      {/*Right arm*/}
      <ColliderBones start={new Vector2(RightX, RightY)} length={RightLength} angle={RightAngle} />
      <Shoulder x={RightX} y={1.12} />

      <RigidBody colliders={"hull"}>
      <Plane position={[0,1.12+0.1, 0]} rotation={[-Math.PI / 2,0,0]} args={[1-2*0.1,0.1,1]} />
      </RigidBody>

      <Shoulder x={-RightX} y={1.12} />

      <ColliderBones start={new Vector2(-RightX, RightY)} length={RightLength} angle={Math.PI - RightAngle} />
      <InfiniteSphere />
      <Giant2 angle={RightAngle} />
    </>
  );

};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <directionalLight intensity={2} position={[10, 10, 10]} color="white" />
      <Physics>
        <Debug color={"lightgreen"} sleepColor={"lightgreen"} />
        <Scene />

      </Physics>
      <axesHelper args={[2]} />
      <OrbitControls target={[0, 1, 0]} />
    </Canvas>
  );
}
