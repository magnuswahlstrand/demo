import { useFrame } from "@react-three/fiber";
import { ECS } from "../state";
import { RenderPriority } from "./render";
import { Vector3 } from "three";

const withRigidBody = ECS.world.archetype("rigidBody");

const eV = new Vector3();
const eP = new Vector3();
const oV = new Vector3();
const oP = new Vector3();
const r1f = 0.001;
const r2f = 0.01;
const r3f = 0.01;
const r4f = 0.01;
const v = new Vector3();
const v1 = new Vector3();
const v2 = new Vector3();
const r1 = new Vector3();
const r2 = new Vector3();
const r3 = new Vector3();
const r4 = new Vector3();
export const MovementSystem = () => {
  useFrame((_, dt) => {
    const l = 1 / withRigidBody.entities.length

    // rule 1
    r1.set(0, 0, 0);
    for (const entity of withRigidBody) {
      r1.add(entity.rigidBody?.translation())
    }
    r1.multiplyScalar(l).multiplyScalar(r1f);

    for (const entity of withRigidBody) {
      eP.copy(entity.rigidBody?.translation())
      r4.copy(eP.multiplyScalar(-r4f));

      // v.set(0,0,0)
      // v.copy(r1);
      //
      // r2.set(0, 0, 0);
      // r3.set(0, 0, 0);
      for (const other of withRigidBody) {
        if (other === entity) continue;

        oP.copy(other.rigidBody?.translation())
        const d2 = oP.distanceToSquared(eP);
        // const d2 = other.rigidBody?.translation().distanceToSquared(entity.rigidBody?.translation());
        if (d2 < 10000) {
          r2.add(eP.sub(oP).multiplyScalar(r2f/l));
        }
      }
      // v.add(r2.multiplyScalar(dt));
      //
      // // v.multiplyScalar(r1f);
      // // v.multiplyScalar(dt);
      //
      // //
      v.copy(entity.rigidBody?.linvel())
      v.add(r1);
      v.add(r2)
      v.add(r4);
      // v.add(entity.rigidBody.linvel());

      entity.rigidBody?.setLinvel(v);
    }
  }, RenderPriority);

  return null;
};
