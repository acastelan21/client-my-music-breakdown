import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history"
import Login from "./pages/Login";
import './App.scss';

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
              <Route exact path="/login" component={Login}/>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
