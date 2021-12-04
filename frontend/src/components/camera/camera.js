import React, { useState } from "react";
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