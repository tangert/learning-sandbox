import React, { Component, PropTypes } from 'react'
import CustomRange from './CustomRange/CustomRange'
import LastUpdatePanel from './LastUpdatePanel/LastUpdatePanel'
import axios from 'axios';
import './LiveInjection.css'

class LiveInjection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      open: false
    };
  }

  render() {
    return(
      <div className = "live-injection-container">
        <div className = "live-injection-content"
             onMouseOver = {()=>this.props.updateHighlight('LIVE_INJECTION')}
             style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5}}>

            <div className = "label-control-header">
              <div className = "corner-label">LIVE INJECTION</div>
            </div>

            <LastUpdatePanel time = {this.props.last_request_body.time}
                             sentiment = {this.props.last_request_body.sentiment}
                             stock = {this.props.last_request_body.stock}
                             trading = {this.props.last_request_body.stock}/>

            <div className = "sliders-container">
               <CustomRange title = "Sentiment"
                 timeValue = {this.props.sentTimeRelease}
                 value = {this.props.sentiment}
                 onFluxChange = {this.props.onSentFluxChange}
                 onValueChange = {this.props.onSentChange}
                 onRangeChange = {this.props.onRangeAfterChange}
                 onTimeChange = {this.props.onSentTimeReleaseChange}
                 />

               <CustomRange title = "Stock"
                 timeValue = {this.props.stockTimeRelease}
                 value = {this.props.stock}
                 onFluxChange = {this.props.onStockFluxChange}
                 onValueChange = {this.props.onStockChange}
                 onRangeChange = {this.props.onRangeAfterChange}
                 onTimeChange = {this.props.onStockTimeReleaseChange}
                 />
            </div>


            <div className = "time-set">
              Traffic:
              <input className ="time-input" name="time" type="number"
                value={this.props.time != 0 ? this.props.time : ""}
                onChange={this.props.onTimeChange}
                max = "500"
                min = "1"
                placeholder={this.props.last_request_body.time}
                >
              </input>
              minutes
            </div>
        </div>
        </div>
    );
  }
}

export default LiveInjection;
