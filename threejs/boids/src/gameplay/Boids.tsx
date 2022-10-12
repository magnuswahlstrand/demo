import { ECS } from "./state";
import { RigidBody } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { Tag } from "miniplex";


export const Boids = () => {
  return (<ECS.ArchetypeEntities archetype={"boid"}>
    {(entity) => (
      <ECS.Entity entity={entity}>
        <ECS.Component name="rigidBody">
          <RigidBody position={[(Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10]}
                     type={"kinematicVelocity"}>
            <Sphere args={[0.5, 32, 32]}>
              <meshStandardMaterial color={"green"} />
            </Sphere>
          </RigidBody>
        </ECS.Component>
      </ECS.Entity>
    )}
  </ECS.ArchetypeEntities>);
};


export const spawnBoid = (x: number, y: number) => {
  ECS.world.createEntity({
    boid: Tag
  });
};
