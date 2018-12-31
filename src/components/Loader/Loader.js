import React from 'react'

const Loader = () => {
  return (
    <React.Fragment>
        <div className="flip-card-front">
            <div id="preloader">
                <div id="loader"></div>
            </div>
        </div>
                
        <div className="flip-card-back">
        
            <div id="preloader">
                <div id="loader"></div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Loader
