import React, { PropTypes } from 'react'
import CurrentFeedHeader from './CurrentFeedHeader/CurrentFeedHeader'
import CustomRange from './CustomRange/CustomRange'
import LastUpdatePanel from './LastUpdatePanel/LastUpdatePanel'
import axios from 'axios';
import './LiveInjection.css'

var updateCountdownInterval;

class LiveInjection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentiment: 0,
      sentFlux: 0,
      stock: 0,
      stockFlux: 0,
      time: 0,
      isRunning: false,
      open: false,
      last_request_body: {},
      timeLeft: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.parseMSIntoReadableTime = this.parseMSIntoReadableTime.bind(this);
  }

  onSentChange = (value) => {
    console.log("SENTIMENT: " + value);
    this.setState({
      sentiment: value
    });
  }

  onSentFluxChange = (value) => {
    console.log("SENT FLUX: " + value);
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
    console.log("STOCK FLUX: " + value);
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

    let requestBody = {
      time: this.state.time,
      sentiment: this.state.sentiment,
      stock: this.state.stock,
      stockFlux: this.state.stockFlux/100,
      sentFlux: this.state.sentFlux/100
    };

    this.setState({
      last_request_body: requestBody,
      isRunning: true
    },()=>{
        if(this.state.isRunning) {
          clearInterval(updateCountdownInterval);
        }
        this.startCountdown(this.state.last_request_body.time);
    });

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
      clearInterval(updateCountdownInterval);
      this.setState({
        timeLeft: 0
      });
    });

    axios.delete('api/gen-traffic');
  }

  //Format timer function
  startCountdown(time) {
      console.log("STARTING COUNTDOWN WITH: ", time);
      var ms = (time)*60*1000;

      updateCountdownInterval = setInterval(function(){
          this.setState({
            timeLeft: ms
          });
          ms-=1000;
          console.log("TIME LEFT: ",this.state.timeLeft);
        }.bind(this),1000);
    }

  parseMSIntoReadableTime = (milliseconds) => {
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return (h + ':' + m + ':' + s);
  }


  render() {
    let button_section;
    if (!this.props.isReceivingData) {
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
      <div className = "live-injection-container">

        <div className = "live-injection-title">Current Feed</div>

        <CurrentFeedHeader time = {this.parseMSIntoReadableTime(this.state.timeLeft)}
                           isRunning = {this.state.isRunning}/>

        <div className = "live-injection-content"
             onMouseOver = {()=>this.props.updateHighlight('LIVE_INJECTION')}
             style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5}}>

            <div className = "label-control-header">
              <div className = "corner-label">LIVE INJECTION</div>
            </div>

            <LastUpdatePanel time = {this.state.last_request_body.time}
                             sentiment = {this.state.last_request_body.sentiment}
                             stock = {this.state.last_request_body.stock}
                             trading = {this.state.last_request_body.stock}/>

            <div className = "sliders-container">
              <CustomRange title = "Sentiment"
                           value = {this.state.sentiment}
                           onFluxChange = {this.onSentFluxChange}
                           onValueChange = {this.onSentChange}
                           onRangeChange = {this.onRangeAfterChange} />

              <CustomRange title = "Stock"
                           value = {this.state.stock}
                           onFluxChange = {this.onStockFluxChange}
                           onValueChange = {this.onStockChange}
                           onRangeChange = {this.onRangeAfterChange} />

              <CustomRange title = "Trading Volume"
                             value = {this.state.stock}
                             onFluxChange = {this.onStockFluxChange}
                             onValueChange = {this.onStockChange}
                             onRangeChange = {this.onRangeAfterChange} />
            </div>


            <div className = "time-set">
              Generate traffic for:
              <input className ="time-input" name="time" type="number"
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
    );
  }
}

export default LiveInjection;
