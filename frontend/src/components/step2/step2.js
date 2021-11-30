import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./step2.css"
const Step2 = () => {
    return (
        //<Router>
        <div className="start">
            <div className = "sideMenu">
            <div className = "step1_1"> STEP1</div>
            <div className = "step2_1"> STEP2</div>
            <div className = "step3_1"> STEP3</div>
            </div>
            <div className = "chooseOp">STEP 2. Choose alerting type</div>
            <div className = "step2Todo">
                <div className ="sound">
                <input type = "checkbox" name="type" value="Sound"/> Sound 
                </div>
                <div className ="pop-up">
                <input type = "checkbox" name="type" value="Pop-up"/> Pop-up 
                </div>
            <Link to = "/start/step3">
                <input type = "button" className = "next" value="Start Tracking"/>
            </Link>
            </div>
        </div>
        
        //</Router>
    );
    
  };
export default Step2
