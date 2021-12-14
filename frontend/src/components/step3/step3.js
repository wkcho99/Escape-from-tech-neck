import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import TestOverlay from "../camera/camera";
import "./step3.css"
const Step3 = (props) => {
    
    return (
        //<Router>
        <div className="start">
            <div className = "sideMenu">
              <div className = "step1_2"> STEP1</div>
              <div className = "step2_2"> STEP2</div>
              <div className = "step3_2"> STEP3</div>
            </div>
            <div className = "chooseOp">STEP 3. Connect the Camera</div>
            <div className = "step3Todo">
              <div className = "cam">
                <TestOverlay breaktime = {props.breaktime} usetime = {props.usetime} setUsetime = {props.setUsetime} sound = {props.sound} volume = {props.volume} alertt = {props.alertt} posture0 = {props.posture0} posture1 = {props.posture1} posture2 = {props.posture2} posture3 = {props.posture3} posture4 = {props.posture4} setPosture0 = {props.setPosture0} setPosture1 = {props.setPosture1} setPosture2 = {props.setPosture2} setPosture3 = {props.setPosture3} setPosture4 = {props.setPosture4}/>
              </div>
            </div>
        </div>
        
        //</Router>
    );
    
  };
export default Step3
