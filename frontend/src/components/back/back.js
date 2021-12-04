import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./back.css"
const Back = () => {
    return (
        //<Router>
        <div className="exercise">
            <div className = "sideMenu">
            <Link to = "/exercise">
            <div className = "Neck1"> 
                Neck   
            </div>
            </Link>
            <Link to = "/exercise/back">
            <div className = "Back1"> 
                Back
            </div>
            </Link>
            <Link to = "/exercise/wakeup">
            <div className = "Wakeup1"> 
                Wakeup
            </div>
            </Link>
            </div>
            <div className = "videos">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/_RXjbRdiFBs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Eb2-LK3tc5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        //</Router>
    );
    
  };
export default Back
