import { Line, OrthographicCamera, Sky } from "@react-three/drei";
import { animated, useSpring, useTrail } from "@react-spring/three";
import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import { EffectComposer } from "@react-three/postprocessing";

const AnimatedLine = animated(Line);

const color="white"

const square: [number, number, number][] = [
  [0, -0.5, -0.5],
  [0, -0.5, 0.5],
  [0, 0.5, 0.5],
  [0, 0.5, -0.5],
  [0, -0.5, -0.5]
];

const twistedSquares: [number, number, number][] = [
  [0, 0, 1],
  [0, 1, 1],
  [0, 1, 0],
  [0, -1, 0],
  [0, -1, -1],
  [0, 0, -1],
  [0, 0, 1]
];

const OFFSET = 0.202;
const COUNT = 12;

const offsetArray = (offset: number, n: number) => [...Array(n)].map((v, i) => ({
  posX: offset * (i - (n - 1) / 2)
}));


interface StepProps {
  onComplete: () => void;
}

// Rotate each individual square 90 degrees
function RotatingSquares({ onComplete }: StepProps) {
  const offsets = offsetArray(OFFSET, COUNT);
  const trail = useTrail(offsets.length, {
    to: { "rotation-x": -Math.PI / 2 },
    from: { "rotation-x": 0 },
    config: { precision: 0.001 },
    onRest: (_, w) => {
      if (w.springs["rotation-x"]._priority === offsets.length - 1) onComplete();
    }
  });

  return <>
    {trail.map((props, i) => (
      // @ts-ignore - type instantiation is excessively deep
      <AnimatedLine
        color={color}
        key={i}
        rotation={[0, 0, 0]}
        {...props}
        position={[offsets[i].posX, 0, 0]}
        points={square}
        lineWidth={1.5}
      />
    ))}
  </>;
}

// Rotate all squares 180 degrees as a group
function RotatingGroup({ onComplete }: StepProps) {
  const offsets = offsetArray(OFFSET, COUNT);
  const { rotY } = useSpring({
    "rotY": -Math.PI,
    from: { "rotY": 0 },
    config: { mass: 1, tension: 50, precision: 0.001 },
    onRest: () => onComplete()
  });
  return (<animated.group
    rotation-y={rotY}
  >
    {offsets.map((props, i) => (
      <AnimatedLine
        key={i}
        color={color}
        rotation={[0, 0, 0]}
        position={[offsets[i].posX, 0, 0]}
        points={square}
        lineWidth={1.5}
      />
    ))}
  </animated.group>);
}


// Rotate each combined square 90 degrees
function RotatingTwistedSquares({ onComplete, rotFromX }: StepProps & { rotFromX: number }) {
  const offsets = offsetArray(OFFSET, COUNT / 2);
  const trail = useTrail(offsets.length, {
    to: { "rotation-x": -rotFromX - Math.PI / 2 },
    from: { "rotation-x": -rotFromX },
    config: { mass: 1, tension: 100, precision: 0.001 },
    onRest: (_, w) => {
      if (w.springs["rotation-x"]._priority === offsets.length - 1) onComplete();
    }
  });

  return <>
    {trail.map((props, i) => (
      <AnimatedLine
        key={i}
        rotation={[0, 0, 0]}
        {...props}
        position={[offsets[i].posX, 0, 0]}
        points={twistedSquares}
        color={color}
        lineWidth={1.5}
      />
    ))}
  </>;
}

function Scene() {
  const [step, setStep] = useState(0);

  const nSteps = 3;

  const stepForward = () => {
    setStep((step) => (step + 1) % nSteps);
  };

  switch (step) {
    case 0:
      return <RotatingSquares onComplete={stepForward} />;
    case 1:
      return <RotatingTwistedSquares onComplete={stepForward} rotFromX={0} />;
    case 2:
      return <RotatingTwistedSquares onComplete={stepForward} rotFromX={Math.PI / 2} />;
    default:
      throw new Error("Unknown step");

  }
}

export default function App() {
  return (<>
      <OrthographicCamera
        makeDefault
        position={[10, 8.27, 8.27]}
        zoom={100} />

      <EffectComposer multisampling={2}>
        <Scene />
      </EffectComposer>
    </>
  );
}
