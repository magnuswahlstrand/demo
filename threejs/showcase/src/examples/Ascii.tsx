import React, { useEffect, useMemo, useRef } from "react";
import { EffectComposer } from "@react-three/postprocessing";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, Sphere, TorusKnot } from "@react-three/drei";
import { Mesh } from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";


function Knot() {
  const knotRef = useRef<Mesh>(null!);
  const sphereRef = useRef<Mesh>(null!);

  useEffect(() => {
    console.log(sphereRef);
  }, []);


  useFrame(({ clock }) => {
    knotRef.current.rotation.y -= 0.01;
    const t = clock.elapsedTime * 2;
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
        <Knot />
      </EffectComposer>
      <AsciiRenderer />
    </>);
}

function AsciiRenderer({ renderIndex = 1, characters = "  .:-+*=%@#" }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert: true });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "-70px";
    effect.domElement.style.color = "white";
    effect.domElement.style.fontWeight = "bold";
    effect.domElement.style.backgroundColor = "black";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters]);

  // Append on mount, remove on unmount
  useEffect(() => {
    // @ts-ignore
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => {
      // @ts-ignore
      gl.domElement.parentNode.removeChild(effect.domElement);
    };
  }, [effect]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);

  return <></>;
}

export default Effects;
