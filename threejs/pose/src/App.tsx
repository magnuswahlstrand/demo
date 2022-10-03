import { OrbitControls, Plane, Sphere } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Debug,
  InstancedRigidBodies,
  InstancedRigidBodyApi,
  interactionGroups,
  Physics,
  RigidBody,
  RigidBodyApi
} from "@react-three/rapier";
import { Euler, Group, Quaternion, Vector2, Vector3 } from "three";
import { useControls } from "leva";
import Giant2 from "./components/Giant2";

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

  // const diff = new Vector2();
  // diff.subVectors(end, start);


  const COUNT = 10;
  const boneLength = 2 * length / COUNT;

  const rotations = Array.from({ length: COUNT }, (_, index) => [
    Math.PI - Math.PI / 2, -angle, 0
  ]);

  // TODO: Return array instead
  const pos = (index: number, angle: number, length: number) => {
    const end = new Vector2(start.x + length * Math.cos(angle), start.y + length * Math.sin(angle));
    const x = lerp(start.x, end.x, index / COUNT);
    const y = lerp(start.y, end.y, index / COUNT);
    return [x, y, 0];
  };

  const positions = Array.from({ length: COUNT }, (_, index) =>
    pos(index, -angle, length)
  );

  console.log(positions);


  const instancedApi = useRef<InstancedRigidBodyApi>(null);
  useEffect(() => {
    return () => {
      console.log("something updated", angle);
      const rotation = new Quaternion().setFromEuler(new Euler(...[Math.PI - Math.PI / 2, -angle, 0]));
      instancedApi.current?.forEach((api, index) => {
        const position = new Vector3(...pos(index, -angle, length));
        api.setNextKinematicRotation(rotation);
        api.setNextKinematicTranslation(position);
      });
    };
  }, [angle, length]);


  return (
    <InstancedRigidBodies
      ref={instancedApi}
      positions={positions}
      rotations={rotations}
      collisionGroups={interactionGroups(GROUP_STATIC, GROUP_BALL)}
      type={"kinematicPosition"}
    >

      <instancedMesh args={[undefined, undefined, COUNT]}>
        <planeGeometry args={[boneLength, 0.1, 1, 1]} />
        <meshBasicMaterial attach="material" color="red" />
      </instancedMesh>
    </InstancedRigidBodies>);
}

const Scene = () => {
  const {
    RightX, RightY, RightLength, RightAngle, LeftX, LeftY, LeftLength, LeftAngle
  } = useControls({
    RightX: { value: -0.5, step: 0.02 },
    RightY: { value: 1.14, step: 0.02 },
    RightLength: { value: 1.25, step: 0.02 },
    // RightAngle: { value: 4.42, step: 0.02 },
    RightAngle: { value: Math.PI, step: 0.02 },

    LeftX: { value: 0.4, step: 0.02 },
    LeftY: { value: 0.95, step: 0.02 },
    LeftLength: { value: 0.85, step: 0.02 },
    LeftAngle: { value: 5, step: 0.02 }
  });

  return (<>
      <RigidBody colliders={"ball"} position={[-0.5, 1.5, 0]} angularDamping={0.65} linearDamping={0.1}>
        <Sphere args={[0.1, 32, 32]} />
      </RigidBody>
      {/*<ColliderBones start={new Vector2(LeftX, LeftY)} length={LeftLength} angle={LeftAngle} />*/}

      <ColliderBones start={new Vector2(RightX, RightY)} length={RightLength} angle={RightAngle} />
      <Giant2 angle={RightAngle - Math.PI} />
      <Plane args={[1, 1]} position={[0.5, 0.5, 0]} />
    </>
  );

};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <directionalLight intensity={2} position={[10, 10, 10]} color="white" />
      <Physics>
        <Debug color={"lightgreen"} sleepColor={"lightgreen"} />
        <Scene />
      </Physics>
      <axesHelper args={[2]} />
      <OrbitControls />
    </Canvas>
  );
}
