import React, { Component } from 'react'
import "./User.scss";
import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "../../components/NavBar";
import TracksTable from "../../components/TracksTable";
import Stats from "../../components/Stats";
import MySong from "../../components/MySong";
import Glossary from "../../components/Glossary";
import LoginPage from "../../pages/Login";
import BlankProfileImage from "../../assets/images/blank-profile-image.png"

const spotify = new SpotifyWebApi();


class User extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
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
          idealSong: [],
          direction: {
              name : "",
              artist : "",
              tempo : "",
              energy:"",
              danceability: "",
              valence: "",
              acousticness: "",
              popularity: ""

          }
          
          
          
        }
        this.sortByInt = this.sortByInt.bind(this)
        this.sortByAlpha = this.sortByAlpha.bind(this)
        this.changeView = this.changeView.bind(this)
        this.flipCard = this.flipCard.bind(this)

        if (token) {
            spotify.setAccessToken(token);
        }
        console.log(token)
        
      }
      componentDidMount(){
          this.getUser();

          this.getUserTopTracks(this.state.view);
        //   console.log(this.state)
          
         console.log(this.state.tokens)
          
      }
      // make api call to get the user name + user image
      getUser (){
          spotify.getMe()
          .then(response => {
            //   console.log(response)
            if (response.images.length > 0){
                this.setState({
                    userData: response ,
                    imageUrl: response.images[0].url,
                    dataLoaded: true
                })
                // console.log("update state 1"
                // console.log(this.state)
            }
              else {
                this.setState({
                    userData: response ,
                    imageUrl: BlankProfileImage,
                    dataLoaded: true
                })
                // console.log("update state 1")
                // console.log(this.state)
              }
          })
          .catch(error => {
              console.log(error)
          })
          
      }
      // make api call to ge the users top songs
      getUserTopTracks(term) {
          
          
        
          spotify.getMyTopTracks({"limit":50, "offset":0, "time_range":term})
          .then((response)=>{
            //   console.log("get top tracks")
              this.setState({
                  topTracks: response.items})
                // console.log("toptracks", response)
                // console.log("update state 2")
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
            // console.log("update state 3")
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
        //  console.log("update state 4")
        //  console.log(this.state)
         this.getIdealSong();
        //  console.log(this.state)
      }
    //get the song that matches up closests to averages
      getIdealSong(){
        let totalTempo = 0;
        let totalEnergy = 0;
        let totalDance = 0;
        let totalValence= 0;
        let totalAcoustic=0;
        let totalPopularity=0;
        
        for (let i=0; i<this.state.topTracksAttributes.length; i ++){
           totalTempo += (this.state.topTracksAttributes[i].tempo);
           totalEnergy += (this.state.topTracksAttributes[i].energy*100);
           totalDance += (this.state.topTracksAttributes[i].danceability*100 );
           totalValence += (this.state.topTracksAttributes[i].valence*100);
           totalAcoustic += (this.state.topTracksAttributes[i].acousticness*100);
           totalPopularity +=(this.state.topTracks[i].popularity);
        }

        let attributesAverages = [{"tempo":(totalTempo / 50),"energy":(totalEnergy / 50),"dance":(totalDance / 50),"valence":(totalValence / 50),"acousticness":(totalAcoustic / 50),"popularity":(totalPopularity)}]
        let points = 0;
        let leadSongPoints= 0;
        let leadSong= [];
        

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

           points += Math.abs((this.state.combineTrackInfo[j].popularity)-(attributesAverages[0].popularity))
        //    console.log("acoustic",points)
        //    console.log("this song", this.state.combineTrackInfo[j].name)
        //    console.log("points this song",points)
        //    console.log(("this song is:" ,this.state.combineTrackInfo[j].name))
           if (j === 0){
               leadSongPoints = points;
               leadSong = this.state.combineTrackInfo[0]
               
           }
           if (points < leadSongPoints ){
                leadSongPoints = points;
                leadSong =this.state.combineTrackInfo[j]
                
               
           }
           
           points = 0;

           

           
            // console.log(this.state.combineTrackInfo[j].song_attributes.tempo )
            // console.log(attributesAverages[0].tempo)
            
        }
        this.setState({
            idealSong: [leadSong]
        })
        // console.log(this.state)
        
      }
      sortByAlpha(key){
          let tracks = this.state.combineTrackInfo
        
        
        tracks.sort((a,b)=>{
            let nameA;
            let nameB;
            if (key === "name"){
                nameA = a.name.toUpperCase()
                nameB = b.name.toUpperCase()
            }
            if (key === "artist"){
                nameA = a.artists[0].name.toUpperCase()
                nameB = b.artists[0].name.toUpperCase()
            }
            
            if (this.state.direction[key] === "asc"){
                if (nameA > nameB){
                    return -1
                }
                if (nameA < nameB){
                    return 1
                }
                return 0;
            }
            else {
                if (nameA < nameB){
                    return -1
                }
                if (nameA > nameB){
                    return 1
                }
                return 0;
            }
            
            
        })
        let value = [key][0]
        this.setState({
            combineTrackInfo: tracks,
            direction : {
                [value] : this.state.direction[key] === "asc"
                ? "desc"
                : "asc"
            }
        })

      }
      sortByInt(key){
        let tracks = this.state.combineTrackInfo
        if (key === "popularity"){
            tracks.sort((a,b)=>{
            
                let attributeA = a[key];
                let attributeB = b[key];
                
                if (this.state.direction[key] === "asc"){
                  return attributeA - attributeB
                }
                else {
                    return attributeB - attributeA
                }
    
                
            })
            let value = [key][0]
            this.setState({
                combineTrackInfo: tracks,
                direction: {
                [value] : this.state.direction[key] === "asc"
                ? "desc"
                : "asc"
                },
            })
        }
        else {
        

        tracks.sort((a,b)=>{
            
            let attributeA = a.song_attributes[key];
            let attributeB = b.song_attributes[key];
            
            if (this.state.direction[key] === "asc"){
              return attributeA - attributeB
            }
            else {
                return attributeB - attributeA
            }

            
        })
        let value = [key][0]
        this.setState({
            combineTrackInfo: tracks,
            direction: {
            [value] : this.state.direction[key] === "asc"
            ? "desc"
            : "asc"
            },
        })
    }
        
      }
      // change view function
      changeView = (event) => {
          event.preventDefault(); 
          this.setState({
              view : event.target.id
          })

          if(event.target.id !== this.state.view){
             document.getElementById("short_term").style.background= "#f8f8f8"
             document.getElementById("medium_term").style.background="#f8f8f8"
             document.getElementById("long_term").style.background="#f8f8f8"
             document.getElementById("glossary").style.background="#f8f8f8"
          }
          event.target.style.background = "#1DB954"
          if (event.target.id === "glossary"){
              return;
          }
          else {
            this.getUserTopTracks(event.target.id)
          }
          
          
      }
      flipCard = (event) => {
        event.preventDefault()
        if (event.target.id === "not-flipped"){
            document.getElementById("not-flipped").id = "flipped"            
        }
        else if (event.tagert.id === "flipped"){
            document.getElementById("flipped").id = "not-flipped" }
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
        let totalPopularity = 0;
        
        for (let i=0; i<this.state.topTracksAttributes.length; i ++){
           totalTempo += (this.state.topTracksAttributes[i].tempo);
           totalEnergy += (this.state.topTracksAttributes[i].energy * 100);
           totalDance += (this.state.topTracksAttributes[i].danceability * 100);
           totalValence += (this.state.topTracksAttributes[i].valence * 100);
           totalAcoustic += (this.state.topTracksAttributes[i].acousticness * 100);
           totalPopularity +=(this.state.topTracks[i].popularity)
        }
        const tempoAverage = ((totalTempo/50).toFixed(0))
        const energyAverage = ((totalEnergy/50).toFixed(0))
        const danceAverage =((totalDance/50).toFixed(0))
        const valenceAverage =((totalValence/50).toFixed(0))
        const acousticAverage=(((totalAcoustic/50).toFixed(0)))
        const popularityAverage=(((totalPopularity/50).toFixed()))
        
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
            <LoginPage/>
            </div>
        )
    }
    if (this.state.loggedIn === true && this.state.view === "glossary"){
        return (
            <div className="user-page-logged-in glossary-view">
            <NavBar
             userImage = {this.state.imageUrl}
             userName = {this.state.userData.display_name}
            />
            <header>
                <div className="views-container">
                    
                    <ul id="views-toggles">
                    <li id="view-text">View: </li>
                    <li id="short_term" onClick={this.changeView}>Last 4 weeks</li>
                    <li id="medium_term"onClick={this.changeView}>Last 6 months</li>
                    <li id="long_term" onClick={this.changeView}>All time</li>
                    <li id="glossary" onClick={this.changeView}>Glossary</li>
                    </ul>
                </div>
            </header>
            <Glossary/>
            
            </div>
        )}
    else if (this.state.loggedIn === true){
        // console.log(this.state.userData)
        const idealSongData = this.state.idealSong || []
        // console.log("song length", this.state.idealSong.length)
        return (
            <div className="user-page-logged-in">
            
            <NavBar
            userImage = {this.state.imageUrl }
            userName = {this.state.userData.display_name || this.state.userData.id}
            />

            <header>
                <div className="views-container">
                    
                    <ul id="views-toggles">
                    <li id="view-text">View: </li>
                    <li id="short_term" onClick={this.changeView}>Last 4 weeks</li>
                    <li id="medium_term"onClick={this.changeView}>Last 6 months</li>
                    <li id="long_term" onClick={this.changeView}>All time</li>
                    <li id="glossary" onClick={this.changeView}>Glossary</li>
                    </ul>
                </div>
            </header>
            <div className="instructions">
            
            <i>On desktop hover over cards below with mouse to see more information.</i>
            
            <br/>
            <i>On mobile tap on cards below to see more information.</i>
            </div>
            <div className="grid">
                <div onClick={this.flipCard} id="not-flipped" className="item stats-item flip-card">
                <Stats
                    averageTempo={tempoAverage}
                    averageEnergy={energyAverage}
                    averageDance={danceAverage}
                    averageValence={valenceAverage}
                    averageAcoustic={acousticAverage}
                    averagePopularity={popularityAverage}
                    victoryData = {[
                        {x:0, y: parseInt(tempoAverage)},
                        {x:1, y: parseInt(energyAverage)},
                        {x:2, y: parseInt(danceAverage)},
                        {x:3, y: parseInt(valenceAverage)},
                        {x:4, y: parseInt(acousticAverage)},
                        {x:5, y: parseInt(popularityAverage)}

                    ]}
                    
                    />
                </div>
                <div onClick={this.flipCard} id="not-flipped" className="item my-song-item flip-card">
                <div  className="flip-card-inner">
                {idealSongData.length === 1
                ? 
                <React.Fragment>
                <MySong
                title={this.state.idealSong[0].name} 
                artist={this.state.idealSong[0].artists[0].name}
                trackCover={this.state.idealSong[0].album.images[1].url}
                />
                <div className="flip-card-back">
                
                <header>My Typical Song</header>
                <hr/>
                <p>Tempo: {idealSongData[0].song_attributes.tempo.toFixed(0)}</p>
                <p>Energy: {(idealSongData[0].song_attributes.energy * 100).toFixed(0)} </p>
                <p>Danceability: {(idealSongData[0].song_attributes.danceability * 100).toFixed(0)}</p>
                <p>Valence: {(idealSongData[0].song_attributes.valence * 100).toFixed(0)}</p>
                <p>Acousticness: {(idealSongData[0].song_attributes.acousticness *100).toFixed(0)}</p>
                <p>Popularity: {(idealSongData[0].popularity)}</p>
            </div>
            </React.Fragment>
            
                : 
                <React.Fragment>
                <div className="flip-card-front">
                    <div id="preloader">
                        <div id="loader"></div>
                    </div>
                </div>
                
                <div className="flip-card-back">
                
                    <div id="preloader">
                        <div id="loader"></div>
                    </div>
                </div>
            </React.Fragment>
                }
                
                
                
                
                </div>
                </div>
            </div>
            <div className="instructions"><i>To sort list just click on the name of attribute you want to sort by.</i></div>
            <TracksTable
            sortByAlpha = {this.sortByAlpha}
            sortByInt ={this.sortByInt}
            tracks = {tableRows}
            />

            </div>
          )
    }
    else {
        return (
            <div className="user-page-error">
            Something went wrong. Please go <a href="/">home page.</a>
            </div>
        )
    }
  }
}

export default User
