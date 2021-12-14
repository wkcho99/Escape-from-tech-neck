import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./step1.css"
const Step1 = () => {
  const [buttonName,setButtonName] = useState("next >>");
  var sensitivityRadio = document.getElementsByName('sensitivity');
  var positionRadio = document.getElementsByName('position');
  var sensitivityChoice = ""
  var positionChoice = ""

  const getValuesFromUser = function() {
    for (var i = 0; i < sensitivityRadio.length; i++) {       
        if (sensitivityRadio[i].checked) {
            sensitivityChoice = sensitivityRadio[i].value;
            break;
        }
    }
    for (var j = 0; j < positionRadio.length; j++) {       
      if (positionRadio[j].checked) {
        positionChoice = positionRadio[j].value;
        break;
      }
    }
    fetch( '/options', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      method: 'POST',
      body: JSON.stringify({ "sensitivity": sensitivityChoice,
                             "position": positionChoice })
    })
    .catch(error => console.log(error));
  }

    return (
        //<Router>
        <div className="start">
            <div className = "sideMenu">
            <div className = "step1"> STEP1</div>
            <div className = "step2"> STEP2</div>
            <div className = "step3"> STEP3</div>
            </div>
            <div className = "chooseOp">STEP 1. Choose Options</div>
            <div className = "step1Todo">
            <div className = "option"> 
                Sensitivity
                <div className = "options">
                  <div className = "high">
                      <input type = "radio" name = "sensitivity" value="high" /> High
                  </div> 
                  <div className = "middle">
                      <input type = "radio" name = "sensitivity" value="middle" /> Middle
                  </div> 
                  <div className = "low">
                      <input type = "radio" name = "sensitivity" value="low" /> Low
                  </div> 
                </div>
            </div>
            <div className = "option">
                The position of camera
                <div className = "options">
                <div className = "left">
                    <input type = "radio" name = "position" value="left"/> Left
                </div> 
                <div className = "right">
                    <input type = "radio" name = "position" value="right"/> Right
                </div> 
                </div>
            </div>
            <Link to = "/start/step2">
              <button className="startBut" onClick={getValuesFromUser}>
                {buttonName}
              </button>
            </Link>
            </div>
        </div>
        //</Router>
    );
  };
export default Step1