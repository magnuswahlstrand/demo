import {Suspense, useEffect, useRef, useState} from 'react'
import './App.css'
import * as poseDetection from '@tensorflow-models/pose-detection';
import {PoseDetector} from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import {drawKeypoints, drawSkeleton} from "./utilities";


const Loading = () => {
    return <div>Loading</div>
}


const model = poseDetection.SupportedModels.MoveNet;

const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
};


const Model = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const detectWebcamFeed = async (detector: PoseDetector) => {
        if ( // make sure webcam are avaliable
            // typeof webcamRef.current !== "undefined" &&
            // webcamRef.current !== null &&
            webcamRef.current && webcamRef.current.video.readyState === 4
        ) {
            // Grab Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            // Adjust video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
// Make Estimation
            const poses = await detector.estimatePoses(video);// as HTMLVideoElement);
            console.log("in here")
            if (poses.length > 0) {
                console.log(poses[0])
                drawResult(poses[0], video, videoWidth, videoHeight, canvasRef);
            }

            // const pose = await posenet_model.estimateSinglePose(video);
        }
    }

    useEffect(() => {
        // declare the data fetching function
        // const fetchData = async () => {
        //     const detector = await poseDetection.createDetector(model);
        //     const poses = await detector.estimatePoses(document.getElementById('poses') as HTMLVideoElement);
        //     console.log(poses)
        // }
        //
        // // call the function
        // fetchData()
        //     // make sure to catch any error
        //     .catch(console.error);

        const runMoveNet = async () => {
            const detector = await poseDetection.createDetector(model);
            //
            setInterval(() => {
                detectWebcamFeed(detector);
            }, 100);
        };
        runMoveNet();
    }, [])


    // const poses = await detector.estimatePoses(image);

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    )
}

const WebcamComponent = () => <Webcam videoConstraints={{deviceId: 1}}/>;

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <h2>Preview</h2>
                <Model/>
            </Suspense>
            {/*<WebcamComponent/>*/}
            {/*<img src={"poses.jpeg"} id="poses"/>*/}
        </>
    )
}

export default App
