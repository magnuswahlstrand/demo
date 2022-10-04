import { Euler, Quaternion, Vector2, Vector3 } from "three";
import React, { useEffect, useRef } from "react";
import { InstancedRigidBodies, InstancedRigidBodyApi, interactionGroups } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { GROUP_BALL, GROUP_STATIC } from "../common/constants";

function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end;
}

export function ColliderBones({ start, length, angle }: { start: Vector2, length: number, angle: number }) {
  start.add(new Vector2(0, 0.1));
  const refSphere = useRef(null!);

  const COUNT = 2;
  const boneLength = 1 * length / COUNT;

  const rotations = Array.from({ length: COUNT }, (_, index) => [
    Math.PI - Math.PI / 2, Math.PI - angle, 0
  ]);

  // TODO: Return array instead
  const pos = (index: number, angle: number, length: number) => {
    const end = new Vector2(start.x + length * Math.cos(angle), start.y + length * Math.sin(angle));
    const x = lerp(start.x, end.x, index / COUNT);
    const y = lerp(start.y + 0.2, end.y + 0.2, index / COUNT);
    return [x, y, 0];
  };

  const positions = Array.from({ length: COUNT }, (_, index) =>
    pos(index, -angle, length)
  );

  console.log(positions);


  const instancedApi = useRef<InstancedRigidBodyApi>(null);
  useEffect(() => {
    refSphere.current.position.copy(instancedApi.current.at(0).raw().translation());
    return () => {
      // TODO: MOVE
      console.log("something updated", angle);
      const rotation = new Quaternion().setFromEuler(new Euler(...[-Math.PI / 2, Math.PI - angle, 0]));
      instancedApi.current?.forEach((api, index) => {
        const position = new Vector3(...pos(index, -angle, length));
        api.setNextKinematicRotation(rotation);
        api.setNextKinematicTranslation(position);
      });
    };
  }, [angle, length]);


  return (
    <>
      <Sphere args={[0.02]} position={[start.x, start.y, 0]} ref={refSphere} />
      <Sphere args={[0.02]} position={[start.x, start.y, 0]} />
      <InstancedRigidBodies
        ref={instancedApi}
        positions={positions}
        rotations={rotations}
        collisionGroups={interactionGroups(GROUP_STATIC, GROUP_BALL)}
        type={"kinematicPosition"}
      >

        <instancedMesh args={[undefined, undefined, COUNT]}>
          <planeGeometry args={[boneLength, 0.1, 1, 1]} />
          <meshBasicMaterial attach="material" color="red" />
        </instancedMesh>
      </InstancedRigidBodies>
    </>
  );
}
