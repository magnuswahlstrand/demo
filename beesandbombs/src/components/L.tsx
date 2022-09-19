import React from "react";
import * as THREE from "three";
import TetrisBlock from "./TetrisBlock";


const SIDE = 1;
export default function L() {
    const shape = React.useMemo(() => {
        const _shape = new THREE.Shape();

        _shape.moveTo(0, 0);
        _shape.lineTo(SIDE, 0);
        _shape.lineTo(SIDE, SIDE * 2);
        _shape.lineTo(0, SIDE * 2);
        _shape.lineTo(0, SIDE * 3);
        _shape.lineTo(-SIDE, SIDE * 3);
        _shape.lineTo(-SIDE, SIDE);
        _shape.lineTo(0, SIDE);

        return _shape;
    }, []);
    return <TetrisBlock shape={shape}/>
}
