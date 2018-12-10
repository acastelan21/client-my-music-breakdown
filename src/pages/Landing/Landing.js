import React, { Component } from 'react'

class Landing extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: "NOT LOGGED IN",
      tokens: params,
      data:[],
      dataLoaded: false
      
    }
 

    
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  handleLogin = (event) => {
    event.preventDefault()
    window.location = "http://localhost:8888/login"
    
  
  }
  render() {
    
    if (this.state.loggedIn === "NOT LOGGED IN"){
      return (
        <div className="landing-page">
          <div className="container">
  
  
        <div id="login">
  
          <h1>My Music Breakdown</h1>
          <button onClick={this.handleLogin}>Log in with Spotify</button>
        </div>
        
      </div>
        </div>
      )
    } else {
      return (
        <div className="landing-page">
      <h1>You are logged in!</h1>
        </div>
      )
    }
    
  }
}

export default Landing
