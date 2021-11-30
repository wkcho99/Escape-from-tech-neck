import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import TestOverlay from "../camera/camera";
import "./step3.css"
const Step3 = () => {
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
            <TestOverlay/>
            </div>
            <Link to = "/start">
                <input type = "button" className = "connect" value="Connect >>"/>
            </Link>
            </div>
        </div>
        
        //</Router>
    );
    
  };
export default Step3
