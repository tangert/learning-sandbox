import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from 'history'

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from './actions/index.js';
import Store from './store';

import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import logo from './logo.svg';
import io from 'socket.io-client';
import './index.css';


//WebSocket
const socket = io("http://localhost:3001");

//Redux variable initialization
const StoreInstance = Store();
let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);


//Route components to pass down props from store
const DashboardRoute = ({ data }) => (
  <Route
    exact path="/" children={() =>
    <DashboardRoute data={data} />}
  />
);

const AdminRoute = ({ data }) => (
  <Route
    exact path="/admin" children={() =>
    <AdminRoute data={data} />}
  />
);

class AppContainer extends Component {
  componentDidMount(){
    socket.on('server-connect', function (data) {
      console.log('SHOULD RECEIVE A SERVER EVENT:');
      socket.emit('client-connect', { connectedToClient: 'true' });
    }.bind(this));

    socket.on('sentiment-data', function(data){
      console.log('GETTING SENTIMENT: ');
    }.bind(this));

    socket.on('stock-data', function(data){
      console.log('GETTING STOCK: ');
    }.bind(this));

    socket.on('traffic-gen', function(data){
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
                <Route exact path="/" component = { Dashboard } />
                <Route path="/admin" component = { Admin } />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = state => ({

})

/*
function mapDispatchToProps(dispatch) {
    return({
        sendTheAlert: () => {dispatch(ALERT_ACTION)}
    })
}

function mapStateToProps(state} {
    return({fancyInfo: "Fancy this:" + state.currentFunnyString})
}
*/

//connect to redux to passdown the changes in top level state down to the

ReactDOM.render( <AppContainer/>,document.getElementById('root'));
