import React, { Component } from 'react';
import { TodaysList, CollapsibleTodaysListItem, TodaysListItem, TodaysListTotal } from "../components/TodaysList";
import API from "../utils/api";

class Views extends Component {

  constructor() {
    super();
    this.state = {
      profile: {},
      userData: [],
      dailyTotal: {
        calories: 0,
        protein: 0,
        sodium: 0,
        sugar: 0
      },
      username: ""
    };
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

  dailyTotal = () => {
    console.log("user data thru for loop: ", this.state.userData);

    // loop over the user's tracker files, and bin them by date
    const dailyTotal = {
      calories: 0,
      protein: 0,
      sodium: 0,
      sugar: 0
    };
    Object.entries(this.state.userData).forEach(([meal, array]) => {
      dailyTotal.calories += array[0].mealTotal.cal;
      dailyTotal.protein += array[0].mealTotal.prot;
      dailyTotal.sodium += array[0].mealTotal.sod;
      dailyTotal.sugar += array[0].mealTotal.sug;
    });

    console.log('dailyTotal: ', dailyTotal);
    this.setState({dailyTotal});
    
  };

  loadUserData = (username) => {
    // event.preventDefault();
    const accessToken = this.props.auth.getAccessToken();
    console.log("Profile.loadUserData(): accessToken = ", accessToken );
    console.log("state is " + this.state.username);
    console.log("cb is " + username)

    API.getTodaysData(accessToken, username)
      .then(res =>{
        const userData = {};
        
        res.data.forEach((trackerFile) => {
          // console.log("trackerFile: ", trackerFile)
          const mealTitle = trackerFile.mealTitle;
          if(!(mealTitle in userData)) {
            userData[mealTitle] = [];
          };
          userData[mealTitle].push(trackerFile);    
        })
        
        console.log("userData: ", userData);
        this.setState({ userData }, () => {
          this.dailyTotal();
        })
      }
      )
      .then(res => console.log("Here is the saved Data: ", this.state.userData))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
          {Object.entries(this.state.dailyTotal).length>0 ? (
            <TodaysList>
              {Object.entries(this.state.userData).map(([mealTitle, array]) => (
                <CollapsibleTodaysListItem 
                  key={array._id}
                  date={array[0].date}
                  mealTitle={mealTitle}
                  foodItem={array.foodItem}
                  showHidden={this.showHidden}
                  cal={Math.round(array[0].mealTotal.cal * 100) / 100}
                  prot={Math.round(array[0].mealTotal.prot * 100) / 100}
                  sug={Math.round(array[0].mealTotal.sug * 100) / 100}
                  sod={Math.round(array[0].mealTotal.sod * 100) / 100}
                >
                  {Object.entries(array).map(([item, data]) => (
                    <TodaysListItem 
                      foodItem={data.foodItem}
                      cal={Math.round(data.calories * 100) / 100}
                      prot={Math.round(data.protein * 100) / 100}
                      sug={Math.round(data.sugar * 100) / 100}
                      sod={Math.round(data.sodium * 100) / 100}
                    />
                  ))}
                </CollapsibleTodaysListItem>
              ))}
              <TodaysListTotal 
                date={''}
                foodItem={''}
                mealTitle={'Total: '}
                cal={Math.round(this.state.dailyTotal.calories * 100) / 100}
                prot={Math.round(this.state.dailyTotal.protein * 100) / 100}
                sug={Math.round(this.state.dailyTotal.sugar * 100) / 100}
                sod={Math.round(this.state.dailyTotal.sodium * 100) / 100}
              />
            </TodaysList>
          ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    );
  }
}

export default Views;
