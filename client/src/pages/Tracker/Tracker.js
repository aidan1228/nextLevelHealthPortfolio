import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Search from "../../components/Search";
import Results from "../../components/Results";
import DailyTable from "../../components/DailyTable";
// import Moment from 'moment/moment.js';

var caloriesDaily = 0;
var sodiumDaily = 0;
var sugarDaily = 0;
var proteinDaily = 0;
var date = new Date().toLocaleString().split(',')[0]
// var date = Moment().format("MMM Do YY");

class Tracker extends Component {
  state = {
    result: {},
    calculated: {},
    dateSave: {},
    search: ""
  };

  componentDidMount() {
    
  };

  searchNutritionix = query =>{
    API.searchAPIPost(query)
      .then(res => { 
        // console.log(res);
        var foodItemId = res.data.hits[0]._id;
        var foodItemName = res.data.hits[0].fields.item_name;
        // console.log(foodItemName);
        // console.log(foodItemId);

        var getURL = "https://api.nutritionix.com/v2/item/" + foodItemId + "?appId=e9a7abab&appKey=d76830f8477da39c6c738320d221e4d1";

        return API.searchAPIGet(getURL)})
        .then(function (res) {
          console.log(res);
          function calories() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "ENERC_KCAL") {
                    var caloriesVal = res.data.label.nutrients[i].value;
                    // console.log(caloriesVal);
                    return caloriesVal
                }
            }
          };
  
          function sugar() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "SUGAR") {
                    var sugarVal = res.data.label.nutrients[i].value;
                    // console.log(caloriesVal);
                    return sugarVal
                }
            }
          };
  
          function protein() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "PROCNT") {
                    var proteinVal = res.data.label.nutrients[i].value;
                    // console.log(caloriesVal);
                    return proteinVal
                }
            }
          };
          
          function sodium() {
            for (var i = 0; i < res.data.label.nutrients.length; i++) {
                if (res.data.label.nutrients[i].usda_tag === "NA") {
                    var sodiumVal = res.data.label.nutrients[i].value;
                    // console.log(caloriesVal);
                    return sodiumVal
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
            cal: cal,
            sod: sod,
            sug: sug,
            prot: prot
          }
          // console.log(dataObj);
          return dataObj;
        })
        .then(res => this.setState({ result: res }))
        .catch(err => console.log(err));
  }; 

  handleDataSave = event => {
    event.preventDefault();
    this.saveData(this.state.result);
    // console.log(this.state.calculated);
  };

  saveData = query => {
    caloriesDaily += this.state.result.cal;
    proteinDaily += this.state.result.prot;
    sodiumDaily += this.state.result.sod;
    sugarDaily += this.state.result.sug;
    
    var dataObj = {
      date: date,
      dailyCal: caloriesDaily,
      dailyPro: proteinDaily,
      dailySod: sodiumDaily,
      dailySug: sugarDaily
    };

    console.log(caloriesDaily, proteinDaily, sodiumDaily, sugarDaily);
    this.setState({
      calculated: dataObj
    });
    
  };

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

  // handleMongoUpdate = event => {
  //   event.preventDefault();

  //   API.updateDate()
  // };

  handleSaveToMongo = event => {
    event.preventDefault();
    
    var dateData = {
      date: date,
      calories: caloriesDaily,
      protein: proteinDaily,
      sugar: sugarDaily,
      sodium: sodiumDaily
    };
    console.log(dateData);

    // API.getUserData()
    //   .then(function (res) {
    //     if(res.data) {
    //       for(var i; i < res.data.length; i++) {
    //       if(dateData.date === res.data[i].date) {
    //         var updateData = {
    //           date: date,
    //           calories: dateData.calories += res.data[i].calories,
    //           protein: dateData.protein += res.data[i].protein,
    //           sugar: dateData.sugar += res.data[i].sugar,
    //           sodium: dateData.sodium += res.data[i].sodium
    //         }
    //         API.updateDate(res.data[i].id, updateData)
    //         .then(function (response) {
    //           // console.log(response);
    //         })
    //         .catch(err => console.log(err));
    //       } 
    //       }
    //     } else {
    //       API.saveDate(dateData)
    //       .then(function (response) {
    //       // console.log(response);
    //       })
    //       .catch(err => console.log(err));
    //     }
        
    //   })
          // .then(res => console.log(this.state.userData))
          // .catch(err => console.log(err));
        API.saveDate(dateData)
        .then(function (response) {
          console.log(response);
        })
        .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Search</h1>
            </Jumbotron>
            <Search
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
          </Col>
          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Results Display</h1>
            </Jumbotron>
            {this.state.result.cal
                ? <Results
                  name={this.state.result.name}
                  cal= { Math.round(this.state.result.cal * 100) / 100 }
                  sod={ Math.round(this.state.result.sod * 100) / 100 }
                  sug={ Math.round(this.state.result.sug * 100) / 100 }
                  prot={ Math.round(this.state.result.prot * 100) / 100 }
                  handleDataSave={this.handleDataSave}
                />
                : <h3>No Results to Display</h3>}
          </Col>
          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Calculated Total</h1>
            </Jumbotron>
            <DailyTable
              date={date}
              cal={ Math.round(caloriesDaily * 100) / 100 }
              sod={Math.round(sodiumDaily * 100) / 100}
              sug={Math.round(sugarDaily * 100) / 100}
              prot={Math.round(proteinDaily * 100) / 100}
              handleSaveToMongo={this.handleSaveToMongo}
              // handleMongoUpdate={this.handleMongoUpdate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tracker;
