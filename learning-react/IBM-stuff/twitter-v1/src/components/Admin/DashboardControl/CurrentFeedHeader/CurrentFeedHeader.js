import React, { PropTypes } from 'react'
import SparklineViz from './SparklineViz/SparklineViz'
import './CurrentFeedHeader.css'


class CurrentFeedHeader extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return(
      <div className = "current-feed-header-container">
        <div className = "current-feed-header-timer">{this.props.time}</div>

        <div className = "current-feed-header-dataviz">
              <SparklineViz title = "Stock" value = {this.props.lastStock}></SparklineViz>
              <div className = "current-feed-separator" ></div>
              <SparklineViz title = "Sentiment" value ={this.props.lastSentiment}></SparklineViz>
        </div>
      </div>
    )
  }
}

export default CurrentFeedHeader;
