import React from "react";
import { Summary, SummaryItem, SummaryTotal } from "../components/Summary";
import "./MealTable.css";

const MealTable = (props) => (
    <div className="card">
        <div className="card-body" id="pMargin">
            <input
                value={props.value}
                name="mealTitle"
                onChange={props.handleInputChange}
                type='text'
                className="form-control"
                placeholder="Enter Meal Title"
                id="mealTitle"
            />
            <Summary
                date={props.mealSummary.date}
                cal={Math.round(props.mealSummary.cal * 100) / 100}
                prot={Math.round(props.mealSummary.prot * 100) / 100}
                sug={Math.round(props.mealSummary.sug * 100) / 100}
                sod={Math.round(props.mealSummary.sod * 100) / 100}
            >
                {props.mealItems.map(mealItem => (
                    <SummaryItem 
                        key={mealItem._id}
                        date={mealItem.date}
                        name={mealItem.name}
                        handleDelete={props.handleDelete}
                        handleQuantity={props.handleQuantity}
                        quantity={props.quantity}
                    />
                ))}
            </Summary>
            <SummaryTotal
                date={props.mealSummary.date}
                cal={Math.round(props.mealSummary.cal * 100) / 100}
                prot={Math.round(props.mealSummary.prot * 100) / 100}
                sod={Math.round(props.mealSummary.sod * 100) / 100}
                sug={Math.round(props.mealSummary.sug * 100) / 100}
            />
            <button onClick={props.open} className="btn btn-primary">
                Search for a food item!
            </button>
            &nbsp;
            <button 
            onClick={props.saveMealData}
            href="/User" 
            className="btn btn-primary save-btn">
                Save
            </button>
        </div> 
    </div> 
);

export default MealTable;