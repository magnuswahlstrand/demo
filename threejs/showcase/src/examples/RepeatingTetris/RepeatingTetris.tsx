import { L, P3, P4, T2 } from "./components/Shapes";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import React from "react";
import colors from "nice-color-palettes";
import { useAnimationState } from "./hooks/useAnimationState";
import { a, useSpring } from "@react-spring/three";
import { BloomEffect } from "./components/BloomEffect";
import { Vector3 } from "three";

const color = colors[21 * 4];
export const initialCamera = new Vector3(5, 5, 5);

const t = 25;

const delayColor = (key: string) => (key === "color" ? 700 : 0);

const p0 = [0, 0, 0];
const RED = color[0];
const YELLOW = color[1];
const GREEN = color[3];

const sharedConf = { tension: 170 / 2, precision: 0.01 };

const step1 = { immediate: true, config: sharedConf };
const step2 = { config: sharedConf };
const step3 = { position: p0, color: GREEN, config: sharedConf };
const step4 = { position: p0, color: RED, config: sharedConf };

const STATES = [
  {
    L1: { ...step1, position: p0, color: RED },
    T2: { ...step1, position: [0, t, 0], color: YELLOW },
    P3: { ...step1, position: [0, t, 0], color: GREEN },
    P4: { ...step1, position: [0, t, 0], color: color[4] }
  },
  {
    L1: { ...step2, position: p0, color: YELLOW, delay: delayColor },
    T2: { ...step2, position: p0, color: YELLOW },
    P3: { ...step2 },
    P4: { ...step2 }

  },
  {
    L1: { ...step3, delay: delayColor },
    T2: { ...step3, delay: delayColor },
    P3: { ...step3 },
    P4: { ...step3, delay: 500 }
  },
  {
    L1: { ...step4 },
    T2: { ...step4 },
    P3: { ...step4 },
    P4: { ...step4 }
  }
];

const cameraStates = [
  { scale: 1, inverseScale: [1, 1, 1], position: [0, 0, 0], immediate: true },
  {
    scale: 1 / 3,
    inverseScale: [1, 1, 3],
    position: [2, 0.65, 2],
    config: { duration: 7520 },
    from: { scale: 1, inverseScale: [1, 1, 1], position: [0, 0, 0] },
    loop: true
  }
];

function Scene() {
  const state = useAnimationState();
  if (state == 0) {
    console.timeEnd("render");
    console.time("render");
  }

  const camera = useSpring(state === 0 ? cameraStates[0] : cameraStates[1]);
  const springI = useSpring(STATES[state]["L1"]);
  const springT2 = useSpring(STATES[state]["T2"]);
  const springP3 = useSpring(STATES[state]["P3"]);
  const springP4 = useSpring(STATES[state]["P4"]);

  return <a.group position={camera.position as any} scale={camera.scale as any}>
    <group position={[1, 1, 0]}>
      {/* @ts-ignore */}
      <L {...springI} scale={camera.inverseScale} />
    </group>
    <group position={[0, 1, -1]}>
      {/* @ts-ignore */}
      <T2 {...springT2} scale={camera.inverseScale} />
    </group>
    <group position={[0, 1, -6]}>
      {/* @ts-ignore */}
      <P3 {...springP3} scale={camera.inverseScale} />
    </group>
    <group position={[0, 1, 0]}>
      {/* @ts-ignore */}
      <P4 {...springP4} scale={camera.inverseScale} />
    </group>
  </a.group>;
}

export default function WholeScene() {
  return (
    <>
      <OrthographicCamera
        makeDefault
        zoom={50}
        position={initialCamera}
      />
      <color attach="background" args={["black"]} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, 5]} />
      <OrbitControls />
      <Scene />
      <BloomEffect />
    </>
  );
}
