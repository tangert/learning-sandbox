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
