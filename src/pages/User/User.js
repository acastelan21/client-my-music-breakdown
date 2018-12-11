import React, { Component } from 'react'

import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "../../components/NavBar";
import TracksTable from "../../components/TracksTable";
const spotify = new SpotifyWebApi();

class User extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        console.log("token", token)
        this.state ={
          loggedIn: token ? true : false,
          tokens: params,
          userData:[],
          dataLoaded: false,
          imageUrl: "",
          topTracks: [],
          topTracksAttributes: []
          
          
        }
        if (token) {
            spotify.setAccessToken(token);
        }
    
        
      }
      componentDidMount(){
          this.getUser();
          this.getUserTopTracks();
          
         
          
      }
      
      getUser (){
          spotify.getMe()
          .then(response => {
              this.setState({
                  userData: response,
                  imageUrl: response.images[0].url,
                  dataLoaded: true
              })
              
          })
          .catch(error => {
              console.log(error)
          })
          
      }
      getUserTopTracks() {
          spotify.getMyTopTracks({"limit":50, "offset":0, "time_range":"long_term"})
          
          .then((response)=>{
              this.setState({
                  topTracks: response})
                console.log("toptracks", response)
          })
          .then(()=>{
            this.getTopTracksIds();
          })

          .catch((error)=>{
              console.log(error)
          })
      }

      getTopTracksIds() {
          var tracks = this.state.topTracks.items
          const topTracksIds = tracks.map((track)=> {
            return track.id
          })
        console.log(topTracksIds.toString())
         spotify.getAudioFeaturesForTracks(topTracksIds).then((response)=>{
             this.setState({
                 topTracksAttributes: response.audio_features
             })
             console.log(this.state.topTracksAttributes)
         }).then(()=>{
            this.getSongName()
         })


      }
      getSongName(){
        console.log(this.state.topTracks.items[0].id)
        console.log(this.state.topTracksAttributes[0].id)
        for (let i = 0; i < this.state.topTracks.items.length; i ++){
            for (let j = 0 ; j < this.state.topTracksAttributes.length; j++){
                if (this.state.topTracks.items[i].id === this.state.topTracksAttributes[j].id){
                    console.log(this.state.topTracks.items[i].name)
                }
            }
        }
        
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
      const tableRows = this.state.topTracksAttributes.map((tracks,i)=>(
          <tr key={tracks.id}>
              <th>{i+ 1}</th>
              <th>{this.state.topTracks.items[i].name}</th>
              <th>{this.state.topTracks.items[i].artists[0].name}</th>
              <th>{(tracks.energy * 100).toFixed(0)}</th>
              <th>{(tracks.danceability * 100).toFixed(0)}</th>
              <th>{(tracks.valence * 100).toFixed(0)}</th>
              <th>{(tracks.acousticness + 100).toFixed(0)}</th>
              <th>{this.state.topTracks.items[i].popularity}</th>
          </tr>
      ))
      
      console.log(this.state)
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
            userName = {this.state.userData.display_name}
            />
            <TracksTable
            tracks = {tableRows}
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
