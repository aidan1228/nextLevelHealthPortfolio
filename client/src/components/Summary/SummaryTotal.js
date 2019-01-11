import React from "react";

export const SummaryTotal = props => (
    <div className="card-body" id="pMargin">
        <table className="table table-hover" id='user-table'>
            <thead>
                <tr>
                    <th>Date: </th>
                    <th>Calories: </th>
                    <th>Protein(g): </th>
                    <th>Sodium(g): </th>
                    <th>Sugar(g): </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total For: {props.date}</td>
                    <td > {props.cal} </td>
                    <td > {props.prot} </td>
                    <td > {props.sod} </td>
                    <td > {props.sug} </td>
                </tr>
            </tbody>
        </table>
    </div> 
);