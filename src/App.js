import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history"
import './App.scss';
import LandingPage from "./pages/Landing";

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <p>Spotify Web App</p>
      //   <a href='http://localhost:8888'> Login to Spotify </a>
        
      // </div>
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <Switch>
              <Route path="/" component={LandingPage}/>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
