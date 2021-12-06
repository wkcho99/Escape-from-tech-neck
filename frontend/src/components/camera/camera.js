import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css"
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: 650,
    height: 520,
    facingMode: "user"
  };
  let playAlert;
  let toggle = "stop";

  const TestOverlay = () => {
    const [buttonName,setButtonName] = useState("start tracking");
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const [result, setResult] = useState("");
    const canvasRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    
    // Get camera feed
    useEffect(() => {
      async function getCameraStream() {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });
    
        if (videoRef.current) {      
          videoRef.current.srcObject = stream;
        }
      };
    
      getCameraStream();
    }, []);

    // Send iage to API
    useEffect(() => {
      const interval = setInterval(async () => {
        captureImageFromCamera();

        if (imageRef.current) {
          const formData = new FormData();
          formData.append('image', imageRef.current);

          const response = await fetch('/classify', {
            method: "POST",
            body: formData,
          });

          // setResult(response.status)

          if (response.status === 200) {
            const text = await response.text();
            setResult(text);
          } else {
            setResult("Error from API. ");
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const playCameraStream = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const captureImageFromCamera = () => {
      const context = canvasRef.current.getContext('2d');
      const { videoWidth, videoHeight } = videoRef.current;
  
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
  
      context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
  
      canvasRef.current.toBlob((blob) => {
        imageRef.current = blob;
      })
    };

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    console.log("play",playAlert);
    const func1 = () =>{
        capture();
    }

    const toggleAlert=function(){
      if(toggle=="stop") {
        startAlert();
        toggle = "start";
        setButtonName("stop tracking");
      }
      else if(toggle=="start") {
        stopAlert();
        toggle = "stop";
        setButtonName("start tracking");
      }
    }

    const startAlert = function() {
        playAlert = setInterval(func1, 10000);
        console.log("start",playAlert);
      };

    const stopAlert = function() {
        console.log("stop",playAlert);
        clearInterval(playAlert);
      };
  
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints = {videoConstraints}
          screenshotFormat="image/jpeg"
        />
        <div className ="startTrack">
        <button className="startBut" onClick={toggleAlert}>
            {buttonName}
        </button>
        <main>
        <video ref={videoRef} onCanPlay={() => playCameraStream()} id="video" />
        <canvas ref={canvasRef} hidden></canvas>
        <p>Currently seeing: {result}</p>
      </main>
        </div>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };

  export default TestOverlay