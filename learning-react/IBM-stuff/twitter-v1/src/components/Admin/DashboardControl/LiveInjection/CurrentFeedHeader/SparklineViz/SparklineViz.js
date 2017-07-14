import React, { Component, PropTypes } from 'react'
import './SparklineViz.css'

class SparklineViz extends Component {
  render () {
    return(
      <div className = "sparkline-viz-container">
        <div className = "sparkline-viz-info">
          <div className = "sparkline-viz-title">{this.props.title}</div>
          <div className = "sparkline-viz-value">{this.props.value}</div>
        </div>
        <div className = "sparkline-viz-chart"></div>
      </div>
    );
  }
}

export default SparklineViz;
