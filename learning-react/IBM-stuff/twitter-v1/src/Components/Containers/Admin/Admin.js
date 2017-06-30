import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import './Admin.css';

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
      placement="middle"
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
      time: 0,
      isRunning: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
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
    this.setState({
      isRunning: true
    },()=>{
      console.log(this.state.isRunning);
    });
    axios.post('http://localhost:3001/api/gen-traffic', {
      params: {
          time: this.state.time,
          sentiment: this.state.sentiment,
          sentFlux: (this.state.sentFlux)/100,
          stock: this.state.stock,
          stockFlux: (this.state.stockFlux)/100
        }
      })
        .then(function(response) {
            console.log(response);
        }) .catch(function (error) {
            console.log(error);
        });

  }

  onStopFeed() {
    console.log("ABOUT TO STOP DATA");
    this.setState({
      isRunning: false
    },()=>{
      console.log(this.state.isRunning);
    });

    //axios.post here with the current state
  }

  render(){
    let button_section;
    if (!this.state.isRunning) {
      button_section = (
        <div className = "button-section">
          <button className ="button start" onClick = {this.onSubmit}>{"Start feed"}</button>
        </div>
      )
    } else {
      button_section = (
        <div className = "button-section">
          <button className ="button update" onClick = {this.onSubmit}>{"Update"}</button>
          <button className ="button stop" onClick = {this.onStopFeed}>{"Stop"}</button>
        </div>
      )
    }

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

            handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
            trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
            railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}
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
            handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
            tipFormatter={value => `${value}%`}
          />

          <div className = "time-set">
            Generate traffic for:
            <input
            className ="time-input"
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

          <div> { button_section } </div>

        </div>
        </div>
      </div>
    );
  }
}

export default Admin;
