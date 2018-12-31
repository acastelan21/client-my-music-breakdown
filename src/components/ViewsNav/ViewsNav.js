import React from 'react'

const ViewsNav = (props) => {
  return (
    <div>
      <header>
                <div className="views-container">
                    
                    <ul id="views-toggles">
                    <li id="view-text">View: </li>
                    <li id="short_term" onClick={props.changeView}>Last 4 weeks</li>
                    <li id="medium_term"onClick={props.changeView}>Last 6 months</li>
                    <li id="long_term" onClick={props.changeView}>All time</li>
                    <li id="glossary" onClick={props.changeView}>Glossary</li>
                    </ul>
                </div>
            </header>
    </div>
  )
}

export default ViewsNav;
