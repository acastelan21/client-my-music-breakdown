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
          <VictoryArea data={[
            {x:0, y: 125},
            {x:1, y: 63},
            {x:2, y: 74},
            {x:3, y: 47},
            {x:4, y: 14}
          ]}/>
          {["Tempo","Energy", "Danceability", "Valence", "Energy"].map((d, i)=>{
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
