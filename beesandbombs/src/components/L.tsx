import React from "react";
import * as THREE from "three";
import TetrisBlock, {BlockProps} from "./TetrisBlock";

export function L(props: BlockProps) {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(1, 0);
        s.lineTo(2, 0);
        s.lineTo(2, 3);
        s.lineTo(0, 3);
        s.lineTo(0, 2);
        s.lineTo(1, 2);

        return s;
    }, []);
    return <TetrisBlock shape={shape} {...props}/>
}

export function T2(props: BlockProps) {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(2, 0);
        s.lineTo(2, -1);
        s.lineTo(3, -1);
        s.lineTo(3, 1);
        s.lineTo(2, 1);
        s.lineTo(2, 3);
        s.lineTo(1, 3);
        s.lineTo(1, 4);
        s.lineTo(0, 4);
        s.lineTo(0, 2);
        s.lineTo(1, 2);
        s.lineTo(1, 1);
        s.lineTo(0, 1);
        s.lineTo(0, 0);

        return s;
    }, []);
    return <TetrisBlock shape={shape} {...props}/>
}


export function P3(props: BlockProps) {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.lineTo(0, 5);
        s.lineTo(2, 5);
        s.lineTo(2, 4);
        s.lineTo(3, 4);
        s.lineTo(3, 0);

        return s;
    }, []);
    return <TetrisBlock shape={shape} {...props}/>
}


export function P4(props: BlockProps) {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.lineTo(1, 0);
        s.lineTo(1, 1);
        s.lineTo(0, 1);
        s.lineTo(0, 3);
        s.lineTo(-3, 3);
        s.lineTo(-3, 0);

        return s;
    }, []);
    return <TetrisBlock shape={shape} {...props}/>
}
