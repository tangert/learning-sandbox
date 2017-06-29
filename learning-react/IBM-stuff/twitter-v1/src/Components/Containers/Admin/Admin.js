import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import './Admin.css';

const style = {
  width: 500,
  margin: 50
};

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentValue: 0,
      sentFlux: 0,
      stockValue: 0,
      stockFlux: 0,
      time: 0
    };
  }

  onSentChange = (value) => {
    console.log("SENTIMENT: " + value);
    this.setState({
      sentValue: value
    },() => {
        console.log(this.state);
    });
  }

  onSentFluxChange = (event) => {
    this.setState({
      sentFlux: Number(event.target.value)
    },() => {
        console.log(this.state);
    });
  }

  onStockChange = (value) => {
    console.log("STOCK: " + value);
    this.setState({
      stockValue: value
    });
  }

  onStockFluxChange = (event) => {
    this.setState({
      stockFlux: Number(event.target.value)
    },() => {
        console.log(this.state);
    });
  }

  onTimeChange = (event) => {
    this.setState({
      time: Number(event.target.value)
    },() => {
        console.log(this.state);
    });
  }

  onRangeAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }

  onSubmit() {
    console.log("ABOUT TO UPDATE DATA");
    //axios.post here with the current state
  }

  render(){
    return(
      <div className = "admin">

      <div className = "admin-container">
        <div className = "sent-part">
          <div className = "label">
            <h1 className="main-value"> Sentiment: <span className = "val-detail">{this.state.sentValue}</span></h1>
            <div className ="flux">
            +/-
            <input
              name="flux"
              type="number"
              value={this.state.sentFlux}
              onChange={this.onSentFluxChange}
              max = "100"
              min = "0"
              placeholder="WOOO"
              >
            </input>
            %
            </div>
          </div>

          <Range
            className = "range sent"
            min={0}
            max={100}
            defaultValue={10}
            value={this.state.sentValue}
            onChange={this.onSentChange}
            onAfterChange={this.onRangeAfterChange}

            trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
            railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}

            handleStyle={{
              borderColor: 'grey',
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
              backgroundColor: 'white',
            }}
            tipFormatter={value => `${value}%`}
          />
        </div>

        <div className = "stock-part">
        <div className = "label">
          <h1 className="main-value">Stock: <span className = "val-detail">{this.state.stockValue}</span></h1>
          <div className ="flux">
          +/-
          <input
            name="flux"
            type="number"
            max = "100"
            min = "0"
            value={this.state.stockFlux}
            onChange={this.onStockFluxChange}
            placeholder="0"
            className="flux">
          </input>
          %
          </div>
        </div>
          <Range
            className = "range stock"
            min={0}
            max={100}
            defaultValue={10}
            value={this.state.stockValue}
            onChange={this.onStockChange}
            onAfterChange={this.onRangeAfterChange}

            trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
            railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}

            handleStyle={{
              borderColor: 'grey',
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
              backgroundColor: 'white',
            }}
            tipFormatter={value => `${value}%`}
          />

          <div className = "time-set">
            Generate traffic for:
            <input
              name="time"
              type="number"
              value={this.state.time}
              onChange={this.onTimeChange}
              max = "500"
              min = "10"
              placeholder="WOOO"
              >
            </input>
            minutes
          </div>

          <button className ="button" onClick = {this.onSubmit}>Update Feed</button>
        </div>
        </div>
      </div>
    );
  }
}

export default Admin;
