import * as types from '../constants/ActionTypes';

//Socket action creators
export function updateStock(data){
  return {
    type: types.UPDATE_STOCK,
    payload: data
  }
}

export function updateSentiment(data){
  return {
    type: types.UPDATE_SENTIMENT,
    payload: data
  }
}

export function updateTrafficGen(bool){
  return {
    type: types.UPDATE_TRAFFIC_GEN,
    payload: bool
  }
}

//Clear store
export function clearStore(){
  return {
    type: types.CLEAR_STORE,
  }
}

//API Request
export function sendRequest(data) {
  return {
    type: types.SEND_REQUEST,
    payload: data
  }
}

//Pinned tweet container
export function createPinnedTweet(data) {
  return {
    type: types.CREATE_PINNED_TWEET,
    payload: data,
  }
}

export function deletePinnedTweet(data) {
  return {
    type: types.DELETE_PINNED_TWEET,
    payload: data,
  }
}

export function clearPinnedTweets(data) {
  return {
    type: types.CLEAR_PINNED_TWEETS,
  }
}

//Filters
export function editFilters(data){
  return {
    type: types.EDIT_FILTERS,
    payload: data,
  }
}

//time
export function updateTime(data){
  return {
    type: types.UPDATE_TIME,
    payload: data
  }
}
