import { useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Crate from "./models/TruckModel";

export function Bar3() {
  const { viewport } = useThree();

  return <ScrollControls horizontal pages={3}>
    <Scroll>{/*<DemoSphere position={p2} />*/}
      <Crate />
    </Scroll>
    <Scroll html>
    </Scroll>
  </ScrollControls>;
}
