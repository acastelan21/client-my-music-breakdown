import React, { Component } from 'react'

class LogIn extends Component {
  
  handleLogin = (event) => {
    event.preventDefault()
    window.location = "http://localhost:8888/login"
    
  
  }
  render() {
    return (
      <div className="log-in">
        <div id="login">
  
          <h1>My Music Breakdown</h1>
          <button onClick={this.handleLogin}>Log in with Spotify</button>
        </div>
      
      </div>
    )
  }
}

export default LogIn
