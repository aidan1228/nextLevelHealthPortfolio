import React from "react";
import "./TodaysList.css"


export const TodaysList = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title"><h3>Todays Saved Meals: </h3></div>
        <p>**click on meals to see item summary</p>
      <table className="table table-condensed" style={{borderCollapse: "collapse"}}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal Title</th>
              <th>Calories: </th>
              <th>Protein(g):</th>
              <th>Sodium(g):</th>
              <th>Sugar(g):</th>
            </tr>
          </thead>    
            {children}
        </table>
      </div>
    </div> 
  );
};
