import React, { Component } from 'react';
import './MarketListItem.css';

const MarketListItem = (props) => {
  //inner display of each item
  let display;
  //props.data is points
  let data = props.data;
  let dataIsValid = data.length > 0;

  const createItem = (type) => {
    switch(type) {
      case 'OPEN':
        return data.length > 0 ? display = data[0] : display = 0;
      case 'HIGH':
        return display = Math.max(...data);
      case 'LOW':
        return display = Math.min(...data);
      case 'MKT_CAP':
        return dataIsValid ? display = (data[data.length-1] * (1500000 + Math.random()*15000)).toFixed(2) : display = 2000000;
      case 'PE_RATIO':
        return dataIsValid ? display = (data[data.length-1] / 2.00).toFixed(2) : display = 0;
      case 'DIV_YIELD':
        return dataIsValid ? display = (((2.00 / data[data.length-1])*100).toFixed(2) + '%') : display = 0;
      default:
        return display = "";
    }
  }

  return (
    <div className = "market-list-item">
      {props.title}:
      <span className = "stock-detail-val">
        { createItem(props.type) }
      </span>
    </div>
  )
}

export default MarketListItem;
