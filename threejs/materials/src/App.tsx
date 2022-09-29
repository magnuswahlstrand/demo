import { Float, KeyboardControls, OrbitControls, Sphere, useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import * as RC from "render-composer";
import { First1 } from "./components/First1";


const getMaterials = () => {
  const texture = useTexture("./Texture_Atlas.png");

  const materials = [];

  materials.push(new THREE.MeshLambertMaterial({ map: texture, transparent: true }));
  materials.push(new THREE.MeshLambertMaterial({ color: 0xdddddd, shading: THREE.FlatShading }));
  materials.push(new THREE.MeshPhongMaterial({
    ambient: 0x030303,
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    shading: THREE.FlatShading
  }));
  materials.push(new THREE.MeshNormalMaterial());
  materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending }));
  //materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) );

  materials.push(new THREE.MeshLambertMaterial({ color: 0xdddddd, shading: THREE.SmoothShading }));
  materials.push(new THREE.MeshPhongMaterial({
    ambient: 0x030303,
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    shading: THREE.SmoothShading,
    map: texture,
    transparent: true
  }));
  materials.push(new THREE.MeshNormalMaterial({ shading: THREE.SmoothShading }));
  materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true }));

  materials.push(new THREE.MeshDepthMaterial());

  materials.push(new THREE.MeshLambertMaterial({
    color: 0x666666,
    emissive: 0xff0000,
    ambient: 0x000000,
    shading: THREE.SmoothShading
  }));
  materials.push(new THREE.MeshPhongMaterial({
    color: 0x000000,
    specular: 0x666666,
    emissive: 0xff0000,
    ambient: 0x000000,
    shininess: 10,
    shading: THREE.SmoothShading,
    opacity: 0.9,
    transparent: true
  }));

  materials.push(new THREE.MeshBasicMaterial({ map: texture, transparent: true }));

  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 0.5, metalness: 1.0 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 0.5, metalness: 0.5 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 0.5, metalness: 0 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 0.0, metalness: 0 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 0.0, metalness: 0 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 1, metalness: 0 }));
  materials.push(new THREE.MeshStandardMaterial({ color: 0xffafaf, roughness: 1, metalness: 1 }));
  return materials;
};

const Scene = () => {

  const width = 5;

  const materials = getMaterials();
  return (<>
    {materials.map((material, i) => {
      const y = Math.floor(i / width);
      const x = (i % width);
      return <Sphere args={[1, 32]} position={[(x - width / 2 + 0.5) * 2.5, y * 2.5, 0]} material={material} />;
    })}
  </>);
};

export default function App() {
  console.time("render");
  return (
    // <Canvas shadows dpr={[1, 2]}>

    <RC.Canvas>
      <RC.RenderPipeline>
        {/*<ambientLight intensity={1} />*/}
        {/*<directionalLight intensity={5} position={[-10, -10, -10]} color="white" />*/}
        {/*/!*<Scene />*!/*/}
        {/*<ForceField />*/}
        <KeyboardControls
          map={[
            { name: 'jump', keys: ['Space'] },
          ]}>
        <Float floatIntensity={1} speed={4}>

          <First1 />
          <Sphere args={[0.5, 32]} >
            <meshBasicMaterial color="red" />
          </Sphere>
        </Float>

        </KeyboardControls>

        {/*<Environment preset={"city"} background={true} />*/}
        {/*/!*<Environment files="/adamsbridge.hdr" />*!/*/}
        <axesHelper args={[2]} />
        <OrbitControls />
        {/*<Effects />*/}
        {/*<Sky />*/}
      </RC.RenderPipeline>
    </RC.Canvas>
  );
}
