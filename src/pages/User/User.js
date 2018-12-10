import React, { Component } from 'react'

import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "../../components/NavBar";
const spotify = new SpotifyWebApi();

class User extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        console.log("token", token)
        this.state ={
          loggedIn: token ? true : false,
          tokens: params,
          data:[],
          dataLoaded: false,
          imageUrl: ""
          
        }
        if (token) {
            spotify.setAccessToken(token);
        }
    
        
      }
      componentDidMount(){
          this.getUser();
          
      }
      
      getUser (){
          spotify.getMe()
          .then(response => {
              this.setState({
                  data: response,
                  imageUrl: response.images[0].url
              })
              console.log(this.state)
          })
          .catch(error => {
              console.log(error)
          })
          
      }

      getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (( e = r.exec(q))) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
  render() {
      
    if (this.state.loggedIn === false){
        return (
            <div className="user-page-logged-off">
            Sorry you are not logged in. Please Login!
            </div>
        )
    }
    else if (this.state.loggedIn === true){
        console.log("image",this.state.imageUrl)
        return (
            <div className="user-page-logged-in">
            <NavBar
            userImage = {this.state.imageUrl}
            userName = {this.state.data.display_name}
            />
              
            </div>
          )

    }
    else {
        return (
            <div className="user-page-error">
            Something went wrong
            </div>
        )
    }
  }
}

export default User
