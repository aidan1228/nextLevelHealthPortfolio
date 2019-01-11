import React from "react";

export const SummaryItem = props => (
  <tr>
    <td> {props.date} </td>
    <td> {props.name} </td>
    <td> 
      <button onClick={() => props.handleDelete(props.name)} className="btn btn-primary">
        Delete
      </button>
    </td>
  </tr>
);
