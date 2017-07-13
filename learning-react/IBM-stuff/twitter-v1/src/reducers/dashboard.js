import { UPDATE_STOCK, UPDATE_SENTIMENT, UPDATE_TRAFFIC_GEN } from '../constants/ActionTypes';

const initialState = {
    tweet_data: [],
    stock_data: [],
    isReceivingData: false,
};

//Socket reducer.
export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case UPDATE_STOCK:
      return {...state,
              stock_data: [ ...state.stock_data, action.payload ]
             }
    case UPDATE_SENTIMENT:
      return { ...state,
              tweet_data: [ action.payload, ...state.tweet_data ]
            }
    case UPDATE_TRAFFIC_GEN:
      return { ...state,
              isReceivingData: action.payload }
    default:
      return state;
  }
}
