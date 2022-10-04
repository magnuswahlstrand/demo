import { Sphere } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const initialPos = new Vector3(-1, 2, 0)
const initialVel = new Vector3(0,0,0)

const InfiniteSphere = ({initialPosition=new Vector3(-1, 2, 0)}: {initialPosition?: Vector3}) => {
  const ref = useRef<RigidBodyApi>(null!);

  useEffect(() => {
    ref.current.setEnabledRotations(true, true, true)
    ref.current.setEnabledTranslations(true, true, false)
  }, []);


  useFrame(({ clock }) => {
    console.log(ref.current.translation().y);
    if(ref.current.translation().y < -1) {
      console.log('aa')
      ref.current.setLinvel(initialVel)
      ref.current.setTranslation(initialPosition);
    }
  });

  return (
    <RigidBody ref={ref} colliders={"ball"}
               // linearDamping={0.5}
               // angularDamping={0.5}
    >
      <Sphere args={[0.2]} />
    </RigidBody>
  );
};

export default InfiniteSphere;
