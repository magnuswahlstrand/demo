import { OrbitControls, Plane, Sphere } from "@react-three/drei";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Debug, interactionGroups, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Group, Vector2 } from "three";
import Giant2 from "./components/Giant2";
import { useControls } from "leva";

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

function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end;
}

let GROUP_BALL = 1;
let GROUP_STATIC = 0;

function ColliderBones({ start, length, angle }: { start: Vector2, length: number, angle: number }) {
  const end = new Vector2(start.x + length * Math.cos(angle), start.y + length * Math.sin(angle));

  const diff = new Vector2();
  diff.subVectors(end, start);

  console.log(diff);
  console.log(diff.angle());

  const numPoints = 10;
  const boneLength = length / numPoints;
  const points = new Array(numPoints).fill(0).map((_, index) => {
    const x = lerp(start.x, end.x, index / numPoints);
    const y = lerp(start.y, end.y, index / numPoints);
    return new Vector2(x, y);
  });

  return <>
    {points.map((point, index) => {

      return (
        <RigidBody position={[point.x, point.y, 0]} key={index}
                   collisionGroups={interactionGroups(GROUP_STATIC, GROUP_BALL)}>
          <Plane rotation={[-Math.PI / 2, -diff.angle(), 0]} args={[boneLength, 0.1]}>
            <meshBasicMaterial attach="material" color="red" />
          </Plane>;
        </RigidBody>
      );
    })}
  </>;
}

const Scene = () => {

  const {
    RightX, RightY, RightLength, RightAngle
    , LeftX, LeftY, LeftLength, LeftAngle
  } = useControls({
    RightX: { value: -0.5, step: 0.02 },
    RightY: { value: 1.04, step: 0.02 },
    RightLength: { value: 1.25, step: 0.02 },
    // RightAngle: { value: 4.42, step: 0.02 },
    RightAngle: { value: Math.PI, step: 0.02 },

    LeftX: { value: 0.4, step: 0.02 },
    LeftY: { value: 0.95, step: 0.02 },
    LeftLength: { value: 0.85, step: 0.02 },
    LeftAngle: { value: 5, step: 0.02 }
  });

  return (<>
      <RigidBody colliders={"ball"} position={[0.5, 1.5, 0]} angularDamping={0.65} linearDamping={0.1}>
        <Sphere args={[0.1, 32, 32]} />
      </RigidBody>
      <ColliderBones start={new Vector2(LeftX, LeftY)} length={LeftLength} angle={LeftAngle} />

      <ColliderBones start={new Vector2(RightX, RightY)} length={RightLength} angle={RightAngle} />
      <Giant2 />
    </>
  );

};

export default function App() {
  return (
    // <Canvas shadows dpr={[1, 2]}>

    <Canvas camera={{ position: [0, 0, 3] }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <directionalLight intensity={2} position={[10, 10, 10]} color="white" />
      <Physics>
        <Debug />
        <Scene />
      </Physics>
      <axesHelper args={[2]} />
      <OrbitControls />
    </Canvas>
  );
}
