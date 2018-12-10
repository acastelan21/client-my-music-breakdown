import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history"
import './App.scss';
//import pages
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={LoginPage}/>
              <Route path="/user/" component={UserPage}/>

            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
