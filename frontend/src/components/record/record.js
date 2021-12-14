import React from 'react'
import { Line,Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import "./record.css"
Chart.register(...registerables);
const legend = {
    display: false,
  };
const options = {
    spanGaps: true,
    maxBarThickness: 30,
    grouped: true,
    interaction: {
      mode: 'index',
    },
  };

let pro0,pro1,pro2,pro3,pro4;
const Record = (props) => {
    var usetime = props.usetime;
    var posture0 = props.posture0;
    var posture1 = props.posture1; 
    var posture2 = props.posture2;
    var posture3 = props.posture3;
    var posture4 = props.posture4;
    console.log( "posture 0 ", posture0);
    console.log( "posture 1 ", posture1);
    
    const calpro = function(){
      
      var tot = posture0 + posture1 + posture2 + posture3 + posture4;
      console.log( "posture 0 ", posture0);
    console.log( "posture 1 ", posture1);
    console.log("total:",tot);
      pro0 = posture0/tot;
      pro1 = posture1/tot;
      pro2 = posture2/tot;
      pro3 = posture3/tot;
      pro4 = posture4/tot;
      console.log(pro0 , pro1, pro2, pro3, pro4);
      return [pro0 , pro1, pro2, pro3, pro4];
    }
    const caltime = function(){
      var hr = parseInt(usetime/3600000);
      var min = parseInt(usetime/60000);
      var sec = parseInt(usetime/1000);
      return hr+" hr "+min+" min "+sec+" sec ";
    }
    const recomm = function(){
      var maxvar = Math.max(posture1 , posture2 , posture3 , posture4);
      if(maxvar == posture1) return "Neck"
      else if(maxvar == posture2) return "Back"
      else if(maxvar == posture3) return "Wakeup"
      else if(maxvar == posture4) return "Neck"
    }
    const data = {
      datasets: [
          {
            type: 'bar',
            label: 'Your Posture Record',
            backgroundColor: '#09AA7C',
            data: [
              { x: 'good', y: calpro()[0] },
              { x: 'tech-neck', y: calpro()[1] },
              { x: 'leaned', y: calpro()[2] },
              { x: 'sleeping', y: calpro()[3] },
              { x: 'resting in chin', y: calpro()[4] }
            ],
            borderWidth: 0,
          },
          
        ],
    };
  return (
    <div className='chart'>
        Study Time: 
        {caltime()}
        <br/>
        Good Posture: 
        {posture0}
        times
        <br/>
        Recommended Exercise : 
        {recomm()}
        <br/>
        
      <Line type="line" data={data} options={options} legend = {legend}/>
    </div>
  );
};

export default Record;
