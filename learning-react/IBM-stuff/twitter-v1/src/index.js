import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from 'history'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import Store from './store';

import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import logo from './logo.svg';
import './index.css';

class AppHeader extends Component {
  render(){
    return(
      <div className="App-header">
        <Link to={'/'}> <img src={logo} className="App-logo" alt="logo" /> </Link>
        <Link to={'/admin'} className="admin-logo">Admin</Link>
      </div>
    );
  }
}

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <Router history = {history}>
      <div className = "app-container">
          <AppHeader/>
          <Switch>
            <Route exact path="/" component = { Dashboard } />
            <Route path="/admin" component = { Admin } />
          </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
