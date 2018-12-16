import React from 'react';
import "./TracksTable.scss";
import {Table} from "reactstrap";

const TracksTable = (props) => {
    
  return (
    <div className="tracks-table">
    <Table bordered hover responsive>
        <thead>
            <tr>
                <th>#</th>
                <th onClick={()=>props.sortByAlpha("name")}>Title<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByAlpha("artist")}>Artist<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("tempo")}>Tempo<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("energy")}>Energy<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("danceability")}>Dance<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("valence")}>Valence<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("acousticness")}>Acoustic<i className="fas fa-sort"></i></th>
                <th onClick={()=>props.sortByInt("popularity")}>Popularity<i className="fas fa-sort"></i></th>


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
