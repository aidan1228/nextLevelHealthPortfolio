import React from "react";
import { Link } from "react-router-dom";

const DailyTable = props => (
  <div class="panel-body" id="pMargin">
    <table class="table table-hover" id='user-table'>
      <thead>
          <tr>
              <th>Date</th>
              <th>Total Sugar</th>
              <th>Total Protein</th>
              <th>Total Sodium</th>
              <th>Total Calories</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td> {props.date} </td>
              <td > {props.sug} </td>
              <td > {props.prot} </td>
              <td > {props.sod} </td>
              <td > {props.cal} </td>
          </tr>
      </tbody>
    </table>
    <button 
    onClick={props.handleSaveToMongo}
    href="/User" 
    className="btn btn-primary">
        Save
    </button>
    {/* <button 
    onClick={props.handleMongoUpdate}
    href="/User" 
    className="btn btn-primary">
        Add/Update
    </button> */}
  </div>  
);

export default DailyTable;