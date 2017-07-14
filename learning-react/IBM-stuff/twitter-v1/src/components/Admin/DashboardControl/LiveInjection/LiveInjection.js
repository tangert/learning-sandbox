import React, { PropTypes } from 'react'
import CurrentFeedHeader from './CurrentFeedHeader/CurrentFeedHeader'
import CustomRange from './CustomRange/CustomRange'
import axios from 'axios';
import './LiveInjection.css'

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
      open: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
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


  render() {
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
      <div className = "live-injection-container">

        <div className = "live-injection-title">Current Feed</div>
        <CurrentFeedHeader/>

        <div className = "live-injection-content"
             onMouseOver = {()=>this.props.updateHighlight('LIVE_INJECTION')}
             style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5}}>
            <div className = "label-control-header">
              <div className = "corner-label">FULL INJECT</div>
            </div>

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
