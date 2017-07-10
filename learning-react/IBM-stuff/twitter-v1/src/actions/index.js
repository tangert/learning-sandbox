import * as types from '../constants/ActionTypes';

//Action creators
export function updateStock(data){
  return {
    type: types.UPDATE_STOCK,
    payload: {
      data: data
    }
  }
}

export function updateSentiment(data){
  return {
    type: types.UPDATE_SENTIMENT,
    payload: {
      data: data
    }
  }
}

export function updateTrafficGen(data){
  return {
    type: types.UPDATE_TRAFFIC_GEN,
    payload: {
      data: data
    }
  }
}
