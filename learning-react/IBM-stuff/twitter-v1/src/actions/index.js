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
    payload: data
  }
}

export function deletePinnedTweet(id) {
  return {
    type: types.DELETE_PINNED_TWEET,
    payload: id
  }
}
