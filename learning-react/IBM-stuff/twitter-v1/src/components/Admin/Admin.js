import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../actions/index.js';

import io from 'socket.io-client';
import Overdrive from 'react-overdrive';
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

const socket = io("http://localhost:3001");

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
    console.log(value);
  }

  onSubmit() {
    console.log("ABOUT TO UPDATE DATA");
    this.setState({
      isRunning: true
    },()=>{
      console.log(this.state.isRunning);
    });

    let requestBody = {
      time: this.state.time,
      sentiment: this.state.sentiment,
      stock: this.state.stock,
      stockFlux: this.state.stockFlux/100,
      sentFlux: this.state.sentFlux/100
    };

    axios({
      method: 'post',
      url: '/api/gen-traffic',
      data: requestBody
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
            <div className = "content-container">

              <div className = "social-media-container">
                <div className = "social-media-title">
                  <div>Social Media</div>
                </div>

                <div className = "social-media-content">

                  <div className = "social-media-filters">
                    <div className = "label-control-header">
                      <div className = "corner-label">FILTERS</div>
                      <button className = "add-new-button">+</button>
                    </div>
                  </div>

                  <div className = "social-media-pinned-tweets">
                    <div className = "label-control-header">
                      <div className = "corner-label">PINNED TWEETS</div>
                      <button className = "add-new-button">+</button>
                    </div>                  </div>
                </div>
              </div>




              <div className = "presets-container">
                <div className = "presets-title">Presets</div>
                <div className = "presets-content">
                </div>
              </div>




              <div className = "live-injection-container">
                <div className = "live-injection-title">Current Feed</div>

                <div className = "live-injection-header">
                  <div className = "live-injection-header-timer"></div>

                  <div className = "live-injection-header-dataviz">
                      <div className = "live-inection-header-stock"></div>
                        <div className = "live-injection-separator"></div>
                      <div className = "live-inection-header-sentiment"></div>
                  </div>
                </div>

                <div className = "live-injection-content">

                <div className = "label-control-header">
                  <div className = "corner-label">FULL INJECT</div>
                </div>

                <div className = "sent-part">
                    <div className = "label">
                      <h1 className="main-value"> Sentiment: <span className = "val-detail">{this.state.sentiment}</span></h1>
                      <div className ="flux">
                        <div className = "flux-title">Flux: </div>
                        <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.onSentFluxChange} defaultValue={0} />
                      </div>
                    </div>

                    <Range
                      className = "range sent"
                      min={5}
                      max={100}
                      defaultValue={0}
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
                        <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.onStockFluxChange} defaultValue={0} />
                      </div>
                  </div>
                    <Range
                      className = "range stock"
                      min={5}
                      max={100}
                      defaultValue={0}
                      value={this.state.stock}
                      onChange={this.onStockChange}
                      onAfterChange={this.onRangeAfterChange}
                      trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
                      railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}
                      handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
                      tipFormatter={value => `${value}%`}
                    />
                  </div>

                  <div className = "trading-volume-part">
                    <div className = "label">
                      <h1 className="main-value" style={{color:"white"}}>Trading Volume: <span className = "val-detail">{this.state.stock}</span></h1>
                        <div className ="flux">
                          <div className = "flux-title" style={{color:"white"}}>Flux: </div>
                          <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.onStockFluxChange} defaultValue={0} />
                        </div>
                    </div>
                      <Range
                        className = "range stock"
                        min={5}
                        max={100}
                        defaultValue={0}
                        value={this.state.stock}
                        onChange={this.onStockChange}
                        onAfterChange={this.onRangeAfterChange}
                        trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
                        railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}
                        handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
                        tipFormatter={value => `${value}%`}
                      />
                    </div>


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
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    graph_data: state.dashboard.stock_data,
    tweet_data: state.dashboard.tweet_data,
    isReceivingData: state.dashboard.isReceivingData,
    last_request_body: state.api.last_request_body
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
