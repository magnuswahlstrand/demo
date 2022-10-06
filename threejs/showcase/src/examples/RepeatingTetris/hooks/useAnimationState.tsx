import React from 'react';

const STEP_COUNT = 4;

export function useAnimationState() {
    const [step, setStep] = React.useState(0);
    const ref = React.useRef({step: 0});


    React.useEffect(() => {
        // Yeah, this is not pretty :-) but it works
        (function loop() {
            ref.current.step = (ref.current.step + 1) % STEP_COUNT;
            setStep(ref.current.step);

            let   delay: number
            switch (ref.current.step) {
                case 0:
                    delay = 10;
                    break
                case 3:
                    delay = 1500;
                    break
                default:
                    delay = 3000;
            }

            console.log(`set to ${ref.current.step}, will be called again in ${delay}`);
            setTimeout(loop, delay);
        })();
    }, []);

    return step
}
