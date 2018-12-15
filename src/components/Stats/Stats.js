import React from 'react'
import {VictoryChart, VictoryArea, VictoryPolarAxis, VictoryTheme} from "victory";
const Stats = (props) => {
  return (
    <div className="stats-section flip-card-inner">
    <div className="flip-card-front">
    <header>My Music Averages</header>
      <hr/>
      <div className="number-averages">
        <p>Average Tempo: {props.averageTempo}</p>
        <p>Average Energy: {props.averageEnergy}</p>
        <p>Average Danceability: {props.averageDance}</p>
        <p>Average Valence: {props.averageValence}</p>
        <p>Average Acoustic: {props.averageAcoustic}</p>
      </div>
      </div>
      
      
      <div className="chart-averages flip-card-back">
      <header>My Music Averages</header>
      <hr/>
      <VictoryChart polar 
        height={320}
        theme={VictoryTheme.material}
        startAngle={90}
        endAngle={450}
        >
          <VictoryArea data={props.victoryData}/>
          {["Tempo","Energy", "Danceability", "Valence", "Acousticness"].map((d, i)=>{
            return (
              <VictoryPolarAxis dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{tickLabels: {fill: "none"}}}
              axisValue={i}
            />)
          })}
        
        
        </VictoryChart>



      </div>

    </div>
  )
}

export default Stats
