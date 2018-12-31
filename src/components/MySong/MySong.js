import React from 'react'

const MySong = (props) => {
  return (
    <React.Fragment>
    <div className="my-song flip-card-front">
        <header>My Typical Song</header>
            <hr/>
            <p>{props.title}</p>
            <p>{props.artist}</p>
            <img src={props.trackCover} alt="song cover"/>
      </div>
      <div className="flip-card-back">
                
      <header>My Typical Song</header>
      <hr/>
      <p>Tempo: {props.typicalTempo}</p>
      <p>Energy: {props.typicalEnergy} </p>
      <p>Danceability: {props.typicalDanceability}</p>
      <p>Valence: {props.typicalValence}</p>
      <p>Acousticness: {props.typicalAcousticness}</p>
      <p>Popularity: {props.typicalPopularity}</p>
  </div>
  </React.Fragment>
  )
}

export default MySong
