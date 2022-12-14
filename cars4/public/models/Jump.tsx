/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {}
  materials: {}
}

type ActionName = 'Root|0.Targeting Pose' | 'Root|Jump'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/jump.gltf') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="Root" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <group name="LeftFootCtrl" position={[0, 0, 0]} rotation={[-1.23, -1.57, 0]}>
              <group name="LeftFootRollCtrl" rotation={[Math.PI / 2, -0.78, -Math.PI / 2]}>
                <group name="LeftFootRollCtrl_end" />
              </group>
              <group name="LeftHeelRoll" rotation={[1.6, 0, 1.57]}>
                <group name="LeftToeRoll" rotation={[-0.77, -0.12, -2.97]}>
                  <group name="LeftFootIK" rotation={[-2.5, 0.16, -0.01]}>
                    <group name="LeftFootIK_end" />
                  </group>
                </group>
              </group>
              <group name="LeftKneeCtrl" position={[-0.01, -0.01, 0]} rotation={[-Math.PI, -1.57, 0]}>
                <group name="LeftKneeCtrl_end" />
              </group>
            </group>
            <group name="RightFootCtrl" position={[0, 0, 0]} rotation={[-1.22, -1.57, 0]}>
              <group name="RightFootRollCtrl" rotation={[Math.PI / 2, -0.63, -Math.PI / 2]}>
                <group name="RightFootRollCtrl_end" />
              </group>
              <group name="RightHeelRoll" rotation={[1.6, 0, 1.57]}>
                <group name="RightToeRoll" rotation={[-0.62, 0.15, 2.99]}>
                  <group name="RightFootIK" rotation={[-2.5, -0.09, 0.01]}>
                    <group name="RightFootIK_end" />
                  </group>
                </group>
              </group>
              <group name="RightKneeCtrl" position={[-0.01, -0.01, 0]} rotation={[-Math.PI, -1.57, 0]}>
                <group name="RightKneeCtrl_end" />
              </group>
            </group>
            <group name="HipsCtrl" position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, -3.14]}>
              <group name="Hips" position={[0, 0.01, 0]} rotation={[0.28, 0, 3.14]}>
                <group name="Spine" rotation={[-0.06, 0, 0]}>
                  <group name="Chest" rotation={[0.61, 0, 0]}>
                    <group name="UpperChest" rotation={[0.17, 0, 0]}>
                      <group name="Neck" rotation={[0.26, 0, 0]}>
                        <group name="Head" rotation={[-0.27, 0, 0.02]}>
                          <group name="Head_end" position={[0, 0.01, 0]} />
                        </group>
                      </group>
                      <group name="LeftShoulder" rotation={[-1.61, 0.36, -1.25]}>
                        <group name="LeftArm" rotation={[1.12, 1.44, -1.32]}>
                          <group name="LeftForeArm" rotation={[0.26, -0.43, -0.23]}>
                            <group name="LeftHand" position={[0, 0.01, 0]} rotation={[2.68, 1.52, -2.74]}>
                              <group name="LeftHandThumb1" rotation={[-1.74, 1.02, 2.27]}>
                                <group name="LeftHandThumb2" rotation={[0.41, -0.02, -0.03]}>
                                  <group name="LeftHandThumb2_end" />
                                </group>
                              </group>
                              <group name="LeftHandIndex1" rotation={[0.03, -0.16, 0]}>
                                <group name="LeftHandIndex2" rotation={[1.08, 0.25, 0.32]}>
                                  <group name="LeftHandIndex3" rotation={[0.85, -0.04, 0.05]}>
                                    <group name="LeftHandIndex3_end" />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                      <group name="RightShoulder" rotation={[1.96, 0.32, 1.54]}>
                        <group name="RightArm" rotation={[-2.82, -1.1, -3.03]}>
                          <group name="RightForeArm" rotation={[-0.33, -0.25, 0.01]}>
                            <group name="RightHand" position={[0, 0.01, 0]} rotation={[-0.01, 0.22, -0.07]}>
                              <group name="RightHandThumb1" rotation={[1.68, 0.48, 2.85]}>
                                <group name="RightHandThumb2" rotation={[-1.49, -0.11, -0.03]}>
                                  <group name="RightHandThumb2_end" />
                                </group>
                              </group>
                              <group name="RightHandIndex1" rotation={[-0.03, -0.16, 0]}>
                                <group name="RightHandIndex2" rotation={[-1.78, 0.27, -0.19]}>
                                  <group name="RightHandIndex3" rotation={[-0.34, -0.06, -0.02]}>
                                    <group name="RightHandIndex3_end" />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group name="LeftUpLeg" rotation={[2.68, 0.27, -0.39]}>
                  <group name="LeftLeg" position={[0, 0.01, 0]} rotation={[1.58, 0.41, 0.35]}>
                    <group name="LeftFoot" position={[0, 0.01, 0]} rotation={[-0.66, -0.01, -0.12]}>
                      <group name="LeftToes" rotation={[1.75, 0.09, -3.05]}>
                        <group name="LeftToes_end" />
                      </group>
                    </group>
                  </group>
                </group>
                <group name="RightUpLeg" rotation={[2.43, -0.35, 0.48]}>
                  <group name="RightLeg" position={[0, 0.01, 0]} rotation={[1.7, -0.49, -0.45]}>
                    <group name="RightFoot" position={[0, 0.01, 0]} rotation={[-0.65, -0.01, 0.17]}>
                      <group name="RightToes" rotation={[1.91, -0.08, 3.13]}>
                        <group name="RightToes_end" />
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/jump.gltf')
