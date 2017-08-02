import React, { Component, PropTypes } from 'react'
import CustomRange from './CustomRange/CustomRange'
import QuickUpdateSection from './QuickUpdateSection/QuickUpdateSection'
import './FeedControl.css'

class FeedControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      open: false
    };
  }

  render() {
    return(
      <div className = "feed-control-container"
      onMouseOver = {()=>this.props.updateHighlight('FEED_CONTROL')}
      style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5}}>

        <div className = "quick-update-content">
        <div className = "label-control-header">
          <div className = "corner-label">QUICK UPDATE</div>
        </div>

        <div className = "quick-update-buttons">
          <QuickUpdateSection title = "Sentiment" quickUpdate = {this.props.onQuickUpdate}/>
          <QuickUpdateSection title = "Stock" quickUpdate = {this.props.onQuickUpdate}/>
        </div>
      </div>
        <div className = "full-injection-content">

            <div className = "label-control-header">
              <div className = "corner-label">FULL INJECTION</div>
            </div>

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
        </div>
        </div>
    );
  }
}

export default FeedControl;
