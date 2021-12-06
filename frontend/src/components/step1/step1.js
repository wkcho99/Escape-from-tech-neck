import React, { useState } from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./step1.css"
const Step1 = () => {
  const [sensitivity, setSensitivity] = useState('')
  const [position, setPosition] = useState('')
  var sensitivityRadio = document.getElementsByName('sensitivity');
  var positionRadio = document.getElementsByName('position');
  var sensitivityChoice = ""
  var positionChoice = ""
  var state = {sensitivityChoice: "",
               positionChoice: ""};

  function getValuesFromUser() {
    for (var i = 0; i < sensitivityRadio.length; i++) {       
        if (sensitivityRadio[i].checked) {
            sensitivityChoice = sensitivityRadio[i].value;
            break;
        }
    }
    for (var i = 0; i < positionRadio.length; i++) {       
      if (positionRadio[i].checked) {
        positionChoice = positionRadio[i].value;
          break;
      }
    }
  }

  const sendOptions = (body) => {
    return fetch(`http://localhost:5000/options`,{
        'method':'POST',
         headers : {
        'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
    })
      // .then(response => response.json())
      // .catch(error => console.log(error))
  }

  // const insertArticle = () =>{
  //   APIService.sendOptions({title,body})
  //   .then((response) => props.insertedArticle(response))
  //   .catch(error => console.log('error',error))
  // }

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
            {/* <Link to = "/start/step2"> */}
                <input type = "button" className = "next" value="Next >>" onclick="getValuesFromUser()"/>
            {/* </Link> */}
            </div>
        </div>
        //</Router>
    );
    
  };
export default Step1
