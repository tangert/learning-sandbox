import React, { Component, PropTypes } from 'react'
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import './SparklineViz.css'

//change sparkline color based on props value being abover or below 50

class SparklineViz extends Component {
  render () {
    return(
      <div className = "sparkline-viz-container">
        <div className = "sparkline-viz-info">
          <div className = "sparkline-viz-title">{this.props.title}</div>
          <div className = "sparkline-viz-value">{this.props.value}</div>
        </div>
        <div className = "sparkline-viz-chart">
          <Sparklines data={[5, 10, 5, 20]} height = {50}>
            <SparklinesLine color="blue" />
            <SparklinesReferenceLine type="mean" />
            <SparklinesSpots />
          </Sparklines>
        </div>
      </div>
    );
  }
}

export default SparklineViz;
