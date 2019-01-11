import React from "react";
import "./TodaysList"

export const TodaysListItem = props => (
    <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle">
      <td><b>Meal Item: </b></td>
      <td > {props.foodItem} </td>
      <td > {props.cal} </td>
      <td > {props.prot} </td>
      <td > {props.sod} </td>
      <td > {props.sug} </td>
    </tr>
);

export class CollapsibleTodaysListItem extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = { isCollapsed: props.collapse || true};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render() {
    let collapsable;
    
    /*
    if (!this.state.isCollapsed) {
      collapsable = (
        <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle" onClick={this.onClick}>
          <td> {this.props.date} </td>
          <td > {this.props.mealTitle} </td>
          <td > {this.props.cal} </td>
          <td > {this.props.prot} </td>
          <td > {this.props.sod} </td>
          <td > {this.props.sug} </td>
        </tr>
      );
    } else {
      collapsable = null
    }*/


    if (!this.state.isCollapsed) {
      collapsable = this.props.children;
    } else {
      collapsable = null
    }
    
    return (
      <tbody>
        <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle" onClick={this.onClick}>
          <td> {this.props.date} </td>
          <td > {this.props.mealTitle} </td>
          <td > {this.props.cal} </td>
          <td > {this.props.prot} </td>
          <td > {this.props.sod} </td>
          <td > {this.props.sug} </td>
        </tr>
        {collapsable}
       </tbody>
    )
  }
} 