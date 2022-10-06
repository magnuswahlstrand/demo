import React, { useEffect, useRef } from "react";
import { DotScreen, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera, Sphere, TorusKnot } from "@react-three/drei";
import { Mesh } from "three";
import { BlendFunction } from "postprocessing";


function Knot() {
  const knotRef = useRef<Mesh>(null!);
  const sphereRef = useRef<Mesh>(null!);

  useEffect(() => {
    console.log(sphereRef);
  }, []);


  useFrame(({ clock }) => {
    knotRef.current.rotation.y -= 0.002;
    const t = clock.elapsedTime / 2
    sphereRef.current.position.x = 4 * Math.cos(t);
    sphereRef.current.position.z = 4 * Math.sin(t);
    sphereRef.current.position.y = 2 * Math.sin(t);
  });

  return (
    <>
      <TorusKnot
        ref={knotRef}
        args={[1.5, 0.3, 256, 64]}>
        <meshPhysicalMaterial color={"#FF3"} roughness={0.1} metalness={0.4} />
      </TorusKnot>
      <Sphere
        ref={sphereRef}
        args={[1]}
      >
        <meshPhysicalMaterial color={"#F99"} roughness={1} metalness={0.05} />
      </Sphere>
    </>
  );
}

function Effects() {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
      <EffectComposer>
        <DotScreen
          blendFunction={BlendFunction.NORMAL}
          scale={0.3}
        />
        <Knot />
      </EffectComposer>

    </>);
}

export default Effects;
