import React from 'react';

const STEP_COUNT = 4;

export function useAnimationState() {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        if (step === STEP_COUNT - 1) {
            return
        }
        const t = setInterval(
            () => setStep((state) => (state + 1) % STEP_COUNT),
            1000
        );
        return () => clearTimeout(t);
    }, []);

    return step;
}
