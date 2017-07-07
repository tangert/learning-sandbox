import admin from './admin';
import socket from './socket';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  admin, socket
});

export default rootReducer;
