import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./step2.css"
const Step2 = (props) => {
    const alertt = props.alertt;
    const setAlertt = props.setAlertt;
    function setType(){
        var type = document.getElementsByName("type");
        console.log("type",type[0].value, "checked", type[0].checked);
        console.log("type",type[1].value, "checked", type[1].checked);
        if ((type[0].checked==true)&&(type[1].checked==true)) setAlertt(2);
        else if((type[0].checked==true)&&(type[1].checked==false)) setAlertt(0);
        else if((type[0].checked==false)&&(type[1].checked==true)) setAlertt(1);
        console.log("alert type:", alertt);
    }
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
                <input type = "button" className = "next" value="Next >>" onClick={setType}/>
            </Link>
            </div>
        </div>
        
        //</Router>
    );
    
  };
export default Step2
