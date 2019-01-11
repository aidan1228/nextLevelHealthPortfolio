import React, { Component } from 'react';
import {  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      result: {},
      calculated: {},
      dateSave: {},
      search: "",
      username: "",
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
    collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    
  };

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark transparent-nav">
        <div className="container">
          <a className="navbar-brand" href="#">Next Level Health</a>
          <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`${classOne}`} id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                {isAuthenticated() && (
                  <Link className="nav-link" to="/home">Home</Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated() && (
                  <Link className="nav-link" to="/views">Today</Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated() && (
                  <Link className="nav-link" to="/log">Log</Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated() && (
                  <Link className="nav-link" to="/profile">Profile</Link>
                )}
              </li>
              <li className="nav-item pull-right">
                {isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
        {!isAuthenticated() && (
			    <div className="col-xs-12 jumbotron text-center">
            <h1>Next Level Health</h1>
            <p>PLEASE SIGN IN!</p>
            <a className="btn btn-primary btn-lg btn-login btn-block" onClick={this.login.bind(this)}>Sign In</a>
          </div>
        )} 
      </div>
    );
  }
}

export default App;
