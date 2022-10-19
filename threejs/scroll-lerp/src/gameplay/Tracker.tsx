import { useRef, useState } from "react";
import { Color, Group, Mesh, MeshBasicMaterial } from "three";
import { Plane, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import create from "zustand";
import { damp, dampC } from "maath/easing";

interface SelectState {
  selected: number;
  select: (index: number) => void;
}

const useStore = create<SelectState>(set => ({
  selected: -1,
  select: (index: number) => set((state) => ({ selected: index }))
}));
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "indigo",
  "violet",
  "brown",
  "olive"
];
const width = 2;
const padding = 0.2;

function Item({ index, position, color, c = new Color() }) {
  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const select = useStore(state => state.select);
  const selected = useStore(state => state.selected);
  const click = () => select(selected === index ? -1 : index);

  const scale = 2;
  const offset = width * (scale - 1) / 2;

  useFrame((_, dt) => {

    // Size
    const smooth = 0.15;
    damp(ref.current.scale, "y", selected === index ? 1.2 : 1, selected === index ? smooth : smooth / 2, dt, 10);
    damp(ref.current.scale, "x", selected === index ? scale : 1, selected === index ? smooth : smooth / 2, dt, 10);

    // Position

    if (selected > -1 && selected < index) damp(ref.current.position, "x", position[0] + offset, smooth, dt, 10);
    if (selected > -1 && selected > index) damp(ref.current.position, "x", position[0] - offset, smooth, dt, 10);
    if (selected === -1 || selected === index) damp(ref.current.position, "x", position[0], smooth, dt, 10);

    if (index === 0) {

      console.log(index, position[0], ref.current.position.x, offset, selected);
    }

    // Color
    dampC((ref.current.material as MeshBasicMaterial).color,
      c.set(hovered || selected === index ? color : "gray"), hovered ? 0.3 : 0.1, dt, 1);
  });

  return <Plane
    ref={ref}
    position={position}
    args={[width, 6]}
    onPointerOver={() => hover(true)}
    onPointerOut={() => hover(false)}
    onClick={click}
  >
    <meshBasicMaterial color={color} />
  </Plane>;
}

function Tracker() {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();
  useFrame(({ viewport }) => {
    ref.current.position.x = scroll.offset * viewport.width;
  });

  const wX = width + padding;

  return (
    <group ref={ref}>
      {colors.map((color, i) =>
        <Item
          position={[i * wX - colors.length / 2, 0, 0]}
          key={i}
          index={i}
          color={color}
        />)
      }
    </group>
  );
}

export function Bar2() {
  const { viewport } = useThree();

  return <ScrollControls horizontal pages={3}>
    <Scroll>{/*<DemoSphere position={p2} />*/}
      <Tracker />
    </Scroll>
    <Scroll html>
    </Scroll>
  </ScrollControls>;
}
