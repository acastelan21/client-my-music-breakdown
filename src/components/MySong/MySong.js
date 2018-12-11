import React from 'react'

const MySong = (props) => {
  return (
    <div className="my-song">
        <header>My Ideal Song</header>
            <hr/>
            <p>{props.title}</p>
            <p>{props.artist}</p>
            <img src={props.trackCover} alt="song cover"/>
      </div>
  )
}

export default MySong
