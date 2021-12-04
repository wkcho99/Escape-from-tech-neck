import React, { useState } from "react";
import "./help.css"

const Help = () => {
    function startClick(e){
        window.location.href = "/start"
    }
    return (
        //<Router>
            <div className = "help">
            <div className = "howto">How To Use</div>
            <hr/>
            <p/>
            describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe   
            <p/>
            <div className = "subhelp">Start</div>
            <p/>
            describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe   
            <p/>
            <div className = "subhelp">Exercise</div>
            <p/>
            describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe   
            <p/>
            <div className = "subhelp">Record</div>
            <p/>
            describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe describe   
            <p/>
            </div>
        //</Router>
    );
    
  };
export default Help
