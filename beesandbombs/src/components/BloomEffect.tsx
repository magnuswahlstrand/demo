import * as THREE from 'three';
import React, {useMemo} from 'react';
import {Effects as EffectsComposer} from '@react-three/drei';
import {extend, useThree} from '@react-three/fiber';
import {UnrealBloomPass} from 'three-stdlib';

extend({UnrealBloomPass});

export const BloomEffect = () => {
    const {size, scene, camera} = useThree();
    const aspect = useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size]
    );


    return (
        <EffectsComposer
            multisamping={4}
            renderIndex={1}
            disableGamma
            disableRenderPass
        >
            {/* @ts-ignore */}
            <renderPass attachArray="passes" scene={scene} camera={camera}/>
            {/* @ts-ignore */}
            <unrealBloomPass attachArray="passes" args={[aspect, 0.3, 1, 0]}/>
        </EffectsComposer>
    );
};
