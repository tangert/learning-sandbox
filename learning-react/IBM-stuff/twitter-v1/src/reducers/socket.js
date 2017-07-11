import { UPDATE_STOCK, UPDATE_SENTIMENT, UPDATE_TRAFFIC_GEN } from '../constants/ActionTypes';

const initialState = {
    tweet_data: [],
    stock_data: [],
    isReceivingData: true
  };

//Socket reducer.
export default function socket(state = initialState, action) {
  switch(action.type) {
    case UPDATE_STOCK:
      return {...state,
              stock_data: [ ...state.stock_data, action.payload.data.key ]
             }
    case UPDATE_SENTIMENT:
      return { ...state,
              tweet_data: [ action.payload.data.key, ...state.tweet_data ]
            }
    case UPDATE_TRAFFIC_GEN:
      return { ...state,
              isReceivingData: action.payload.data.key }
    default:
      return state;
  }
}
