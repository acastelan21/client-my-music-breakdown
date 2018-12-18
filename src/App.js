import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history"
import './App.scss';
//import pages
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";
import Footer from "./components/Footer";
import ReactGA from "react-ga";
ReactGA.initialize("UA-123164500-2")
ReactGA.pageview('/homepage');
class App extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={LoginPage}/>
              <Route exact path="/user/:accesstoken" component={UserPage}/>
              <Route component={LoginPage}/>
            </Switch>
            <Footer/>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
