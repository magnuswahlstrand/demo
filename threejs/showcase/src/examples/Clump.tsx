import { useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Sphere } from "@react-three/drei";
import React, { useRef } from "react";
import { InstancedRigidBodies, InstancedRigidBodyApi, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Color, MathUtils, MeshStandardMaterial, Vector3 } from "three";


const COUNT = 15;

const rfs = MathUtils.randFloatSpread;

const baubleMaterial = new MeshStandardMaterial({
  color: "red",
  roughness: 0,
  envMapIntensity: 0.2,
  emissive: "#370037"
});

function Scene({ vec = new Vector3() }: { vec?: Vector3 }) {
  const api = useRef<InstancedRigidBodyApi>(null);


  useFrame(({ clock }, delta) => {
    if (!api.current) return;

    api.current.forEach((body) => {
      vec.copy(body.translation());
      vec.normalize().multiplyScalar(-80 * delta);
      body.applyImpulse(vec);
    });
  });

  return (
    <group>
      <InstancedRigidBodies
        ref={api}
        colliders="hull"
        positions={Array.from({ length: COUNT }, () => [
          rfs(10),
          rfs(10),
          rfs(10)
        ])}
        angularDamping={0.65}
        linearDamping={0.1}
      >
        <instancedMesh
          castShadow
          receiveShadow
          material={baubleMaterial}
          args={[undefined, undefined, COUNT]}
        >
          <sphereBufferGeometry args={[1]} />
          {/*<meshStandardMaterial color={"yellow"} />*/}
          {/*<baubleMaterial/>*/}
        </instancedMesh>
      </InstancedRigidBodies>
    </group>
  );
}

function Pointer({ vec = new Vector3() }: { vec?: Vector3 }) {
  const ref = useRef<RigidBodyApi>(null);

  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    vec.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0);
    ref.current.setNextKinematicTranslation(ref.current.translation().lerp(vec, 0.2));
  });

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <Sphere args={[0.3]}>
        <meshStandardMaterial
          color={"lightblue"}
          roughness={0}
          envMapIntensity={0.2}
          emissive={"#370037"}
        />

      </Sphere>
    </RigidBody>
  );
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.25} />
    </>
  );
};

const SceneWrapper = () => {
  return (<>
    <color attach="background" args={["black"]} />
    <Lights />
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 15]}
    />
    <Physics gravity={[0, 2, 0]}>
      <Scene />
      <Pointer />
    </Physics>
    <Environment preset={"city"} />
  </>);
};

export default SceneWrapper;
