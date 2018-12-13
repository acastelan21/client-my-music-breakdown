import React from 'react';
import "./TracksTable.scss";
import {Table} from "reactstrap";

const TracksTable = (props) => {
  return (
    <div className="tracks-table">
    <Table bordered hover >
        <thead>
            <tr>
                <th>#</th>
                <th onClick={()=>props.sortByAlpha("name")}>Title</th>
                <th onClick={()=>props.sortByAlpha("artist")}>Artist</th>
                <th onClick={()=>props.sortByInt("tempo")}>Tempo</th>
                <th onClick={()=>props.sortByInt("energy")}>Energy</th>
                <th onClick={()=>props.sortByInt("danceability")}>Dance</th>
                <th onClick={()=>props.sortByInt("valence")}>Valence</th>
                <th onClick={()=>props.sortByInt("acousticness")}>Acoustic</th>
                <th onClick={()=>props.sortByInt("popularity")}>Popularity</th>


            </tr>
        </thead>
        <tbody>
            {props.tracks}
        </tbody>
    </Table>
      
    </div>
  )
}

export default TracksTable
