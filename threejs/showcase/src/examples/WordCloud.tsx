import React, { useEffect, useMemo, useRef, useState } from "react";
import { PerspectiveCamera, Text, TrackballControls } from "@react-three/drei";
import { Color, Mesh, Spherical, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import randomWords from "random-words";


interface wordProps {
  text: string;
  position: Vector3;
}

const font = "https://fonts.googleapis.com/css2?family=Outfit:wght@500";

function Word({ text, position }: wordProps) {
  const color = new Color();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<Mesh>(null!);


  useFrame(({ camera }) => {
    ref.current.rotation.copy(camera.rotation);
    {/*@ts-ignore*/}
    ref.current.material.color.lerp(color.set(hovered ? "hotpink" : "white"), 0.1);
  });

  const onHoverOver = (e: ThreeEvent<PointerEvent>) => {
    setHovered(true);
    e.stopPropagation();
  };
  const onHoverOut = (e: ThreeEvent<PointerEvent>) => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);


  const fontProps = {
    font: font,
    fontSize: 1,
    lineHeight: 1,
    fontWeight: "bold"
  };

  return <Text
    ref={ref}
    position={position}
    onPointerOver={onHoverOver}
    onPointerOut={onHoverOut}
    {...fontProps}
  >
    {text}
  </Text>;
}

const COUNT = 10;

function Words() {
  const words = useMemo(() => {
    const w: [Vector3, string][] = [];
    const spherical = new Spherical();

    const phiStep = Math.PI / (COUNT + 1);
    const thetaStep = 2 * Math.PI / COUNT;

    for (let i = 1; i < COUNT; i++)
      for (let j = 0; j < COUNT; j++)
        w.push([
          new Vector3().setFromSpherical(spherical.set(10, phiStep * i, thetaStep * j)),
          randomWords(1)[0]
        ]);

    return w;
  }, []);


  return (
    <>{
      words.map(([position, text], index) =>
        <Word key={index} text={text} position={position} />
      )
    }</>);
}

const radius = 60;

function Example() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() / 5;
    const x = Math.sin(t) * radius;
    const z = Math.cos(t) * radius;
    camera.position.set(x,0, z);
    // camera.rotation.set(0,1,0);
  })

  return (
    <>
      <PerspectiveCamera makeDefault />
      <TrackballControls makeDefault />
      <Words />
    </>
  );
}

export default Example;
