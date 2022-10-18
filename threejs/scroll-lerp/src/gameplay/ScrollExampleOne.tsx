import { useRef, useState } from "react";
import { Color, Group, Material, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshStandardMaterial } from "three";
import { Edges, Scroll, ScrollControls, Select, Sphere, useScroll, useSelect } from "@react-three/drei";
import { useFrame, useThree, Vector3 as R3FVector3 } from "@react-three/fiber";
import { damp } from "maath/easing";

const clr = new Color();

function ScrollColor() {

  const scroll = useScroll();

  useFrame(all => {
    const r = scroll.range(0, 1 / 3);
    const g = scroll.range(0, 2 / 3);
    const b = scroll.range(0, 3 / 3);
    // console.log(scroll.offset);
    clr.setRGB(r, g, b);
    all.gl.setClearColor(clr);
  });

  return null;
}

function SpecialSphere({ y, scrollY, flip: shouldFlip }: { y: number, scrollY: number, flip?: boolean }) {
  const ref = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);
  const scroll = useScroll();

  const flip = shouldFlip ? -1 : 1;

  const [hovered, setHovered] = useState(false);
  const isSelected = useSelect().indexOf(meshRef.current) !== -1;
  const { width } = useThree(state => state.viewport);

  // We need to move the spheres 3/4 of the viewport width, in total
  const fixedOffset = width / 8;
  const variableOffset = 3 * width / 4 - fixedOffset;
  console.log(fixedOffset, variableOffset);

  useFrame((_, dt) => {
    const b = 1 - scroll.curve(scrollY - 1 / 2, 2 * (1 / 2));
    const target = flip * b * variableOffset;
    damp(ref.current.position, "x", target, 0.25, dt);
  });

  let material: Material | MeshStandardMaterial;
  if (isSelected) {
    material = new MeshBasicMaterial({ color: "hotpink" });
  } else if (hovered) {
    material = new MeshBasicMaterial({ color: "red" });
  } else {
    material = new MeshNormalMaterial();
  }

  return <group ref={ref}>
    <Sphere
      ref={meshRef}
      position={[flip * fixedOffset, y, 0]} args={[1, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      material={material}
    >
      <Edges
        scale={1.1}
        color="white"
      />
    </Sphere>
  </group>;
}

function DemoSphere(props: { position: R3FVector3 }) {
  return <Sphere position={props.position}>
    <meshNormalMaterial />
  </Sphere>;
}

export function Bar() {
  const { viewport } = useThree();

  const p1: R3FVector3 = [viewport.width / 4, 0, 0];
  const p2: R3FVector3 = [0, -viewport.height, 0];
  const p3: R3FVector3 = [0, -viewport.height * 2, 0];
  return <ScrollControls pages={3}>
    <Scroll>
      <ScrollColor />
      <Select multiple onChange={console.log}>
        <SpecialSphere y={0} scrollY={0} />
        <SpecialSphere y={-viewport.height} scrollY={1 / 2} flip />
        <SpecialSphere y={-viewport.height * 2} scrollY={3 / 3} />
      </Select>
      {/*<DemoSphere position={p2} />*/}
    </Scroll>
    <Scroll html>
      <h1 style={{ position: "absolute", width: "500px", top: "50vh", color: "white" }}>html in here (optional)</h1>
      <h1 style={{ position: "absolute", width: "500px", right: "500px", top: "150vh" }}>second page</h1>
      <h1 style={{ position: "absolute", width: "500px", top: "250vh" }}>third page</h1>
    </Scroll>
  </ScrollControls>;
}
