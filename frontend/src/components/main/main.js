import React, { useState } from "react";
import {Link,Route,BrowserRouter as Router} from 'react-router-dom';
import "./main.css"

const Main = () => {
    function startClick(e){
        window.location.href = "/start"
    }
    return (
        //<Router>
        <div className="main">
            <div className = "thumbnail">
            &nbsp;&nbsp;Whenever You have<br/>
            &nbsp;&nbsp;Bad Posture, I’ll Tell You
            </div>
            <Link to = "/start/step1">
            <button className = "startButton" onclick ={startClick}> START</button>
            </Link>
            <div className = "about">
            <div id = "aboutTitle">About ETN</div>
            <hr/>
            <p/>
            &nbsp; ETN(Escape from Tech Neck) is an application that provides you a healthy study environment, more specifically, a good posture while working with a computer. Our goal is to improve your posture, and thus avoiding unnecessary pain in the neck and back area.<br/> 
            &nbsp; The application can detect five different postures, which is, straight posture, tech neck, leaning posture, sleeping posture and resting the chin on hand. The straight posture is considered as good posture and the others are classified as bad postures. <br/> 
            &nbsp; If ETN detects your bad posture, it will alert you by sound or pop-up. You can also set the break time. <br/>
            &nbsp; Study healthy with ETN! <br/>
            </div>
            
        </div>
        //</Router>
    );
    
  };
export default Main
