import React, { PropTypes } from 'react'
import CustomRange from './CustomRange/CustomRange'
import LastUpdatePanel from './LastUpdatePanel/LastUpdatePanel'
import axios from 'axios';
import './LiveInjection.css'

class LiveInjection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      sentiment: 0,
      sentFlux: 0,
      sentTimeRelease: 1,
      stock: 0,
      stockFlux: 0,
      stockTimeRelease: 1,
      last_request_body: {},
      isRunning: false,
      open: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
  }

  componentDidMount(){
    //get last request body
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

  onSentTimeReleaseChange = (value) => {
    console.log("CHANGING");
    //in seconds
    this.setState({
      sentTimeRelease: value
    });
  }

  onStockTimeReleaseChange = (value) => {
    //in seconds
    this.setState({
      stockTimeRelease: value
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
      sentFlux: this.state.sentFlux/100,
      sentTimeRelease: this.state.sentTimeRelease,

      stock: this.state.stock,
      stockFlux: this.state.stockFlux/500,
      stockTimeRelease: this.state.stockTimeRelease
    };

    this.props.startCountdown();

    this.setState({
      last_request_body: requestBody,
      isRunning: true
    },()=>{
        if(this.state.isRunning) {
          this.props.updateCountdown();
        }
        this.props.startCountdown(this.state.last_request_body.time);
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
      this.props.updateCountdown();
    });

    axios.delete('api/gen-traffic');
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
                 timeValue = {this.state.sentTimeRelease}
                 value = {this.state.sentiment}
                 onFluxChange = {this.onSentFluxChange}
                 onValueChange = {this.onSentChange}
                 onRangeChange = {this.onRangeAfterChange}
                 onTimeChange = {this.onSentTimeReleaseChange}
                 />

               <CustomRange title = "Stock"
                 timeValue = {this.state.stockTimeRelease}
                 value = {this.state.stock}
                 onFluxChange = {this.onStockFluxChange}
                 onValueChange = {this.onStockChange}
                 onRangeChange = {this.onRangeAfterChange}
                 onTimeChange = {this.onStockTimeReleaseChange}
                 />
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
