import React from 'react'
import {VictoryChart, VictoryArea, VictoryPolarAxis, VictoryTheme} from "victory";
const ChartModal = (props) => {
  return (
    <div className="chart-modal">
       <VictoryChart polar 
        height={320}
        theme={VictoryTheme.material}
        startAngle={90}
        endAngle={450}
        >
          <VictoryArea data={props.songData}/>
          {["Tempo","Energy", "Danceability", "Valence", "Acousticness", "Popularity"].map((d, i)=>{
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
  )
}

export default ChartModal
