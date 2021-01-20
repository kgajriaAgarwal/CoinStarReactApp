import React, { useRef, useEffect, useState } from 'react';
import chartjs from 'chart.js';
import { HitoryOptions } from '../ChartConfigs/ChartConfigs';
// import moment from 'moment';


const HistoryChart = ({data}) => {
  const chartRef = useRef();
  const [timeFormat, setTimeFormat] = useState("24h");
  //lets destructure data
  
  // console.log('data is:', data);
  const {day, week,year,detail} = data;
  let x_axis;
  let x_axis_labels = [];
  //day -> 12AM
  //if HistoryChart.jsx:14 day is: undefined
  if (day === undefined || year === undefined){
    console.log('WELCOME!');
  }else{
    console.log('nothing!');
  }


  function series(arr){
    let array = [];
    arr.map((d, idx)=> {
      // let x_axis = new Date(arr[idx]["t"]).getHours();
      if (arr == day){
        x_axis = new Date(arr[idx]["t"]).toLocaleTimeString("en-GB");
      } else if(arr == week){
        x_axis = new Date(arr[idx]["t"]).getMonth();
      }
       else if(arr == year){
        x_axis = new Date(arr[idx]["t"]).getMonth();
      }
      x_axis_labels.push(x_axis);
      let y_axis = arr[idx]["y"];
      array.push({x: x_axis, y: y_axis});
    }) 
    return array;
  }

  const determineTimeFormat = () => {
    switch(timeFormat){
      case "24h":
        return series(day);
      case "7d":
        return series(week);
      case "1y":
        return series(year);
      default:
        return series(day);
    }
  }

  //here we need to show render the chart as the component loads
  useEffect(()=>{
    if (chartRef && chartRef.current && detail && data){
      let time_format = determineTimeFormat();
      const chartInstance =  new chartjs(chartRef.current,{
        
        type: 'line',
        data: {
            labels: x_axis_labels,
            datasets: [{
            label: `${detail.name} price`,
            data:  time_format
            
              //format for passing data in the graph
            //   [{x: 1, y:15},
            //   {x: 2, y:35},
            //   {x: 3, y:10}]
            ,
            backgroundColor: "rgba(174,305,194,0.5)",
            borderColor: "rgba(174,305,194,0.4)",
            pointRadius: 0,
            
            }]
        },
        options: {
          ...HitoryOptions
        }
      });
    }
  });


  //function definiation //renderPrice()
  const renderPrice = () =>{
    //if detail exits then...
    if(detail){
      
      return (
        <>
          <p className="my-0">{detail.current_price.toFixed(2)}</p>
          <p className = 
          {detail.price_change_24h < 0 ? 'text-danger my-0' : 'text-success my-0'}>
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      )
    }
  }

  return (
    <>
      <h1 style = {{color: 'white', fontSize: '20px'}}>COIN HISTORY CHART</h1>
      <div className = "bg-white border mt-2 rounded p-3">
        <div style = {{textAlign : 'left'}}>{renderPrice()}</div>
        <div>
          <div>
            <canvas ref = {chartRef} id="myChart" width="400" height="400"></canvas>
          </div>
          <hr/>
          <div className = "chart-button mt-1">
            <button 
              onClick = {() => setTimeFormat("24h")}
              className="btn btn-outline-secondary btn-sm">day</button>
            <button 
              onClick = {() => setTimeFormat("7d")}
              className="btn btn-outline-secondary btn-sm mx-1">week</button>
            <button 
              onClick = {() => setTimeFormat("1y")}
              className="btn btn-outline-secondary btn-sm">year</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryChart;