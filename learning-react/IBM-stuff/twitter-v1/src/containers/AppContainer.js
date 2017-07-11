import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from 'history'

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SocketActions from '../actions/index.js';
import Store from './../store';

import Dashboard from './../components/Dashboard/Dashboard';
import Admin from './../components/Admin/Admin';
import logo from './../logo.svg';
import io from 'socket.io-client';
import './../index.css';

const socket = io("http://localhost:3001");
const StoreInstance = Store();

class AppContainer extends Component {
  componentDidMount(){
    socket.on('server-connect', function (data) {
      console.log('SHOULD RECEIVE A SERVER EVENT:');
      socket.emit('client-connect', { connectedToClient: 'true' });
    }.bind(this));

    socket.on('sentiment-data', function(data){
      console.log(data);
      this.props.updateSentiment(data);
    }.bind(this));

    socket.on('stock-data', function(data){
      console.log(data);
      this.props.updateStock(data);
    }.bind(this));

    socket.on('traffic-gen', function(data){
      console.log(data);
      this.props.updateTrafficGen(data);
    }.bind(this));
  }

  render(){
    return(
      <Provider store={StoreInstance}>
        <Router history = {history}>
          <div className = "app-container">
              <div className="App-header">
                <Link to={'/'}> <img src={logo} className="App-logo" alt="logo" /> </Link>
                <Link to={'/admin'} className="admin-logo">Admin</Link>
              </div>

              <Switch>
                  <Route exact path='/' render={(props) =>
                      (<Dashboard {...props}
                        tweet_data= {props.tweet_data}
                        graph_data = {props.graph_data}
                        isReceivingData = {props.isReceivingData}
                        />
                      )}/>

                    <Route exact path='/admin' render={(props) =>
                      (<Admin {...props}
                        tweet_data= {props.tweet_data}
                        graph_data = {props.graph_data}
                        isReceivingData = {props.isReceivingData}
                        />
                      )}/>
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  graph_data: state.graph_data,
  tweet_data: state.tweet_data,
  isReceivingData: state.isReceivingData
});

const mapDispatchToProps = (dispatch)  => ({
  actions: bindActionCreators(SocketActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
