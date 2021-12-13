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
  const data = {
    datasets: [
        {
          type: 'bar',
          label: 'Your Posture Record',
          backgroundColor: '#09AA7C',
          data: [
            { x: 'good', y: 60 },
            { x: 'tech-neck', y: 20 },
            { x: 'leaned', y: 10 },
            { x: 'sleeping', y: 2 },
            { x: 'resting in chin', y: 3 }
          ],
          borderWidth: 0,
        },
        
      ],
  };

const Record = () => {
  return (
    <div className='chart'>
        Study Time:
        <br/>
        Good Posture:
        <br/>
        Recommended Exercise : 
        <br/>
      <Line type="line" data={data} options={options} legend = {legend}/>
    </div>
  );
};

export default Record;
