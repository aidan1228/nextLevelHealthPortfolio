import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import { List, ListItem } from "../components/List";
import API from "../utils/api";

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    // event.preventDefault();
    API.getUserData()
      .then(res =>
        this.setState({ userData: res.data })
      )
      .then(res => console.log(this.state.userData))
      .catch(err => console.log(err));
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.nickname}</h1>
          <Panel header="Profile">
           {/* figure out how to edit this VVVV with a searchbar type thing possibly add settings/edit button ^^^^^ also maybe edit "nickname" */}
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> {profile.nickname}</ControlLabel>
            </div>
            <pre>
            {/* {this.state.userData.length ? (
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
            )} */}
            </pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
