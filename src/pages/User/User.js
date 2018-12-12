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
          view: "medium_term",
          idealSong: []
          
          
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
         this.getIdealSong();
      }
    
      getIdealSong(){
        let totalTempo = 0;
        let totalEnergy = 0;
        let totalDance = 0;
        let totalValence= 0;
        let totalAcoustic=0;
        
        for (let i=0; i<this.state.topTracksAttributes.length; i ++){
           totalTempo += (this.state.topTracksAttributes[i].tempo);
           totalEnergy += (this.state.topTracksAttributes[i].energy*100);
           totalDance += (this.state.topTracksAttributes[i].danceability*100 );
           totalValence += (this.state.topTracksAttributes[i].valence*100);
           totalAcoustic += (this.state.topTracksAttributes[i].acousticness*100);
        }

        let attributesAverages = [{"tempo":(totalTempo / 50),"energy":(totalEnergy / 50),"dance":(totalDance / 50),"valence":(totalValence / 50),"acousticness":(totalAcoustic / 50)}]
        let points = 0;
        let leadSongPoints= 0;
        let leadSong= [];
        let leadArtist="";
        let leadCover="";

        // console.log( Math.abs(attributesAverages[0].acousticness - this.state.combineTrackInfo[0].song_attributes.acousticness))
        // console.log(attributesAverages[0].acousticness)
        
        for (let j = 0; j < 50; j++){
            
           points += Math.abs((this.state.combineTrackInfo[j].song_attributes.tempo) - (attributesAverages[0].tempo))
        //    console.log("tempo",points)
            
           points += Math.abs((this.state.combineTrackInfo[j].song_attributes.energy *100) - (attributesAverages[0].energy))
        //    console.log("energy",attributesAverages[0].energy)
           points += Math.abs((this.state.combineTrackInfo[j].song_attributes.danceability*100) - (attributesAverages[0].dance))
        //    console.log("dance",points)
           points += Math.abs((this.state.combineTrackInfo[j].song_attributes.valence *100)- (attributesAverages[0].valence))
        //    console.log("valence",points)
           points += Math.abs((this.state.combineTrackInfo[j].song_attributes.acousticness*100) - (attributesAverages[0].acousticness))
        //    console.log("acoustic",points)
        //    console.log("this song", this.state.combineTrackInfo[j].name)
        //    console.log("points this song",points)
        //    console.log(("this song is:" ,this.state.combineTrackInfo[j].name))
           if (j === 0){
               leadSongPoints = points;
               leadSong = this.state.combineTrackInfo[0]
               leadArtist = this.state.combineTrackInfo[0].artists[0].name
               leadCover = this.state.combineTrackInfo[0].album.images[1].url
           }
           if (points < leadSongPoints ){
                leadSongPoints = points;
                leadSong =this.state.combineTrackInfo[j]
                leadArtist = this.state.combineTrackInfo[j].artists[0].name
               leadCover = this.state.combineTrackInfo[j].album.images[1].url
               
           }
           
           points = 0;

           

           
            // console.log(this.state.combineTrackInfo[j].song_attributes.tempo )
            // console.log(attributesAverages[0].tempo)
            
        }
        this.setState({
            idealSong: [leadSong]
        })
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
        const idealSongData = this.state.idealSong || []
        console.log("song length", this.state.idealSong.length)
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
                <div className="item my-song-item flip-card">
                <div className="flip-card-inner">
                {idealSongData.length === 1
                ? 
                <React.Fragment>
                <MySong
                title={this.state.idealSong[0].name} 
                artist={this.state.idealSong[0].artists[0].name}
                trackCover={this.state.idealSong[0].album.images[1].url}
                />
                <div className="flip-card-back">
                
                <header>My Ideal Song</header>
                <hr/>
                <p>Tempo: {idealSongData[0].song_attributes.tempo.toFixed(0)}</p>
                <p>Energy: {(idealSongData[0].song_attributes.energy * 100).toFixed(0)} </p>
                <p>Danceability:{(idealSongData[0].song_attributes.danceability * 100).toFixed(0)}</p>
                <p>Valence:{(idealSongData[0].song_attributes.valence * 100).toFixed(0)}</p>
                <p>Acousticness:{(idealSongData[0].song_attributes.acousticness *100).toFixed(0)}</p>
            </div>
            </React.Fragment>
                : 
                <React.Fragment>
                <MySong/>
                <div className="flip-card-back">
                
                <header>My Ideal Song</header>
                <hr/>
                <p>Tempo:</p>
                <p>Energy:</p>
                <p>Danceability:</p>
                <p>Valence:</p>
                <p>Acousticness:</p>
            </div>
            </React.Fragment>
                }
                
                
                
                
                </div>
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
