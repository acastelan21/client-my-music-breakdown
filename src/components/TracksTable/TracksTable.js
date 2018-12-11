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
                <th>Title</th>
                <th>Artist</th>
                <th>Energy</th>
                <th>Dance</th>
                <th>Valence</th>
                <th>Acoustic</th>
                <th>Pop.</th>


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
