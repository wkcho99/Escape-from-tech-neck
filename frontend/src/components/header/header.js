import React, { useState } from "react";
import "./header.css"
import {Link,BrowserRouter as Router} from 'react-router-dom';
import Modal from 'react-modal';
const customStyles = {
    content: {
        width: '18%',
        height: '60%',
        top:'11.5%',
        left: '72%',
        position:'absolute',
        border: '3px solid #09AA7C',
    },
  };
  Modal.setAppElement('#root');

const Header = (props) => {
    let sub;
    const [modalIsOpen, setIsOpen] = useState(false);
    const sound = props.sound;
    const setSound = props.setSound;
    const volume = props.volume;
    const setVolume = props.setVolume;
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        sub.style.color = '#033A2B';
      }
    
      function closeModal() {
        setIsOpen(false);
      }
      console.log(sound);
function soundChange(){
    var sel = document.getElementById("alertSound");
    var selval = sel.options[sel.selectedIndex].value;
    console.log(selval);
    setSound(selval);
}
function volumeChange(){
    var ran = document.getElementById("slider");
    ran.innerHTML = ran.value;
    console.log(ran.value);
    setVolume(ran.value);
}
    return (
        <div className="header">
            <div id = "title">
                <Link to = "/">
                ETN
                </Link>
            </div>
            <div id = "subtitle">
                escape from tech neck
            </div>
            <>
            <button className = "settingButton" onClick ={openModal}>
            </button>
            <Modal isOpen={modalIsOpen} style = {customStyles} onRequestClose={closeModal}>
                <div className="settings">Settings</div>
                <div className ="sounds">
                    Sounds
                    </div>
                    <ul>
                        <div className = "soundop">
                        <li>Alerting Sound</li>
                        <div className = "soundt">
                            <select name = "alert" id="alertSound" onChange={soundChange}>
                                <option value="sound1">sound1</option>
                                <option value="sound2">sound2</option>
                                <option value="sound3">sound3</option>
                                <option value="sound4">sound4</option>
                            </select>
                        </div>
                        <li>Volume</li>
                        <input type = "range" min = "0" max = "100" id = "slider" onChange={volumeChange}></input>
                        </div>
                    </ul>
                <div className ="break">
                    Break time
                    </div>
                    <ul>
                        <div className="breakop">
                        <li>alarm every</li>
                        </div>
                    </ul>
            </Modal>
            </>
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
        
    );
    
  };
export default Header