import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css"
import sound1_ from '../../sound1.mp3'
import sound2_ from '../../sound2.MP3'
import sound3_ from '../../sound3.mp3'
import sound4_ from '../../sound4.mp3'
import Swal from 'sweetalert2'

let toggle = "stop";
let start,end;
let posture0,posture1,posture2,posture3,posture4;
let usetime,breaktime;
let sound, alertt, volume;
  const TestOverlay = (props) => {
    sound = props.sound;
    alertt = props.alertt;
    volume = props.volume;
    usetime = props.usetime;
    breaktime = props.breaktime;
    const sound1 = new Audio(sound1_);
    const sound2 = new Audio(sound2_);
    const sound3 = new Audio(sound3_);
    const sound4 = new Audio(sound4_);
    posture0 = props.posture0;
    posture1 = props.posture1; 
    posture2 = props.posture2;
    posture3 = props.posture3;
    posture4 = props.posture4;
    const setUsetime = props.setUsetime;
    const setPosture0 = props.setPosture0;
    const setPosture1 = props.setPosture1;
    const setPosture2 = props.setPosture2;
    const setPosture3 = props.setPosture3;
    const setPosture4 = props.setPosture4;
    //const [posture, setPosture] = useState(3);
    var posture = 0;
    const [buttonName,setButtonName] = useState("start tracking");
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    console.log("i'm here", sound,volume);
    const [result, setResult] = useState("");
    const canvasRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    const goAlert = (result) =>{
      posture = 0;
      console.log("goalert", alertt);
      if(alertt==0) alertSound();
      else if(alertt == 1) alertPop(result);
      else
      {
        alertSound();
        alertPop(result);
      }
    }
    const checkBreak =( )=>{
      var now = new Date();
      var temp = (now -start)/60000;
      if(breaktime != 0){
        if(temp>=breaktime){
          alertSound();
          alertBreak();
        }
      } 
    }
    const checkPos = (text) => {
      console.log("result:",text)
              //if bad posture 
              if(text != "0") 
              {
                console.log("alert type" , alertt);
                console.log("sound",sound);
                console.log("bad",posture);
                posture = posture +1;
                console.log("bad after",posture);
                if(text == "1") {
                  setPosture1(posture1+1);
                  console.log( "posture 1 ", posture1);
                }
                else if(text == "2") {
                  setPosture2(posture2+1);
                  console.log( "posture 2 ", posture2);
                }
                else if(text == "3") {
                  setPosture3(posture3+1);
                  console.log( "posture 3 ", posture3);
                }
                else if(text == "4") {
                  setPosture4(posture4+1);
                  console.log( "posture 4 ", posture4);
                }
              }
              //else
              else {
                posture = 0;
                setPosture0(posture0=>posture0+1);
                console.log( "posture 0 ", posture0);
              }
              console.log(posture);
              //if bad posture for 3 times, alert
              if(posture >= 3) goAlert(text);
    }
    const alertSound =()=>{
      if(sound === "sound1") {
        console.log("alert:",sound, volume);
        sound1.volume = volume/100;
        sound1.play();
        sound1.loop = false;
      }
      if(sound === "sound2") {
        console.log("alert:",sound, volume);
        sound2.volume = volume/100;
        sound2.play();
        sound2.loop = false;
      }
      if(sound === "sound3") {
        console.log("alert:",sound, volume);
        sound3.volume = volume/100;
        sound3.play();
        sound3.loop = false;
      }
      if(sound === "sound4") {
        console.log("alert:",sound, volume);
        sound4.volume = volume/100;
        sound4.play();
        sound4.loop = false;
      }
    }
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
        checkBreak();
        if(toggle == "stop"){
          return () => clearInterval(interval);
        } 
        else {
          captureImageFromCamera();

          if (imageRef.current) {
            const formData = new FormData();
            formData.append('image', imageRef.current);
            const response = await fetch('/classify', {
              method: "POST",
              body: formData,
            });
            if (response.status === 200) {
              
              const text = await response.text();
              setResult(text);
              checkPos(text);

            } else {
              setResult("Error from API. ");
            }
          }
        }
      }, 5000); // <- interval in ms
      return () => clearInterval(interval);
    }, []);
    
    function printPos(result){
      console.log("printpos", result);
      if(result=="0") return "good"
      else if (result=="1") return "tech-neck"
      else if (result == "2") return "leaning"
      else if( result == "3") return "sleeping"
      else if( result == "4")return "resting in chin"
    }
    function alertPop(result){
      console.log("alert pop", result);
      var str = "You are in "+"\""+printPos(result)+"\""+" posture";
      Swal.fire({
        title: 'Bad Posture Detected!',
        text: str,
        icon: 'warning',
        showCancelButton : false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#FC5D5D',
      })
    }
    function alertBreak(){
      console.log("alert break");
      Swal.fire({
        title: 'Break Time!!',
        text: 'take a break and do exercise',
        icon : 'info',
        showCancelButton : false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#FC5D5D',
      })
    }
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
        start = new Date();
        console.log("start",start);
      }
      else if(toggle=="start") {
        toggle = "stop";
        setButtonName("start tracking");
        end = new Date();
        console.log("end", end);
        var temp = end-start;
        console.log("temp, usetime",temp,usetime);
        setUsetime(usetime+temp);
        console.log("usetime",usetime);
      }
    }
  
    return (
      <>
        <main>
          <video ref={videoRef} onCanPlay={() => playCameraStream()} id="video" />
          <canvas ref={canvasRef} hidden></canvas>
          <p>Currently seeing: {printPos(result)}</p>
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