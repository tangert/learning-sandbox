import dashboard from './dashboard';
import api from './api';
import { CLEAR_STORE } from './../constants/ActionTypes';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ api, dashboard });

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined
  } else {
    return appReducer(state, action)
  }
};

export default rootReducer;
