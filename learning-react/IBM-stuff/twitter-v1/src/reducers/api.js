import { SEND_REQUEST } from '../constants/ActionTypes';

const initialState = {
  last_request_body: {}
}

export default function api(state = initialState, action) {
  console.log("FROM REDUCER: ", action);
  switch(action.type) {
    case SEND_REQUEST:
      return { last_request_body: action.payload }
    default:
      return state;
  }
}
