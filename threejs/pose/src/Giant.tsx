import React, { useRef } from "react";
import { Shape } from "three";
import { data } from "./data";
import { useFrame } from "@react-three/fiber";
import { Extrude } from "@react-three/drei";

const extrudeSettings = { depth: 1, bevelEnabled: false };
export const Giant = () => {
  const shape = React.useMemo(() => {
    const s = new Shape();

    const o = {};
    const filtered = data.keypoints.filter((d) => d.name.includes("shoulder") || d.name.includes("elbow") || d.name.includes("wrist"));
    filtered.forEach((d, i) => {
      o[d.name] = d;
    });

    console.log(o);
    const order = ["left_elbow", "left_shoulder", "right_shoulder", "right_elbow", "right_wrist"];
    const fx = (x) => x / 64 / 2;
    const fy = (y) => (480 - y) / 48 / 2;

    s.moveTo(fx(o["left_wrist"].x), fy(o["left_wrist"].y));
    order.forEach((d) => {
      s.lineTo(fx(o[d].x), fy(o[d].y));
    });
    s.lineTo(fx(o["right_wrist"].x), fy(o["left_wrist"].y));

    // s.moveTo(1.01,22.01)
    // s.lineTo(1.02,22.02)
    // s.lineTo(1.03,22.03)
    // console.log(s);


    // s.moveTo(0, 0);
    // s.lineTo(0, 0);

    return s;
  }, []);
  const ref = useRef(null);

  const width = 0.2;

  console.log(data.keypoints);
  useFrame(() => {
    // console.log(ref.current)
  });
  return (<>
    <group position={[0, -10, 0]}>

      <Extrude args={[shape, extrudeSettings]}
               ref={ref}
      >
        <meshBasicMaterial attach="material" color={"red"} />
      </Extrude>
      {/*{data.keypoints.filter((d) => d.name.includes("shoulder") || d.name.includes("elbow") || d.name.includes("wrist")).map((d, i) => {*/}
      {/*  return <Sphere key={i} args={[width, 32, 32]} position={[d.x / 64 / 2, (480 - d.y) / 48 / 2, 0]}>*/}
      {/*    <meshBasicMaterial attach="material" color={"red"} />*/}
      {/*  </Sphere>;*/}
      {/*})}*/}
    </group>
  </>);
};
