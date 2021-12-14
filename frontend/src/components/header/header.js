import React, { useState } from "react";
import "./header.css"
import {Link,BrowserRouter as Router} from 'react-router-dom';
import Modal from 'react-modal';
import sound1_ from '../../sound1.mp3'
import sound2_ from '../../sound2.MP3'
import sound3_ from '../../sound3.mp3'
import sound4_ from '../../sound4.mp3'
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
  const sound1 = new Audio(sound1_);
  const sound2 = new Audio(sound2_);
  const sound3 = new Audio(sound3_);
  const sound4 = new Audio(sound4_);
const Header = (props) => {
    let sub;
    const [modalIsOpen, setIsOpen] = useState(false);
    const sound = props.sound;
    const setSound = props.setSound;
    const volume = props.volume;
    const setVolume = props.setVolume;
    const breaktime = props.breaktime;
    const setBreaktime = props.setBreaktime;
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
    if(selval === "sound1") {
        sound1.volume = volume/100;
        sound1.play();
        sound1.loop = false;
      }
      if(selval === "sound2") {
        sound2.volume = volume/100;
        sound2.play();
        sound2.loop = false;
      }
      if(selval === "sound3") {
        sound3.volume = volume/100;
        sound3.play();
        sound3.loop = false;
      }
      if(selval === "sound4") {
        sound4.volume = volume/100;
        sound4.play();
        sound4.loop = false;
      }
    console.log(selval);
    setSound(selval);
}
function volumeChange(){
    var ran = document.getElementById("slider");
    ran.innerHTML = ran.value;
    console.log(ran.value);
    setVolume(ran.value);
}
function breakChange(){
    var sel = document.getElementById("alertBreak");
    var selval = sel.options[sel.selectedIndex].value;
    if(selval === "break0") {
        setBreaktime(15);
      }
      if(selval === "break1") {
        setBreaktime(30);
      }
      if(selval === "break2") {
        setBreaktime(45);
      }
      if(selval === "break3") {
        setBreaktime(60);
      }
    console.log(selval);
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
                        <div className = "breakf">
                            <select name = "breakt" id="alertBreak" onChange={breakChange}>
                                <option value="">--set break time--</option>
                                <option value="break0">every 15 min</option>
                                <option value="break1">every 30 min</option>
                                <option value="break2">every 45 min</option>
                                <option value="break3">every 60 min</option>
                            </select>
                        </div>
                        </div>
                    </ul>
            </Modal>
            </>
            <div className = "menu">
            <a>
            <Link to ="/start/step1">
                Start
            </Link>
            </a>
            <a>
            <Link to ="/exercise">
                Exercise 
            </Link>
            </a>
            <a>
            <Link to ="/help">
                Help 
            </Link>
            </a>
            <a>
            <Link to ="/record">
                Record
            </Link>
            </a>
            </div>
            <hr/>
        </div>
        
    );
    
  };
export default Header