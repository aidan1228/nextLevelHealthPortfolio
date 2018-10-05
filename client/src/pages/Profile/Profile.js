import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";

class Profile extends Component {
  state = {
    userData: {},
    trackerDisplay: {}
  };
  loadUserData = () => {
    // event.preventDefault();
    API.getUserData()
      .then(res =>
        this.setState({ userData: res.data })
      )
      .then(res => console.log(this.state.userData))
      .catch(err => console.log(err));
  };

  // consolidation = () => {
  //   // event.preventDefault();
    
  //   console.log(this.state.userData);
  //   for(var i; i < this.state.userData.length; i++) {
  //     console.log(this.state.userData[i]);
  //     if(this.state.userData[i].date === this.state.userData[i + 1].date) {
        
  //       updatedObject = {
  //         date: this.state.userData[i].date,
  //         cal: this.state.userData[i].calories += this.state.userData[i-1].calories,
  //         prot: this.state.userData[i].protein += this.state.userData[i-1].protein,
  //         sug: this.state.userData[i].sugar += this.state.userData[i-1].sugar,
  //         sod: this.state.userData[i].sodium += this.state.userData[i-1].sodium
  //       }

  //       tdObject.append(updatedObject);
  //     }
  //     else {
  //       tdObject.append(this.state.userData[i]);
  //     }

  //   }
    
  //   console.log(tdObject);
  //   this.setState({ trackerDisplay: tdObject })
  // };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadUserData();
    // this.consolidation();
    
  }

  render() {
    return (
      <Container fluid>
        <Row>
        {this.state.userData.length ? (
              <List>
                {this.state.userData.map(date => (
                  <ListItem 
                  key={date._id}
                  date={date.date}
                  cal={Math.round(date.calories * 100) / 100}
                  prot={Math.round(date.protein * 100) / 100}
                  sug={Math.round(date.sugar * 100) / 100}
                  sod={Math.round(date.sodium * 100) / 100}
                  />
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </Row>
      </Container>
    );
  }
}

export default Profile;
