import React, { Component } from 'react'
import "./User.scss";
import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "../../components/NavBar";
import TracksTable from "../../components/TracksTable";
import Stats from "../../components/Stats";
import MySong from "../../components/MySong";
const spotify = new SpotifyWebApi();

class User extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        // console.log("token", token)
        this.state ={
          loggedIn: token ? true : false,
          tokens: params,
          userData:[],
          dataLoaded: false,
          imageUrl: "",
          topTracks: [],
          topTracksAttributes: [],
          combineTrackInfo: [],
          view: "long_term",
          
          
        }
        if (token) {
            spotify.setAccessToken(token);
        }
    
        
      }
      componentDidMount(){
          this.getUser();
          this.getUserTopTracks(this.state.view);
          
         
          
      }
      // make api call to get the user name + user image
      getUser (){
          spotify.getMe()
          .then(response => {
              this.setState({
                  userData: response,
                  imageUrl: response.images[0].url,
                  dataLoaded: true
              })
              console.log("update state 1")
              
          })
          .catch(error => {
              console.log(error)
          })
          
      }
      // make api call to ge the users top songs
      getUserTopTracks(term) {
          spotify.getMyTopTracks({"limit":50, "offset":0, "time_range":term})
          .then((response)=>{
              this.setState({
                  topTracks: response.items})
                // console.log("toptracks", response)
                console.log("update state 2")
          })
          .then(()=>{
            this.getTopTracksIds();
          })

          .catch((error)=>{
              console.log(error)
          })
      }
      // get the top track ids to make a call to API to get song attributes
      getTopTracksIds() {
          var tracks = this.state.topTracks
          const topTracksIds = tracks.map((track)=> {
            return track.id
          })
        // console.log(topTracksIds.toString())
         spotify.getAudioFeaturesForTracks(topTracksIds).then((response)=>{
             this.setState({
                 topTracksAttributes: response.audio_features
             })
            //  console.log(this.state.topTracksAttributes)
            console.log("update state 3")
         }).then(()=>{
             this.combineTrackInfo()
         })
        


      }
    // function to combine data into state variable to load table to make sort easier
      combineTrackInfo(){
          let trackNames = this.state.topTracks
          let trackAttributes = this.state.topTracksAttributes

          for (let i=0; i < trackNames.length; i++){
              
              for (let j=0; j<trackAttributes.length; j++){
                  if (trackNames[i].id === trackAttributes[j].id){
                      trackNames[i].song_attributes = trackAttributes[j]
                  }
              }
          }

         this.setState({
             combineTrackInfo : trackNames
         })
         console.log("update state 4")
         console.log(this.state)
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
        let totalTempo = 0;
        let totalEnergy = 0;
        let totalDance = 0;
        let totalValence= 0;
        let totalAcoustic=0;
        
        for (let i=0; i<this.state.topTracksAttributes.length; i ++){
           totalTempo += (this.state.topTracksAttributes[i].tempo);
           totalEnergy += (this.state.topTracksAttributes[i].energy * 100);
           totalDance += (this.state.topTracksAttributes[i].danceability * 100);
           totalValence += (this.state.topTracksAttributes[i].valence * 100);
           totalAcoustic += (this.state.topTracksAttributes[i].acousticness * 100);
        }
        // console.log("totalenergy",totalEnergy)
    
      const tableRows = this.state.combineTrackInfo.map((tracks,i)=>(
          <tr key={tracks.id}>
              <th>{i+ 1}</th>
              <th>{tracks.name}</th>
              <th>{tracks.artists[0].name}</th>
              <th>{(tracks.song_attributes.tempo).toFixed(0)}</th>
              <th>{(tracks.song_attributes.energy * 100).toFixed(0)}</th>
              <th>{(tracks.song_attributes.danceability * 100).toFixed(0)}</th>
              <th>{(tracks.song_attributes.valence * 100).toFixed(0)}</th>
              <th>{(tracks.song_attributes.acousticness * 100).toFixed(0)}</th>
              <th> {(tracks.popularity)}</th>
          </tr>
      ))
      
    //   console.log(this.state)
    if (this.state.loggedIn === false){
        return (
            <div className="user-page-logged-off">
            Sorry you are not logged in. Please Login!
            </div>
        )
    }
    else if (this.state.loggedIn === true){
        // console.log("image",this.state.imageUrl)
        return (
            <div className="user-page-logged-in">
            
            <NavBar
            userImage = {this.state.imageUrl}
            userName = {this.state.userData.display_name}
            />
            <div className="grid">
                <div className="item stats-item">
                <Stats
                    averageTempo={(totalTempo/50).toFixed(0)}
                    averageEnergy={(totalEnergy/50).toFixed(0)}
                    averageDance={(totalDance/50).toFixed(0)}
                    averageValence={(totalValence/50).toFixed(0)}
                    averageAcoustic={(totalAcoustic/50).toFixed(0)}
                    
                    />
                </div>
                <div className="item my-song-item">
                <MySong
                    title={"Lovely"}

                />
                </div>
            </div>
            
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
