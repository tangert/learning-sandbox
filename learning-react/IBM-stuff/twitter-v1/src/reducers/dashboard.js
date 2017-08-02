import { UPDATE_STOCK,
         UPDATE_SENTIMENT,
         UPDATE_TRAFFIC_GEN,
         CREATE_PINNED_TWEET,
         CLEAR_PINNED_TWEETS,
         DELETE_PINNED_TWEET,
         EDIT_FILTERS } from '../constants/ActionTypes';

const initialState = {
    pinned_tweets: [],
    filters: [],
    filtered_tweets: [],
    tweet_data: [],
    stock_data: [],
    isReceivingData: false,
};

//Helper functions for filters
function filterIsPresent(filters, tweet) {
  console.log("filter is present called");

  for(var i = 0; i < filters.length; i++) {
    let content = tweet.content.toUpperCase();
    if (content.includes(filters[i].toUpperCase())) {
      return true;
    } else {
      console.log("Filter not present");
    }
  }

  return false;
}

function filterCurrentTweets(tweets, filters) {
  if(filters.length > 0) {
    return tweets.filter((tweet, index) => filterIsPresent(filters, tweet));
  } else {
    return [];
  }
}

export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case UPDATE_STOCK:
      return {...state,
              stock_data: [ ...state.stock_data.splice(0,300), action.payload ] }
    case UPDATE_SENTIMENT:
      return { ...state,
              tweet_data: [ action.payload, ...state.tweet_data ],
              filtered_tweets: filterCurrentTweets([ action.payload, ...state.tweet_data ], state.filters)}
    case UPDATE_TRAFFIC_GEN:
      return { ...state,
              isReceivingData: action.payload }
    case CREATE_PINNED_TWEET:
      return { ...state,
                pinned_tweets: [ action.payload, ...state.pinned_tweets ] }
    case DELETE_PINNED_TWEET:
      return { ...state,
               pinned_tweets : state.pinned_tweets.filter( (tweet, index) => tweet.id !== action.payload) }
    case CLEAR_PINNED_TWEETS:
      return { ...state,
                pinned_tweets: [] }
    case EDIT_FILTERS:
      return { ...state,
               filters: action.payload,
               filtered_tweets: state.tweet_data.filter((tweet, index) => filterIsPresent(action.payload, tweet))}
    default:
      return state;
  }
}
