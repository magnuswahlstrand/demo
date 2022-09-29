import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sky, Sphere } from "@react-three/drei";
import React, { useRef } from "react";
import { InstancedRigidBodies, InstancedRigidBodyApi, Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { MathUtils, MeshStandardMaterial, Vector3 } from "three";


const COUNT = 15;

const rfs = MathUtils.randFloatSpread;

const baubleMaterial = new MeshStandardMaterial({
  color: "red",
  roughness: 0,
  envMapIntensity: 0.2,
  emissive: "#370037"
});

function Scene({ vec = new Vector3() }: { vec: Vector3 }) {
  const api = useRef<InstancedRigidBodyApi>(null);


  useFrame(({ clock }, delta) => {
    if (!api.current) return;

    api.current.forEach((body, i) => {
      vec.copy(body.translation());
      vec.normalize().multiplyScalar(-40 * delta);
      // body.addForce(vec);
      // body.applyImpulse(vec);
      body.applyImpulse(vec);
      // body.applyImpulse(vec)
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

function Pointer({ vec = new Vector3() }: { vec: Vector3 }) {
  const ref = useRef<RigidBodyApi>(null);


  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    // vec.copy(ref.current.translation());
    // vec.lerp([mouse.x, mouse.y, 0], 0.1);
    // ref.current.setNextKinematicTranslation(vec.sub(ref.current.translation()));
    const v = { x: mouse.x * viewport.width / 2, y: mouse.y * viewport.height / 2, z: 0 };
    ref.current.setNextKinematicTranslation(ref.current.translation().lerp(v, 0.2));
  });

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <Sphere args={[0.3]}>
        <meshStandardMaterial
          color={"lightgreen"}
          roughness={0}
          envMapIntensity={0.2}
          emissive={"#370037"}
        />

      </Sphere>


    </RigidBody>
  );
}

// return (<>
//   <RigidBody colliders={"ball"}>
//     <Sphere args={[2]}>
//       <meshStandardMaterial color={"red"} metalness={1} />
//     </Sphere>
//   </RigidBody>
// </>);

export default function App() {
  console.time("render");
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
      <ambientLight intensity={0.25} />
      <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow
                 shadow-mapSize={[512, 512]} />
      <directionalLight intensity={5} position={[-10, -10, -10]} color="purple" />
      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Scene />
        {/*<Debug />*/}
        <Pointer />
      </Physics>
      <Environment preset={"city"} />
      {/*<Environment files="/adamsbridge.hdr" />*/}
      <axesHelper args={[2]} />
      <OrbitControls />
      {/*<Effects />*/}
      <Sky />
    </Canvas>
  );
}
