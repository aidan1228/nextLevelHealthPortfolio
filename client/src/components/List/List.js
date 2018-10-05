import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
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
          {children}
      </tbody>
    </table>
    </div> 
  );
};
