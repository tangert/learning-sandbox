import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from 'history'

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SocketActions from './actions/index.js';
import GlobalStore from './store';

import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import logo from './logo.svg';
import io from 'socket.io-client';
import AppContainer from './containers/AppContainer';
import './index.css';

const socket = io("http://localhost:3001");
ReactDOM.render(
    <Provider store = {GlobalStore}>
      <AppContainer/>
    </Provider>, document.getElementById('root'));
