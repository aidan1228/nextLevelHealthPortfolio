import React from "react";

export const ListItem = props => (
  <tr>
    <td> {props.date} </td>
    <td > {props.cal} </td>
    <td > {props.prot} </td>
    <td > {props.sod} </td>
    <td > {props.sug} </td>
  </tr>
  
);
