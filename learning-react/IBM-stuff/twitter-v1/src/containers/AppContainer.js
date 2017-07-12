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

    socket.on('sentiment-data', function(data){
      this.props.actions.updateSentiment(data);
    }.bind(this));

    socket.on('stock-data', function(data){
      this.props.actions.updateStock(data);
    }.bind(this));

    socket.on('traffic-gen', function(data){
      this.props.actions.updateTrafficGen(data);
    }.bind(this));

    socket.on('send-request', function(data){
      console.log("REQUEST SENT!");
      console.log(data);
      this.props.actions.sendRequest(data);
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

function mapStateToProps(state){
  return {
    graph_data: state.socket.stock_data,
    tweet_data: state.socket.tweet_data,
    isReceivingData: state.socket.isReceivingData,
    last_request_body: state.api.last_request_body
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
