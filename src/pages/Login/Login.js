import React, { Component } from 'react'
import "./Login.scss";
import {Navbar, NavbarBrand, Jumbotron, Container, Button, Row, Col} from "reactstrap";
class LogIn extends Component {
  
  handleLogin = (event) => {
    event.preventDefault()
    // ++++++ production +++++++
    window.location = "https://my-music-breakdown.herokuapp.com/login"
    
    // +++++ local host ++++++ 
    // window.location = "http://localhost:8888/login"
  
  }
  render() {
    return (
      <div className="login-page">
        <div id="login">
        <Navbar>
            <NavbarBrand>My Music Breakdown</NavbarBrand>
        </Navbar>
        <div className="parallax">
        
        
        
        </div>
        <Jumbotron>
        <Container>
          <h1 className="display-3">My Music Breakdown</h1>
          <p className="lead">Learn more about the music you listen to everyday based on musical attributes such as tempo, valence, energy, danceability, and popularity.
          </p>
          <p>Login with your Spotify account to get started</p>
          <Button onClick={this.handleLogin}>LOGIN WITH SPOTIFY</Button>
        </Container>
      </Jumbotron>
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
          <h2>Break your music down</h2>
          <p>With <strong>My Music Breakdown</strong> you can look at your top 50 songs listened to from all time, last 6 months or last 4 weeks.
          <br/>
          <br/>
          You will also see what your average song attributes are based on those top 50 songs from the time period selected. You will also see which song from those top 50 is the closests to your averages AKA "your typical song" for that time period. 
          </p>
          <h2>Breakdown of the attributes</h2>
          
            <ol>
              <li><strong>Tempo: </strong> How many Beats Per Minute (BPM).</li>
              <li><strong>Energy:</strong> The energy of a song - the higher the value, the more energtic the song.</li>
              <li><strong>Danceability:</strong> The higher the value, the easier it is to dance to the song.</li>
              <li><strong>Valence:</strong> The higher the value, the more positive mood for the song.</li>
              <li><strong>Acousticness:</strong> The higher the value the more acoustic the song is.</li>
              <li><strong>Popularity:</strong> The higher the value the more popular the song is.</li>

            </ol>
          
        <h2>FAQ</h2>
        <p>Here are some answers to commonly asked questions</p>
        <ol>
          <li><strong>How is my typical song calculated?</strong> It is calculated by taking the absolute value of the difference of each song attribute and subtracting your average value for that attribute. Those values are then added up and the song with the smallest difference is declared the typical song.</li>
          <li><strong>How was this built?</strong> This was created using the <a href="https://developer.spotify.com/">Spotify</a> API. </li>
          <li><strong>Can I see your code for this?</strong> You can checkout it out on <a href="https://github.com/acastelan21/client-my-music-breakdown">Github</a>. If you have any suggestions on how to improve this site feel free to open up an issue.</li>
          <li><strong>Any more features planned? </strong> Yes! I am looking into adding the ability to create playlists based on your average song attributes. </li>
          <li><strong>I have a suggestion how can I contact you?</strong> You can send me an <a href="mailto:alvaro.castelan.21@gmail.com">email</a>, a message on <a href="https://www.linkedin.com/in/alvarocastelan/">Linkedin</a>, DM on <a href="https://twitter.com/ACastelan21">Twitter</a> or a message through my personal <a href="https://www.alvarocastelan.com/">website.</a></li>
          <li><strong>Will you be able to see my top songs?</strong> No, only you will be able to see what your top songs are.</li>
        </ol>
          </Col>
        </Row>
          
         
          
        </div>
      
      </div>
    )
  }
}

export default LogIn
