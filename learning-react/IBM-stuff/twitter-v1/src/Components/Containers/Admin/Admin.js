import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import './Admin.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;

const marks = {
  0: 'Flat',
  50: '50%',
  100: 'Max flux'
};

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
      sentiment: 0,
      sentFlux: 0,
      stock: 0,
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
      sentiment: value
    },() => {
        console.log(this.state);
    });
  }

  onSentFluxChange = (value) => {
    console.log("STOCK: " + value);
    this.setState({
      sentFlux: value
    });
  }

  onStockChange = (value) => {
    console.log("STOCK: " + value);
    this.setState({
      stock: value
    });
  }

  onStockFluxChange = (value) => {
    console.log("STOCK: " + value);
    this.setState({
      stockFlux: value
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

    let HTTP_verb;
    if (this.state.isRunning) {
      HTTP_verb = 'put';
    } else {
      HTTP_verb = 'post';
    }

    axios({
      method: 'post',
      url: '/api/gen-traffic',
      data: {
        time: this.state.time,
        sentiment: this.state.sentiment,
        stock: this.state.stock,
        stockFlux: this.state.stockFlux/100,
        sentFlux: this.state.sentFlux/100
      }
    });
  }

  onStopFeed() {
    console.log("ABOUT TO STOP DATA");
    this.setState({
      isRunning: false
    },()=>{
      console.log(this.state.isRunning);
    });

    axios.delete('api/gen-traffic');
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
              <h1 className="main-value"> Sentiment: <span className = "val-detail">{this.state.sentiment}</span></h1>
              <div className ="flux">
                <div className = "flux-title">Flux: </div>
                <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.onSentFluxChange} defaultValue={20} />
              </div>
            </div>

            <Range
              className = "range sent"
              min={5}
              max={100}
              defaultValue={10}
              value={this.state.sentiment}
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
            <h1 className="main-value">Stock: <span className = "val-detail">{this.state.stock}</span></h1>
              <div className ="flux">
                <div className = "flux-title">Flux: </div>
                <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.onStockFluxChange} defaultValue={20} />
              </div>
          </div>
            <Range
              className = "range stock"
              min={5}
              max={100}
              defaultValue={10}
              value={this.state.stock}
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
                value={this.state.time != 0 ? this.state.time : ""}
                onChange={this.onTimeChange}
                max = "500"
                min = "1"
                placeholder="0"
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
