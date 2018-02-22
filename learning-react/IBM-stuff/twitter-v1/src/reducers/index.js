import dashboard from './dashboard';
import api from './api';
import { CLEAR_STORE } from './../constants/ActionTypes';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ api, dashboard });

const emptyState = {};

const rootReducer = (state = emptyState, action) => {
  if (action.type === CLEAR_STORE) {
    state = {};
  } else {
    return appReducer(state, action)
  }
};

export default rootReducer;
