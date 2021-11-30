import React, { useState } from "react";
import "./header.css"
import {Link,BrowserRouter as Router} from 'react-router-dom';

const Header = () => {
    function settingClick(e){
        window.location.href = "/start"
    }
    return (
        //<Router>
        <div className="header">
            <div id = "title">
                <Link to = "/">
                ETN
                </Link>
            </div>
            <div id = "subtitle">
                escape from tech neck
            </div>
            <Link to = "/setting">
            <button className = "settingButton" onclick ={settingClick}></button>
            </Link>
            <div className = "menu">
            <div class = "option">
            <Link to ="/start/step1">
                Start
            </Link>
            </div>
            <div class = "option">
            <Link to ="/exercise">
                Exercise 
            </Link>
            </div>
            <div class = "option">
            <Link to ="/help">
                Help 
            </Link>
            </div>
            <div class = "option">
            <Link to ="/record">
                Record
            </Link>
            </div>
            </div>
            <hr/>
        </div>
        //</Router>
    );
    
  };
export default Header
