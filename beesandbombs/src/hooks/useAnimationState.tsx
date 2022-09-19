import React from 'react';

const STEP_COUNT = 3;

export function useAnimationState() {
    // const [step] = useState(null);
    const [step, setStep] = React.useState(0);
    const ref = React.useRef({step: 0});


    React.useEffect(() => {
        (function loop() {
            // your logic here, where you can update the delay
            ref.current.step = (ref.current.step + 1) % STEP_COUNT;
            setStep(ref.current.step);
            // setStep((state) => (state + 1) % STEP_COUNT)
            // t = setTimeout(myFunction, ((step + 1) % STEP_COUNT === 0 ? 100 : 3000));

            let   delay = 3000;
            if(ref.current.step === 0) {
                delay = 10
            }
            if(ref.current.step === 3) {
                delay = 200
            }
            // const nextInvocation = ref.current.step === 0 || ref.current.step === 3 ? 100 : 3000
            console.log(`set to ${ref.current.step}, will be called again in ${delay}`);
            setTimeout(loop, delay);
        })();
    }, []);

    // console.log('updated', ref.current.step)
    return step
}
