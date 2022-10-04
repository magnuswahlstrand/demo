import { DoubleSide, Euler, Quaternion, Vector2, Vector3 } from "three";
import React, { useEffect, useRef } from "react";
import { Plane, Sphere } from "@react-three/drei";
import { InstancedRigidBodyApi, interactionGroups, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { GROUP_BALL, GROUP_STATIC } from "../common/constants";

export function ColliderBones({ start, length, angle }: { start: Vector2, length: number, angle: number }) {

  // No idea what this should be called -_-
  const otherOffset = -0.1;
  const angleOffset = 0.1;
  const planeOffset = new Vector2(length / 2, otherOffset);
  planeOffset.rotateAround(new Vector2(0, 0), angle);

  start.add(planeOffset);

  const api = useRef<RigidBodyApi>(null!);

  useEffect(() => {
    const rotation = new Quaternion().setFromEuler(new Euler(-Math.PI / 2, Math.PI - angle + angleOffset, 0));

    const position = new Vector3(start.x, start.y, 0);
    api.current.setNextKinematicRotation(rotation);
    api.current.setNextKinematicTranslation(position);

  }, [angle]);

  // Troubleshooting
  // const start2 = new Vector2(start.x, start.y);
  // const start3 = new Vector2(start.x, start.y+0.1);




  return (
    <>
      <RigidBody collisionGroups={interactionGroups(GROUP_STATIC, GROUP_BALL)}
                 type={"kinematicPosition"}
                 colliders={"hull"}
                 ref={api}
                 rotation={[-Math.PI / 2, Math.PI - angle + angleOffset, 0]}
                 position={[start.x, start.y, 0]}
      >
        <Sphere args={[0.02]} position={[start.x, start.y, 0]} />
        <Plane args={[length, 0.1, 1]}>
          <meshBasicMaterial attach="material" color="red" side={DoubleSide} />
        </Plane>
      </RigidBody>
    </>
  );
}
