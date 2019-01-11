import React, { Component } from 'react';
import API from "../utils/api";
import { Collapse } from 'react-bootstrap';
import { Col, Row, Container } from "../components/Grid";
import Search from "../components/Search";
import Results from "../components/Results";
import MealTable from "../components/MealTable";
import "./Home.css"

class Home extends Component {

  constructor() {
    super()
    this.state = {
      result: {},
      mealSummary: {
        date: new Date().toLocaleString().split(',')[0],
        cal: 0,
        sod: 0,
        sug: 0,
        prot:0
      },
      search: "",
      mealTitle: "",
      mealDate: new Date().toLocaleString().split(',')[0],
      mealItems: [],
      userId: "",
      quantity: 1,
      open: false
    }
  }

  componentDidMount() {
    this.props.auth.getEmail(
			(username, userId) => {
        this.setState ({
          username:username,
          userId: userId
        });
			}
    );
    

  };

  searchNutritionix = query =>{
    API.searchAPIPost(query)
    .then(res => { 
        // console.log(res);
        var foodItemId = res.data.hits[0]._id;
        // var foodItemName = res.data.hits[0].fields.item_name;
        // console.log(foodItemName);
        // console.log(foodItemId);

        var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";

        return API.searchAPIGet(getURL)})
        .then(function (res) {
          console.log("API get data: ", res);
          function calories() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "ENERC_KCAL") {
                  let caloriesVal;
                  if(res.data.label.nutrients[i].value === null){
                    caloriesVal = 0;
                  }
                  else {
                    caloriesVal = res.data.label.nutrients[i].value;
                  }
                  return caloriesVal;
                }
            }
          };
  
          function sugar() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "SUGAR") {
                  let sugarVal;
                    if(res.data.label.nutrients[i].value === null){
                      sugarVal = 0;
                    }
                    else {
                      sugarVal = res.data.label.nutrients[i].value;
                    }
                    return sugarVal;
                }
            }
          };
  
          function protein() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "PROCNT") {
                  let proteinVal;
                  if(res.data.label.nutrients[i].value === null){
                    proteinVal = 0;
                  }
                  else {
                    proteinVal = res.data.label.nutrients[i].value;
                  }
                  return proteinVal;
                }
            }
          };
          
          function sodium() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "NA") {
                  let sodiumVal;
                  if(res.data.label.nutrients[i].value === null){
                    sodiumVal = 0;
                  }
                  else {
                    sodiumVal = res.data.label.nutrients[i].value;
                  }
                  return sodiumVal;
                }
            }
          };
          
          var name = res.data.name;
          var cal = calories();
          var sod = sodium();
          var sug = sugar();
          var prot = protein();

          var dataObj = {
            name: name,
            date: new Date().toLocaleString().split(',')[0],
            cal: cal,
            sod: sod,
            sug: sug,
            prot: prot
          }
          console.log("resulting data object: ", dataObj);
          return dataObj;
        })
        .then(res => this.setState({ result: res }))
        .catch(err => console.log(err));
  }; 

  addItemToMeal = event => {
    event.preventDefault();
    this.setState({ mealItems: [...this.state.mealItems, Object.assign({}, this.state.result)]}, () => {
      this.mealSummary();
    });
    console.log("mealItems: ", this.state.mealItems);
  };

  handleDelete = id => {
    event.preventDefault();
    let mealItems = this.state.mealItems;

    for(var i = 0; i < mealItems.length; i++){
      if(mealItems[i].name === id) {
        mealItems.splice(i, 1)
      }
    }

    this.setState({ mealItems: mealItems}, () => {
      this.mealSummary();
    });
  };

  handleQuantity = (id) =>{
    // event.preventDefault();
    this.setState({quantity: event.target.value});
    const summary = {
      date: this.state.mealDate,
      cal: 0,
      prot: 0,
      sod: 0,
      sug: 0
    };
    let mealItems = this.state.mealItems;
    for(var i = 0; i < mealItems.length; i++){
      if(mealItems[i].name === id){
        console.log("quantity: ", this.state.quantity);
      }
    }
  }

  mealSummary = () => {
    const summary = {
      date: this.state.mealDate,
      cal: 0,
      prot: 0,
      sod: 0,
      sug: 0
    };
    this.state.mealItems.forEach(mealItem => {
      summary.cal += mealItem.cal;
      summary.prot += mealItem.prot;
      summary.sod += mealItem.sod;
      summary.sug += mealItem.sug;
    });
    this.setState({ mealSummary: summary });
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      this.searchNutritionix(this.state.search);
    }
  };

  collapseButton() {
    this.setState({ open: !this.state.open });
  };

  saveMealData = event => {
    event.preventDefault();

    const accessToken = this.props.auth.getAccessToken();
    
    this.state.mealItems.forEach(mealItem => {
      var dateData = {
        userId: this.state.userId,
        date: this.state.mealDate,
        mealTitle: this.state.mealTitle,
        foodItem: mealItem.name,
        calories: mealItem.cal,
        protein: mealItem.prot,
        sugar: mealItem.sug,
        sodium: mealItem.sod,
        mealTotal: this.state.mealSummary
      };    

      console.log("Date data: ", dateData);

      API.saveDate(accessToken, dateData)
      .then(function (response) {
        console.log(response);
      })
      .catch(err => console.log(err));
    });
  };

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <Container fluid>
            <Row>
              <Col size="md-12">
                <h1>Search for food items to begin meal summary!</h1>
                <MealTable
                  mealItems={this.state.mealItems}
                  mealSummary={this.state.mealSummary}
                  saveMealData={this.saveMealData}
                  handleInputChange={this.handleInputChange}
                  handleDelete={this.handleDelete}
                  handleQuantity={this.handleQuantity}
                  value={this.state.mealTitle}
                  quantity={this.state.quantity}
                  open={this.collapseButton.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Collapse class='collapse' in={this.state.open}>
                <div>
                  <Col size="md-3 sm-12">
                    <h1>Search</h1>
                    <Search
                      value={this.state.search}
                      handleInputChange={this.handleInputChange}
                      handleFormSubmit={this.handleFormSubmit}
                    />
                  </Col>
                  <Col size="md-9 sm-12">
                    <h1>Results Display (Avg.)</h1>
                    {this.state.result.cal
                      ? <Results
                        name={this.state.result.name}
                        cal={ Math.round(this.state.result.cal * 100) / 100 }
                        sod={ Math.round(this.state.result.sod * 100) / 100 }
                        sug={ Math.round(this.state.result.sug * 100) / 100 }
                        prot={ Math.round(this.state.result.prot * 100) / 100 }
                        addItemToMeal={this.addItemToMeal}
                      />
                    : <h3>No Results to Display</h3>}
                  </Col>
                </div>  
              </Collapse>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Home;