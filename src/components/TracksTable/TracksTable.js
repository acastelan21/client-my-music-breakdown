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
                <th onClick={()=>props.sortByAlpha("name")}>Title <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByAlpha("artist")}>Artist <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("tempo")}>Tempo <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("energy")}>Energy <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("danceability")}>Dance <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("valence")}>Valence <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("acousticness")}>Acoustic <i class="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("popularity")}>Popularity <i class="fas fa-sort"></i></th>


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
