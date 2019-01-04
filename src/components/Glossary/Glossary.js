import React from 'react'
import "./Glossary.scss"
const Glossary = () => {
  return (
    <div className="glossary">
      <header>GLOSSARY</header>
      <figure>
          <figcaption>Acousticness (Acoustic)</figcaption>
          A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic.
      </figure>
      <figure>
          <figcaption>Danceability (Dance)</figcaption>
          Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 100 is most danceable.
      </figure>
      <figure>
          <figcaption>Energy</figcaption>
          Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
      </figure>
      <figure>
          <figcaption>Typical Song</figcaption>
          The song in your top 50 for that time period that is the closests to your average song attributes. Calculated by taking the absolute value of the difference of each song attribute and subtracting your average for that attribute. Those values are then added up and the song with the smallest number is declared the typical song. 
      </figure>
      <figure>
          <figcaption>Music Averages</figcaption>
          The average attributes measure of your top 50 for the selected time period. Calcuated by adding the attribute across top 50 songs for selected peiod and then dividing by 50. 

      </figure>
      <figure>
          <figcaption>Popularity</figcaption>
          The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. 
      </figure>
      <figure>
          <figcaption>Tempo</figcaption>
          The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

      </figure>
      <figure>
          <figcaption>Valence</figcaption>
          A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
      </figure>

      
    </div>
  )
}

export default Glossary
