import SpaceshipModel from "./SpaceshipModel";
import { Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


const Spaceship = () => {
  const [sub, get] = useKeyboardControls()

  const ref = useRef<RigidBodyApi>(null);

  useFrame(() => {
    if (!ref.current) return
    const {forward, backward, left, right, jump} = get()

    // You can access individual instanced by their index
    const v = ref.current.linvel()
    let dV = 0
    let dAV = 0
    const acc = 0.2
    dV += forward ? acc : 0
    dV += backward ? -acc : 0
    dAV += controls.current.left ? angularVelocity : 0
    dAV += controls.current.right ? -angularVelocity : 0

    v.add(new Vector3(dV, 0, 0).applyQuaternion(ref.current.rotation()))
    ref.current.setLinvel(v)

    console.log(ref.current.rotation())
    console.log(v)


  }, []);

  return (
    <RigidBody position={[0, 0, 0]} ref={ref}>
      <SpaceshipModel rotation={[0,Math.PI/2,0]}/>
    </RigidBody>
  );
};

export default Spaceship;
