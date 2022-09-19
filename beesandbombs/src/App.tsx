import {Canvas} from '@react-three/fiber';
import {Box} from "./components/Box";

export default function Scene() {
    return (
        <Canvas dpr={window.devicePixelRatio}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, 0]} />
        </Canvas>
    );
}
