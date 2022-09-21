import {Canvas} from "@react-three/fiber";


export const Setup = ({
                          children,
                          cameraPosition: position = [2, 2, 2]
                      }: React.PropsWithChildren<{ cameraPosition?: [number, number, number] }>) => (
    <Canvas dpr={window.devicePixelRatio} camera={{position}}>
        <color attach="background" args={["black"]}/>
        <pointLight position={[10, 10, 10]}/>
        {children}
    </Canvas>
)
