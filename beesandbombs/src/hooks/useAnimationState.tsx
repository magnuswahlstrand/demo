import React from 'react';

const STEP_COUNT = 4;

export function useAnimationState() {
    const [step, setStep] = React.useState(0);


    // (function loop() {
    //     // your logic here, where you can update the delay
    //     setStep((state) => (state + 1) % STEP_COUNT)
    //     // t = setTimeout(myFunction, ((step + 1) % STEP_COUNT === 0 ? 100 : 3000));
    //
    //     setTimeout(loop, 3000);
    // })();
    //
    React.useEffect(() => {
        const t = setInterval(
            () => setStep((state) => (state + 1) % STEP_COUNT),
            3000
        );
        return () => clearTimeout(t);
    }, []);

    return step;
}
