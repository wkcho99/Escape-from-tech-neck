import React, { useState } from "react";
import "./help.css"

const Help = () => {
    return (
        //<Router>
            <div className = "help">
            <div className = "howto">How To Use</div>
            <hr/>
            <p/>
              To use <b> Escape From Teck Neck </b>, simply follow the 3 steps under the <i> Start </i> button. 
            <p/>
            <div className = "subhelp">Start</div>
            <p/>
            <strong> The first step </strong> requires you to select the sensitivity and position of the camera you are using. 
            The sensitivity describes how sensitive our machine learning model we created is to your current posture, and for our model to correctly 
            mesure your posture, it needs to know if you positioned your camera to the left- or right side of you. 
            (line break)
            test
            <strong> The second step </strong> prompts you to chose how yo want to be alerted - by sound and/or pop-up. 
            (line break)
            Finally, <strong> the third step </strong> will record your posture, and inform you if you are in a bad posture. You should stay on this 
            step to allow it to record your posture. 
            <p/>
            <div className = "subhelp">Exercise</div>
            <p/>
            We offer different exercises to you, to ease and help the pain you experience, when staying in a bad posture for a prolonged amount of time. 
            The exercises target at the neck and back, depending on where your pain is located. There is also a <it> Wakeup </it> section which is a good and short 
            stretching program that targets the important joints. 
            (Line break)
            Please note, that we are not affiliated with any of these creators, and that we have no knowledge compareable to a chiropractor. 
            <p/>
            <div className = "subhelp">Record</div>
            <p/>
            The recording takes a photo of you every 10 seconds, and sends it to our trained model. Afterwards, the result from the mmodel will be shown to you. 
            It is important to note, that no photo will be saved in our database. In fact, this website uses no database, so your photo will only be saved tempoarily and 
            is removed for every new photo taken. 
            <p/>
            </div>
        //</Router>
    );
    
  };
export default Help
