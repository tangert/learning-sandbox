import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from 'history'

import { createStore, combineReducers } from 'redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../actions/index.js';

import Dashboard from './../components/Dashboard/Dashboard';
import Admin from './../components/Admin/Admin';
import logo from './../logo.svg';
import io from 'socket.io-client';
import './../index.css';

const socket = io("http://localhost:3001");

class AppContainer extends Component {
  componentDidMount(){
    socket.on('server-connect', function (data) {
      console.log('SHOULD RECEIVE A SERVER EVENT:');
      socket.emit('client-connect', { connectedToClient: 'true' });
    }.bind(this));

    //Connections for Admin -> Dashboard Redux Management
      //Standard Socket actions
      socket.on('sentiment-data', function(data){
        this.props.actions.updateSentiment(data);
      }.bind(this));

      socket.on('stock-data', function(data){
        this.props.actions.updateStock(data);
      }.bind(this));

      socket.on('traffic-gen', function(data){
        this.props.actions.updateTrafficGen(data);
      }.bind(this));

      //API Requests
      socket.on('send-request', function(data){
        this.props.actions.sendRequest(data);
      }.bind(this));

      //Reset store
      socket.on('clear-store', function(data){
        console.log('CLEARING STORE CLIENT SIDE');
        this.props.actions.clearStore();
      }.bind(this));

      //Pinned tweets
      socket.on('pinned-tweets', function(data){
        console.log("client side pinned tweets called");
        console.log(data);
        switch(data.action) {
          case 'CREATE':
            this.props.actions.createPinnedTweet(data.payload);
            break;
          case 'DELETE':
            this.props.actions.deletePinnedTweet(data.payload);
          case 'CLEAR_ALL':
            this.props.actions.clearPinnedTweets()
            break;
          default:
              return;
        }
      }.bind(this));

      //Filters
      socket.on('filter', function(data){
        this.props.actions.editFilters(data);
      }.bind(this));

      //Time change
      socket.on('time-change', function(data){
        console.log("TIME CHANGING: ", data);
        this.props.actions.updateTime(data);
      }.bind(this));
  }

  render(){
    return(
        <Router history = {history}>
          <div className = "app-container">
              <div className="App-header">
                <Link to={'/'}> <img src={logo} className="App-logo" alt="logo" /> </Link>
                <Link to={'/admin'} className="admin-logo">Admin</Link>
              </div>

              <Switch>
                  <Route exact path='/' component= { Dashboard }/>
                  <Route exact path='/admin' component = { Admin }/>
              </Switch>
          </div>
        </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AppContainer)
