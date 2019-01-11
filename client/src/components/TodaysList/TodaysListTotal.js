import React from "react";

export const TodaysListTotal = props => (
    <tbody>
        <tr>
            <td> {props.date} </td>
            <td > {props.mealTitle} </td>
            <td > {props.cal} </td>
            <td > {props.prot} </td>
            <td > {props.sod} </td>
            <td > {props.sug} </td>
        </tr>
    </tbody>
);