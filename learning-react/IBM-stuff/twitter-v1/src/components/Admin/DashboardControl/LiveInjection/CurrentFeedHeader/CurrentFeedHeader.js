import React, { PropTypes } from 'react'
import SparklineViz from './SparklineViz/SparklineViz'
import './CurrentFeedHeader.css'


class CurrentFeedHeader extends React.Component {
  render () {
    return(
      <div className = "current-feed-header-container">
        <div className = "current-feed-header-timer">{this.props.time}</div>

        <div className = "current-feed-header-dataviz">
              <SparklineViz title = "Stock" value = "52"></SparklineViz>
              <div className = "current-feed-separator" ></div>
              <SparklineViz title = "Sentiment" value ="48"></SparklineViz>
        </div>
      </div>
    )
  }
}

export default CurrentFeedHeader;
