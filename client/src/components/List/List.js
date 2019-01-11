import React from "react";
import "./List.css";

export const List = ({ children }, props) => {
  return (
    <div className="panel-body" id="pMargin">
    <table className="table table-hover" id='user-table'>
      <thead>
          <tr>
              <th>Date</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Sodium</th>
              <th>Sugar</th>
          </tr>
      </thead>
      <tbody>
          {children}
      </tbody>
    </table>
    </div> 
  );
};
