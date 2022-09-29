// https://www.youtube.com/watch?v=NiOGWZXBg4Y
// https://github.com/hmans/composer-suite/blob/main/apps/shader-composer-examples/src/examples/ForceField.tsx

import { Shader, ShaderMaster, useShader, useUniformUnit } from "shader-composer-r3f";

import { pipe } from "fp-ts/function";

import { Layers, useRenderPipeline } from "r3f-stage";
import { Color } from "three";
import { Sphere } from "@react-three/drei";
import {
  Add,
  Fresnel,
  GlobalTime,
  Mul,
  OneMinus,
  PerspectiveDepth,
  Saturate,
  ScaleAndOffset,
  ScreenUV,
  Smoothstep,
  Sub,
  Texture2D,
  UV,
  Vec2,
  VertexPosition
} from "shader-composer";
import { useControls } from "leva";
import { useRepeatingTexture } from "./common";

export const ForceField = (props) => {
  const controls = useControls("Force Field", {
    color: "cyan",
    intensity: { value: 3, min: 0, max: 10 },
    strength: { value: 0.5, min: 0, max: 1 }
  });

  /* Create a bunch of uniforms */
  const color = useUniformUnit("vec3", new Color(controls.color));
  const intensity = useUniformUnit("float", controls.intensity);
  const strength = useUniformUnit("float", controls.strength);
  const sampler2D = useUniformUnit(
    "sampler2D",
    useRepeatingTexture("/hexgrid.jpeg")
  );

  const { depth: depthTexture } = useRenderPipeline();
  const depthSampler = useUniformUnit("sampler2D", depthTexture);

  /* Define our shader */
  const shader = useShader(() => {
    /* Define a time-based texture offset, and sample the force field texture. */
    const time = GlobalTime;
    const textureOffset = Vec2([Mul(time, 0.01), Mul(time, 0.02)]);
    const texture = Texture2D(
      sampler2D,
      ScaleAndOffset(UV, Vec2([4, 2]), textureOffset)
    );

    /* Get the depth of the current fragment. */
    const sceneDepth = PerspectiveDepth(ScreenUV, depthSampler);

    const distance = pipe(
      VertexPosition.view.z,
      (v) => Add(v, 0.5),
      (v) => Sub(v, sceneDepth),
      (v) => Smoothstep(0, 1, v)
    );

    return ShaderMaster({
      emissiveColor: Mul(color, intensity),

      alpha: pipe(
        distance,
        (v) => OneMinus(v),
        (v) => Mul(v, strength),
        (v) => Add(v, Mul(texture.x, 0.01)),
        (v) => Add(v, Fresnel({ power: 2 })),
        (v) => Saturate(v)
      )
    });
  }, []);


  console.log("yeah3");


  return <Sphere args={[1, 32]} {...props} layers-mask={1 << Layers.TransparentFX}>
    <meshStandardMaterial transparent depthWrite={false}>
      <Shader {...shader} />
    </meshStandardMaterial>
  </Sphere>;
};
