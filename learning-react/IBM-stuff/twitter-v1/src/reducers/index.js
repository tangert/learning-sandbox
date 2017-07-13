import dashboard from './dashboard';
import api from './api';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ api, dashboard });

export default rootReducer;
