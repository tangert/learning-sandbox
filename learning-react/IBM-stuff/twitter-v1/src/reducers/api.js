import { SEND_REQUEST, UPDATE_TIME } from '../constants/ActionTypes';

const initialState = {
  last_request_body: {},
  time_left: 0
}

export default function api(state = initialState, action) {
  switch(action.type) {
    case SEND_REQUEST:
      return { ...state,
              last_request_body: action.payload }
    case UPDATE_TIME:
      return { ...state,
               time_left: action.payload }
    default:
      return state;
  }
}
