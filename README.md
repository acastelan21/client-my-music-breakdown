[![My Music Breakdown](https://res.cloudinary.com/devac/image/upload/v1545272651/mymusicbreakdownlogo.png)](https://mymusicbreakdown.com/)

Learn more about the music  :headphones:  you listen to everyday on Spotify based on musical attributes such as tempo, valence, energy, danceability, and popularity. 
# Live Site
You can find the live site @ [mymusicbreakdown.com](https://mymusicbreakdown.com/) 
# Features
 - See your top 50 songs listened to all time
 - See your top 50 songs listened to in the last 6 months
 - See your top 50 songs listened to in the last 4 weeks
 - See what your typical song listened to is based on you averages for the time period selected.
# Demo
*Coming Soon* 

# Built With 
- [Create React App](https://facebook.github.io/create-react-app/)
- [Spotify API](https://developer.spotify.com/)
- [Victory by Formidable Labs](https://formidable.com/open-source/victory/)
- [Bootstrap](https://getbootstrap.com/) and [Reactstrap](https://reactstrap.github.io/)
- [Sass](https://sass-lang.com/guide)
- [SweetAlert2](https://sweetalert2.github.io/) and [SweetAlert2-React-Content](https://github.com/sweetalert2/sweetalert2-react-content)

# How To Use
This will give you the front end to the website. You can clone the backend to authenticate by going [here](https://github.com/acastelan21/server-my-music-breakdown).

Clone the project
```sh
$ git clone git@github.com:acastelan21/client-my-music-breakdown.git 
```
Then you cd into folder
```sh
$ cd client-my-music-breakdown
```
Using yarn do 
```sh 
$ yarn install
```
Make sure to change the `handleLogin` function to make sure it works on your local environment on the Login page component.
```js

handleLogin = (event) => {
    event.preventDefault();
    window.location = "http://localhost:8888/login";
  }
```
Then you are ready to do
```sh
$ yarn start 
```
and then go to [http://localhost:3000](http://localhost:3000/).
# Feedback
Feel free to send me any suggestions or feedback on the following : 
- [LinkedIn](https://www.linkedin.com/in/alvarocastelan/)
- [Personal Website](https://www.alvarocastelan.com/)
- [Twitter](https://twitter.com/ACastelan21)
- [Email](mailto:alvaro.castelan.21@gmail.com)

# License 
My Music Breakdown is provided under the MIT License. See LICENSE for the full details.

# Author 
Alvaro Castelan | [LinkedIn](https://www.linkedin.com/in/alvarocastelan) | [Portfolio](https://www.alvarocastelan.com)


# Acknowledgments 
Inspired by [Sort Your Music](http://sortyourmusic.playlistmachinery.com/) by [@plamere](https://twitter.com/plamere)



