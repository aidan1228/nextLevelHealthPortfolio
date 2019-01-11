import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import './Profile.css';
import { List, ListItem } from "../components/List";
import API from "../utils/api";

class Profile extends Component {

  constructor() {
    super();

    this.state = {
      profile: {},
      userData: [],
      dailyTracker: {},
      username: "",
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Your tracked comsumed calories",
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#848484',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#848484',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }

  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        // this.loadUserData();
      });
    } else {
      this.props.auth.getEmail(
        (username) => {
          this.setState ({username:username});
          this.loadUserData(username);
        }
      );
      this.setState({ profile: userProfile });
      
    }
    

  }

  organizeByDate = () => {
    console.log("user data thru for loop: ", this.state.userData);

    // loop over the user's tracker files, and bin them by date
    const dailyTracker = {};
    this.state.userData.forEach((trackerFile) => {
      const trackerDate = trackerFile.date;
      // find the sumarry for this date
      let dailySummary = dailyTracker[trackerDate];
      if(!dailySummary) {
        dailySummary = {calories: 0, protein:0, sugar:0, sodium:0};
      }
      dailySummary.calories += trackerFile.calories;
      dailySummary.protein += trackerFile.protein;
      dailySummary.sodium += trackerFile.sodium;
      dailySummary.sugar += trackerFile.sugar;

      dailyTracker[trackerDate] = dailySummary;
      // 
    });
    this.setState({dailyTracker});

    let datasets = this.state.chartData.datasets.slice(0);
    datasets[0].data = [];
    let labels  = [];
    Object.entries(dailyTracker).forEach((date) => {
      //console.log("date: ", date);
      labels.push(date[0]);
      datasets[0].data.push(date[1].calories);
    })

    this.setState({
      chartData:  Object.assign({}, this.state.chartData, 
        {
          labels,
          datasets
        })
    })
  };

  loadUserData = (username) => {
    // event.preventDefault();
    const accessToken = this.props.auth.getAccessToken();
    console.log("Profile.loadUserData(): accessToken = ", accessToken );
    console.log("state is " + this.state.username);
    console.log("cb is " + username)

    API.getUserData(accessToken, username)
    // API.getUserData(username)
      .then(res =>
        this.setState({ userData: res.data }, () => {
          this.organizeByDate();
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <Panel header="Profile">
           {/* figure out how to edit this VVVV with a searchbar type thing possibly add settings/edit button ^^^^^ also maybe edit "nickname" */}
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> {profile.nickname}</ControlLabel>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
