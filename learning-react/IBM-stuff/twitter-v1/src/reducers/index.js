import socket from './socket';
import api from './api';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ api, socket });

export default rootReducer;
