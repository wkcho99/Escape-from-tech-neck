import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css"

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
        if(toggle == "stop"){
          return () => clearInterval(interval);
        } else {
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
        }
      }, 1000); // <- interval in ms
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

    const toggleAlert=function(){
      if(toggle=="stop") {
        toggle = "start";
        setButtonName("stop tracking");
      }
      else if(toggle=="start") {
        toggle = "stop";
        setButtonName("start tracking");
      }
    }
  
    return (
      <>
        <main>
          <video ref={videoRef} onCanPlay={() => playCameraStream()} id="video" />
          <canvas ref={canvasRef} hidden></canvas>
          <p>Currently seeing: {result}</p>
        </main>
        <div className ="startTrack">
          <button className="startBut" onClick={toggleAlert}>
              {buttonName}
          </button>
          
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