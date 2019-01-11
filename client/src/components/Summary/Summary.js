import React from "react";


export const Summary = ({ children }) => {
  return (
    <div className="card-body" id="pMargin">
      <table className="table table-hover" id='user-table'>
        <thead>
            <tr>
                <th>Date: </th>
                <th>Meal Item: </th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
      </table>
    </div> 
  );
};
