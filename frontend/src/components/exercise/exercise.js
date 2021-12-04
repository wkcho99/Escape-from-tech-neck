import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./exercise.css"
const Exercise = () => {
    return (
        //<Router>
        <div className="exercise">
            <div className = "sideMenu">
            <Link to = "/exercise">
            <div className = "Neck"> 
                Neck   
            </div>
            </Link>
            <Link to = "/exercise/back">
            <div className = "Back"> 
                Back
            </div>
            </Link>
            <Link to = "/exercise/wakeup">
            <div className = "Wakeup"> 
                Wakeup
            </div>
            </Link>
            </div>
            <div className = "videos">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/FMOISIlhLEY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/3aTPapvWpKs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        //</Router>
    );
    
  };
export default Exercise
