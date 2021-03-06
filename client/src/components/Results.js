import React from "react";

const Results = props => (
  <div className="card">
    <div className="text-center">
      <h3>
        {props.name}
      </h3>
      <h3>
        Calories: {props.cal}
      </h3>
      <h3>
        Sodium(mg): {props.sod}
      </h3>
      <h3>
        Sugars(g): {props.sug}
      </h3>
      <h3>
        Protein(g): {props.prot}
      </h3>
      <button onClick={props.addItemToMeal} className="btn btn-primary">
        Add
      </button>
    </div>
  </div>
);

export default Results;