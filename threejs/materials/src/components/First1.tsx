// https://www.youtube.com/watch?v=NiOGWZXBg4Y
// https://github.com/hmans/composer-suite/blob/main/apps/shader-composer-examples/src/examples/ForceField.tsx

import { Shader, ShaderMaster, useShader, useUniformUnit } from "shader-composer-r3f";

import { pipe } from "fp-ts/function";

import { Layers } from "r3f-stage";
import { Color, RepeatWrapping, TextureLoader } from "three";
import { Sphere, useKeyboardControls } from "@react-three/drei";
import {
  Add,
  Fresnel,
  GlobalTime,
  Mul,
  OneMinus,
  Saturate,
  ScaleAndOffset,
  Smoothstep,
  Texture2D,
  UV,
  Vec2,
  VertexPosition
} from "shader-composer";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const globalTexture = new TextureLoader().load("/hexgrid.jpeg");
globalTexture.wrapS = RepeatWrapping;
globalTexture.wrapT = RepeatWrapping;

export const First1 = (props) => {
  const [sub, get] = useKeyboardControls();


  // const texture = useTexture('/hexgrid.jpeg');
  const [controls, set] = useControls(() => ({
    color: "cyan",
    intensity: { value: 3, min: 0, max: 10 },
    strength: { value: 0.5, min: 0, max: 1 }
  }));

  useFrame(() => {

    const pressed = get().jump;

    if (pressed) {
      set({ intensity: 3 });
    } else {
      set({ intensity: 0 });
    }
  });

  const sampler2D = useUniformUnit(
    "sampler2D",
    globalTexture
  );

  /* Create a bunch of uniforms */
  const color = useUniformUnit("vec3", new Color(controls.color));
  const intensity = useUniformUnit("float", controls.intensity);

  /* Define our shader */
  const shader = useShader(() => {
    const time = GlobalTime;

    const textureOffset = Vec2([Mul(time, 0.01), Mul(time, 0.02)]);
    const texture = Texture2D(
      sampler2D,
      ScaleAndOffset(UV, Vec2([1, 0.5]), textureOffset)
    );


    const distance = pipe(
      VertexPosition.view.z,
      (v) => Add(v, 0.4),
      (v) => Smoothstep(0, 1, v)
    );

    return ShaderMaster({
      emissiveColor: Mul(color, intensity),
      alpha: pipe(
        1,
        (v) => OneMinus(v),
        (v) => Mul(v, 0.6),
        (v) => Add(v, Mul(texture.x, 0.01)),
        (v) => Add(v, Fresnel({ power: 3 })),
        (v) => Saturate(v)
      )
    });
  }, []);


  console.log("yeah");

  return (
    <Sphere args={[1, 32]} {...props} layers-mask={1 << Layers.TransparentFX}>
      <meshStandardMaterial transparent depthWrite={false}>
        <Shader {...shader} />
      </meshStandardMaterial>
    </Sphere>);
};
