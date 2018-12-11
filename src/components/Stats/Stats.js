import React from 'react'

const Stats = (props) => {
  return (
    <div className="stats-section">
    <header>My Music Averages</header>
      <hr/>
      <p>Average Tempo: {props.averageTempo}</p>
      <p>Average Energy: {props.averageEnergy}</p>
      <p>Average Danceability: {props.averageDance}</p>
      <p>Average Valence: {props.averageValence}</p>
      <p>Average Acoustic: {props.averageAcoustic}</p>
    </div>
  )
}

export default Stats
