import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./wakeup.css"
const Wakeup = () => {
    return (
        //<Router>
        <div className="exercise">
            <div className = "sideMenu">
            <Link to = "/exercise">
            <div className = "Neck2"> 
                Neck   
            </div>
            </Link>
            <Link to = "/exercise/back">
            <div className = "Back2"> 
                Back
            </div>
            </Link>
            <Link to = "/exercise/wakeup">
            <div className = "Wakeup2"> 
                Wakeup
            </div>
            </Link>
            </div>
            <div className = "videos">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/WIKrfIdPMGM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            </div>
        </div>
        //</Router>
    );
    
  };
export default Wakeup
