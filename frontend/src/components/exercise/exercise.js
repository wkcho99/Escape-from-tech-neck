import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./exercise.css"
const Exercise = () => {
    return (
        //<Router>
        <div className="main">
            <div className = "sideMenu">
            <div className = "step1"> STEP1</div>
            <div className = "step2"> STEP1</div>
            <div className = "step3"> STEP1</div>
            </div>
            <Link to = "/start">
            <button className = "startButton"> START</button>
            </Link>
            STEP 1. Choose Options
            <div className = "step1Todo">
            
            </div>
        </div>
        //</Router>
    );
    
  };
export default Exercise
