import { UPDATE_STOCK,
         UPDATE_SENTIMENT,
         UPDATE_TRAFFIC_GEN,
         CREATE_PINNED_TWEET,
         EDIT_PINNED_TWEET,
         DELETE_PINNED_TWEET } from '../constants/ActionTypes';

const initialState = {
    pinned_tweets: [],
    tweet_data: [],
    stock_data: [],
    isReceivingData: false,
};

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
    case CREATE_PINNED_TWEET:
      return { ...state,
                pinned_tweets: [ action.payload, ...state.pinned_tweets ]
              }
    default:
      return state;
  }
}
